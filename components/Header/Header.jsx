"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <Link href="/" className={styles.logo} aria-label="Haven Group home">
        <span className={styles.logoMain}>Haven Group</span>
        <span className={styles.logoSub}>Premium Land Matchmaking Platform</span>
      </Link>

      <nav className={styles.nav} aria-label="Primary navigation">
        <Link href="/">Home</Link>
        <Link href="/community">Community</Link>
        <Link href="/vault">The Vault</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <Link className={styles.btnPrimary} href="/login">
        Client Login
      </Link>
    </header>
  );
}
