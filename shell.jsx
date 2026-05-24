// SENA — Shared shell: Icon, useLang, useReveal, Nav, Footer
const { useState, useEffect, useRef, useMemo } = React;

// ===== Icon =====
function Icon({ name, size = 18 }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "mic": return <svg {...props}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>;
    case "stop": return <svg {...props}><rect x="6" y="6" width="12" height="12" rx="2"/></svg>;
    case "play": return <svg {...props}><polygon points="6 4 20 12 6 20 6 4"/></svg>;
    case "pause": return <svg {...props}><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>;
    case "arrow-down": return <svg {...props}><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>;
    case "arrow-right": return <svg {...props}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>;
    case "arrow-up-right": return <svg {...props}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>;
    case "spark": return <svg {...props}><path d="M12 3v4"/><path d="M12 17v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/></svg>;
    case "menu": return <svg {...props}><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>;
    case "close": return <svg {...props}><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg>;
    case "mail": return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case "phone": return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.84.59 2.8.72A2 2 0 0 1 22 16.92z"/></svg>;
    case "pin": return <svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    case "check": return <svg {...props}><polyline points="20 6 9 17 4 12"/></svg>;
    case "save": return <svg {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
    case "refresh": return <svg {...props}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>;
    case "globe": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>;
    case "chat": return <svg {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;
    case "waveform": return <svg {...props}><path d="M3 12h2"/><path d="M7 8v8"/><path d="M11 5v14"/><path d="M15 8v8"/><path d="M19 11v2"/></svg>;
    case "cpu": return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>;
    case "database": return <svg {...props}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>;
    case "layers": return <svg {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
    case "shield": return <svg {...props}><path d="M12 2 4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6l-8-4z"/></svg>;
    default: return null;
  }
}

// ===== Language hook =====
function useLang() {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("sena_lang") || "ko"; } catch (e) { return "ko"; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("sena_lang", l); } catch (e) {}
  };
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return [lang, setLang];
}

// ===== Reveal-on-scroll =====
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ===== Nav =====
const NAV_LINKS = [
  { id: "home",       page: "index.html",      key: "navHome"       },
  { id: "solution",   page: "solution.html",   key: "navSolution"   },
  { id: "features",   page: "features.html",   key: "navFeatures"   },
  { id: "playground", page: "playground.html", key: "navPlayground" },
  { id: "technology", page: "technology.html", key: "navTech"       },
  { id: "contact",    page: "contact.html",    key: "navContact"    },
];

function getCurrentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  if (path === "" || path === "index.html") return "home";
  const m = NAV_LINKS.find(l => l.page === path);
  return m ? m.id : "home";
}

function Nav({ lang, setLang, t, current }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="index.html" className="brand-mark">
          <div className="brand-logo"></div>
          <div>
            <div className="brand-name">SENA</div>
            <div className="brand-sub">{t.brand}</div>
          </div>
        </a>

        <div className={`nav-links ${open ? "open" : ""}`}>
          {NAV_LINKS.map(l => (
            <a key={l.id}
              href={l.page}
              className={`nav-link ${current === l.id ? "active" : ""}`}>
              {t[l.key]}
            </a>
          ))}
          <div className="lang-toggle" style={{ marginLeft: 8 }}>
            <button className={lang === "ko" ? "active" : ""} onClick={() => setLang("ko")}>KO</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <a href="contact.html" className="nav-cta" style={{ marginLeft: 8 }}>
            {t.cta}
            <Icon name="arrow-right" size={14} />
          </a>
        </div>

        <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-label="menu">
          <Icon name={open ? "close" : "menu"} size={18} />
        </button>
      </div>
    </nav>
  );
}

// ===== Page Hero (small intro at top of subpages) =====
function PageHeader({ eyebrow, title, sub, current }) {
  return (
    <header className="page-header">
      <div className="container">
        <div className="page-crumb font-mono">
          <a href="index.html">SENA</a>
          <span>/</span>
          <span className="active">{eyebrow}</span>
        </div>
        <h1 className="page-h1">{title}</h1>
        {sub && <p className="page-sub">{sub}</p>}
      </div>
    </header>
  );
}

// ===== Footer =====
function SiteFooter({ t, lang }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <a href="index.html" className="brand-mark" style={{ marginBottom: 0 }}>
              <div className="brand-logo"></div>
              <div>
                <div className="brand-name">SENA</div>
                <div className="brand-sub">{t.brand}</div>
              </div>
            </a>
            <p>{lang === "ko"
              ? "Speak English Naturally and Accurately. 영어 회화학원을 위한 AI 학습 엔진 — 차선 교육이 만듭니다."
              : "Speak English Naturally and Accurately. An AI learning engine for English conversation academies — by Cha-seon Education."}
            </p>
          </div>
          <div className="footer-col">
            <h4>{t.product}</h4>
            <a href="features.html">{t.navFeatures}</a>
            <a href="playground.html">{t.navPlayground}</a>
            <a href="technology.html">{t.navTech}</a>
            <a href="solution.html">{t.navSolution}</a>
          </div>
          <div className="footer-col">
            <h4>{t.company}</h4>
            <a href="#">{t.about}</a>
            <a href="technology.html">{t.navAchievements}</a>
            <a href="#">{t.careers}</a>
            <a href="#">{t.press}</a>
          </div>
          <div className="footer-col">
            <h4>{t.resources}</h4>
            <a href="#">{t.docs}</a>
            <a href="#">{t.api}</a>
            <a href="#">{t.research}</a>
            <a href="contact.html">{t.navContact}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 {t.footerRights}</div>
          <div className="footer-bottom-links">
            <a href="#">{t.privacy}</a>
            <a href="#">{t.terms}</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, useLang, useReveal, Nav, PageHeader, SiteFooter, getCurrentPage });
