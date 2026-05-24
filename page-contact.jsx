// SENA — Contact page
const { useState: useStateC } = React;

function ContactPage({ t, lang }) {
  const [form, setForm] = useStateC({ name: "", email: "", org: "", inquiryType: "AX", message: "" });
  const [submitting, setSubmitting] = useStateC(false);
  const [submitted, setSubmitted] = useStateC(false);
  const [errors, setErrors] = useStateC({});

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = true;
    if (!form.message.trim()) errs.message = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", org: "", inquiryType: "AX", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1100);
  };

  const setField = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(er => ({ ...er, [k]: false }));
  };

  return (
    <React.Fragment>
      <PageHeader
        eyebrow={t.pageContact}
        title={t.contactTitle}
        sub={t.contactSubtitle}
      />
      <section data-screen-label="Contact form">
        <div className="container">
          <div className="contact-wrap">
            <form className="contact-card" onSubmit={onSubmit} noValidate>
              <div className="field row2">
                <div className="field">
                  <label>{t.name}</label>
                  <input type="text" placeholder={t.namePh} value={form.name} onChange={setField("name")}
                    style={{ borderColor: errors.name ? "rgba(239,68,68,0.6)" : undefined }}/>
                </div>
                <div className="field">
                  <label>{t.email}</label>
                  <input type="email" placeholder={t.emailPh} value={form.email} onChange={setField("email")}
                    style={{ borderColor: errors.email ? "rgba(239,68,68,0.6)" : undefined }}/>
                </div>
              </div>
              <div className="field">
                <label>{t.org}</label>
                <input type="text" placeholder={t.orgPh} value={form.org} onChange={setField("org")}/>
              </div>
              <div className="field">
                <label>{t.inquiryType}</label>
                <div className="inquiry-radio">
                  {[
                    { k: "AX", v: t.inquiryAX },
                    { k: "API", v: t.inquiryAPI },
                    { k: "ETC", v: t.inquiryEtc },
                  ].map(opt => (
                    <button type="button" key={opt.k}
                      className={`inq-btn ${form.inquiryType === opt.k ? "active" : ""}`}
                      onClick={() => setForm(f => ({ ...f, inquiryType: opt.k }))}>
                      {opt.v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>{t.message}</label>
                <textarea placeholder={t.messagePh} value={form.message} onChange={setField("message")}
                  style={{ borderColor: errors.message ? "rgba(239,68,68,0.6)" : undefined }}/>
              </div>
              <button type="submit" className="btn-primary" disabled={submitting}
                style={{ width: "100%", justifyContent: "center" }}>
                {submitting ? t.submitting : t.submit}
                {!submitting && <Icon name="arrow-right" size={14}/>}
              </button>
              {submitted && (
                <div className="success-msg">
                  <Icon name="check" size={14}/>{t.submitted}
                </div>
              )}
            </form>

            <div className="contact-info-row">
              <div className="contact-info-item">
                <div className="icon"><Icon name="pin" size={16}/></div>
                <div>
                  <div className="k">{lang === "ko" ? "본사" : "Headquarters"}</div>
                  <div className="v">{t.footerAddr}</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="icon"><Icon name="mail" size={16}/></div>
                <div>
                  <div className="k">{lang === "ko" ? "이메일" : "Email"}</div>
                  <div className="v">{t.footerEmail}</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="icon"><Icon name="phone" size={16}/></div>
                <div>
                  <div className="k">{lang === "ko" ? "전화" : "Phone"}</div>
                  <div className="v">{t.footerPhone}</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="icon"><Icon name="globe" size={16}/></div>
                <div>
                  <div className="k">{lang === "ko" ? "업무 시간" : "Hours"}</div>
                  <div className="v">{lang === "ko" ? "월–금 · 09:00–18:00 (KST)" : "Mon–Fri · 09:00–18:00 (KST)"}</div>
                </div>
              </div>

              <div style={{ marginTop: 8, padding: 20, borderRadius: 14, background: "rgba(6, 182, 212, 0.06)", border: "1px solid rgba(6,182,212,0.20)" }}>
                <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--cyan-ink)", textTransform: "uppercase", marginBottom: 8 }}>
                  {lang === "ko" ? "도입 절차" : "Onboarding"}
                </div>
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                  {[
                    { n: "01", k: lang === "ko" ? "문의" : "Inquiry" },
                    { n: "02", k: lang === "ko" ? "데모" : "Demo" },
                    { n: "03", k: lang === "ko" ? "파일럿" : "Pilot" },
                    { n: "04", k: lang === "ko" ? "도입" : "Deploy" },
                  ].map(s => (
                    <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <div className="font-mono" style={{ fontSize: 11, color: "var(--cyan-ink)" }}>{s.n}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fg-strong)" }}>{s.k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { ContactPage });
