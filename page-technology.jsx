// SENA — Technology page: tech stack + pipelines + data + achievements
function TechStack({ t, lang }) {
  const items = [
    { icon: "cpu",      title: t.tech1Title, desc: t.tech1Desc, tag: "LLM" },
    { icon: "shield",   title: t.tech2Title, desc: t.tech2Desc, tag: "INFRA" },
    { icon: "database", title: t.tech3Title, desc: t.tech3Desc, tag: "MODEL" },
  ];
  return (
    <section data-screen-label="Tech stack">
      <div className="container">
        <div className="tech-grid">
          {items.map((it, i) => (
            <div className="tech-card" key={i}>
              <div className="tech-head">
                <div className="tech-icon"><Icon name={it.icon} size={20}/></div>
                <div className="tech-tag font-mono">{it.tag}</div>
              </div>
              <div className="tech-title">{it.title}</div>
              <div className="tech-desc">{it.desc}</div>
            </div>
          ))}
        </div>

        <div className="pipeline-grid">
          <div className="pipeline-card">
            <div className="pipeline-tag font-mono">{t.techPipeBox} · 01</div>
            <div className="pipeline-title">{t.techBlock1Title}</div>
            <div className="pipeline-desc">{t.techBlock1Desc}</div>
            <div className="pipeline-flow">
              {["VOICE IN", "ASR", "PROMPT", "QWEN3-8B", "TTS", "VOICE OUT"].map((s, i) => (
                <React.Fragment key={i}>
                  <div className={`pf-node ${s === "QWEN3-8B" ? "highlight" : ""}`}>{s}</div>
                  {i < 5 && <div className="pf-arrow"><Icon name="arrow-right" size={12}/></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="pipeline-card">
            <div className="pipeline-tag font-mono">{t.techPipeBox} · 02</div>
            <div className="pipeline-title">{t.techBlock2Title}</div>
            <div className="pipeline-desc">{t.techBlock2Desc}</div>
            <div className="pipeline-flow">
              {["AUDIO", "SSL BACKBONE", "SCORING HEAD", "DUAL SCORE", "FEEDBACK"].map((s, i) => (
                <React.Fragment key={i}>
                  <div className={`pf-node ${s === "SSL BACKBONE" || s === "SCORING HEAD" ? "highlight" : ""}`}>{s}</div>
                  {i < 4 && <div className="pf-arrow"><Icon name="arrow-right" size={12}/></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataSection({ t, lang }) {
  const total = 74596;
  const train = 59660;
  const valid = 7504;
  const test  = 7432;
  const trainPct = (train / total * 100).toFixed(1);
  const validPct = (valid / total * 100).toFixed(1);
  const testPct  = (test  / total * 100).toFixed(1);
  const points = [
    { t: t.dataPoint1Title, d: t.dataPoint1Desc },
    { t: t.dataPoint2Title, d: t.dataPoint2Desc },
    { t: t.dataPoint3Title, d: t.dataPoint3Desc },
  ];
  return (
    <section data-screen-label="Data">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.dataEyebrow}</span>
          <h2 className="section-title text-grad">{t.dataTitle}</h2>
          <p className="sub">{t.dataSubtitle}</p>
        </div>
        <div className="data-shell">
          <div className="data-top">
            <div className="data-source">
              <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--fg-faint)", textTransform: "uppercase", marginBottom: 8 }}>
                {t.dataSizeLabel}
              </div>
              <div className="data-source-name">{t.dataSource}</div>
              <div className="data-source-note">{t.dataNote}</div>
            </div>
            <div className="data-bigstat">
              <div className="data-bigstat-v">80.37<span className="u">GB</span></div>
              <div className="data-bigstat-l">{lang === "ko" ? "원천 데이터 크기" : "Source corpus size"}</div>
            </div>
          </div>

          <div className="data-bar-wrap">
            <div className="data-bar-head">
              <div>
                <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--fg-faint)", textTransform: "uppercase" }}>
                  {t.dataTotalLabel}
                </div>
                <div className="data-total">
                  74,596
                  <span className="data-total-unit">{t.dataFilesUnit}</span>
                </div>
              </div>
              <div className="data-legend">
                <span><i className="dot a"/>{t.dataTrainLabel}</span>
                <span><i className="dot b"/>{t.dataValidLabel}</span>
                <span><i className="dot c"/>{t.dataTestLabel}</span>
              </div>
            </div>
            <div className="data-bar">
              <div className="seg a" style={{ width: `${trainPct}%` }}>
                <span className="seg-label">Train · {trainPct}%</span>
              </div>
              <div className="seg b" style={{ width: `${validPct}%` }}>
                <span className="seg-label">Valid</span>
              </div>
              <div className="seg c" style={{ width: `${testPct}%` }}>
                <span className="seg-label">Test</span>
              </div>
            </div>
            <div className="data-splits">
              <div className="data-split">
                <div className="ds-head"><i className="dot a"/>{t.dataTrainLabel}</div>
                <div className="ds-v">59,660</div>
                <div className="ds-target">{t.dataTargetLabel} 59,677</div>
              </div>
              <div className="data-split">
                <div className="ds-head"><i className="dot b"/>{t.dataValidLabel}</div>
                <div className="ds-v">7,504</div>
                <div className="ds-target">{t.dataTargetLabel} 7,460</div>
              </div>
              <div className="data-split">
                <div className="ds-head"><i className="dot c"/>{t.dataTestLabel}</div>
                <div className="ds-v">7,432</div>
                <div className="ds-target">{t.dataTargetLabel} 7,460</div>
              </div>
            </div>
          </div>
          <div className="data-points">
            {points.map((p, i) => (
              <div className="data-point" key={i}>
                <div className="dp-num font-mono">0{i + 1}</div>
                <div>
                  <div className="dp-title">{p.t}</div>
                  <div className="dp-desc">{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Achievements({ t, lang }) {
  const items = window.SENA_ACHIEVEMENTS;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section data-screen-label="Achievements">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.achievementsEyebrow}</span>
          <h2 className="section-title text-grad">{t.achievementsTitle}</h2>
          <p className="sub">{t.achievementsSubtitle}</p>
        </div>
        <div className="ach-grid">
          {items.map((it, i) => (
            <div className="ach-card" key={i} onMouseMove={onMove}>
              <div className="ach-head">
                <div className="ach-year">{it.year}</div>
                <div className={`ach-tag ${it.tag}`}>{it.tag}</div>
              </div>
              <div>
                <div className="ach-title">{lang === "ko" ? it.titleKo : it.titleEn}</div>
                <div className="ach-desc">{lang === "ko" ? it.descKo : it.descEn}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologyPage({ t, lang }) {
  return (
    <React.Fragment>
      <PageHeader
        eyebrow={t.pageTech}
        title={t.techTitle}
        sub={t.techSubtitle}
      />
      <TechStack t={t} lang={lang}/>
      <DataSection t={t} lang={lang}/>
      <Achievements t={t} lang={lang}/>
    </React.Fragment>
  );
}

Object.assign(window, { TechnologyPage });
