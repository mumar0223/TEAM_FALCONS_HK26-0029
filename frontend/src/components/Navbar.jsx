import React, { useState } from 'react';
import { 
  Bell, 
  Sliders, 
  Settings, 
  ChevronDown, 
  Radio, 
  LayoutDashboard, 
  Sun, 
  Moon,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  currentStock, 
  onSelectStock, 
  allStocks, 
  activePage, 
  onNavigate,
  isDarkMode,
  onToggleTheme 
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        {/* Logo and Core Engine Tag */}
        <div className="logo-group">
          <div className="logo-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-title">ArthDrishti</span>
          <span className="engine-badge">V1.0 CORE</span>
        </div>

        {/* Page Navigation Tabs */}
        <nav className="nav-page-tabs">
          <button
            className={`nav-tab-btn ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-tab-btn ${activePage === 'news' ? 'active' : ''}`}
            onClick={() => onNavigate('news')}
          >
            <Radio size={14} />
            <span>Live News & Signals</span>
            <span className="nav-badge-count">142</span>
          </button>
        </nav>

        {/* Stock Selector Dropdown */}
        <div className="stock-dropdown-wrapper">
          <button 
            className="stock-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Select company"
          >
            <span className="stock-name-label">{currentStock.name.split(' Ltd.')[0]}</span>
            <span className="ticker-pill-tag">{currentStock.symbol}</span>
            <ChevronDown size={14} className="dropdown-caret" />
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {Object.keys(allStocks).map((key) => {
                const stock = allStocks[key];
                return (
                  <div
                    key={key}
                    className={`dropdown-item ${stock.symbol === currentStock.symbol ? 'active' : ''}`}
                    onClick={() => {
                      onSelectStock(key);
                      setDropdownOpen(false);
                    }}
                  >
                    <div className="dropdown-item-info">
                      <span className="dropdown-item-name">{stock.name}</span>
                      <span className="dropdown-item-ticker">{stock.symbol}</span>
                    </div>
                    <span className="dropdown-item-price">{stock.price}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="navbar-right">
        <div className="status-item demo-status">
          <span className="live-pulse"></span>
          <span>Demo Data • Updated 2 mins ago</span>
        </div>

        <div className="market-pill">
          <span className="live-pulse"></span>
          <span className="market-text">NSE: OPEN</span>
        </div>

        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
        >
          {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <div className="header-actions">
          <button className="icon-btn" title="Alerts & Notifications">
            <Bell size={16} />
          </button>
          <button className="icon-btn" title="Parameters & Model Tuning">
            <Sliders size={16} />
          </button>
          <button className="icon-btn" title="System Settings">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
