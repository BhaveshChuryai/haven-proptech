import styles from "./HowHavenWorks.module.css";

const steps = [
  {
    title: "Submit Your Requirement",
    description: "Tell us exactly what land you are looking for.",
  },
  {
    title: "Your Requirement Reaches Verified Owners",
    description: "Your requirement is made visible to relevant verified owners within the Haven network.",
  },
  {
    title: "Connect Directly & Explore Opportunities",
    description: "Connect directly with owners and evaluate opportunities independently.",
  },
];

export default function HowHavenWorks() {
  return (
    <section className={styles.workSection} aria-labelledby="how-haven-works">
      <div className={styles.sectionHead}>
        <span className="section-eyebrow">Process</span>
        <h2 id="how-haven-works" className="section-title">How Haven <em>Works</em></h2>
        <div className="section-line" />
      </div>

      <div className={styles.cards}>
        {steps.map((step, index) => (
          <article className={styles.card} key={step.title}>
            <div className={styles.step}>0{index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
