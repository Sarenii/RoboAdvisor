// src/pages/MarketData.jsx
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import apiService from '../services/apiServices';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Predefined stocks for dropdown selection
const PREDEFINED_STOCKS = [
  { label: 'IBM (IBM)', symbol: 'IBM' },
  { label: 'Intel (INTC)', symbol: 'INTC' },
  { label: 'Microsoft (MSFT)', symbol: 'MSFT' },
];

// Predefined Top Markets (you can adjust as needed)
const TOP_MARKETS = [
  { label: 'IBM', symbol: 'IBM' },
  { label: 'INTC', symbol: 'INTC' },
  { label: 'MSFT', symbol: 'MSFT' },
  { label: 'GE', symbol: 'GE' },
  { label: 'F', symbol: 'F' },
];

export default function MarketData() {
  // State for user-added symbols
  const [selectedSymbol, setSelectedSymbol] = useState(PREDEFINED_STOCKS[0].symbol);
  const [customSymbol, setCustomSymbol] = useState('');
  const [symbols, setSymbols] = useState([]);
  const [dataBySymbol, setDataBySymbol] = useState({});
  const [loadingSymbols, setLoadingSymbols] = useState({});
  const [errorSymbols, setErrorSymbols] = useState({});

  // State for Top Markets data
  const [topMarketData, setTopMarketData] = useState([]);
  const [loadingTopMarkets, setLoadingTopMarkets] = useState(false);
  const [topMarketsError, setTopMarketsError] = useState(null);

  // Handler: add a symbol (custom input or dropdown)
  const handleAddSymbol = async () => {
    const symbolToAdd = (customSymbol.trim() || selectedSymbol).toUpperCase();
    if (!symbolToAdd) return;
    if (symbols.includes(symbolToAdd)) {
      alert('Symbol already added.');
      return;
    }
    setSymbols((prev) => [...prev, symbolToAdd]);
    setCustomSymbol('');
    await fetchQuoteForSymbol(symbolToAdd);
  };

  // Fetch real-time quote for a symbol
  const fetchQuoteForSymbol = async (symbol) => {
    setLoadingSymbols((prev) => ({ ...prev, [symbol]: true }));
    setErrorSymbols((prev) => ({ ...prev, [symbol]: null }));
    try {
      const res = await apiService.get(`/market-data/quote/${symbol}`);
      setDataBySymbol((prev) => ({ ...prev, [symbol]: res.data }));
    } catch (err) {
      setErrorSymbols((prev) => ({
        ...prev,
        [symbol]: err.response?.data?.message || 'Failed to fetch market data.',
      }));
    } finally {
      setLoadingSymbols((prev) => ({ ...prev, [symbol]: false }));
    }
  };

  const handleRemoveSymbol = (symbol) => {
    setSymbols((prev) => prev.filter((s) => s !== symbol));
    setDataBySymbol((prev) => {
      const newData = { ...prev };
      delete newData[symbol];
      return newData;
    });
  };

  // Prepare chart data for the current market prices of top markets
  const prepareTopMarketsChartData = () => {
    const labels = topMarketData.map((item) => item.symbol);
    const prices = topMarketData.map((item) => item.price);
    return {
      labels,
      datasets: [
        {
          label: 'Current Price',
          data: prices,
          backgroundColor: 'rgba(75,192,192,0.6)',
        },
      ],
    };
  };

  // Fetch data for top markets
  const fetchTopMarketsData = async () => {
    setLoadingTopMarkets(true);
    setTopMarketsError(null);
    try {
      const results = await Promise.all(
        TOP_MARKETS.map(async (market) => {
          const res = await apiService.get(`/market-data/quote/${market.symbol}`);
          return res.data;
        })
      );
      setTopMarketData(results);
    } catch (err) {
      setTopMarketsError(err.response?.data?.message || 'Failed to load top markets.');
    } finally {
      setLoadingTopMarkets(false);
    }
  };

  // Fetch top markets data on component mount
  useEffect(() => {
    fetchTopMarketsData();
  }, []);

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Market Data</h1>
      
      {/* Section: User-added symbols */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Current Market Prices</h2>
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div className="flex-1 mb-2 sm:mb-0">
              <label className="block mb-1 font-semibold">Select a symbol:</label>
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none"
              >
                {PREDEFINED_STOCKS.map((opt) => (
                  <option key={opt.symbol} value={opt.symbol}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 mb-2 sm:mb-0">
              <label className="block mb-1 font-semibold">Or enter a custom symbol:</label>
              <input
                type="text"
                value={customSymbol}
                onChange={(e) => setCustomSymbol(e.target.value)}
                placeholder="E.g. MSFT"
                className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none"
              />
            </div>
            <div>
              <button
                onClick={handleAddSymbol}
                className="bg-shade-5 hover:bg-shade-4 text-green-dark px-4 py-2 rounded font-semibold"
              >
                Add Symbol
              </button>
            </div>
          </div>
        </div>
        {symbols.length === 0 && (
          <p className="text-gray-700">No symbols added. Please add a symbol.</p>
        )}
        {symbols.map((symbol) => (
          <div key={symbol} className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">
                {dataBySymbol[symbol]?.name || symbol}
              </h2>
              <button
                onClick={() => handleRemoveSymbol(symbol)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
            {loadingSymbols[symbol] ? (
              <p>Loading data for {symbol}...</p>
            ) : errorSymbols[symbol] ? (
              <p className="text-red-600">{errorSymbols[symbol]}</p>
            ) : dataBySymbol[symbol] ? (
              <div className="mb-4">
                <p className="text-gray-700">
                  Current Market Price: <strong>${dataBySymbol[symbol].price?.toFixed(2)}</strong>
                  <br />
                  Change: {dataBySymbol[symbol].changePercent?.toFixed(2)}%
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Section: Top Markets Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Top Markets</h2>
        {loadingTopMarkets ? (
          <p>Loading top markets data...</p>
        ) : topMarketsError ? (
          <p className="text-red-600">{topMarketsError}</p>
        ) : topMarketData.length > 0 ? (
          <div className="bg-shade-8 p-4 rounded">
            <Bar
              data={prepareTopMarketsChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                  title: { display: true, text: 'Top Market Prices' },
                },
              }}
            />
          </div>
        ) : (
          <p>No top market data available.</p>
        )}
      </div>
    </div>
  );
}
