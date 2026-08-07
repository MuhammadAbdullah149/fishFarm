import { formatNumber, getFeedStats } from '../utils/formulas';

export default function ReportsPage({ pools }) {
  return (
    <div className="page">
      <section className="card">
        <div className="section-head">
          <h2>Pool reports</h2>
        </div>
        {pools.length === 0 ? (
          <div className="empty">No pool data to report yet.</div>
        ) : (
          <div className="list">
            {pools.map((pool) => {
              const feed = getFeedStats({ fishCount: pool.fishCount, averageWeight: pool.averageWeight });
              return (
                <div key={pool.id} className="list-item">
                  <div className="section-head">
                    <h3>{pool.poolName}</h3>
                    <span className="tag">{pool.species}</span>
                  </div>
                  <div className="table-like">
                    <div className="table-row"><span>Fish Count</span><strong>{pool.fishCount}</strong></div>
                    <div className="table-row"><span>Average Weight</span><strong>{pool.averageWeight} g</strong></div>
                    <div className="table-row"><span>Biomass</span><strong>{formatNumber(feed.biomass)} kg</strong></div>
                    <div className="table-row"><span>Feed %</span><strong>{formatNumber(feed.feedPercentage)}%</strong></div>
                    <div className="table-row"><span>Morning Feed</span><strong>{formatNumber(feed.morningFeed)} kg</strong></div>
                    <div className="table-row"><span>Evening Feed</span><strong>{formatNumber(feed.eveningFeed)} kg</strong></div>
                    <div className="table-row"><span>Daily Feed</span><strong>{formatNumber(feed.dailyFeed)} kg</strong></div>
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
