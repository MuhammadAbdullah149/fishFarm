import { useState } from 'react';
import { formatNumber, getFeedStats } from '../utils/formulas';

const initialForm = {
  poolName: '',
  species: '',
  fishCount: '',
  averageWeight: '',
  dateStocked: '',
  notes: '',
};

export default function PoolsPage({ pools, addPool, updatePool, deletePool }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPool = {
      id: crypto.randomUUID(),
      ...form,
      fishCount: Number(form.fishCount || 0),
      averageWeight: Number(form.averageWeight || 0),
    };
    addPool(newPool);
    setForm(initialForm);
  };

  return (
    <div className="page">
      <section className="card">
        <div className="section-head">
          <h2>Create Pool</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-group">
              <label>Pool Name</label>
              <input name="poolName" value={form.poolName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Fish Species</label>
              <input name="species" value={form.species} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <label>Number of Fish</label>
              <input type="number" name="fishCount" value={form.fishCount} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Average Weight (g)</label>
              <input type="number" name="averageWeight" value={form.averageWeight} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <label>Date Stocked</label>
              <input type="date" name="dateStocked" value={form.dateStocked} onChange={handleChange} />
            </div>
          </div>
          <div className="input-group">
            <label>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} />
          </div>
          <button className="btn btn-primary" type="submit">Save Pool</button>
        </form>
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Your Pools</h2>
        </div>
        {pools.length === 0 ? (
          <div className="empty">No pools yet. Add your first pond to begin.</div>
        ) : (
          <div className="list">
            {pools.map((pool) => {
              const feed = getFeedStats({ fishCount: pool.fishCount, averageWeight: pool.averageWeight });
              return (
                <div key={pool.id} className="list-item">
                  <div className="section-head">
                    <h3>{pool.poolName}</h3>
                    <button className="btn btn-danger" onClick={() => deletePool(pool.id)}>Delete</button>
                  </div>
                  <div className="small">Species: {pool.species} • Stocked: {pool.dateStocked || '—'}</div>
                  <div className="table-like">
                    <div className="table-row"><span>Fish Count</span><strong>{pool.fishCount}</strong></div>
                    <div className="table-row"><span>Average Weight</span><strong>{pool.averageWeight} g</strong></div>
                    <div className="table-row"><span>Biomass</span><strong>{formatNumber(feed.biomass)} kg</strong></div>
                    <div className="table-row"><span>Feed %</span><strong>{formatNumber(feed.feedPercentage)}%</strong></div>
                    <div className="table-row"><span>Daily Feed</span><strong>{formatNumber(feed.dailyFeed)} kg</strong></div>
                  </div>
                  {pool.notes && <div className="small" style={{ marginTop: '0.5rem' }}>{pool.notes}</div>}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
