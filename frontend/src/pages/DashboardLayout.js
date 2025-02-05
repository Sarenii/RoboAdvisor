import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  // Classes for the active link
  const linkClasses = ({ isActive }) =>
    isActive
      ? 'block px-4 py-2 rounded bg-shade-4 text-white'
      : 'block px-4 py-2 rounded hover:bg-shade-3 hover:text-white';

  return (
    <div className="flex min-h-[70vh]">
      {/* Sidebar */}
      <aside className="w-64 bg-green-dark text-white flex-shrink-0 hidden sm:flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-shade-4">
          Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="" end className={linkClasses}>
            Overview
          </NavLink>
          <NavLink to="portfolio" className={linkClasses}>
            Portfolio
          </NavLink>
          <NavLink to="admin" className={linkClasses}>
            Admin Panel
          </NavLink>
        </nav>
      </aside>

      {/* Mobile Sidebar Toggle (optional) */}
      {/* You could add a button to toggle the sidebar on mobile if you want. 
          For simplicity, let's keep the sidebar hidden below 'sm'. */}

      {/* Main Content Area */}
      <main className="flex-grow bg-shade-9 p-4">
        {/* 
          <Outlet> will render whichever nested route is active:
          - /dashboard -> DashboardHome
          - /dashboard/portfolio -> Portfolio
          - /dashboard/admin -> AdminPanel
        */}
        <Outlet />
      </main>
    </div>
  );
}
