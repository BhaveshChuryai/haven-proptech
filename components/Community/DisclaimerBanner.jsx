import styles from './DisclaimerBanner.module.css';

export default function DisclaimerBanner() {
  return (
    <div className={styles.banner} role="note" aria-label="Community disclaimer">
      <span className={styles.icon}>⚖️</span>
      <p className={styles.text}>
        This community is a platform for requirement discovery only. Haven Group does not verify individual user claims.
        All transactions must be independently verified. Do not share personal financial details publicly.
      </p>
    </div>
  );
}
