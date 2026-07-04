"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        
        {/* Brand */}
        <div className={styles.footerBrand}>
          <div className={styles.brandName}>HAVEN GROUP</div>
          <div className={styles.brandSub}>Premium Real Estate</div>
          <p className={styles.brandDesc}>
            Connecting vision with value across the most promising real estate corridors.
          </p>
        </div>
        
        {/* Links */}
        <div className={styles.footerCol}>
          <h4>Navigation</h4>
          <a onClick={() => scrollTo("home")}>Home</a>
          <a onClick={() => scrollTo("requirements")}>Submit Requirements</a>
          <a onClick={() => scrollTo("land")}>Land Portfolio</a>
          <a onClick={() => scrollTo("projects")}>Current Projects</a>
          <a onClick={() => scrollTo("about")}>About Us</a>
        </div>
        
        {/* Contact */}
        <div className={styles.footerCol}>
          <h4>Contact</h4>
          <p>Khopoli Office, Maharashtra</p>
          <p>Mumbai Corporate, Maharashtra</p>
          <p className={styles.highlight}>+91 98200 98200</p>
          <p className={styles.highlight}>invest@havengroup.in</p>
        </div>
        
        {/* Markets */}
        <div className={styles.footerCol}>
          <h4>Key Markets</h4>
          <p>Khopoli</p>
          <p>Karjat</p>
          <p>Pen</p>
          <p>Mumbai Suburbs</p>
        </div>
        
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          &copy; {currentYear} Haven Group. All Rights Reserved.
        </div>
        <div className={styles.techStack}>
          Built with <span className={styles.techAccent}>Next.js</span>
        </div>
      </div>
    </footer>
  );
}
