import { formatNumber, getFeedStats } from '../utils/formulas';

export default function DashboardPage({ stats, pools }) {
  return (
    <div className="page">
      <section className="card hero">
        <div>
          <h1>Daily pond feed overview</h1>
          <p>Monitor your pools, feed demand, and growth from one place.</p>
        </div>
        <div className="tag">Offline Ready</div>
      </section>

      <section className="grid grid-3">
        <div className="card stat-card">
          <span className="stat-label">Total Pools</span>
          <span className="stat-value">{stats.totalPools}</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Total Fish</span>
          <span className="stat-value">{stats.totalFish}</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Total Biomass</span>
          <span className="stat-value">{formatNumber(stats.totalBiomass)} kg</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Today's Feed</span>
          <span className="stat-value">{formatNumber(stats.todayFeed)} kg</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Morning Feed</span>
          <span className="stat-value">{formatNumber(stats.morningFeed)} kg</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Evening Feed</span>
          <span className="stat-value">{formatNumber(stats.eveningFeed)} kg</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Average Weight</span>
          <span className="stat-value">{formatNumber(stats.averageWeight)} g</span>
        </div>
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Pool summary</h2>
        </div>
        {pools.length === 0 ? (
          <div className="empty">No pools added yet. Create one from the Pools page.</div>
        ) : (
          <div className="list">
            {pools.map((pool) => {
              const statsForPool = getFeedStats({ fishCount: pool.fishCount, averageWeight: pool.averageWeight });
              return (
                <div key={pool.id} className="list-item">
                  <div className="section-head">
                    <h3>{pool.poolName}</h3>
                    <span className="tag">{pool.species}</span>
                  </div>
                  <div className="small">Fish Count: {pool.fishCount} • Avg Weight: {pool.averageWeight} g</div>
                  <div className="table-like">
                    <div className="table-row"><span>Biomass</span><strong>{formatNumber(statsForPool.biomass)} kg</strong></div>
                    <div className="table-row"><span>Feed %</span><strong>{formatNumber(statsForPool.feedPercentage)}%</strong></div>
                    <div className="table-row"><span>Daily Feed</span><strong>{formatNumber(statsForPool.dailyFeed)} kg</strong></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
