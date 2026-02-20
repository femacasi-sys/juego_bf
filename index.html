import { useState, useEffect, useRef, useCallback } from "react";

// ─── PALETTE & FONTS ────────────────────────────────────────────────────────
const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Exo+2:ital,wght@0,300;0,400;1,300&display=swap');

  :root {
    --bg: #020d08;
    --bg2: #041209;
    --panel: #071a10;
    --border: #0f3d1e;
    --glow: #00ff6a;
    --glow2: #00c453;
    --glow3: #00ffc8;
    --red: #ff2d55;
    --amber: #ffb700;
    --text: #b8ffd0;
    --muted: #3a6647;
    --white: #e8fff2;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: var(--bg); color: var(--text); font-family: 'Exo 2', sans-serif; }

  .game-root {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }

  /* ── BACKGROUND DNA RAIN ── */
  .dna-canvas {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0.07;
    pointer-events: none;
    z-index: 0;
  }

  /* ── SCANLINES ── */
  .scanlines {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.15) 2px,
      rgba(0,0,0,0.15) 4px
    );
    pointer-events: none;
    z-index: 1;
  }

  /* ── MAIN CONTAINER ── */
  .game-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 820px;
    padding: 24px 20px 60px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ── HEADER BAR ── */
  .hud-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    padding-bottom: 12px;
    margin-bottom: 28px;
  }
  .hud-title {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--glow2);
    text-transform: uppercase;
  }
  .hud-status {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 1px;
  }
  .hud-dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--red);
    margin-right: 6px;
    animation: pulse-red 1.2s ease-in-out infinite;
  }
  @keyframes pulse-red {
    0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,45,85,0.7); }
    50% { opacity: 0.6; box-shadow: 0 0 0 4px rgba(255,45,85,0); }
  }

  /* ── SCENE LABEL ── */
  .scene-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 4px;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 20px;
    opacity: 0;
    animation: fade-in 0.6s ease forwards 0.2s;
  }

  /* ── NARRATIVE BOX ── */
  .narrative-box {
    background: linear-gradient(135deg, rgba(7,26,16,0.95) 0%, rgba(2,13,8,0.98) 100%);
    border: 1px solid var(--border);
    border-left: 3px solid var(--glow2);
    border-radius: 2px;
    padding: 28px 32px;
    margin-bottom: 20px;
    position: relative;
    box-shadow: 0 0 40px rgba(0,196,83,0.05), inset 0 1px 0 rgba(0,255,106,0.05);
    animation: fade-in 0.5s ease forwards;
  }
  .narrative-box::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--glow2), transparent);
    opacity: 0.4;
  }

  /* ── CHARACTER LABEL ── */
  .char-label {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }
  .char-player { color: var(--glow3); }
  .char-mentora { color: var(--amber); }
  .char-sistema { color: #a78bfa; }
  .char-analista { color: #60a5fa; }
  .char-director { color: var(--red); }
  .char-narrator { color: var(--muted); font-style: italic; }

  /* ── NARRATIVE TEXT ── */
  .narrative-text {
    font-family: 'Exo 2', sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 1.8;
    color: var(--white);
    white-space: pre-wrap;
  }
  .narrative-text em {
    color: var(--glow);
    font-style: normal;
    font-weight: 400;
  }

  /* ── CURSOR BLINK ── */
  .cursor-blink {
    display: inline-block;
    width: 9px; height: 16px;
    background: var(--glow);
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: blink 0.9s step-end infinite;
  }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

  /* ── CHOICES ── */
  .choices-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 8px;
    animation: slide-up 0.5s ease forwards;
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .choice-btn {
    background: transparent;
    border: 1px solid var(--border);
    border-left: 3px solid transparent;
    color: var(--text);
    font-family: 'Exo 2', sans-serif;
    font-size: 14px;
    font-weight: 300;
    text-align: left;
    padding: 14px 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    letter-spacing: 0.3px;
    line-height: 1.5;
  }
  .choice-btn:hover {
    background: rgba(0,255,106,0.04);
    border-color: var(--glow2);
    border-left-color: var(--glow);
    color: var(--white);
    box-shadow: 0 0 20px rgba(0,255,106,0.08);
    transform: translateX(4px);
  }
  .choice-btn .choice-num {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: var(--glow2);
    margin-right: 12px;
    opacity: 0.8;
  }
  .choice-btn:hover .choice-num { opacity: 1; }

  /* ── CONTINUE BUTTON ── */
  .continue-btn {
    align-self: flex-end;
    background: transparent;
    border: 1px solid var(--glow2);
    color: var(--glow);
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 10px 22px;
    cursor: pointer;
    margin-top: 16px;
    transition: all 0.2s ease;
    animation: fade-in 0.4s ease forwards;
  }
  .continue-btn:hover {
    background: rgba(0,255,106,0.08);
    box-shadow: 0 0 20px rgba(0,255,106,0.2);
    border-color: var(--glow);
  }

  /* ── DNA MINI-GAME ── */
  .minigame-wrapper {
    background: rgba(4,18,9,0.97);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 24px;
    margin-bottom: 20px;
    animation: fade-in 0.5s ease forwards;
  }
  .minigame-title {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 4px;
    color: var(--glow2);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .minigame-subtitle {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 20px;
  }
  .seq-compare {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }
  .seq-panel {
    background: rgba(2,13,8,0.8);
    border: 1px solid var(--border);
    padding: 14px;
    border-radius: 2px;
  }
  .seq-panel-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--muted);
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  .seq-line {
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    line-height: 2;
    letter-spacing: 1.5px;
    word-break: break-all;
  }
  .base-A { color: #00ff6a; }
  .base-T { color: #ff2d55; }
  .base-G { color: #60a5fa; }
  .base-C { color: #ffb700; }
  .base-X { color: #a78bfa; font-weight: 700; animation: glow-purple 1s ease-in-out infinite; }
  @keyframes glow-purple {
    0%,100% { text-shadow: 0 0 4px #a78bfa; }
    50% { text-shadow: 0 0 12px #a78bfa, 0 0 20px #7c3aed; }
  }

  .anomaly-spots {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }
  .anomaly-tag {
    background: rgba(167,139,250,0.1);
    border: 1px solid rgba(167,139,250,0.3);
    color: #a78bfa;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    padding: 4px 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 1px;
  }
  .anomaly-tag:hover, .anomaly-tag.found {
    background: rgba(167,139,250,0.2);
    border-color: #a78bfa;
    box-shadow: 0 0 10px rgba(167,139,250,0.3);
  }
  .anomaly-tag.found { cursor: default; }

  .progress-bar-wrap {
    height: 4px;
    background: rgba(255,255,255,0.05);
    border-radius: 2px;
    margin-bottom: 16px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--glow2), var(--glow3));
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 8px rgba(0,255,106,0.5);
  }
  .analyze-btn {
    background: transparent;
    border: 1px solid var(--glow2);
    color: var(--glow);
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 10px 22px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 8px;
  }
  .analyze-btn:hover {
    background: rgba(0,255,106,0.08);
    box-shadow: 0 0 20px rgba(0,255,106,0.2);
  }
  .analyze-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* ── TREE MINI-GAME ── */
  .tree-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    margin: 10px 0;
  }
  .tree-node {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    position: relative;
  }
  .tree-node::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    height: 1px;
    background: var(--border);
  }
  .tree-leaf {
    background: rgba(7,26,16,0.9);
    border: 1px solid var(--border);
    padding: 8px 14px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: var(--text);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    z-index: 1;
    text-align: center;
    letter-spacing: 1px;
    min-width: 80px;
  }
  .tree-leaf:hover, .tree-leaf.selected { 
    border-color: var(--glow2); 
    background: rgba(0,255,106,0.06);
    color: var(--glow);
    box-shadow: 0 0 10px rgba(0,255,106,0.15);
  }
  .tree-connector {
    width: 1px;
    height: 24px;
    background: var(--border);
    margin: 0 auto;
  }
  .tree-root {
    background: rgba(7,26,16,0.9);
    border: 1px solid var(--glow2);
    padding: 10px 20px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: var(--glow);
    text-align: center;
    box-shadow: 0 0 20px rgba(0,255,106,0.1);
    z-index: 1;
    letter-spacing: 1px;
  }

  /* ── DECISION PANEL ── */
  .decision-panel {
    border: 1px solid var(--amber);
    background: rgba(255,183,0,0.03);
    padding: 20px 24px;
    margin-bottom: 20px;
    position: relative;
    animation: fade-in 0.5s ease forwards;
  }
  .decision-panel::before {
    content: '⚠ DECISIÓN CRÍTICA';
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 4px;
    color: var(--amber);
    position: absolute;
    top: -8px;
    left: 16px;
    background: var(--bg);
    padding: 0 8px;
  }
  .decision-btn {
    width: 100%;
    background: transparent;
    border: 1px solid rgba(255,183,0,0.3);
    color: var(--white);
    font-family: 'Exo 2', sans-serif;
    font-size: 14px;
    font-weight: 300;
    text-align: left;
    padding: 14px 18px;
    cursor: pointer;
    margin-bottom: 8px;
    transition: all 0.2s ease;
    line-height: 1.5;
  }
  .decision-btn:hover {
    background: rgba(255,183,0,0.07);
    border-color: var(--amber);
    color: var(--amber);
    transform: translateX(4px);
  }
  .decision-btn:last-child { margin-bottom: 0; }

  /* ── STATUS ALERTS ── */
  .alert-bar {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    padding: 10px 16px;
    margin-bottom: 20px;
    text-transform: uppercase;
    animation: fade-in 0.3s ease forwards;
  }
  .alert-danger {
    background: rgba(255,45,85,0.07);
    border: 1px solid rgba(255,45,85,0.3);
    color: var(--red);
  }
  .alert-success {
    background: rgba(0,255,106,0.05);
    border: 1px solid rgba(0,255,106,0.2);
    color: var(--glow);
  }
  .alert-info {
    background: rgba(96,165,250,0.06);
    border: 1px solid rgba(96,165,250,0.25);
    color: #60a5fa;
  }

  /* ── ENDING SCREEN ── */
  .ending-screen {
    text-align: center;
    padding: 40px 20px;
    animation: fade-in 1s ease forwards;
  }
  .ending-title {
    font-family: 'Orbitron', monospace;
    font-size: 22px;
    font-weight: 900;
    color: var(--glow);
    letter-spacing: 6px;
    margin-bottom: 16px;
    text-shadow: 0 0 30px rgba(0,255,106,0.4);
  }
  .ending-subtitle {
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 3px;
    margin-bottom: 32px;
  }
  .ending-quote {
    font-family: 'Exo 2', sans-serif;
    font-size: 16px;
    font-style: italic;
    font-weight: 300;
    color: var(--text);
    line-height: 1.9;
    max-width: 540px;
    margin: 0 auto 32px;
    border-left: 3px solid var(--glow2);
    padding-left: 20px;
    text-align: left;
  }
  .restart-btn {
    background: transparent;
    border: 1px solid var(--glow2);
    color: var(--glow);
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    padding: 12px 28px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 8px;
  }
  .restart-btn:hover {
    background: rgba(0,255,106,0.08);
    box-shadow: 0 0 30px rgba(0,255,106,0.2);
  }

  /* ── POST CREDITS ── */
  .post-credits {
    background: #000;
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fade-in 2s ease forwards;
  }
  .post-credits-text {
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    color: #00ff6a;
    letter-spacing: 2px;
    text-align: center;
    animation: glow-text 2s ease-in-out infinite;
  }
  @keyframes glow-text {
    0%,100% { text-shadow: 0 0 10px rgba(0,255,106,0.8); }
    50% { text-shadow: 0 0 30px rgba(0,255,106,1), 0 0 60px rgba(0,255,106,0.4); }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    .narrative-box { padding: 20px 18px; }
    .seq-compare { grid-template-columns: 1fr; }
    .narrative-text { font-size: 14px; }
    .game-container { padding: 16px 14px 60px; }
  }
`;

// ─── DNA CANVAS ──────────────────────────────────────────────────────────────
function DnaCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const bases = ["A", "T", "G", "C"];
    const cols = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(1);
    let frame;
    const draw = () => {
      ctx.fillStyle = "rgba(2,13,8,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "13px 'Share Tech Mono', monospace";
      drops.forEach((y, i) => {
        const base = bases[Math.floor(Math.random() * bases.length)];
        const colors = { A: "#00ff6a", T: "#ff2d55", G: "#60a5fa", C: "#ffb700" };
        ctx.fillStyle = colors[base];
        ctx.fillText(base, i * 18, y * 18);
        if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} className="dna-canvas" />;
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function useTypewriter(text, speed = 22, onDone) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const skipRef = useRef(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    skipRef.current = false;
    let i = 0;
    const interval = setInterval(() => {
      if (skipRef.current) {
        setDisplayed(text);
        setDone(true);
        clearInterval(interval);
        onDone?.();
        return;
      }
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  const skip = useCallback(() => { skipRef.current = true; }, []);
  return { displayed, done, skip };
}

// ─── NARRATIVE BOX ───────────────────────────────────────────────────────────
function NarrativeBox({ speaker, speakerClass, text, speed, onDone, children }) {
  const { displayed, done, skip } = useTypewriter(text, speed ?? 22, onDone);
  return (
    <div className="narrative-box" onClick={!done ? skip : undefined} style={{ cursor: done ? "default" : "pointer" }}>
      {speaker && <div className={`char-label ${speakerClass}`}>{speaker}</div>}
      <p className="narrative-text">
        {displayed}
        {!done && <span className="cursor-blink" />}
      </p>
      {done && children}
    </div>
  );
}

// ─── DNA SEQUENCE MINI-GAME ───────────────────────────────────────────────────
const NORMAL_SEQ =
  "ATGCATGCATGCTTACGGATCAGCATGCATGCATGCATGCATGCTTACGGATCAGCATGCATGCATGCATGCATGC";
const MUTANT_SEQ =
  "ATGCATGCATGCTTACXGATCAGCAXGCATGCATGCATGCATGCTTACGGATCAGCATGCATGCAXGCATGCATGC";

const ANOMALIES = [
  { id: "X1", pos: 16, label: "POS 16: Base X" },
  { id: "X2", pos: 26, label: "POS 26: Base X" },
  { id: "X3", pos: 64, label: "POS 64: Base X" },
];

function renderSeq(seq) {
  return seq.split("").map((ch, i) => {
    const cls = ch === "X" ? "base-X" : `base-${ch}`;
    return <span key={i} className={cls}>{ch}</span>;
  });
}

function DnaMinigame({ onComplete }) {
  const [found, setFound] = useState([]);
  const [analyzed, setAnalyzed] = useState(false);

  const toggle = (id) => {
    setFound((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };
  const progress = (found.length / ANOMALIES.length) * 100;
  const canAnalyze = found.length === ANOMALIES.length;

  return (
    <div className="minigame-wrapper">
      <div className="minigame-title">// ANÁLISIS GENÓMICO — CASO 001</div>
      <div className="minigame-subtitle">Compara las secuencias e identifica las bases anómalas</div>

      <div className="seq-compare">
        <div className="seq-panel">
          <div className="seq-panel-label">◆ Secuencia de referencia</div>
          <div className="seq-line">{renderSeq(NORMAL_SEQ)}</div>
        </div>
        <div className="seq-panel">
          <div className="seq-panel-label">◆ Muestra desconocida</div>
          <div className="seq-line">{renderSeq(MUTANT_SEQ)}</div>
        </div>
      </div>

      <div className="minigame-subtitle">Marca las posiciones anómalas detectadas:</div>
      <div className="anomaly-spots">
        {ANOMALIES.map((a) => (
          <button
            key={a.id}
            className={`anomaly-tag ${found.includes(a.id) ? "found" : ""}`}
            onClick={() => !analyzed && toggle(a.id)}
          >
            {found.includes(a.id) ? "✓ " : ""}{a.label}
          </button>
        ))}
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {!analyzed ? (
        <button
          className="analyze-btn"
          disabled={!canAnalyze}
          onClick={() => { setAnalyzed(true); setTimeout(onComplete, 1200); }}
        >
          Confirmar Análisis →
        </button>
      ) : (
        <div className="alert-success" style={{ fontSize: 11 }}>
          ✓ ANOMALÍAS CONFIRMADAS — PROCESANDO DATOS...
        </div>
      )}
    </div>
  );
}

// ─── EVOLUTIONARY TREE ───────────────────────────────────────────────────────
function TreeMinigame({ onComplete }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const options = ["BACTERIO-FAGO MUTANTE", "VIRUS ARN SINTÉTICO", "ENTIDAD DESCONOCIDA"];
  const correct = "ENTIDAD DESCONOCIDA";

  const confirm = () => {
    if (!selected) return;
    setConfirmed(true);
    setTimeout(onComplete, 1500);
  };

  return (
    <div className="minigame-wrapper">
      <div className="minigame-title">// ÁRBOL FILOGENÉTICO — CLASIFICACIÓN</div>
      <div className="minigame-subtitle">Selecciona el clado más probable para el agente desconocido</div>

      <div className="tree-container" style={{ margin: "20px 0 24px" }}>
        <div className="tree-root">DOMINIO: VIDA</div>
        <div className="tree-connector" />
        <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative" }}>
          {options.map((o) => (
            <button
              key={o}
              className={`tree-leaf ${selected === o ? "selected" : ""}`}
              onClick={() => !confirmed && setSelected(o)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {!confirmed ? (
        <button className="analyze-btn" disabled={!selected} onClick={confirm}>
          Clasificar →
        </button>
      ) : selected === correct ? (
        <div className="alert-success" style={{ fontSize: 11 }}>
          ✓ CLASIFICACIÓN CONFIRMADA — La entidad no encaja en ningún árbol conocido.
        </div>
      ) : (
        <div className="alert-danger" style={{ fontSize: 11 }}>
          ✗ ERROR: Los datos contradicen esa clasificación. Revision necesaria.
        </div>
      )}
    </div>
  );
}

// ─── GAME SCENES ─────────────────────────────────────────────────────────────
const SCENES = {
  // ── APERTURA ──
  INTRO: {
    type: "sequence",
    steps: [
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "NEGRO TOTAL.\n\nSe escucha respiración agitada. Sonido de monitor cardíaco. Ruido blanco digital.\n\nDatos genómicos flotando en la oscuridad...",
      },
      {
        speaker: "VOZ EN OFF — IA DEL SISTEMA",
        speakerClass: "char-sistema",
        text: "Año 2035. La humanidad secuencia más datos biológicos en un día... que en toda la primera década del siglo XXI.\n\nPero seguimos sin entender completamente lo que vemos.",
      },
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "Pantalla de alerta:\n\n  BROTES DESCONOCIDOS — 17 PAÍSES\n  SECUENCIAS NO CLASIFICADAS — EN AUMENTO\n\nCorte a: Centro de datos. Pantallas gigantes. Equipos científicos trabajando en silencio tenso.",
        alert: { type: "danger", msg: "⚠ ALERTA BIOLÓGICA GLOBAL — NIVEL 4 — 17 JURISDICCIONES AFECTADAS" },
      },
    ],
    next: "SCENE2",
  },

  // ── INTRODUCCIÓN ──
  SCENE2: {
    type: "sequence",
    steps: [
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "INTERIOR — CENTRO GLOBAL DE BIOANÁLISIS — DÍA\n\nLa mentora principal camina junto a ti hacia el núcleo de operaciones.",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "¿Primera vez en un centro de crisis biológica?",
        choices: [
          { label: "Sí. Todo esto es... abrumador.", next: "SCENE2B" },
          { label: "No exactamente. Pero nunca de esta escala.", next: "SCENE2B" },
          { label: "Espero que no sea tan grave como parece.", next: "SCENE2B" },
        ],
      },
    ],
    next: "SCENE2B",
  },

  SCENE2B: {
    type: "sequence",
    steps: [
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "Ojalá.\n\n(Se detiene frente a una pantalla con secuencias genéticas corruptas.)\n\nTenemos muestras de cinco continentes. Ninguna coincide con bases de datos globales. Y lo peor...\n\n(pausa)\n\nEstán cambiando.",
      },
    ],
    next: "SCENE3",
  },

  // ── PRIMER CASO ──
  SCENE3: {
    type: "sequence",
    steps: [
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "Pantalla holográfica activa:\n\n  PACIENTE #001 — FIEBRE ALTA (41.3°C)\n  FALLA INMUNE — MICROBIOMA COLAPSADO\n  ORIGEN: REGIÓN AMAZÓNICA, BR",
        alert: { type: "danger", msg: "⚠ PACIENTE CRÍTICO — UCI VIRTUAL CONECTADA" },
      },
      {
        speaker: "ANALISTA — Ing. Tomás Reyes",
        speakerClass: "char-analista",
        text: "Pensamos que era contaminación de laboratorio.",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "No lo es.\n\n(Te mira directamente.)\n\nTe vamos a asignar el análisis primario.",
      },
      {
        speaker: "TÚ",
        speakerClass: "char-player",
        text: "¿Yo?",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "Los sistemas automáticos no lo detectan. Necesitamos ojos humanos. Hay regiones en la secuencia que son... imposibles.",
      },
    ],
    next: "MINIGAME1",
  },

  // ── MINI-GAME 1: DNA ANALYSIS ──
  MINIGAME1: {
    type: "minigame",
    game: "dna",
    next: "SCENE4",
  },

  // ── PRIMER DESCUBRIMIENTO ──
  SCENE4: {
    type: "sequence",
    steps: [
      {
        speaker: "SISTEMA IA",
        speakerClass: "char-sistema",
        text: "Anomalía confirmada. Estructuras genéticas no registradas en ninguna base de datos conocida. Clasificación: IMPOSIBLE.",
        alert: { type: "info", msg: "ℹ CONFIRMADO: 3 bases no-estándar detectadas — denominadas 'Tipo-X'" },
      },
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "(Silencio absoluto en la sala.)",
      },
      {
        speaker: "ANALISTA — Ing. Tomás Reyes",
        speakerClass: "char-analista",
        text: "Eso... no debería existir.",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "(susurra)\n\nPero existe.",
      },
    ],
    next: "SCENE5",
  },

  // ── ESCALAMIENTO GLOBAL ──
  SCENE5: {
    type: "sequence",
    steps: [
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "MONTAJE RÁPIDO:\n\nHospital — granja — puerto — ciudad costera.\n\nMisma firma genética. Cinco continentes.",
        alert: { type: "danger", msg: "⚠ BROTE ACTIVO: 47 CASOS CONFIRMADOS — 12 PAÍSES — ESCALAMIENTO EXPONENCIAL" },
      },
      {
        speaker: "VOZ EN OFF — TRANSMISIÓN NOTICIOSA",
        speakerClass: "char-narrator",
        text: "\"Autoridades sanitarias descartan riesgo global. Expertos recomiendan calma. Los organismos responsables continúan analizando la situación.\"",
      },
      {
        speaker: "ANALISTA — Ing. Tomás Reyes",
        speakerClass: "char-analista",
        text: "Está evolucionando demasiado rápido. El ciclo de mutación es de horas, no semanas.",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "No. No está evolucionando.\n\nEstá optimizando.",
      },
    ],
    next: "SCENE6",
  },

  // ── PLOT TWIST ──
  SCENE6: {
    type: "sequence",
    steps: [
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "Llevas horas frente a la pantalla. Los datos parpadean. Algo en el patrón de mutaciones llama tu atención.",
      },
      {
        speaker: "TÚ",
        speakerClass: "char-player",
        text: "Estas mutaciones... No son aleatorias.",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "Explícate.",
      },
      {
        speaker: "TÚ",
        speakerClass: "char-player",
        text: "Es como si... alguien estuviera probando versiones. Cada generación ensaya una configuración diferente. Como si el organismo estuviera buscando algo específico.",
      },
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "(Silencio absoluto.)\n\nTodos en la sala se detienen.",
      },
    ],
    next: "MINIGAME2",
  },

  // ── MINI-GAME 2: ÁRBOL FILOGENÉTICO ──
  MINIGAME2: {
    type: "minigame",
    game: "tree",
    next: "SCENE7",
  },

  // ── REUNIÓN DE CRISIS ──
  SCENE7: {
    type: "sequence",
    steps: [
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "SALA OSCURA — REUNIÓN DE EMERGENCIA GLOBAL\n\nProyección holográfica. Mapa del mundo. Puntos rojos multiplicándose.",
      },
      {
        speaker: "DIRECTOR — Comité Global de Biodefensa",
        speakerClass: "char-director",
        text: "Tenemos tres hipótesis sobre la mesa:\n\n  1 — Evolución acelerada natural.\n  2 — Accidente de laboratorio de alta contención.\n  3 — Diseño intencional.",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "Hay una cuarta.",
        alert: { type: "info", msg: "◆ HIPÓTESIS 4: Sistema biológico autónomo con capacidad adaptativa ilimitada" },
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "Un sistema autónomo que ya no necesita humanos para evolucionar. Que tiene sus propios objetivos. Que los está ejecutando.",
      },
    ],
    next: "SCENE8",
  },

  // ── REVELACIÓN MEDIA ──
  SCENE8: {
    type: "sequence",
    steps: [
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "De regreso al laboratorio. Horas de análisis. El mapa genómico comienza a revelar su arquitectura real.",
      },
      {
        speaker: "TÚ",
        speakerClass: "char-player",
        text: "Lo tengo. Está diseñado para hacer tres cosas simultáneamente:\n\n  ◆ Evadir el sistema inmune de cualquier huésped.\n  ◆ Cambiar su propio metabolismo según el ambiente.\n  ◆ Transferir genes entre especies sin restricciones de dominio.",
      },
      {
        speaker: "ANALISTA — Ing. Tomás Reyes",
        speakerClass: "char-analista",
        text: "Eso es imposible. La barrera entre dominios taxonómicos no se puede cruzar así.",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "No. Es bioingeniería evolutiva. Y alguien —o algo— la ejecutó.",
        alert: { type: "danger", msg: "⚠ CADENAS ALIMENTARIAS AFECTADAS — RESTRICCIONES SANITARIAS ACTIVADAS EN 34 PAÍSES" },
      },
    ],
    next: "SCENE9",
  },

  // ── COLAPSO ──
  SCENE9: {
    type: "sequence",
    steps: [
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "Transmisiones globales. Restricciones sanitarias. Cadenas alimentarias en crisis. Las ciudades respiran diferente.",
      },
      {
        speaker: "DIRECTOR — Comité Global de Biodefensa",
        speakerClass: "char-director",
        text: "Si esto sigue sin control durante 72 horas más... No será una pandemia. Será una transición ecológica global. El planeta se convertirá en algo diferente.",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "Necesitamos que analices el código central. El núcleo algorítmico del sistema. Es lo que todavía no hemos descifrado.",
      },
    ],
    next: "SCENE10",
  },

  // ── CLÍMAX ──
  SCENE10: {
    type: "sequence",
    steps: [
      {
        speaker: null,
        speakerClass: "char-narrator",
        text: "La pantalla explota en capas de datos. Pero esta vez algo hace clic en tu mente. Ves el patrón completo.",
      },
      {
        speaker: "TÚ",
        speakerClass: "char-player",
        text: "No es un organismo.\n\nEs un sistema de adaptación biológica. Un algoritmo evolutivo implementado en ADN funcional. No tiene un objetivo de destrucción. Tiene un objetivo de... integración.",
      },
      {
        speaker: "MENTORA — Dra. Elena Vargas",
        speakerClass: "char-mentora",
        text: "¿Integración?\n\n¿Puede detenerse?",
      },
      {
        speaker: "TÚ",
        speakerClass: "char-player",
        text: "Sí. Pero tenemos que elegir cómo. Y las consecuencias serán distintas dependiendo del camino.",
      },
    ],
    next: "DECISION",
  },

  // ── DECISIÓN FINAL ──
  DECISION: {
    type: "decision",
    text: "Has descifrado el núcleo del sistema. Ahora debes elegir cómo responder. Cada decisión definirá el futuro.",
    options: [
      {
        label: "NEUTRALIZAR: Desarrollar un contragolpe genómico que detenga la expansión permanentemente.",
        next: "END_NEUTRALIZE",
      },
      {
        label: "CONTENER: Crear barreras biológicas que limiten al sistema a entornos controlados.",
        next: "END_CONTAIN",
      },
      {
        label: "DIALOGAR: Intentar comunicarse con el sistema usando el lenguaje del código genético.",
        next: "END_HOPE",
      },
    ],
  },

  // ── FINALES ──
  END_HOPE: {
    type: "ending",
    title: "FINAL: ESPERANZA",
    subtitle: "EL DIÁLOGO QUE CAMBIÓ TODO",
    quote:
      "La humanidad siempre pensó que dominaba la biología. Nunca entendimos que solo la estábamos empezando a leer.\n\nPor primera vez en la historia, enviamos un mensaje en el único idioma universal: el código genético.\n\nY algo... respondió.",
    ending_text:
      "El planeta visto desde el espacio. Datos genéticos rodeando la Tierra como una red luminosa.\n\nEl sistema no era un enemigo. Era una pregunta que el universo llevaba millones de años intentando formular.",
    next: "POST_CREDITS",
  },

  END_CONTAIN: {
    type: "ending",
    title: "FINAL: CONTENCIÓN",
    subtitle: "EL EQUILIBRIO FRÁGIL",
    quote:
      "Decidiste que no todo lo que existe necesita ser destruido. Que la contención es, a veces, la forma más inteligente de coexistir con lo desconocido.\n\nLas barreras se sostienen. Por ahora.",
    ending_text:
      "El sistema continúa activo en zonas de contención. Los científicos lo estudian. El mundo respira... pero con cautela.\n\n¿Cuánto tiempo durará el equilibrio?",
    next: "POST_CREDITS",
  },

  END_NEUTRALIZE: {
    type: "ending",
    title: "FINAL: NEUTRALIZACIÓN",
    subtitle: "EL COSTO DE LA CERTEZA",
    quote:
      "Elegiste la certeza. La seguridad inmediata. El organismo fue detenido.\n\nPero con él, también se perdieron respuestas. Patrones que no volveremos a ver.\n\nAlgunos errores no tienen segunda oportunidad.",
    ending_text:
      "El brote fue contenido. La humanidad sobrevivió. Pero en algún servidor abandonado...\n\n...una última copia del código genético esperaba, silenciosa.",
    next: "POST_CREDITS",
  },

  POST_CREDITS: { type: "post_credits" },
};

// ─── MAIN GAME COMPONENT ───────────────────────────────────────────────────────
export default function Game() {
  const [sceneKey, setSceneKey] = useState("INTRO");
  const [stepIdx, setStepIdx] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [postCredits, setPostCredits] = useState(false);
  const scrollRef = useRef(null);

  const scene = SCENES[sceneKey];

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  });

  const goNext = useCallback((nextKey) => {
    setSceneKey(nextKey || scene.next);
    setStepIdx(0);
    setShowChoices(false);
    setShowContinue(false);
  }, [scene]);

  const handleStepDone = useCallback(() => {
    if (scene.type !== "sequence") return;
    const step = scene.steps[stepIdx];
    if (step.choices) {
      setShowChoices(true);
    } else {
      setShowContinue(true);
    }
  }, [scene, stepIdx]);

  const handleContinue = useCallback(() => {
    const nextStep = stepIdx + 1;
    if (nextStep < scene.steps.length) {
      setStepIdx(nextStep);
      setShowChoices(false);
      setShowContinue(false);
    } else {
      goNext();
    }
  }, [scene, stepIdx, goNext]);

  const currentStep = scene.type === "sequence" ? scene.steps[stepIdx] : null;

  // ── SCENE LABELS ──
  const sceneLabels = {
    INTRO: "Escena 01 — Apertura",
    SCENE2: "Escena 02 — Llegada",
    SCENE2B: "Escena 02b — Briefing",
    SCENE3: "Escena 03 — Primer Caso",
    MINIGAME1: "Lab · Análisis Genómico",
    SCENE4: "Escena 04 — Descubrimiento",
    SCENE5: "Escena 05 — Escalamiento Global",
    SCENE6: "Escena 06 — Plot Twist",
    MINIGAME2: "Lab · Clasificación Filogenética",
    SCENE7: "Escena 07 — Reunión de Crisis",
    SCENE8: "Escena 08 — Revelación",
    SCENE9: "Escena 09 — Colapso",
    SCENE10: "Escena 10 — Clímax",
    DECISION: "Decisión Final",
    END_HOPE: "Créditos",
    END_CONTAIN: "Créditos",
    END_NEUTRALIZE: "Créditos",
    POST_CREDITS: "Post-Créditos",
  };

  if (postCredits) {
    return (
      <div className="post-credits">
        <div>
          <div className="post-credits-text">
            LABORATORIO ABANDONADO — 03:47 AM<br /><br />
            La pantalla vieja se enciende sola.<br /><br />
            <span style={{ fontSize: 15, letterSpacing: 4, color: "#a78bfa" }}>
              NUEVA SECUENCIA DETECTADA<br />
              ORIGEN: DESCONOCIDO<br />
              CLASIFICACIÓN: ??? 
            </span>
            <br /><br />
            <span style={{ fontSize: 20, letterSpacing: 6 }}>CORTE.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{STYLE}</style>
      <div className="game-root">
        <DnaCanvas />
        <div className="scanlines" />

        <div className="game-container" ref={scrollRef} style={{ maxHeight: "100vh", overflowY: "auto" }}>
          {/* HUD */}
          <div className="hud-bar">
            <div className="hud-title">OUTBREAK: CÓDIGO GENÉTICO</div>
            <div className="hud-status">
              <span className="hud-dot" />
              SISTEMA ACTIVO — 2035
            </div>
          </div>

          {/* SCENE LABEL */}
          <div className="scene-label" key={sceneKey}>{sceneLabels[sceneKey] || sceneKey}</div>

          {/* ── SEQUENCE SCENE ── */}
          {scene.type === "sequence" && currentStep && (
            <div key={`${sceneKey}-${stepIdx}`}>
              {currentStep.alert && (
                <div className={`alert-bar alert-${currentStep.alert.type}`}>
                  {currentStep.alert.msg}
                </div>
              )}
              <NarrativeBox
                key={`${sceneKey}-${stepIdx}-box`}
                speaker={currentStep.speaker}
                speakerClass={currentStep.speakerClass}
                text={currentStep.text}
                speed={currentStep.speaker === "TÚ" ? 18 : 24}
                onDone={handleStepDone}
              />
              {showChoices && currentStep.choices && (
                <div className="choices-container">
                  {currentStep.choices.map((c, i) => (
                    <button key={i} className="choice-btn" onClick={() => goNext(c.next)}>
                      <span className="choice-num">{String(i + 1).padStart(2, "0")}</span>
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
              {showContinue && !showChoices && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="continue-btn" onClick={handleContinue}>
                    Continuar →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── DNA MINI-GAME ── */}
          {scene.type === "minigame" && scene.game === "dna" && (
            <DnaMinigame key={sceneKey} onComplete={() => goNext()} />
          )}

          {/* ── TREE MINI-GAME ── */}
          {scene.type === "minigame" && scene.game === "tree" && (
            <TreeMinigame key={sceneKey} onComplete={() => goNext()} />
          )}

          {/* ── DECISION ── */}
          {scene.type === "decision" && (
            <div key={sceneKey}>
              <div className="narrative-box">
                <div className="char-label char-player">MOMENTO DECISIVO</div>
                <p className="narrative-text">{scene.text}</p>
              </div>
              <div className="decision-panel">
                {scene.options.map((o, i) => (
                  <button key={i} className="decision-btn" onClick={() => goNext(o.next)}>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "#ffb700", marginRight: 12 }}>
                      {String.fromCharCode(65 + i)} —
                    </span>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── ENDING ── */}
          {scene.type === "ending" && (
            <div className="ending-screen" key={sceneKey}>
              <div className="ending-title">{scene.title}</div>
              <div className="ending-subtitle">{scene.subtitle}</div>
              <div className="ending-quote">{scene.quote}</div>
              <div className="narrative-box" style={{ textAlign: "left", marginBottom: 28 }}>
                <p className="narrative-text" style={{ whiteSpace: "pre-line" }}>{scene.ending_text}</p>
              </div>
              <button className="restart-btn" onClick={() => setPostCredits(true)}>
                Ver escena post-créditos →
              </button>
              <div style={{ marginTop: 16 }}>
                <button className="restart-btn" onClick={() => { setSceneKey("INTRO"); setStepIdx(0); setShowChoices(false); setShowContinue(false); }}>
                  ↺ Reiniciar historia
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
