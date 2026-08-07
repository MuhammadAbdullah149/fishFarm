import { useMemo, useState } from 'react';
import { formatNumber, getFeedStats } from '../utils/formulas';

const initialState = {
  poolId: '',
  fishCount: '',
  averageWeight: '',
};

export default function FeedCalculatorPage({ pools }) {
  const [form, setForm] = useState(initialState);
  const selectedPool = pools.find((pool) => pool.id === form.poolId) || null;

  const result = useMemo(() => getFeedStats({ fishCount: form.fishCount || selectedPool?.fishCount || 0, averageWeight: form.averageWeight || selectedPool?.averageWeight || 0 }), [form, selectedPool]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page">
      <section className="card">
        <div className="section-head">
          <h2>Daily Feed Calculator</h2>
        </div>
        <div className="input-group">
          <label>Pool</label>
          <select name="poolId" value={form.poolId} onChange={handleChange}>
            <option value="">Select a pool</option>
            {pools.map((pool) => (
              <option key={pool.id} value={pool.id}>{pool.poolName}</option>
            ))}
          </select>
        </div>
        <div className="row">
          <div className="input-group">
            <label>Fish Count</label>
            <input type="number" name="fishCount" value={form.fishCount} onChange={handleChange} placeholder={selectedPool?.fishCount || 'Enter fish count'} />
          </div>
          <div className="input-group">
            <label>Average Weight (g)</label>
            <input type="number" name="averageWeight" value={form.averageWeight} onChange={handleChange} placeholder={selectedPool?.averageWeight || 'Enter average weight'} />
          </div>
        </div>
      </section>

      <section className="card result-box">
        <div className="section-head" style={{ color: 'white' }}>
          <h2>Results</h2>
        </div>
        <div className="result-grid">
          <div className="result-item"><span className="small">Biomass</span><strong>{formatNumber(result.biomass)} kg</strong></div>
          <div className="result-item"><span className="small">Feed %</span><strong>{formatNumber(result.feedPercentage)}%</strong></div>
          <div className="result-item"><span className="small">Daily Feed</span><strong>{formatNumber(result.dailyFeed)} kg</strong></div>
          <div className="result-item"><span className="small">Morning Feed</span><strong>{formatNumber(result.morningFeed)} kg</strong></div>
          <div className="result-item"><span className="small">Evening Feed</span><strong>{formatNumber(result.eveningFeed)} kg</strong></div>
        </div>
      </section>
    </div>
  );
}
