import styles from "./TrustStrip.module.css";

const items = [
  "Direct Owner Network",
  "Verified Opportunities",
  "Precise Requirement Discovery",
  "No Brokerage Chains",
];

export default function TrustStrip() {
  return (
    <div className={styles.trustStrip} aria-label="Platform trust signals">
      {items.map((item) => (
        <div className={styles.trustItem} key={item}>
          <span className={styles.check} aria-hidden="true">{"\u2713"}</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
