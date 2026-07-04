"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import TrustStrip from "@/components/TrustStrip/TrustStrip";
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

  return (
    <section id="home" className={styles.hero}>
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

      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <div className={styles.heroEyebrow}>Premium Land Matchmaking Platform</div>

        <h1 className={styles.heroTitle}>
          <span>Don&apos;t Search for Land.</span>
          <em>Let the Right Land Find You.</em>
        </h1>

        <div className={styles.heroCta}>
          <Link className={styles.btnPrimary} href="/requirements">
            Post a Requirement
          </Link>
          <Link className={styles.btnOutline} href="/vault">
            Enter the Vault
          </Link>
        </div>

        <TrustStrip />
      </div>

      <div className={styles.heroScroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
