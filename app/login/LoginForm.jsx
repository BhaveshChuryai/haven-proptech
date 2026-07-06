"use client";

import { useState } from "react";
import styles from "./login.module.css";

export default function LoginForm() {
  const [step, setStep] = useState("email"); // "email" | "otp" | "success"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    // TODO: replace with supabase.auth.signInWithOtp({ email })
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep("otp");
  };

  const handleOtpChange = (idx, val) => {
    const next = [...otp];
    next[idx] = val.replace(/\D/, "").slice(0, 1);
    setOtp(next);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Enter the full 6-digit code."); return; }
    setError("");
    setLoading(true);
    // TODO: replace with supabase.auth.verifyOtp({ email, token: code, type: 'email' })
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep("success");
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginCard}>
        {/* Logo mark */}
        <div className={styles.logoMark}>
          <span className={styles.logoRing} />
          <span className={styles.logoText}>HG</span>
        </div>

        {step === "email" && (
          <>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Client Portal</span>
            <h1 className={styles.loginTitle}>Private <em>Access</em></h1>
            <p className={styles.loginDesc}>
              Enter your email to receive a one-time sign-in code. No passwords.
            </p>

            <form className={styles.form} onSubmit={handleEmailSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="login-email" className={styles.label}>
                  Email Address <span className={styles.req}>*</span>
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  className={`${styles.input} ${error ? styles.inputErr : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                {error && <span className={styles.errMsg}>{error}</span>}
              </div>

              <button id="login-send-otp" type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Sending code..." : "Send Sign-In Code"}
              </button>
            </form>

            <p className={styles.footerNote}>
              Access is currently by invitation only. Contact{" "}
              <a href="mailto:invest@havengroup.in" className={styles.emailLink}>invest@havengroup.in</a> for access.
            </p>
          </>
        )}

        {step === "otp" && (
          <>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Verify Identity</span>
            <h1 className={styles.loginTitle}>Enter <em>Your Code</em></h1>
            <p className={styles.loginDesc}>
              We sent a 6-digit code to <strong className={styles.emailHighlight}>{email}</strong>. Check your inbox.
            </p>

            <form className={styles.form} onSubmit={handleOtpSubmit} noValidate>
              <div className={styles.otpRow}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    className={styles.otpInput}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    aria-label={`OTP digit ${idx + 1}`}
                  />
                ))}
              </div>
              {error && <span className={styles.errMsg}>{error}</span>}

              <button id="login-verify-otp" type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>

              <button
                type="button"
                className={styles.backBtn}
                onClick={() => { setStep("email"); setOtp(["","","","","",""]); setError(""); }}
                id="login-back"
              >
                ← Use a different email
              </button>
            </form>
          </>
        )}

        {step === "success" && (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✦</div>
            <h1 className={styles.loginTitle}>Welcome to <em>Haven</em></h1>
            <p className={styles.loginDesc}>
              You&apos;re signed in. Redirecting to your dashboard...
            </p>
            <div className={styles.successBar}>
              <div className={styles.successBarFill} />
            </div>
          </div>
        )}
      </div>

      {/* Decorative side panel */}
      <div className={styles.decorPanel} aria-hidden="true">
        <div className={styles.decorEmblem}>
          <span className={styles.decorRing} />
          <span className={styles.decorRing2} />
        </div>
        <div className={styles.decorQuote}>
          &ldquo;Connecting Serious Buyers With Verified Land Owners&rdquo;
        </div>
        <div className={styles.decorStats}>
          <div className={styles.decorStat}>
            <span className={styles.decorStatNum}>50+</span>
            <span className={styles.decorStatLbl}>Clients Served</span>
          </div>
          <div className={styles.decorStat}>
            <span className={styles.decorStatNum}>2</span>
            <span className={styles.decorStatLbl}>Key Markets</span>
          </div>
        </div>
      </div>
    </section>
  );
}
