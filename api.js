// SENA — Frontend ↔ Backend adapter
const FIXED_BACKEND = "http://155.230.43.22:8000";

function _base() {
  return FIXED_BACKEND;
}

function _serverOfflineAlert(lang) {
  const ko = (lang === "ko") || (typeof lang === "undefined");
  alert(ko
    ? "서버에 연결할 수 없습니다.\nstart.bat으로 백엔드 서버를 먼저 실행해주세요."
    : "Cannot connect to server.\nPlease run start.bat to start the backend server.");
}

window.SENA_CONFIG = {
  get backendUrl()     { return _base(); },
  get useRealBackend() { return !!_base(); },
  endpoints: {
    score:          "/api/v1/score",
    chatTurn:       "/api/v1/chat/turn",
    chatReset:      "/api/v1/chat/reset",
    reportGenerate: "/api/v1/report/generate",
    reportDownload: "/api/v1/report/download",
  },
};

function _delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function _rand(min, max, dec = 1) { return +(min + Math.random() * (max - min)).toFixed(dec); }
function _ep(path) { return _base() + path; }

window.SENA_API = window.SENA_API || {};

// ── Pronunciation Scoring ────────────────────────────────────────────────────
window.SENA_API.scorePronunciation = async function (audioBlob, reference, lang = "ko") {
  if (window.SENA_CONFIG.useRealBackend) {
    const fd = new FormData();
    fd.append("audio", audioBlob, "speech.webm");
    fd.append("reference", reference || "");
    fd.append("lang", lang);
    try {
      const r = await fetch(_ep(window.SENA_CONFIG.endpoints.score), { method: "POST", body: fd });
      if (!r.ok) throw new Error(`Score API ${r.status}`);
      return await r.json();
    } catch (e) {
      if (e instanceof TypeError || e.name === "AbortError") _serverOfflineAlert(lang);
      throw e;
    }
  }
  await _delay(1600);
  const articulation = _rand(4.1, 4.9);
  const prosody      = _rand(3.8, 4.7);
  return {
    articulation, prosody,
    overall: +((articulation + prosody) / 2).toFixed(1),
    feedback: lang === "ko" ? [
      "/s/ 발음에서 치찰음이 다소 약합니다. 혀끝을 윗니 뒷쪽에 더 가깝게.",
      "두 번째 음절 'shore'에서 강세가 평탄합니다. 모음 길이를 0.15초 정도 늘려보세요.",
      "전반적인 호흡 그룹은 자연스럽습니다. 좋은 인토네이션입니다.",
    ] : [
      "Your /s/ sibilant is slightly soft. Place tongue tip closer to upper teeth.",
      "Stress on 'shore' is flat — lengthen the vowel by ~0.15s.",
      "Breath groups feel natural. Nice intonation contour overall.",
    ],
  };
};

// ── Chat Turn ────────────────────────────────────────────────────────────────
window.SENA_API.chatTurn = async function ({ level, topic, history, audioBlob, lang = "ko" }) {
  if (window.SENA_CONFIG.useRealBackend) {
    const fd = new FormData();
    fd.append("level",   level);
    fd.append("topic",   topic);
    fd.append("history", JSON.stringify(history));
    fd.append("lang",    lang);
    if (audioBlob && audioBlob.size > 0) fd.append("audio", audioBlob, "user.webm");
    try {
      const r = await fetch(_ep(window.SENA_CONFIG.endpoints.chatTurn), { method: "POST", body: fd });
      if (!r.ok) throw new Error(`Chat API ${r.status}`);
      return await r.json();
    } catch (e) {
      if (e instanceof TypeError || e.name === "AbortError") _serverOfflineAlert(lang);
      throw e;
    }
  }
  await _delay(1400);
  const mockAI = {
    opic:      "Could you walk me through a typical weekend morning routine? Just speak naturally.",
    free:      "So, anything interesting happen this week? Work, friends, anything on your mind.",
    biz:       "Let's roleplay a status meeting. Walk me through what your team accomplished last week.",
    travel:    "You've just landed. The immigration officer asks your purpose of visit. How do you respond?",
    interview: "Let's start — tell me about yourself and what brings you to this role.",
    daily:     "What did you have for breakfast today, and is that typical for you?",
  };
  return {
    userText:       "Well, I usually wake up around 8, brew some coffee, and read for an hour before doing anything else.",
    aiText:         mockAI[topic] || mockAI.opic,
    aiAudioBase64:  "",
    utteranceScore: { articulation: _rand(3.8, 4.7), prosody: _rand(3.6, 4.5) },
  };
};

