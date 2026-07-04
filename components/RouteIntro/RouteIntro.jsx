import styles from "./RouteIntro.module.css";

export default function RouteIntro({ eyebrow, title, highlight, description }) {
  return (
    <section className={styles.routeIntro}>
      <div className={styles.inner}>
        <span className="section-eyebrow">{eyebrow}</span>
        <h1 className="section-title">{title} <em>{highlight}</em></h1>
        <div className="section-line" />
        <p className="section-desc">{description}</p>
      </div>
    </section>
  );
}
