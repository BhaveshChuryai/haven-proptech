"use client";

import { plots } from "@/data/projects";
import styles from "./Land.module.css";

export default function Land() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="land" className={styles.landSection}>
      <div className={styles.landGrid}>
        {/* SVG Plot Map */}
        <div className={styles.landMapWrap}>
          <svg className={styles.plotMap} viewBox="0 0 400 360" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="400" height="360" fill="url(#grid)" />
            {/* Roads */}
            <rect x="0" y="155" width="400" height="18" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
            <rect x="185" y="0" width="18" height="360" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
            <text x="90" y="148" fill="rgba(201,168,76,0.4)" fontSize="5" textAnchor="middle" fontFamily="Montserrat">MAIN ROAD</text>
            {/* Green space */}
            <rect x="90" y="80" width="85" height="65" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8" />
            <text x="132" y="107" fill="rgba(201,168,76,0.4)" fontSize="7" textAnchor="middle" fontFamily="Montserrat">OPEN</text>
            <text x="132" y="119" fill="rgba(201,168,76,0.25)" fontSize="5" textAnchor="middle" fontFamily="Montserrat">GREEN SPACE</text>
            {/* Amenity */}
            <rect x="215" y="185" width="130" height="55" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.15)" strokeWidth="0.8" />
            <text x="280" y="208" fill="rgba(201,168,76,0.35)" fontSize="7" textAnchor="middle" fontFamily="Montserrat">AMENITY BLOCK</text>
            <text x="280" y="222" fill="rgba(201,168,76,0.2)" fontSize="5" textAnchor="middle" fontFamily="Montserrat">CLUBHOUSE Â· PARKING</text>

            {/* Dynamic plots from data */}
            {plots.map((plot) => (
              <g key={plot.id}>
                <rect
                  x={plot.x}
                  y={plot.y}
                  width={plot.width}
                  height={plot.height}
                  fill={plot.status === "Booked" ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.07)"}
                  stroke={plot.status === "Booked" ? "#C9A84C" : "rgba(201,168,76,0.3)"}
                  strokeWidth={plot.status === "Booked" ? 1 : 0.8}
                />
                <text
                  x={plot.x + plot.width / 2}
                  y={plot.y + plot.height / 2 - 8}
                  fill={plot.status === "Booked" ? "#C9A84C" : "rgba(201,168,76,0.7)"}
                  fontSize="7"
                  textAnchor="middle"
                  fontFamily="Montserrat"
                  fontWeight="600"
                >
                  {plot.id}
                </text>
                <text
                  x={plot.x + plot.width / 2}
                  y={plot.y + plot.height / 2 + 4}
                  fill="rgba(201,168,76,0.4)"
                  fontSize="5"
                  textAnchor="middle"
                  fontFamily="Montserrat"
                >
                  {plot.area}
                </text>
                {plot.status === "Booked" && (
                  <text
                    x={plot.x + plot.width / 2}
                    y={plot.y + plot.height / 2 + 14}
                    fill="#C9A84C"
                    fontSize="4.5"
                    textAnchor="middle"
                    fontFamily="Montserrat"
                  >
                    BOOKED
                  </text>
                )}
              </g>
            ))}

            {/* Legend */}
            <rect x="20" y="320" width="10" height="8" fill="rgba(201,168,76,0.07)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" />
            <text x="35" y="328" fill="rgba(201,168,76,0.5)" fontSize="5" fontFamily="Montserrat">Available</text>
            <rect x="100" y="320" width="10" height="8" fill="rgba(201,168,76,0.12)" stroke="#C9A84C" strokeWidth="1" />
            <text x="115" y="328" fill="rgba(201,168,76,0.5)" fontSize="5" fontFamily="Montserrat">Booked</text>
            <text x="200" y="328" fill="rgba(201,168,76,0.3)" fontSize="5" fontFamily="Montserrat">Â© Haven Group â€“ Plot Layout (Indicative)</text>
          </svg>
        </div>

        {/* Content */}
        <div className={styles.landContent}>
          <span className="section-eyebrow">Land Portfolio</span>
          <h2 className="section-title">Verified Plots &amp; <em>Land Parcels</em></h2>
          <div className="section-line" />
          <p className={`section-desc ${styles.descSpaced}`}>
            Strategically located land across high-growth corridors. Each parcel is documented, legally verified, and ready for immediate investment or development.
          </p>

          <div className={styles.landBadges}>
            <div className={styles.landBadge}>
              <div className={styles.badgeIcon}>ðŸ“‹</div>
              <div>
                <h5>7/12 Verified Land</h5>
                <p>All parcels come with complete 7/12 documentation, mutation entries, and clear title certificates.</p>
              </div>
            </div>
            <div className={styles.landBadge}>
              <div className={styles.badgeIcon}>ðŸ—ºï¸</div>
              <div>
                <h5>Structured Plot Layout</h5>
                <p>Planned layouts with internal roads, green zones, and defined boundaries for maximum utility.</p>
              </div>
            </div>
            <div className={styles.landBadge}>
              <div className={styles.badgeIcon}>âš¡</div>
              <div>
                <h5>Pre-Launch Opportunities</h5>
                <p>Get early access to upcoming parcels at pre-launch pricing. Limited plots, priority allocation.</p>
              </div>
            </div>
          </div>

          <button className={styles.btnEnquire} onClick={() => scrollTo("requirements")}>
            Enquire About Land â†’
          </button>
        </div>
      </div>
    </section>
  );
}

