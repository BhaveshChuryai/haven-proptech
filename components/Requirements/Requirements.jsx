"use client";

import { useState } from "react";
import styles from "./Requirements.module.css";

const TABS = ["Land", "Commercial", "Residential"];
const TAB_ICONS = { Land: "ðŸžï¸", Commercial: "ðŸ¢", Residential: "ðŸ " };

const INITIAL_LAND = { name: "", phone: "", acresRequired: "", budget: "", location: "", purpose: "", message: "" };
const INITIAL_COMMERCIAL = { name: "", phone: "", propertyType: "", budget: "", location: "", businessType: "", message: "" };
const INITIAL_RESIDENTIAL = { name: "", phone: "", configuration: "", budget: "", location: "", purpose: "", message: "" };

function validate(field, value) {
  if (field === "message") return "";
  if (!value || value.trim() === "") return "This field is required";
  if (field === "name" && value.length < 2) return "Too short";
  if (field === "phone" && !/^\d{10}$/.test(value)) return "Enter a valid 10-digit number";
  return "";
}

export default function Requirements() {
  const [activeTab, setActiveTab] = useState("Land");
  const [landForm, setLandForm] = useState(INITIAL_LAND);
  const [commercialForm, setCommercialForm] = useState(INITIAL_COMMERCIAL);
  const [residentialForm, setResidentialForm] = useState(INITIAL_RESIDENTIAL);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [leads, setLeads] = useState([]);
  const [touched, setTouched] = useState({});

  const getForm = () => {
    if (activeTab === "Land") return landForm;
    if (activeTab === "Commercial") return commercialForm;
    return residentialForm;
  };

  const setForm = (updater) => {
    if (activeTab === "Land") setLandForm(updater);
    else if (activeTab === "Commercial") setCommercialForm(updater);
    else setResidentialForm(updater);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSubmitted(false);
    setShowSuccess(false);
    setTouched({});
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isInvalid = (field) => {
    const form = getForm();
    const err = validate(field, form[field]);
    return err && (touched[field] || submitted);
  };

  const getError = (field) => {
    const form = getForm();
    return validate(field, form[field]);
  };

  const getRequiredFields = () => {
    if (activeTab === "Land") return ["name", "phone", "acresRequired", "budget", "location", "purpose"];
    if (activeTab === "Commercial") return ["name", "phone", "propertyType", "budget", "location", "businessType"];
    return ["name", "phone", "configuration", "budget", "location", "purpose"];
  };

  const isFormInvalid = () => {
    const form = getForm();
    return getRequiredFields().some((f) => validate(f, form[f]));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (isFormInvalid()) return;

    const form = getForm();
    const leadData = {
      type: activeTab,
      name: form.name,
      phone: form.phone,
      budget: form.budget,
      location: form.location,
      message: form.message || "",
      ...(activeTab === "Land" && { acresRequired: form.acresRequired, purpose: form.purpose }),
      ...(activeTab === "Commercial" && { propertyType: form.propertyType, businessType: form.businessType }),
      ...(activeTab === "Residential" && { configuration: form.configuration, purpose: form.purpose }),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      const newLead = await res.json();
      setLeads((prev) => [newLead, ...prev]);
    } catch {
      const newLead = {
        ...leadData,
        id: "HG-" + Date.now().toString(36).toUpperCase(),
        submittedAt: new Date().toLocaleString("en-IN"),
      };
      setLeads((prev) => [newLead, ...prev]);
    }

    setShowSuccess(true);
    setSubmitted(false);
    setTouched({});
    if (activeTab === "Land") setLandForm(INITIAL_LAND);
    else if (activeTab === "Commercial") setCommercialForm(INITIAL_COMMERCIAL);
    else setResidentialForm(INITIAL_RESIDENTIAL);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const form = getForm();

  return (
    <section id="requirements" className={styles.requirementsSection}>
      <div className={styles.bgText}>HAVEN</div>

      <div className={styles.reqIntro}>
        <span className="section-eyebrow">Post a Requirement</span>
        <h2 className="section-title">Tell Us What Land <em>You Need</em></h2>
        <div className="section-line" />
        <p className="section-desc">
          Skip the endless search. Publish your requirement and let relevant verified owners in the Haven network discover what you need.
        </p>
      </div>

      {/* TABS */}
      <div className={styles.reqTabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.reqTab} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => switchTab(tab)}
          >
            <span className={styles.tabIcon}>{TAB_ICONS[tab]}</span>
            {tab}
          </button>
        ))}
      </div>

      {/* LAND FORM */}
      {activeTab === "Land" && (
        <div className={styles.formPanel}>
          <div className={styles.dynamicForm}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Land Requirement</h3>
              <p className={styles.formDesc}>Owner-led opportunities - Verified discovery - Investment and farmhouse use</p>
            </div>
            <form onSubmit={onSubmit} noValidate>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="Your full name" value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={isInvalid("name") ? styles.invalid : ""} />
                  {isInvalid("name") && <span className={styles.errorMsg}>{getError("name")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number <span className={styles.req}>*</span></label>
                  <input type="tel" placeholder="10-digit number" value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={isInvalid("phone") ? styles.invalid : ""} />
                  {isInvalid("phone") && <span className={styles.errorMsg}>{getError("phone")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Acres Required <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="e.g. 2 Acres, 5 Guntha" value={form.acresRequired}
                    onChange={(e) => handleChange("acresRequired", e.target.value)}
                    onBlur={() => handleBlur("acresRequired")}
                    className={isInvalid("acresRequired") ? styles.invalid : ""} />
                  {isInvalid("acresRequired") && <span className={styles.errorMsg}>{getError("acresRequired")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Budget <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="e.g. â‚¹50L â€“ â‚¹1Cr" value={form.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    onBlur={() => handleBlur("budget")}
                    className={isInvalid("budget") ? styles.invalid : ""} />
                  {isInvalid("budget") && <span className={styles.errorMsg}>{getError("budget")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Preferred Location <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="e.g. Khopoli, Pen, Karjat" value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    onBlur={() => handleBlur("location")}
                    className={isInvalid("location") ? styles.invalid : ""} />
                  {isInvalid("location") && <span className={styles.errorMsg}>{getError("location")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Purpose <span className={styles.req}>*</span></label>
                  <select value={form.purpose}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    onBlur={() => handleBlur("purpose")}
                    className={isInvalid("purpose") ? styles.invalid : ""}>
                    <option value="">Select purpose</option>
                    <option>Investment</option>
                    <option>Farmhouse</option>
                    <option>Both</option>
                  </select>
                  {isInvalid("purpose") && <span className={styles.errorMsg}>{getError("purpose")}</span>}
                </div>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Message</label>
                  <textarea placeholder="Any specific requirements..." value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)} />
                </div>
              </div>
              <div className={styles.formSubmit}>
                <button type="submit" className={styles.btnSubmit} disabled={isFormInvalid() && submitted}>
                  Post Requirement
                </button>
                <span className={styles.formNote}>We&apos;ll contact you within 24 hours</span>
              </div>
            </form>
            {showSuccess && activeTab === "Land" && (
              <div className={styles.formSuccess}>
                <h4>Requirement Received</h4>
                <p>Our team will reach out within 24 hours with the best land opportunities matching your requirement.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMMERCIAL FORM */}
      {activeTab === "Commercial" && (
        <div className={styles.formPanel}>
          <div className={styles.dynamicForm}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Commercial Enquiry</h3>
              <p className={styles.formDesc}>Prime commercial spaces Â· Shops &amp; Offices Â· Strategic locations</p>
            </div>
            <form onSubmit={onSubmit} noValidate>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="Your full name" value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={isInvalid("name") ? styles.invalid : ""} />
                  {isInvalid("name") && <span className={styles.errorMsg}>{getError("name")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number <span className={styles.req}>*</span></label>
                  <input type="tel" placeholder="10-digit number" value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={isInvalid("phone") ? styles.invalid : ""} />
                  {isInvalid("phone") && <span className={styles.errorMsg}>{getError("phone")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Property Type <span className={styles.req}>*</span></label>
                  <select value={form.propertyType}
                    onChange={(e) => handleChange("propertyType", e.target.value)}
                    onBlur={() => handleBlur("propertyType")}
                    className={isInvalid("propertyType") ? styles.invalid : ""}>
                    <option value="">Select type</option>
                    <option>Shop</option>
                    <option>Office Space</option>
                    <option>Showroom</option>
                    <option>Warehouse</option>
                  </select>
                  {isInvalid("propertyType") && <span className={styles.errorMsg}>{getError("propertyType")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Budget <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="e.g. â‚¹30L â€“ â‚¹80L" value={form.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    onBlur={() => handleBlur("budget")}
                    className={isInvalid("budget") ? styles.invalid : ""} />
                  {isInvalid("budget") && <span className={styles.errorMsg}>{getError("budget")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Preferred Location <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="e.g. Mumbai, Khopoli" value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    onBlur={() => handleBlur("location")}
                    className={isInvalid("location") ? styles.invalid : ""} />
                  {isInvalid("location") && <span className={styles.errorMsg}>{getError("location")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Business Type <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="e.g. Retail, IT, Healthcare" value={form.businessType}
                    onChange={(e) => handleChange("businessType", e.target.value)}
                    onBlur={() => handleBlur("businessType")}
                    className={isInvalid("businessType") ? styles.invalid : ""} />
                  {isInvalid("businessType") && <span className={styles.errorMsg}>{getError("businessType")}</span>}
                </div>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Message</label>
                  <textarea placeholder="Describe your commercial space needs..." value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)} />
                </div>
              </div>
              <div className={styles.formSubmit}>
                <button type="submit" className={styles.btnSubmit} disabled={isFormInvalid() && submitted}>
                  Post Requirement
                </button>
                <span className={styles.formNote}>We&apos;ll contact you within 24 hours</span>
              </div>
            </form>
            {showSuccess && activeTab === "Commercial" && (
              <div className={styles.formSuccess}>
                <h4>Requirement Received</h4>
                <p>Our commercial properties team will connect with you shortly with curated options.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESIDENTIAL FORM */}
      {activeTab === "Residential" && (
        <div className={styles.formPanel}>
          <div className={styles.dynamicForm}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Residential Enquiry</h3>
              <p className={styles.formDesc}>Premium homes Â· 1BHK to 4BHK Â· Family &amp; investment options</p>
            </div>
            <form onSubmit={onSubmit} noValidate>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="Your full name" value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={isInvalid("name") ? styles.invalid : ""} />
                  {isInvalid("name") && <span className={styles.errorMsg}>{getError("name")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number <span className={styles.req}>*</span></label>
                  <input type="tel" placeholder="10-digit number" value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={isInvalid("phone") ? styles.invalid : ""} />
                  {isInvalid("phone") && <span className={styles.errorMsg}>{getError("phone")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Configuration <span className={styles.req}>*</span></label>
                  <select value={form.configuration}
                    onChange={(e) => handleChange("configuration", e.target.value)}
                    onBlur={() => handleBlur("configuration")}
                    className={isInvalid("configuration") ? styles.invalid : ""}>
                    <option value="">Select configuration</option>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4 BHK</option>
                    <option>Duplex</option>
                    <option>Villa</option>
                  </select>
                  {isInvalid("configuration") && <span className={styles.errorMsg}>{getError("configuration")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Budget <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="e.g. â‚¹40L â€“ â‚¹90L" value={form.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    onBlur={() => handleBlur("budget")}
                    className={isInvalid("budget") ? styles.invalid : ""} />
                  {isInvalid("budget") && <span className={styles.errorMsg}>{getError("budget")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Preferred Location <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="e.g. Khopoli, Mumbai" value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    onBlur={() => handleBlur("location")}
                    className={isInvalid("location") ? styles.invalid : ""} />
                  {isInvalid("location") && <span className={styles.errorMsg}>{getError("location")}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Purpose <span className={styles.req}>*</span></label>
                  <select value={form.purpose}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    onBlur={() => handleBlur("purpose")}
                    className={isInvalid("purpose") ? styles.invalid : ""}>
                    <option value="">Select purpose</option>
                    <option>Family Use</option>
                    <option>Investment</option>
                    <option>Both</option>
                  </select>
                  {isInvalid("purpose") && <span className={styles.errorMsg}>{getError("purpose")}</span>}
                </div>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Message</label>
                  <textarea placeholder="Tell us your must-haves..." value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)} />
                </div>
              </div>
              <div className={styles.formSubmit}>
                <button type="submit" className={styles.btnSubmit} disabled={isFormInvalid() && submitted}>
                  Post Requirement
                </button>
                <span className={styles.formNote}>We&apos;ll contact you within 24 hours</span>
              </div>
            </form>
            {showSuccess && activeTab === "Residential" && (
              <div className={styles.formSuccess}>
                <h4>Requirement Received</h4>
                <p>Our residential team will reach out with perfectly matched property options.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEADS LIST */}
      {leads.length > 0 && (
        <div className={styles.leadsSection}>
          <div className={styles.leadsTitle}>
            Submitted Enquiries
            <span className={styles.badge}>{leads.length}</span>
          </div>
          <div className={styles.leadsList}>
            {leads.map((lead) => (
              <div key={lead.id} className={styles.leadCard}>
                <span className={styles.leadTag}>{lead.type}</span>
                <span className={styles.leadItem}><strong>Name:</strong> {lead.name}</span>
                <span className={styles.leadItem}><strong>Phone:</strong> {lead.phone}</span>
                <span className={styles.leadItem}><strong>Budget:</strong> {lead.budget}</span>
                <span className={styles.leadItem}><strong>Location:</strong> {lead.location}</span>
                {lead.acresRequired && <span className={styles.leadItem}><strong>Acres:</strong> {lead.acresRequired}</span>}
                {lead.propertyType && <span className={styles.leadItem}><strong>Type:</strong> {lead.propertyType}</span>}
                {lead.configuration && <span className={styles.leadItem}><strong>Config:</strong> {lead.configuration}</span>}
                {lead.purpose && <span className={styles.leadItem}><strong>Purpose:</strong> {lead.purpose}</span>}
                <span className={`${styles.leadItem} ${styles.leadId}`}>{lead.id} Â· {lead.submittedAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}



