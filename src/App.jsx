import { useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PoolsPage from './pages/PoolsPage';
import FeedCalculatorPage from './pages/FeedCalculatorPage';
import FeedFormulaPage from './pages/FeedFormulaPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import { getFeedStats } from './utils/formulas';
import { exportAppData, loadAppData, saveAppData } from './utils/storage';

const navigation = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/pools', label: 'Pools', icon: '🌊' },
  { to: '/calculator', label: 'Feed Calculator', icon: '🧮' },
  { to: '/formula', label: 'Feed Formula', icon: '🥣' },
  { to: '/reports', label: 'Reports', icon: '📊' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function App() {
  const [appData, setAppData] = useState(loadAppData());

  useEffect(() => {
    saveAppData(appData);
    document.body.dataset.theme = appData.settings.darkMode ? 'dark' : 'light';
  }, [appData]);

  const dashboardStats = useMemo(() => {
    const totalPools = appData.pools.length;
    const totalFish = appData.pools.reduce((sum, pool) => sum + Number(pool.fishCount || 0), 0);
    const feedSummaries = appData.pools.map((pool) => getFeedStats({ fishCount: pool.fishCount, averageWeight: pool.averageWeight }));
    const totalBiomass = feedSummaries.reduce((sum, item) => sum + item.biomass, 0);
    const totalDailyFeed = feedSummaries.reduce((sum, item) => sum + item.dailyFeed, 0);
    const totalMorningFeed = feedSummaries.reduce((sum, item) => sum + item.morningFeed, 0);
    const totalEveningFeed = feedSummaries.reduce((sum, item) => sum + item.eveningFeed, 0);
    const averageWeight = appData.pools.length
      ? appData.pools.reduce((sum, pool) => sum + Number(pool.averageWeight || 0), 0) / appData.pools.length
      : 0;

    return {
      totalPools,
      totalFish,
      totalBiomass,
      todayFeed: totalDailyFeed,
      morningFeed: totalMorningFeed,
      eveningFeed: totalEveningFeed,
      averageWeight,
    };
  }, [appData]);

  const updatePool = (poolId, fields) => {
    setAppData((prev) => ({
      ...prev,
      pools: prev.pools.map((pool) => (pool.id === poolId ? { ...pool, ...fields } : pool)),
    }));
  };

  const addPool = (pool) => {
    setAppData((prev) => ({ ...prev, pools: [ ...prev.pools, pool ] }));
  };

  const deletePool = (poolId) => {
    setAppData((prev) => ({ ...prev, pools: prev.pools.filter((pool) => pool.id !== poolId) }));
  };

  const updateFormulaIngredients = (ingredients) => {
    setAppData((prev) => ({ ...prev, formulaIngredients: ingredients }));
  };

  const toggleTheme = () => {
    setAppData((prev) => ({ ...prev, settings: { ...prev.settings, darkMode: !prev.settings.darkMode } }));
  };

  const resetData = () => {
    const fresh = loadAppData();
    setAppData(fresh);
  };

  const handleExportData = () => {
    exportAppData(appData);
  };

  const handleImportData = (data) => {
    setAppData(data);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-badge">🐟</div>
            <div>
              <div>Fish Feed Calculator Pro</div>
              <div className="small">Offline management for every pond</div>
            </div>
          </div>
          <nav className="nav-links">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<DashboardPage stats={dashboardStats} pools={appData.pools} />} />
          <Route path="/pools" element={<PoolsPage pools={appData.pools} addPool={addPool} updatePool={updatePool} deletePool={deletePool} />} />
          <Route path="/calculator" element={<FeedCalculatorPage pools={appData.pools} />} />
          <Route path="/formula" element={<FeedFormulaPage ingredients={appData.formulaIngredients} updateIngredients={updateFormulaIngredients} />} />
          <Route path="/reports" element={<ReportsPage pools={appData.pools} />} />
          <Route path="/settings" element={<SettingsPage settings={appData.settings} toggleTheme={toggleTheme} resetData={resetData} exportData={handleExportData} importData={handleImportData} />} />
        </Routes>
      </main>

      <nav className="mobile-nav">
        {navigation.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
