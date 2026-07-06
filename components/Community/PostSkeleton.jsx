import styles from './PostSkeleton.module.css';

export default function PostSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skHeader}>
        <div className={styles.skAvatar} />
        <div className={styles.skLines}>
          <div className={styles.skLine} style={{ width: '35%' }} />
          <div className={styles.skLine} style={{ width: '20%', height: '8px' }} />
        </div>
        <div className={styles.skLine} style={{ width: '50px', marginLeft: 'auto' }} />
      </div>
      <div className={styles.skTags}>
        {[60, 45, 55, 80].map((w, i) => (
          <div key={i} className={styles.skTag} style={{ width: `${w}px` }} />
        ))}
      </div>
      <div className={styles.skBody}>
        <div className={styles.skLine} style={{ width: '100%' }} />
        <div className={styles.skLine} style={{ width: '85%' }} />
        <div className={styles.skLine} style={{ width: '70%' }} />
      </div>
      <div className={styles.skFooter}>
        <div className={styles.skBtn} />
        <div className={styles.skBtn} />
      </div>
    </div>
  );
}
