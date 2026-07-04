"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <div className={styles.brandName}>HAVEN GROUP</div>
          <div className={styles.brandSub}>Premium Land Matchmaking Platform</div>
          <p className={styles.brandDesc}>
            Connecting buyers directly with verified land owners across premium growth corridors.
          </p>
        </div>

        <div className={styles.footerCol}>
          <h4>Navigation</h4>
          <Link href="/">Home</Link>
          <Link href="/community">Community</Link>
          <Link href="/vault">The Vault</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={styles.footerCol}>
          <h4>Contact</h4>
          <p>Khopoli Office, Maharashtra</p>
          <p>Mumbai Corporate, Maharashtra</p>
          <p className={styles.highlight}>+91 98200 98200</p>
          <p className={styles.highlight}>invest@havengroup.in</p>
        </div>

        <div className={styles.footerCol}>
          <h4>Key Markets</h4>
          <p>Lonavala</p>
          <p>Karjat</p>
          <p>Igatpuri</p>
          <p>Goa</p>
        </div>
      </div>

      <p className={styles.disclaimer}>
        Haven Group is a technology platform that enables users to publish requirements and discover land opportunities. Haven Group does not act as a real estate broker, agent, or representative in property transactions.
      </p>

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
