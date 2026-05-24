// SENA — Playground: tabbed (Pronunciation + AI Free-Talking)
const { useState: useStateP, useEffect: useEffectP, useRef: useRefP, useMemo: useMemoP } = React;

// ===== shared helpers =====
function makeWave(seed, n = 80, base = 0.5) {
  return Array.from({ length: n }, (_, i) => {
    const x = Math.sin(seed * 1.3 + i * 0.4) * 0.3 +
              Math.sin(seed * 0.7 + i * 0.9) * 0.2 + base;
    return Math.max(0.08, Math.min(0.95, x));
  });
}

// ===== BackendConfigBanner =====
function BackendConfigBanner({ lang }) {
  const t = window.SENA_I18N?.[lang] || window.SENA_I18N?.ko || {};
  const [url, setUrl] = useStateP(() => {
    try { return localStorage.getItem("sena_backend") || ""; } catch { return ""; }
  });
  const [editing, setEditing] = useStateP(false);
  const [input, setInput] = useStateP(url);
  const connected = !!url;

  function save() {
    const v = input.replace(/\/$/, "").trim();
    try { if (v) localStorage.setItem("sena_backend", v); else localStorage.removeItem("sena_backend"); } catch {}
    setUrl(v);
    setEditing(false);
  }

  function clear() {
    try { localStorage.removeItem("sena_backend"); } catch {}
    setUrl(""); setInput(""); setEditing(false);
  }

  return (
    <div className={`backend-banner ${connected ? "bb-connected" : "bb-mock"}`}>
      <span className="bb-dot" />
      <span className="bb-label">
        {connected
          ? (lang === "ko" ? "백엔드 연결됨" : "Backend connected")
          : (lang === "ko" ? "모의(Mock) 모드" : "Mock mode")}
      </span>
      {connected && !editing && (
        <span className="bb-url" title={url}>{url.length > 40 ? url.slice(0, 40) + "…" : url}</span>
      )}
      {editing ? (
        <>
          <input
            className="bb-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") save(); if (e.key === "Escape") setEditing(false); }}
            placeholder="https://xxxx.ngrok-free.app"
            autoFocus
          />
          <button className="bb-btn" onClick={save}>{lang === "ko" ? "저장" : "Save"}</button>
          <button className="bb-btn bb-btn-ghost" onClick={() => setEditing(false)}>{lang === "ko" ? "취소" : "Cancel"}</button>
          {connected && <button className="bb-btn bb-btn-danger" onClick={clear}>{lang === "ko" ? "초기화" : "Clear"}</button>}
        </>
      ) : (
        <button className="bb-btn bb-btn-ghost" onClick={() => { setInput(url); setEditing(true); }}>
          {connected ? (lang === "ko" ? "변경" : "Change") : (lang === "ko" ? "URL 설정" : "Set URL")}
        </button>
      )}
    </div>
  );
}

