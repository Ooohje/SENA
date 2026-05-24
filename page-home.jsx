// SENA — Hero (Home only) + Home page features teaser + tech pill + final CTA
const { useState: useStateH, useEffect: useEffectH } = React;

function Hero({ t }) {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="container hero-grid">
        <div className="reveal in">
          <span className="eyebrow">{t.heroBadge}</span>
          <h1 className="display">
            <span className="text-grad">{t.heroTitleA}</span><br/>
            <span className="text-cyan">{t.heroTitleB}</span> <span className="text-grad">{t.heroTitleC}</span>
          </h1>
          <p className="sub">{t.heroSubtitle}</p>
          <div className="hero-actions">
            <a href="solution.html" className="btn-primary">
              {t.heroPrimaryCta}
              <Icon name="arrow-right" size={14} />
            </a>
            <a href="playground.html" className="btn-secondary">
              {t.heroSecondaryCta}
              <Icon name="arrow-up-right" size={14} />
            </a>
          </div>
          <div className="hero-metrics">
            <div className="hero-metric">
              <div className="v">0.755</div>
              <div className="l">{t.heroMetricA}</div>
              <div className="hero-metric-note">{t.heroMetricANote}</div>
            </div>
            <div className="hero-metric">
              <div className="v">0.738</div>
              <div className="l">{t.heroMetricB}</div>
              <div className="hero-metric-note">{t.heroMetricBNote}</div>
            </div>
            <div className="hero-metric">
              <div className="v" style={{ fontSize: 15, fontFamily: "JetBrains Mono, monospace", letterSpacing: 0, lineHeight: 1.4 }}>{t.heroMetricCval}</div>
              <div className="l">{t.heroMetricC}</div>
              <div className="hero-metric-note">{t.heroMetricCNote}</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orb"></div>
          <div className="hero-device">
            <div className="hero-device-head">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="dot"></div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.1em" }}>SENA · LIVE</div>
              </div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--fg-faint)" }}>v2.4.1</div>
            </div>
            <div className="hero-device-screen">
              <div className="line">
                <span className="k">Articulation</span>
                <span className="v">4.6 <span style={{ color: "var(--fg-faint)", fontSize: 11 }}>/ 5.0</span></span>
              </div>
              <div className="line">
                <span className="k">Prosody</span>
                <span className="v">4.2 <span style={{ color: "var(--fg-faint)", fontSize: 11 }}>/ 5.0</span></span>
              </div>
              <div className="line">
                <span className="k">Tutor latency</span>
                <span className="v">820 <span style={{ color: "var(--fg-faint)", fontSize: 11 }}>ms</span></span>
              </div>
              <div className="hero-device-wave">
                <div className="hero-device-bars">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <span key={i} style={{
                      animationDelay: `${(i % 12) * 0.07}s`,
                      height: `${30 + Math.abs(Math.sin(i * 0.6)) * 60}%`
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hero-floater f-1">
            <div>
              <div className="f-num">4.6<span style={{ color: "var(--fg-faint)", fontSize: 14 }}>/5</span></div>
              <div className="f-label">{t.scoreArticulation}</div>
            </div>
          </div>
          <div className="hero-floater f-2">
            <div>
              <div className="f-num">4.2<span style={{ color: "var(--fg-faint)", fontSize: 14 }}>/5</span></div>
              <div className="f-label">{t.scoreProsody}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFeatures({ t, lang }) {
  return (
    <section className="home-features" data-screen-label="02 Home features">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.homeWhat}</span>
          <h2 className="section-title text-grad">{t.homeWhatTitle}</h2>
        </div>
        <div className="home-feat-grid">
          <a className="home-feat-card cyan" href="features.html#talk">
            <div className="hfc-icon"><Icon name="chat" size={22}/></div>
            <div className="hfc-pill">FEATURE 01</div>
            <div className="hfc-title">{t.homeFeat1Pill}</div>
            <div className="hfc-line">{t.homeFeat1Line}</div>
            <div className="hfc-link">
              {t.homeFeat1Link}
              <Icon name="arrow-right" size={14}/>
            </div>
          </a>
          <a className="home-feat-card" href="features.html#score">
            <div className="hfc-icon"><Icon name="waveform" size={22}/></div>
            <div className="hfc-pill">FEATURE 02</div>
            <div className="hfc-title">{t.homeFeat2Pill}</div>
            <div className="hfc-line">{t.homeFeat2Line}</div>
            <div className="hfc-link">
              {t.homeFeat2Link}
              <Icon name="arrow-right" size={14}/>
            </div>
          </a>
        </div>

        <a className="home-tech-pill" href="technology.html">
          <div className="htp-icon"><Icon name="shield" size={22}/></div>
          <div className="htp-body">
            <div className="htp-title">{t.homeTechPillTitle}</div>
            <div className="htp-sub">{t.homeTechPillSub}</div>
          </div>
          <div className="htp-cta">
            {t.homeTechPillCta}
            <Icon name="arrow-right" size={14}/>
          </div>
        </a>
      </div>
    </section>
  );
}

function HomeCta({ t }) {
  return (
    <section className="home-cta" data-screen-label="03 Final CTA">
      <div className="container">
        <div className="cta-card">
          <h2 className="section-title text-grad">{t.homeBigCtaTitle}</h2>
          <p className="sub" style={{ marginTop: 16 }}>{t.homeBigCtaSub}</p>
          <div className="hero-actions" style={{ marginTop: 28 }}>
            <a href="contact.html" className="btn-primary">
              {t.homeBigCtaA}
              <Icon name="arrow-right" size={14}/>
            </a>
            <a href="playground.html" className="btn-secondary">
              {t.homeBigCtaB}
              <Icon name="arrow-up-right" size={14}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, HomeFeatures, HomeCta });
