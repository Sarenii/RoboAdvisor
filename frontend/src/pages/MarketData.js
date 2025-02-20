import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import apiService from '../services/apiServices';

// Chart.js registration (unchanged)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 1. Symbol options
const STOCK_OPTIONS = [
  { label: 'Apple (AAPL)', symbol: 'AAPL' },
  { label: 'Tesla (TSLA)', symbol: 'TSLA' },
  { label: 'Amazon (AMZN)', symbol: 'AMZN' },
];

export default function MarketData() {
  // 2. Default to the first symbol in the list, e.g. "AAPL"
  const [symbol, setSymbol] = useState(STOCK_OPTIONS[0].symbol);
  const [quote, setQuote] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Helper to fetch data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Only send the symbol to the backend
      const quoteRes = await apiService.get(`/market-data/quote/${symbol}`);
      const histRes = await apiService.get(`/market-data/history/${symbol}`);
      setQuote(quoteRes.data);
      setHistory(histRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch market data.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Fetch once on mount for the default symbol
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 5. Prepare chart data
  const chartData = {
    labels: history.map((h) => h.date),
    datasets: [
      {
        label: `${symbol.toUpperCase()} Close Price`,
        data: history.map((h) => h.close),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  // 6. Handle user selecting a different symbol
  const handleSymbolChange = (e) => {
    const newSymbol = e.target.value;
    setSymbol(newSymbol);
    // Optionally auto-fetch data immediately if you prefer
    // fetchData();
  };

  // 7. Fetch data on button click
  const handleFetchClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Market Data</h1>

      {/* Symbol selector */}
      <form onSubmit={handleFetchClick} className="mb-4 space-x-2">
        <select
          value={symbol}
          onChange={handleSymbolChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
        >
          {STOCK_OPTIONS.map((opt) => (
            <option key={opt.symbol} value={opt.symbol}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-shade-5 hover:bg-shade-4 text-green-dark px-4 py-2 rounded font-semibold"
        >
          Get Data
        </button>
      </form>

      {loading && <div>Loading data...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {/* Real-time quote */}
      {quote && !loading && !error && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Real-Time Quote: {quote.symbol}
          </h2>
          <p className="text-gray-700">
            Price: <strong>${quote.price?.toFixed(2)}</strong>{' '}
            ({quote.changePercent?.toFixed(2)}%)
          </p>
        </div>
      )}

      {/* Historical Chart */}
      {history.length > 0 && !loading && !error && (
        <div className="bg-shade-8 p-4 rounded">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
                title: { display: true, text: `${symbol.toUpperCase()} History` },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
