import styles from './EmptyState.module.css';
import Link from 'next/link';

export default function EmptyState() {
  return (
    <div className={styles.empty} role="status" aria-label="No posts found">
      <div className={styles.terminal}>
        <div className={styles.terminalBar}>
          <span className={styles.dot} style={{ background: '#e74c3c' }} />
          <span className={styles.dot} style={{ background: '#f39c12' }} />
          <span className={styles.dot} style={{ background: '#2ecc71' }} />
          <span className={styles.termTitle}>haven_feed.sh</span>
        </div>
        <div className={styles.termBody}>
          <p className={styles.termLine}><span className={styles.prompt}>$</span> query community_posts...</p>
          <p className={styles.termLine + ' ' + styles.termResult}>→ 0 requirements found matching filters.</p>
          <p className={styles.termLine}><span className={styles.prompt}>$</span> suggest action...</p>
          <p className={styles.termLine + ' ' + styles.termGold}>→ Post the first requirement in this category.</p>
          <p className={styles.termCursor}>_</p>
        </div>
      </div>
      <p className={styles.caption}>No posts yet in this category. Be the first to post a requirement.</p>
      <Link href="/login" className={styles.ctaBtn} id="empty-state-cta">
        Post a Requirement
      </Link>
    </div>
  );
}
