"use client";

import styles from './FilterBar.module.css';
import { REGIONS, PURPOSES } from './types.js';

export default function FilterBar({ sort, region, purpose, onSort, onRegion, onPurpose }) {
  return (
    <div className={styles.filterBar} role="toolbar" aria-label="Feed filters">
      {/* Sort toggle */}
      <div className={styles.sortGroup}>
        {['Latest', 'Most Active'].map((s) => (
          <button
            key={s}
            id={`sort-${s.toLowerCase().replace(' ', '-')}`}
            className={`${styles.sortBtn} ${sort === s ? styles.sortActive : ''}`}
            onClick={() => onSort(s)}
            aria-pressed={sort === s}
          >
            {s === 'Latest' ? '⏱ ' : '🔥 '}{s}
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Region chips */}
      <div className={styles.chipGroup} role="group" aria-label="Region filter">
        {REGIONS.map((r) => (
          <button
            key={r}
            id={`region-${r.toLowerCase()}`}
            className={`${styles.chip} ${region === r ? styles.chipActive : ''}`}
            onClick={() => onRegion(r)}
            aria-pressed={region === r}
          >
            {r}
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Purpose select */}
      <div className={styles.purposeGroup} role="group" aria-label="Purpose filter">
        {PURPOSES.map((p) => (
          <button
            key={p}
            id={`purpose-${p.toLowerCase().replace(' ', '-')}`}
            className={`${styles.purposeBtn} ${purpose === p ? styles.purposeActive : ''}`}
            onClick={() => onPurpose(p)}
            aria-pressed={purpose === p}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
