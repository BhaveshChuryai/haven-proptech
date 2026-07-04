"use client";

import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", date: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isInvalid = (field) => {
    if (!submitted) return false;
    const val = form[field];
    if (!val || val.trim() === "") return true;
    if (field === "phone" && !/^\d{10}$/.test(val)) return true;
    return false;
  };

  const getError = (field) => {
    if (!submitted) return "";
    const val = form[field];
    if (!val || val.trim() === "") return "Required";
    if (field === "phone" && !/^\d{10}$/.test(val)) return "Invalid number";
    return "";
  };

  const isFormInvalid = () => {
    return (
      !form.name.trim() ||
      !form.phone.trim() ||
      !/^\d{10}$/.test(form.phone) ||
      !form.date.trim()
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isFormInvalid()) return;
    setLoading(true);

    const leadData = {
      type: "Site Visit",
      name: form.name,
      phone: form.phone,
      date: form.date,
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    setSuccess(true);
    setSubmitted(false);
    setForm({ name: "", phone: "", date: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactGrid}>
        {/* Info */}
        <div className={styles.contactInfo}>
          <span className="section-eyebrow">Contact Us</span>
          <h2 className="section-title">
            Connect With <em>Our Team</em>
          </h2>
          <div className="section-line"></div>
          <p className="section-desc" style={{ marginBottom: "2.5rem" }}>
            Whether you&apos;re looking for an investment parcel or a premium commercial space, our advisors are ready to assist you.
          </p>

          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📞</div>
              <div className={styles.infoData}>
                <span className={styles.infoLbl}>Direct Line</span>
                <span className={styles.infoVal}>+91 98200 98200</span>
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>✉️</div>
              <div className={styles.infoData}>
                <span className={styles.infoLbl}>Email</span>
                <span className={styles.infoVal}>invest@havengroup.in</span>
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <div className={styles.infoData}>
                <span className={styles.infoLbl}>Key Markets</span>
                <span className={styles.infoVal}>Khopoli · Mumbai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Box */}
        <div className={styles.contactBox}>
          <div className={styles.boxHeader}>
            <h3>Schedule a Site Visit</h3>
            <p>Experience the property firsthand. Book a guided tour with our experts.</p>
          </div>
          
          <form className={styles.contactForm} onSubmit={onSubmit} noValidate>
            <div className={styles.formGroup}>
              <label>Full Name <span className={styles.req}>*</span></label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={isInvalid("name") ? styles.invalid : ""}
              />
              {isInvalid("name") && <span className={styles.errorMsg}>{getError("name")}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Phone Number <span className={styles.req}>*</span></label>
              <input
                type="tel"
                placeholder="10-digit number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={isInvalid("phone") ? styles.invalid : ""}
              />
              {isInvalid("phone") && <span className={styles.errorMsg}>{getError("phone")}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Preferred Date <span className={styles.req}>*</span></label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={isInvalid("date") ? styles.invalid : ""}
              />
              {isInvalid("date") && <span className={styles.errorMsg}>{getError("date")}</span>}
            </div>
            
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={loading || (submitted && isFormInvalid())}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
            
            {success && (
              <div className={styles.successMsg}>
                Site visit requested successfully. Our team will call you to confirm the timing.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