// ===== ReportModal =====
function ReportModal({ report, lang, sessionId, onClose }) {
  const t = window.SENA_I18N?.[lang] || window.SENA_I18N?.ko || {};
  const [tab, setTab] = useStateP("overall");
  const ko = lang === "ko";

  const tabs = [
    { key: "overall",    label: ko ? "총평"     : "Summary"    },
    { key: "grammar",    label: ko ? "문법"     : "Grammar"    },
    { key: "vocabulary", label: ko ? "어휘"     : "Vocabulary" },
    { key: "fluency",    label: ko ? "유창성"   : "Fluency"    },
  ];

  async function downloadWord() {
    try { await window.SENA_API.downloadReport(sessionId, lang); }
    catch (e) { alert(e.message); }
  }

  return (
    <div className="report-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="report-modal">
        <div className="report-modal-head">
          <span className="report-title">{ko ? "세션 리포트" : "Session Report"}</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="word-btn" onClick={downloadWord}>
              {ko ? "Word 다운로드" : "Download Word"}
            </button>
            <button className="report-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="report-tabs">
          {tabs.map(tb => (
            <button
              key={tb.key}
              className={`report-tab ${tab === tb.key ? "active" : ""}`}
              onClick={() => setTab(tb.key)}
            >{tb.label}</button>
          ))}
        </div>
        <div className="report-body">
          {tab === "overall" && (
            <div className="report-section">
              <p style={{ lineHeight: 1.75 }}>{report.overall}</p>
            </div>
          )}
          {tab === "grammar" && (
            <div className="report-section">
              {(report.grammar || []).map((g, i) => (
                <div key={i} className="report-grammar-item">
                  <div className="rgi-issue">{g.issue}</div>
                  <div className="rgi-row">
                    <span className="rgi-label">{ko ? "예시" : "Example"}</span>
                    <span className="rgi-example">{g.example}</span>
                  </div>
                  <div className="rgi-row">
                    <span className="rgi-label">{ko ? "수정" : "Fix"}</span>
                    <span className="rgi-correction">{g.correction}</span>
                  </div>
                </div>
              ))}
              {!(report.grammar?.length) && <p className="report-empty">{ko ? "문법 피드백 없음" : "No grammar feedback"}</p>}
            </div>
          )}
          {tab === "vocabulary" && (
            <div className="report-section">
              {(report.vocabulary || []).map((v, i) => (
                <div key={i} className="report-vocab-item">
                  <span className="rvi-dot">•</span>
                  <span>{v.suggestion}</span>
                </div>
              ))}
              {!(report.vocabulary?.length) && <p className="report-empty">{ko ? "어휘 피드백 없음" : "No vocabulary feedback"}</p>}
            </div>
          )}
          {tab === "fluency" && (
            <div className="report-section">
              <p style={{ lineHeight: 1.75 }}>{report.fluency?.notes || (ko ? "유창성 데이터 없음" : "No fluency data")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== PronDemo =====
function PronDemo({ lang }) {
  const t = window.i18n?.[lang] || window.i18n?.ko || {};
  const ko = lang === "ko";

  const SENTENCES = {
    ko: [
      { text: "The weather is beautiful today.", level: ko ? "초급" : "Beginner" },
      { text: "She sells seashells by the seashore.", level: ko ? "중급" : "Intermediate" },
      { text: "The thorough researcher thoroughly analyzed the theory.", level: ko ? "고급" : "Advanced" },
    ],
    en: [
      { text: "The weather is beautiful today.", level: "Beginner" },
      { text: "She sells seashells by the seashore.", level: "Intermediate" },
      { text: "The thorough researcher thoroughly analyzed the theory.", level: "Advanced" },
    ],
  };

  const sentences = SENTENCES[lang] || SENTENCES.en;
  const [idx, setIdx] = useStateP(0);
  const [phase, setPhase] = useStateP("idle"); // idle | recording | scoring | done
  const [result, setResult] = useStateP(null);
  const recorderRef = useRefP(null);
  const waveSeed = useMemoP(() => Math.random() * 100, []);
  const waveData = useMemoP(() => makeWave(waveSeed), [waveSeed]);
  const connected = window.SENA_CONFIG?.useRealBackend;

  async function handleRecord() {
    if (phase === "idle") {
      setResult(null);
      setPhase("recording");
      recorderRef.current = window.SENA_API.recorder();
      await recorderRef.current.start();
    } else if (phase === "recording") {
      setPhase("scoring");
      const blob = await recorderRef.current.stop();
      try {
        const res = await window.SENA_API.scorePronunciation(blob, sentences[idx].text, lang);
        setResult(res);
      } catch (e) {
        setResult({ error: e.message });
      }
      setPhase("done");
    }
  }

  function reset() { setPhase("idle"); setResult(null); }
  function nextSentence() { setIdx((idx + 1) % sentences.length); reset(); }

  const s = sentences[idx];

  return (
    <section className="demo-card pron-demo">
      <div className="demo-card-inner">
        <div className="demo-toolbar">
          <span className="demo-chip">{s.level}</span>
          {connected && <span className="demo-chip demo-chip-live">LIVE</span>}
          <button className="icon-btn" title={ko ? "다음 문장" : "Next sentence"} onClick={nextSentence}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <p className="pron-sentence">{s.text}</p>

        <div className="wave-row">
          {waveData.map((h, i) => (
            <div
              key={i}
              className={`wave-bar ${phase === "recording" ? "wave-active" : ""}`}
              style={{
                height: `${h * 100}%`,
                animationDelay: phase === "recording" ? `${i * 18}ms` : "0ms",
              }}
            />
          ))}
        </div>

        <div className="pron-controls">
          <button
            className={`record-btn ${phase === "recording" ? "recording" : ""} ${phase === "scoring" ? "loading" : ""}`}
            onClick={phase === "scoring" ? undefined : handleRecord}
            disabled={phase === "scoring"}
          >
            {phase === "idle"      && (ko ? "녹음 시작" : "Start Recording")}
            {phase === "recording" && (ko ? "중지 및 채점" : "Stop & Score")}
            {phase === "scoring"   && (ko ? "분석 중…" : "Analyzing…")}
            {phase === "done"      && (ko ? "다시 녹음" : "Record Again")}
          </button>
        </div>

        {result && !result.error && (
          <div className="score-panel">
            <div className="score-row">
              {[
                { key: ko ? "발음" : "Artic.", val: result.articulation },
                { key: ko ? "운율" : "Prosody", val: result.prosody },
                { key: ko ? "종합" : "Overall", val: result.overall },
              ].map(sc => (
                <div key={sc.key} className="score-cell">
                  <div className="score-val">{sc.val?.toFixed ? sc.val.toFixed(1) : sc.val}</div>
                  <div className="score-label">{sc.key}</div>
                </div>
              ))}
            </div>
            {result.feedback && (
              <ul className="feedback-list">
                {result.feedback.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}
          </div>
        )}
        {result?.error && <p className="score-error">{result.error}</p>}
      </div>
    </section>
  );
}

// ===== FreeTalkDemo =====
function FreeTalkDemo({ lang }) {
  const ko = lang === "ko";
  const connected = window.SENA_CONFIG?.useRealBackend;

  const LEVELS  = ["opic", "free", "biz", "travel", "interview", "daily"];
  const LEVEL_LABELS = {
    ko: { opic: "OPIc", free: "자유대화", biz: "비즈니스", travel: "여행", interview: "인터뷰", daily: "일상" },
    en: { opic: "OPIc", free: "Free talk", biz: "Business", travel: "Travel", interview: "Interview", daily: "Daily" },
  };
  const labels = LEVEL_LABELS[lang] || LEVEL_LABELS.en;

  const [level, setLevel] = useStateP("opic");
  const [msgs, setMsgs] = useStateP([]);
  const [phase, setPhase] = useStateP("idle"); // idle | recording | thinking | tts
  const [sessionId, setSessionId] = useStateP(null);
  const [reportState, setReportState] = useStateP("idle"); // idle | generating | ready
  const [reportData, setReportData] = useStateP(null);
  const [showReport, setShowReport] = useStateP(false);

  const recorderRef = useRefP(null);
  const audioRef    = useRefP(null);
  const chatRef     = useRefP(null);

  const userTurnCount = msgs.filter(m => m.role === "user").length;

  // auto-scroll chat
  useEffectP(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [msgs]);

  async function handleRecord() {
    if (phase !== "idle") return;
    setPhase("recording");
    recorderRef.current = window.SENA_API.recorder();
    await recorderRef.current.start();
  }

  async function handleStop() {
    if (phase !== "recording") return;
    setPhase("thinking");
    const blob = await recorderRef.current.stop();

    try {
      const history = msgs.map(m => ({ role: m.role, content: m.content }));
      const res = await window.SENA_API.chatTurn({ level, topic: level, history, audioBlob: blob, lang });

      const userMsg = {
        role: "user",
        content: res.userText || (ko ? "(음성 인식 실패)" : "(transcription failed)"),
        score: res.utteranceScore,
      };
      const aiMsg = {
        role: "assistant",
        content: res.aiText,
        audioB64: res.aiAudioBase64 || "",
      };

      setMsgs(prev => [...prev, userMsg, aiMsg]);

      if (res.aiAudioBase64 && audioRef.current) {
        setPhase("tts");
        audioRef.current.src = res.aiAudioBase64.startsWith("data:")
          ? res.aiAudioBase64
          : `data:audio/wav;base64,${res.aiAudioBase64}`;
        audioRef.current.play().catch(() => {});
        audioRef.current.onended = () => setPhase("idle");
      } else {
        setPhase("idle");
      }
    } catch (e) {
      setMsgs(prev => [...prev, { role: "assistant", content: `[Error: ${e.message}]`, audioB64: "" }]);
      setPhase("idle");
    }
  }

  function replayAudio(b64) {
    if (!audioRef.current || !b64) return;
    audioRef.current.src = b64.startsWith("data:") ? b64 : `data:audio/wav;base64,${b64}`;
    audioRef.current.play().catch(() => {});
  }

  async function endSession() {
    if (userTurnCount < 1) return;
    setReportState("generating");
    setShowReport(true);
    try {
      const history = msgs.map(m => ({ role: m.role, content: m.content }));
      const res = await window.SENA_API.generateReport({ history, lang });
      setSessionId(res.sessionId);
      setReportData(res.report);
      setReportState("ready");
    } catch (e) {
      setReportState("idle");
      setShowReport(false);
      alert((ko ? "리포트 생성 실패: " : "Report failed: ") + e.message);
    }
  }

  async function resetConversation() {
    await window.SENA_API.resetChat({ level, topic: level, lang }).catch(() => {});
    setMsgs([]);
    setPhase("idle");
    setReportState("idle");
    setReportData(null);
    setSessionId(null);
    setShowReport(false);
  }

  return (
    <section className="demo-card freetalk-demo">
      <div className="demo-card-inner">
        {/* toolbar */}
        <div className="demo-toolbar">
          {LEVELS.map(l => (
            <button
              key={l}
              className={`demo-chip ${level === l ? "active" : ""}`}
              onClick={() => { setLevel(l); resetConversation(); }}
            >{labels[l]}</button>
          ))}
          {connected && <span className="demo-chip demo-chip-live" style={{ marginLeft: "auto" }}>LIVE</span>}
        </div>

        {/* chat body */}
        <div className="ft-chat-body" ref={chatRef}>
          {msgs.length === 0 && (
            <div className="ft-empty">
              <p>{ko ? "녹음 버튼을 눌러 대화를 시작하세요." : "Press the record button to start talking."}</p>
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={`ft-msg-bubble-wrap ${m.role === "user" ? "user" : "ai"}`}>
              <div className={`ft-bubble ${m.role === "user" ? "ft-bubble-user" : "ft-bubble-ai"}`}>
                <span>{m.content}</span>
                {m.role === "user" && m.score && (
                  <span className="ft-score-badge">
                    {(((m.score.articulation || 0) + (m.score.prosody || 0)) / 2).toFixed(1)}
                  </span>
                )}
              </div>
              {m.role === "assistant" && m.audioB64 && (
                <button className="ft-ai-replay" title={ko ? "다시 듣기" : "Replay"} onClick={() => replayAudio(m.audioB64)}>
                  ▶
                </button>
              )}
            </div>
          ))}
          {(phase === "thinking" || phase === "tts") && (
            <div className="ft-msg-bubble-wrap ai">
              <div className="ft-bubble ft-bubble-ai ft-thinking">
                <span className="ft-dot" /><span className="ft-dot" /><span className="ft-dot" />
              </div>
            </div>
          )}
        </div>

        {/* controls */}
        <div className="ft-controls">
          <button
            className={`record-btn ${phase === "recording" ? "recording" : ""} ${phase === "thinking" || phase === "tts" ? "loading" : ""}`}
            onClick={phase === "idle" ? handleRecord : phase === "recording" ? handleStop : undefined}
            disabled={phase === "thinking" || phase === "tts"}
          >
            {phase === "idle"      && (ko ? "녹음" : "Record")}
            {phase === "recording" && (ko ? "전송" : "Send")}
            {phase === "thinking"  && (ko ? "처리 중…" : "Processing…")}
            {phase === "tts"       && (ko ? "재생 중…" : "Playing…")}
          </button>
          <button className="icon-btn" title={ko ? "대화 초기화" : "Reset"} onClick={resetConversation}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8a6 6 0 1 0 1.2-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 4v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="end-session-btn"
            onClick={endSession}
            disabled={userTurnCount < 1 || reportState === "generating"}
          >
            {reportState === "generating"
              ? (ko ? "생성 중…" : "Generating…")
              : (ko ? "세션 종료 및 리포트" : "End & Report")}
          </button>
        </div>
      </div>

      {/* hidden audio element */}
      <audio ref={audioRef} style={{ display: "none" }} />

      {/* report modal */}
      {showReport && (
        reportState === "generating"
          ? (
            <div className="report-overlay">
              <div className="report-generating-box">
                <div className="rg-spinner" />
                <p className="rg-label">{ko ? "리포트를 생성하고 있습니다…" : "Generating your report…"}</p>
                <p className="rg-sub">{ko ? "Qwen3가 대화를 분석 중입니다." : "Qwen3 is analyzing your conversation."}</p>
              </div>
            </div>
          )
          : reportData && (
            <ReportModal
              report={reportData}
              lang={lang}
              sessionId={sessionId}
              onClose={() => setShowReport(false)}
            />
          )
      )}
    </section>
  );
}

// ===== PlaygroundPage =====
function PlaygroundPage({ lang, setLang }) {
  const [tab, setTab] = useStateP("pron");
  const ko = lang === "ko";

  return (
    <div className="playground-root">
      <BackendConfigBanner lang={lang} />

      <div className="pg-header">
        <h1 className="pg-title">
          {ko ? "AI 영어 발화 학습 플레이그라운드" : "AI English Speaking Playground"}
        </h1>
        <p className="pg-sub">
          {ko
            ? "발음 채점 · AI 대화 · 세션 리포트를 무료로 체험하세요."
            : "Try pronunciation scoring, AI conversation, and session reports — free."}
        </p>
      </div>

      <div className="pg-tabs">
        <button
          className={`pg-tab ${tab === "pron" ? "active" : ""}`}
          onClick={() => setTab("pron")}
        >
          {ko ? "발음 채점" : "Pronunciation"}
        </button>
        <button
          className={`pg-tab ${tab === "chat" ? "active" : ""}`}
          onClick={() => setTab("chat")}
        >
          {ko ? "AI 프리토킹" : "AI Free Talk"}
        </button>
      </div>

      {tab === "pron" && <PronDemo lang={lang} />}
      {tab === "chat" && <FreeTalkDemo lang={lang} />}
    </div>
  );
}

Object.assign(window, { PlaygroundPage });
