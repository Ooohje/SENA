// SENA — Solution page: tracks + roadmap
function Solution({ t, lang }) {
  const items1 = [t.sol1Item1, t.sol1Item2, t.sol1Item3, t.sol1Item4];
  const items2 = [t.sol2Item1, t.sol2Item2, t.sol2Item3, t.sol2Item4];

  return (
    <section data-screen-label="Solution tracks">
      <div className="container">
        <div className="sol-grid">
          <div className="sol-card sol-primary">
            <div className="sol-tag">{t.sol1Tag}</div>
            <h3 className="sol-title">{t.sol1Title}</h3>
            <div className="sol-sub">{t.sol1Sub}</div>
            <p className="sol-desc">{t.sol1Desc}</p>
            <ul className="sol-list">
              {items1.map((it, i) => (
                <li key={i}>
                  <span className="check"><Icon name="check" size={12}/></span>{it}
                </li>
              ))}
            </ul>
            <div className="sol-footer">
              <a href="contact.html" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                {t.sol1Cta}
                <Icon name="arrow-right" size={14}/>
              </a>
              <div className="sol-illust sol-illust-1" aria-hidden="true">
                <div className="il-card il-1">
                  <div className="il-row"><span className="il-pill"/><span className="il-pill w2"/></div>
                  <div className="il-bars">
                    {[60, 80, 45, 70, 55, 90, 65].map((h, i) => (
                      <span key={i} style={{ height: `${h}%` }}/>
                    ))}
                  </div>
                </div>
                <div className="il-card il-2">
                  <div className="il-row sm"><span className="il-dot"/><span className="il-pill w3"/></div>
                  <div className="il-row sm"><span className="il-dot c"/><span className="il-pill w2"/></div>
                  <div className="il-row sm"><span className="il-dot"/><span className="il-pill w4"/></div>
                </div>
              </div>
            </div>
          </div>

          <div className="sol-card sol-secondary">
            <div className="sol-tag">{t.sol2Tag}</div>
            <h3 className="sol-title">{t.sol2Title}</h3>
            <div className="sol-sub">{t.sol2Sub}</div>
            <p className="sol-desc">{t.sol2Desc}</p>
            <ul className="sol-list">
              {items2.map((it, i) => (
                <li key={i}>
                  <span className="check"><Icon name="check" size={12}/></span>{it}
                </li>
              ))}
            </ul>
            <div className="sol-footer">
              <a href="contact.html" className="btn-secondary" style={{ alignSelf: "flex-start" }}>
                {t.sol2Cta}
                <Icon name="arrow-right" size={14}/>
              </a>
              <div className="sol-illust sol-illust-2" aria-hidden="true">
                <pre className="code-snip">
{`POST /v1/score
{
  "audio": "<wav>",
  "ref": "She sells seashells..."
}

→ {
  "articulation": 4.6,
  "prosody":      4.2,
  "phonemes": [ ... ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Roadmap({ t, lang }) {
  const phases = [
    { tag: t.phase1Tag, period: t.phase1Period, title: t.phase1Title, desc: t.phase1Desc, bullets: [t.phase1B1, t.phase1B2, t.phase1B3], status: t.phase1Status, statusKey: "done" },
    { tag: t.phase2Tag, period: t.phase2Period, title: t.phase2Title, desc: t.phase2Desc, bullets: [t.phase2B1, t.phase2B2, t.phase2B3], status: t.phase2Status, statusKey: "active" },
    { tag: t.phase3Tag, period: t.phase3Period, title: t.phase3Title, desc: t.phase3Desc, bullets: [t.phase3B1, t.phase3B2, t.phase3B3], status: t.phase3Status, statusKey: "planned" },
  ];
  return (
    <section data-screen-label="Roadmap">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.roadmapEyebrow}</span>
          <h2 className="section-title text-grad">{t.roadmapTitle}</h2>
          <p className="sub">{t.roadmapSubtitle}</p>
        </div>
        <div className="roadmap">
          <div className="roadmap-line" aria-hidden="true"></div>
          {phases.map((p, i) => (
            <div className={`phase phase-${p.statusKey}`} key={i}>
              <div className="phase-node"><div className="phase-dot"></div></div>
              <div className="phase-card">
                <div className="phase-head">
                  <div className="phase-tag">{p.tag}</div>
                  <div className={`phase-status ${p.statusKey}`}>{p.status}</div>
                </div>
                <div className="phase-period font-mono">{p.period}</div>
                <h3 className="phase-title">{p.title}</h3>
                <p className="phase-desc">{p.desc}</p>
                <ul className="phase-list">
                  {p.bullets.map((b, j) => (
                    <li key={j}><span className="bullet"></span>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionPage({ t, lang }) {
  return (
    <React.Fragment>
      <PageHeader
        eyebrow={t.pageSolution}
        title={t.solutionTitle}
        sub={t.solutionSubtitle}
      />
      <Solution t={t} lang={lang}/>
      <Roadmap t={t} lang={lang}/>
    </React.Fragment>
  );
}

Object.assign(window, { SolutionPage });
