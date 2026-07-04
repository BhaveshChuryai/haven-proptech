import { projects } from "@/data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  const getStatusClass = (status) => {
    const map = {
      "Coming Soon": styles.statusSoon,
      "Under Negotiation": styles.statusNegotiation,
      "Pre-Launch": styles.statusPreLaunch,
      "Available": styles.statusAvailable,
    };
    return map[status] || styles.statusSoon;
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <span className="section-eyebrow">Our Portfolio</span>
      <h2 className="section-title">Current <em>Projects</em></h2>
      <div className="section-line" style={{ marginBottom: '3rem' }} />

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.projectThumb}>
              <span className={styles.projectIcon}>{project.icon}</span>
              <span className={`${styles.projectStatus} ${getStatusClass(project.status)}`}>
                {project.status}
              </span>
            </div>
            <div className={styles.projectBody}>
              <div className={styles.projectType}>{project.type}</div>
              <div className={styles.projectName}>{project.name}</div>
              <div className={styles.projectLocation}>{project.location}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
