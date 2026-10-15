import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TickerHeader from './components/TickerHeader';
import MetricCards from './components/MetricCards';
import DualAxisChart from './components/DualAxisChart';
import VelocityChart from './components/VelocityChart';
import VoiceChatAgent from './components/VoiceChatAgent';
import NewsPage from './components/NewsPage';
import Footer from './components/Footer';
import { STOCKS_DATA } from './data/mockData';
import './App.css';

export default function App() {
  const [currentStockKey, setCurrentStockKey] = useState('RELIANCE');
  const [activePage, setActivePage] = useState('dashboard'); // 'dashboard' | 'news'
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to Light white & green theme

  const currentStock = STOCKS_DATA[currentStockKey] || STOCKS_DATA.RELIANCE;

  return (
    <div className={`terminal-app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Navbar 
        currentStock={currentStock} 
        onSelectStock={setCurrentStockKey} 
        allStocks={STOCKS_DATA}
        activePage={activePage}
        onNavigate={setActivePage}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {activePage === 'dashboard' ? (
        <main className="dashboard-main-content">
          <TickerHeader 
            currentStockKey={currentStockKey} 
            onSelectStock={setCurrentStockKey} 
            stock={currentStock} 
          />

          <MetricCards stock={currentStock} />

          <div className="charts-and-signals-grid">
            <div className="charts-column">
              <DualAxisChart stock={currentStock} />
              <VelocityChart stock={currentStock} />
            </div>

            <aside className="signals-column">
              <VoiceChatAgent stock={currentStock} />
            </aside>
          </div>
        </main>
      ) : (
        <main className="dashboard-main-content news-view-content">
          <NewsPage 
            stock={currentStock} 
            onBackToDashboard={() => setActivePage('dashboard')} 
          />
        </main>
      )}

      <Footer />
    </div>
  );
}
