"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <span className={styles.logoMain}>Haven Group</span>
        <span className={styles.logoSub}>Premium Real Estate</span>
      </div>

      <nav className={styles.nav}>
        <a onClick={() => scrollTo("home")}>Home</a>
        <a onClick={() => scrollTo("land")}>Land</a>
        <a onClick={() => scrollTo("projects")}>Projects</a>
        <a onClick={() => scrollTo("about")}>About</a>
        <a onClick={() => scrollTo("contact")}>Contact</a>
      </nav>

      <button className={styles.btnPrimary} onClick={() => scrollTo("contact")}>
        Book Site Visit
      </button>
    </header>
  );
}