// ── Reset ────────────────────────────────────────────────────────────────────
window.SENA_API.resetChat = async function ({ level, topic, lang = "ko" }) {
  if (window.SENA_CONFIG.useRealBackend) {
    await fetch(_ep(window.SENA_CONFIG.endpoints.chatReset), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, topic }),
    }).catch(() => {});
  }
};

// ── Report: generate ─────────────────────────────────────────────────────────
window.SENA_API.generateReport = async function ({ history, lang }) {
  if (window.SENA_CONFIG.useRealBackend) {
    const r = await fetch(_ep(window.SENA_CONFIG.endpoints.reportGenerate), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history, lang }),
    });
    if (!r.ok) throw new Error(`Report API ${r.status}`);
    return await r.json(); // { sessionId, report }
  }
  await _delay(2200);
  const ko = lang === "ko";
  return {
    sessionId: "mock-" + Math.random().toString(36).slice(2, 8),
    report: {
      overall: ko
        ? "학습자는 중급 수준의 영어 유창성을 보여주었습니다. 기본적인 문장 구조와 어휘 사용은 양호하나, 시제 일치와 관사 사용에서 개선이 필요합니다. 꾸준한 연습을 통해 충분히 향상될 수 있습니다."
        : "The learner demonstrates solid intermediate-level fluency. Basic sentence structure and vocabulary are good, though tense consistency and article usage could be improved. With regular practice, significant improvement is achievable.",
      grammar: ko ? [
        { issue: "현재·과거 시제 혼용", example: "I wake up early and had coffee.", correction: "I woke up early and had coffee." },
        { issue: "관사 누락", example: "I went to store.", correction: "I went to the store." },
      ] : [
        { issue: "Mixed tenses", example: "I wake up early and had coffee.", correction: "I woke up early and had coffee." },
        { issue: "Missing article", example: "I went to store.", correction: "I went to the store." },
      ],
      vocabulary: ko ? [
        { suggestion: "'very good' 대신 'excellent', 'outstanding'을 사용해보세요." },
        { suggestion: "'go to' 대신 'head to', 'make my way to' 같은 표현이 더 자연스럽습니다." },
      ] : [
        { suggestion: "Instead of 'very good', try 'excellent' or 'outstanding'." },
        { suggestion: "Instead of 'go to', try 'head to' or 'make my way to' for more natural phrasing." },
      ],
      fluency: {
        notes: ko
          ? "전반적인 말의 흐름은 자연스러우나, 복잡한 어휘 앞에서 약간의 망설임이 관찰됩니다. 호흡 단위는 적절하게 유지되었으며 문장 완성도가 좋습니다."
          : "Overall speech flow is natural, with minor hesitation before complex vocabulary. Breath grouping was well maintained and sentence completion was strong.",
      },
    },
  };
};

// ── Report: download Word ────────────────────────────────────────────────────
window.SENA_API.downloadReport = async function (sessionId, lang) {
  if (window.SENA_CONFIG.useRealBackend) {
    const r    = await fetch(_ep(`${window.SENA_CONFIG.endpoints.reportDownload}/${sessionId}`));
    if (!r.ok) throw new Error(`Download ${r.status}`);
    const blob = await r.blob();
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = lang === "ko" ? "SENA_세션리포트.docx" : "SENA_Session_Report.docx";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(a.href);
    return;
  }
  alert(lang === "ko"
    ? "백엔드 서버가 실행 중이지 않습니다. start.bat을 먼저 실행해주세요."
    : "Backend server is not running. Please run start.bat first.");
};

// ── MediaRecorder wrapper ────────────────────────────────────────────────────
window.SENA_API.recorder = function () {
  let mr = null, chunks = [], stream = null;
  return {
    start: async function () {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chunks = [];
        mr = new MediaRecorder(stream);
        mr.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
        mr.start();
      } catch (e) {
        console.warn("[SENA] mic unavailable:", e.message);
        stream = null;
      }
    },
    stop: function () {
      return new Promise(resolve => {
        if (!mr || mr.state === "inactive") {
          resolve(new Blob([], { type: "audio/webm" })); return;
        }
        mr.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/webm" });
          if (stream) stream.getTracks().forEach(t => t.stop());
          resolve(blob);
        };
        mr.stop();
      });
    },
  };
};
