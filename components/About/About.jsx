import styles from "./About.module.css";

const founders = [
  {
    initial: "A",
    name: "Anisha Churyai",
    title: "Co-Founder & Director",
    bio: "A professional model and entrepreneur bringing creativity, branding expertise, and strong leadership to HAVEN GROUP. With hands-on experience in sales, CRM operations, and project execution, she has built strong client relationships and driven successful project outcomes.",
    skills: ["Sales Management", "CRM Operations", "Project Execution", "Team Leadership"],
  },
  {
    initial: "M",
    name: "Madhu Churyai",
    title: "Co-Founder",
    bio: "A key pillar of the organization, bringing years of real estate knowledge and deep market understanding across the Khopoliâ€“Mumbai corridor. Instrumental in building strong developer and landowner relationships.",
    skills: ["Market Intelligence", "Land Acquisition", "Developer Relations"],
  },
  {
    initial: "B",
    name: "Bhavesh Churyai",
    title: "Chief Executive Officer",
    bio: "Driving HAVEN GROUP's vision to build a modern, technology-driven real estate platform. Focused on combining digital experience with real-world execution â€” ensuring transparency, efficiency, and client satisfaction across every project.",
    skills: ["Strategy", "Project Onboarding", "Broker Relations", "Marketing"],
  },
];

const stats = [
  { num: "2â€“4", label: "Years Experience" },
  { num: "50+", label: "Clients Served" },
  { num: "2", label: "Key Markets" },
];

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutLayout}>
        {/* Visual Left */}
        <div className={styles.aboutVisual}>
          <div className={styles.aboutEmblem}>
            <span className={`${styles.emblemRing} ${styles.ring1}`}></span>
            <span className={`${styles.emblemRing} ${styles.ring2}`}></span>
            <span className={styles.emblemText}>HG</span>
          </div>
          <div className={styles.aboutStats}>
            {stats.map((s, idx) => (
              <div key={idx} className={styles.aboutStat}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLbl}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className={styles.aboutTagline}>
            &quot;Connecting Serious Buyers With Verified Land Owners&quot;
          </div>
        </div>

        {/* Content Right */}
        <div className={styles.aboutContent}>
          <span className="section-eyebrow">About Haven Group</span>
          <h2 className="section-title">
            Built on Trust, <em>Driven by Vision</em>
          </h2>
          <div className="section-line"></div>
          <p className="section-desc">
            HAVEN GROUP is a premium PropTech land matchmaking platform connecting serious buyers directly with verified land owners across Maharashtra and Goa.
          </p>
          <p className={`section-desc ${styles.descSpaced}`}>
            The platform is built around precise requirement discovery, verified owner networks, and direct land opportunity evaluation without long brokerage chains.
          </p>

          {/* Founders */}
          <div className={styles.foundersList}>
            {founders.map((f, idx) => (
              <div key={idx} className={styles.founderCard}>
                <div className={styles.founderTop}>
                  <div className={styles.founderAvatar}>{f.initial}</div>
                  <div>
                    <div className={styles.founderName}>{f.name}</div>
                    <div className={styles.founderTitle}>{f.title}</div>
                  </div>
                </div>
                <p className={styles.founderBio}>{f.bio}</p>
                <div className={styles.skillsList}>
                  {f.skills.map((s, sIdx) => (
                    <span key={sIdx} className={styles.skillTag}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className={styles.missionBox}>
            <div className={styles.missionLabel}>Our Mission</div>
            <div className={styles.missionText}>
              &quot;To make premium land discovery more direct, transparent, and requirement-led.&quot;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



