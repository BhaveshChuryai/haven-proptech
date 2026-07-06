"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Composer.module.css';
import { REGIONS, PURPOSES, SIZE_UNITS } from './types.js';

const DEFAULT_FORM = {
  region: 'Lonavala',
  purpose: 'Investment',
  budget_min: '',
  budget_max: '',
  size_value: '',
  size_unit: 'Guntha',
  description: '',
};

export default function Composer({ isAuthenticated = false, onPostCreated }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className={styles.authGate} role="region" aria-label="Post requirement">
        <div className={styles.authGateIcon}>✦</div>
        <h3 className={styles.authGateTitle}>Post a Land Requirement</h3>
        <p className={styles.authGateDesc}>
          Sign in to post your land requirement and connect with verified owners across Maharashtra &amp; Goa.
        </p>
        <Link href="/login" className={styles.authGateBtn} id="composer-login-btn">
          Sign In to Post
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!form.budget_min || isNaN(form.budget_min)) e.budget_min = 'Required';
    if (!form.budget_max || isNaN(form.budget_max)) e.budget_max = 'Required';
    if (Number(form.budget_max) < Number(form.budget_min)) e.budget_max = 'Must be ≥ min budget';
    if (!form.size_value || isNaN(form.size_value) || Number(form.size_value) <= 0) e.size_value = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    if (form.description.length > 300) e.description = 'Max 300 characters';
    return e;
  };

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    // TODO: replace with Supabase insert when live
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    setForm(DEFAULT_FORM);
    setTouched(false);
    onPostCreated?.({ ...form, id: `temp-${Date.now()}`, upvote_count: 0, reply_count: 0, created_at: new Date().toISOString() });
    setTimeout(() => setSuccess(false), 5000);
  };

  const err = (k) => touched && errors[k];

  return (
    <div className={styles.composer} role="region" aria-label="Post a requirement">
      <div className={styles.composerHeader}>
        <h3 className={styles.composerTitle}>Post a Requirement</h3>
        <p className={styles.composerSub}>Share your land profile with the Haven network.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Region + Purpose */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="comp-region" className={styles.label}>Region <span className={styles.req}>*</span></label>
            <select id="comp-region" className={styles.select} value={form.region} onChange={(e) => set('region', e.target.value)}>
              {REGIONS.filter(r => r !== 'All').map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="comp-purpose" className={styles.label}>Purpose <span className={styles.req}>*</span></label>
            <select id="comp-purpose" className={styles.select} value={form.purpose} onChange={(e) => set('purpose', e.target.value)}>
              {PURPOSES.filter(p => p !== 'All').map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Budget range */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="comp-budget-min" className={styles.label}>Min Budget (₹) <span className={styles.req}>*</span></label>
            <input id="comp-budget-min" className={`${styles.input} ${err('budget_min') ? styles.inputErr : ''}`} type="number" placeholder="e.g. 5000000" value={form.budget_min} onChange={(e) => set('budget_min', e.target.value)} />
            {err('budget_min') && <span className={styles.errMsg}>{errors.budget_min}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="comp-budget-max" className={styles.label}>Max Budget (₹) <span className={styles.req}>*</span></label>
            <input id="comp-budget-max" className={`${styles.input} ${err('budget_max') ? styles.inputErr : ''}`} type="number" placeholder="e.g. 15000000" value={form.budget_max} onChange={(e) => set('budget_max', e.target.value)} />
            {err('budget_max') && <span className={styles.errMsg}>{errors.budget_max}</span>}
          </div>
        </div>

        {/* Size */}
        <div className={styles.row}>
          <div className={styles.field} style={{ flex: 2 }}>
            <label htmlFor="comp-size" className={styles.label}>Plot Size <span className={styles.req}>*</span></label>
            <input id="comp-size" className={`${styles.input} ${err('size_value') ? styles.inputErr : ''}`} type="number" placeholder="e.g. 20" value={form.size_value} onChange={(e) => set('size_value', e.target.value)} />
            {err('size_value') && <span className={styles.errMsg}>{errors.size_value}</span>}
          </div>
          <div className={styles.field} style={{ flex: 1 }}>
            <label htmlFor="comp-unit" className={styles.label}>Unit</label>
            <select id="comp-unit" className={styles.select} value={form.size_unit} onChange={(e) => set('size_unit', e.target.value)}>
              {SIZE_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label htmlFor="comp-desc" className={styles.label}>
            Description <span className={styles.req}>*</span>
            <span className={styles.charCount}>{form.description.length}/300</span>
          </label>
          <textarea
            id="comp-desc"
            className={`${styles.textarea} ${err('description') ? styles.inputErr : ''}`}
            placeholder="Describe your requirement clearly: location preference, title type, usage intent, timeline..."
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            maxLength={300}
            rows={4}
          />
          {err('description') && <span className={styles.errMsg}>{errors.description}</span>}
        </div>

        <button type="submit" id="composer-submit-btn" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Posting...' : 'Post Requirement'}
        </button>

        {success && (
          <div className={styles.successMsg}>
            ✓ Requirement posted to the Haven network.
          </div>
        )}
      </form>
    </div>
  );
}
