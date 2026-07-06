import styles from './Sidebar.module.css';
import { MOCK_POSTS } from './mockData.js';

function getRegionCounts(posts) {
  const counts = {};
  posts.forEach((p) => {
    counts[p.region] = (counts[p.region] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export default function Sidebar() {
  const regionCounts = getRegionCounts(MOCK_POSTS);
  const totalUpvotes = MOCK_POSTS.reduce((acc, p) => acc + p.upvote_count, 0);
  const totalReplies = MOCK_POSTS.reduce((acc, p) => acc + p.reply_count, 0);

  return (
    <aside className={styles.sidebar} aria-label="Community stats sidebar">
      {/* Activity stats */}
      <div className={styles.widget}>
        <div className={styles.widgetTitle}>Network Activity</div>
        <div className={styles.statGrid}>
          <div className={styles.stat}>
            <div className={styles.statVal}>{MOCK_POSTS.length}</div>
            <div className={styles.statLabel}>Active Requirements</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statVal}>{totalUpvotes}</div>
            <div className={styles.statLabel}>Total Upvotes</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statVal}>{totalReplies}</div>
            <div className={styles.statLabel}>Owner Replies</div>
          </div>
        </div>
      </div>

      {/* Trending regions */}
      <div className={styles.widget}>
        <div className={styles.widgetTitle}>Trending Regions</div>
        <div className={styles.regionList}>
          {regionCounts.map(([region, count], idx) => (
            <div key={region} className={styles.regionRow}>
              <span className={styles.regionRank}>#{idx + 1}</span>
              <span className={styles.regionName}>{region}</span>
              <div className={styles.regionBar}>
                <div
                  className={styles.regionBarFill}
                  style={{ width: `${(count / MOCK_POSTS.length) * 100}%` }}
                />
              </div>
              <span className={styles.regionCount}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Haven info card */}
      <div className={styles.widget + ' ' + styles.infoWidget}>
        <div className={styles.widgetTitle}>About This Feed</div>
        <p className={styles.infoText}>
          All requirements are posted by real buyers and investors. Verified owners can reply directly. 
          Haven Group reviews flagged content within 24 hours.
        </p>
        <div className={styles.infoMeta}>
          <span>📍 Maharashtra &amp; Goa</span>
          <span>✦ Direct Matchmaking</span>
        </div>
      </div>
    </aside>
  );
}
