"use client";

import { useRef, useEffect } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().catch(() => {
      setTimeout(() => vid.play(), 500);
    });
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={styles.hero}>
      {/* VIDEO BACKGROUND */}
      <div className={styles.heroVideoWrap}>
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted
          className={styles.heroVideo}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* DARK OVERLAY */}
      <div className={styles.heroOverlay} />

      {/* CONTENT */}
      <div className={styles.heroContent}>
        <div className={styles.heroEyebrow}>Premium Real Estate</div>

        <h1 className={styles.heroTitle}>
          Where Vision<br />Meets <em>Value.</em>
        </h1>

        <p className={styles.heroSubtitle}>
          Premium land &amp; property investment across Khopoli &amp; Mumbai
        </p>

        <div className={styles.heroCta}>
          <button className={styles.btnPrimary} onClick={() => scrollTo("projects")}>
            Explore Projects
          </button>
          <button className={styles.btnOutline} onClick={() => scrollTo("requirements")}>
            Submit Requirements
          </button>
        </div>
      </div>

      {/* SCROLL */}
      <div className={styles.heroScroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
