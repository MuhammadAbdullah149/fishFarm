import { importAppData } from '../utils/storage';

export default function SettingsPage({ settings, toggleTheme, resetData, exportData, importData }) {
  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = importAppData(e.target?.result);
        importData(data);
      } catch {
        alert('Failed to import data');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="page">
      <section className="card">
        <div className="section-head">
          <h2>Settings</h2>
        </div>
        <div className="input-group">
          <label>Appearance</label>
          <button className="btn btn-secondary" onClick={toggleTheme}>{settings.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
        </div>
        <div className="input-group">
          <label>Data</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={exportData}>Export Data</button>
            <label className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center' }}>
              Import Data
              <input type="file" accept="application/json" onChange={handleImport} style={{ display: 'none' }} />
            </label>
            <button className="btn btn-danger" onClick={resetData}>Reset App</button>
          </div>
        </div>
      </section>
    </div>
  );
}
