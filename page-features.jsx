// SENA — Features page (deep dive: AI free-talking + pronunciation scoring)
const { useState: useStateF } = React;

function FeaturesPage({ t, lang }) {
  const [selTopic, setSelTopic] = useStateF("opic");
  const [selLevel, setSelLevel] = useStateF("int");

  const topicChips = [
    { id: "opic",      label: t.topicOpic },
    { id: "free",      label: t.topicFree },
    { id: "biz",       label: t.topicBiz },
    { id: "travel",    label: t.topicTravel },
    { id: "interview", label: t.topicInterview },
    { id: "daily",     label: t.topicDaily },
  ];
  const levelChips = [
    { id: "beg", label: t.levelBeg },
    { id: "int", label: t.levelInt },
    { id: "adv", label: t.levelAdv },
  ];
  const examples = [
    { l: t.feat1Ex1L, v: t.feat1Ex1V, topic: "opic" },
    { l: t.feat1Ex2L, v: t.feat1Ex2V, topic: "free" },
    { l: t.feat1Ex3L, v: t.feat1Ex3V, topic: "biz" },
    { l: t.feat1Ex4L, v: t.feat1Ex4V, topic: "travel" },
  ];

  return (
    <React.Fragment>
      <PageHeader
        eyebrow={t.pageFeatures}
        title={t.featuresTitle}
        sub={t.featuresSubtitle}
      />

      {/* Feature 01 — AI Voice Free-Talking */}
      <section id="talk" className="feat-section" data-screen-label="Feature 01">
        <div className="container">
          <div className="feat-card-lg cyan">
            <div className="feat-card-lg-grid">
              <div>
                <div className="feat-tag">{t.feat1Tag}</div>
                <h2 className="section-title text-grad">{t.feat1Title}</h2>
                <div className="feat-sub">{t.feat1Sub}</div>
                <p className="sub" style={{ marginTop: 18 }}>{t.feat1Desc}</p>

                <ul className="sol-list" style={{ marginTop: 24 }}>
                  {[t.feat1Item1, t.feat1Item2, t.feat1Item3, t.feat1Item4].map((x, i) => (
                    <li key={i}>
                      <span className="check"><Icon name="check" size={12}/></span>{x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="feat-controls">
                <div className="ft-pick">
                  <div className="ft-pick-label">{t.feat1Lv}</div>
                  <div className="ft-level-row">
                    {levelChips.map(c => (
                      <button key={c.id}
                        className={`ft-lv-btn ${selLevel === c.id ? "active" : ""}`}
                        onClick={() => setSelLevel(c.id)}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="ft-pick">
                  <div className="ft-pick-label">{t.feat1Tp}</div>
                  <div className="ft-topic-row">
                    {topicChips.map(c => (
                      <button key={c.id}
                        className={`ft-chip ${selTopic === c.id ? "active" : ""}`}
                        onClick={() => setSelTopic(c.id)}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ft-prompt-card">
                  <div className="ft-prompt-head">
                    <span className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", color: "var(--cyan-ink)", textTransform: "uppercase" }}>
                      &lt;{t.ftSystemPrompt}&gt;
                    </span>
                    <span className="font-mono" style={{ fontSize: 10.5, color: "var(--fg-faint)" }}>
                      Qwen3-8B · fine-tuned
                    </span>
                  </div>
                  <div className="ft-prompt-body">
                    {lang === "ko"
                      ? <>당신은 한국인 학습자와 음성으로 대화하는 AI 영어 튜터입니다. 학습자 레벨은 <b>{levelChips.find(c => c.id === selLevel).label}</b>, 오늘의 주제는 <b>{topicChips.find(c => c.id === selTopic).label}</b>입니다. 한국인 학습자가 자주 어려워하는 부분을 의식하면서 자연스러운 후속 질문을 던지세요.</>
                      : <>You are an AI English voice tutor for a Korean learner. The learner is at <b>{levelChips.find(c => c.id === selLevel).label}</b> level and today's topic is <b>{topicChips.find(c => c.id === selTopic).label}</b>. Be aware of common Korean L2 stumbling points and ask natural follow-up questions.</>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="feat-examples">
              <div className="feat-examples-head">{t.feat1ExampleTitle}</div>
              <div className="feat-examples-grid">
                {examples.map((ex, i) => (
                  <div className="ex-card" key={i}>
                    <div className="ex-label">{ex.l}</div>
                    <div className="ex-text">{ex.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="feat-cta-row">
              <a href="playground.html" className="btn-primary">
                {lang === "ko" ? "프리토킹 체험하기" : "Try free-talking"}
                <Icon name="arrow-right" size={14}/>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 02 — Pronunciation Scoring */}
      <section id="score" className="feat-section" data-screen-label="Feature 02">
        <div className="container">
          <div className="feat-card-lg">
            <div className="feat-card-lg-grid">
              <div>
                <div className="feat-tag dark">{t.feat2Tag}</div>
                <h2 className="section-title text-grad">{t.feat2Title}</h2>
                <div className="feat-sub">{t.feat2Sub}</div>
                <p className="sub" style={{ marginTop: 18 }}>{t.feat2Desc}</p>

                <ul className="sol-list" style={{ marginTop: 24 }}>
                  {[t.feat2Item1, t.feat2Item2, t.feat2Item3, t.feat2Item4].map((x, i) => (
                    <li key={i}>
                      <span className="check"><Icon name="check" size={12}/></span>{x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="feat-score-illust">
                <div className="feat-examples-head" style={{ marginBottom: 14 }}>{t.feat2ExampleTitle}</div>
                <div className="score-mini-row">
                  <div className="score-mini">
                    <div className="sm-label">{t.feat2ExScoreA}</div>
                    <div className="sm-v">4.6 <span className="sm-u">/5</span></div>
                    <div className="sm-bar"><div className="sm-fill" style={{ width: "92%" }}/></div>
                  </div>
                  <div className="score-mini">
                    <div className="sm-label">{t.feat2ExScoreP}</div>
                    <div className="sm-v">4.2 <span className="sm-u">/5</span></div>
                    <div className="sm-bar"><div className="sm-fill warm" style={{ width: "84%" }}/></div>
                  </div>
                </div>
                <div className="feedback" style={{ background: "#FFFFFF", marginTop: 16 }}>
                  <div className="ftitle"><span className="dot"></span>{t.feedbackTitle}</div>
                  <ul>
                    <li><span className="idx">01</span><span>{t.feat2ExNote1}</span></li>
                    <li><span className="idx">02</span><span>{t.feat2ExNote2}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="feat-cta-row">
              <a href="playground.html" className="btn-primary">
                {lang === "ko" ? "발화 평가 체험하기" : "Try pronunciation scoring"}
                <Icon name="arrow-right" size={14}/>
              </a>
              <a href="technology.html" className="btn-secondary">
                {lang === "ko" ? "기술 자세히 보기" : "See the technology"}
                <Icon name="arrow-up-right" size={14}/>
              </a>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { FeaturesPage });
