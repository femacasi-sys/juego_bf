/* ═══════════════════════════════════════════
   OUTBREAK: CÓDIGO GENÉTICO — Game Logic v3
   ═══════════════════════════════════════════ */

const { useState, useEffect, useRef, useCallback } = React;
const MAX_LIVES = 3;

function useMounted() {
  const ref = useRef(true);
  useEffect(() => () => { ref.current = false; }, []);
  return ref;
}

// ── DNA RAIN ──────────────────────────────────
function DnaCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    c.width = window.innerWidth; c.height = window.innerHeight;
    const bases = ["A","T","G","C"];
    const colors = { A:"#00ff6a", T:"#ff2d55", G:"#60a5fa", C:"#ffb700" };
    const cols = Math.floor(c.width / 18);
    const drops = Array(cols).fill(1);
    let frame;
    const draw = () => {
      ctx.fillStyle = "rgba(2,13,8,0.05)";
      ctx.fillRect(0,0,c.width,c.height);
      ctx.font = "12px 'Share Tech Mono', monospace";
      drops.forEach((y,i) => {
        const b = bases[Math.floor(Math.random()*bases.length)];
        ctx.fillStyle = colors[b];
        ctx.fillText(b, i*18, y*18);
        if (y*18 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} className="dna-canvas" />;
}

// ── TYPEWRITER ────────────────────────────────
function useTypewriter(text, speed, onDone) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const skipRef = useRef(false);
  useEffect(() => {
    setDisplayed(""); setDone(false); skipRef.current = false;
    let i = 0;
    const iv = setInterval(() => {
      if (skipRef.current) {
        setDisplayed(text); setDone(true);
        clearInterval(iv); onDone && onDone(); return;
      }
      i++; setDisplayed(text.slice(0,i));
      if (i >= text.length) { setDone(true); clearInterval(iv); onDone && onDone(); }
    }, speed || 20);
    return () => clearInterval(iv);
  }, [text]);
  return { displayed, done, skip: () => { skipRef.current = true; } };
}

function AlertBar({ type, msg }) {
  useEffect(() => {
    try {
      if (!window.AudioEngine) return;
      if (type === "danger") window.AudioEngine.play("alertDanger");
      else window.AudioEngine.play("alertInfo");
    } catch(e) {}
  }, [msg]);
  return <div className={`alert-bar alert-${type}`}>{msg}</div>;
}

function NarrativeBox({ speaker, speakerClass, text, speed, onDone, children }) {
  const prevLen = useRef(0);
  const { displayed, done, skip } = useTypewriter(text, speed || 20, onDone);
  useEffect(() => {
    try {
      if (window.AudioEngine && displayed.length > prevLen.current && displayed.length % 4 === 0)
        window.AudioEngine.play("keyClick");
    } catch(e) {}
    prevLen.current = displayed.length;
  }, [displayed]);
  const svgPortrait = window.PORTRAIT_DATA && window.PORTRAIT_DATA[speakerClass];
  return (
    <div className={"narrative-box" + (svgPortrait ? " has-portrait" : "")}
      onClick={!done ? skip : undefined} style={{cursor: done ? "default" : "pointer"}}>
      {svgPortrait && (
        <div className="portrait-wrap" dangerouslySetInnerHTML={{__html: svgPortrait}} />
      )}
      <div className="narrative-content">
        {speaker && <div className={`char-label ${speakerClass}`}>{speaker}</div>}
        <p className="narrative-text">{displayed}{!done && <span className="cursor-blink" />}</p>
        {done && children}
      </div>
    </div>
  );
}

// ── LIVES HUD ─────────────────────────────────
function LivesDisplay({ lives }) {
  return (
    <div className="hud-lives">
      <span className="hud-lives-label">VIDAS</span>
      {Array.from({length: MAX_LIVES}).map((_,i) => (
        <div key={i} className={`life-dna ${i < lives ? "active" : "lost"}`}>
          <div className="strand" /><div className="strand" /><div className="strand" />
        </div>
      ))}
    </div>
  );
}

// ── PENALTY BOX ───────────────────────────────
function PenaltyBox({ penalty, onClose }) {
  useEffect(() => { try { window.AudioEngine && window.AudioEngine.play("lifeLost"); } catch(e){} }, []);
  return (
    <div>
      <div className="life-lost-overlay" />
      <div className="penalty-box">
        <div className="penalty-title">⚠ ANÁLISIS INCORRECTO — VIDA PERDIDA</div>
        <div className="penalty-text">
          <strong>Error:</strong> {penalty.reason}<br/><br/>
          <strong>Concepto clave:</strong> {penalty.lesson}
        </div>
      </div>
      <div className="continue-wrap">
        <button className="continue-btn" onClick={onClose}>Continuar →</button>
      </div>
    </div>
  );
}

// ── GAME OVER ─────────────────────────────────
function GameOverScreen({ reason, lesson, onRetry, onRestart }) {
  useEffect(() => { try { window.AudioEngine && window.AudioEngine.play("gameOver"); } catch(e){} }, []);
  return (
    <div className="game-over-screen">
      <div className="go-glitch">GAME OVER</div>
      <div className="go-subtitle">MISIÓN FALLIDA — EL BROTE NO FUE CONTENIDO</div>
      {reason && (
        <div className="go-reason-box">
          <div className="go-reason-label">◆ ¿Qué salió mal?</div>
          <div className="go-reason-text">{reason}</div>
        </div>
      )}
      {lesson && (
        <div className="go-lesson-box">
          <div className="go-lesson-label">◆ Concepto para recordar</div>
          <div className="go-lesson-text">{lesson}</div>
        </div>
      )}
      <div className="go-buttons">
        <button className="go-btn go-btn-retry" onClick={onRetry}>↺ Reintentar minijuego</button>
        <button className="go-btn go-btn-restart" onClick={onRestart}>⟳ Reiniciar historia</button>
      </div>
    </div>
  );
}

// ── HINT BUTTON ───────────────────────────────
function HintBtn({ hint, onUse, disabled }) {
  const [shown, setShown] = useState(false);
  return (
    <div style={{marginBottom:10}}>
      <button className="hint-btn" disabled={disabled || shown}
        onClick={() => { setShown(true); onUse && onUse(); }}>
        {shown ? "✓ PISTA USADA" : "💡 PISTA (−5 pts)"}
      </button>
      {shown && <div className="hint-box">{hint}</div>}
    </div>
  );
}

// ── COUNTDOWN TIMER ───────────────────────────
function CountdownTimer({ seconds, onExpire, paused }) {
  const [remaining, setRemaining] = useState(seconds);
  const mounted = useMounted();
  const expiredRef = useRef(false);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => {
      if (!mounted.current) { clearInterval(iv); return; }
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(iv);
          if (!expiredRef.current) {
            expiredRef.current = true;
            setTimeout(() => { if (mounted.current) onExpire(); }, 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [paused]);

  const pct = (remaining / seconds) * 100;
  const color = remaining > 30 ? "var(--glow2)" : remaining > 10 ? "var(--amber)" : "var(--red)";
  return (
    <div className="timer-wrap">
      <div className="timer-label" style={{color}}>⏱ {remaining}s</div>
      <div className="timer-bar-bg">
        <div className="timer-bar-fill" style={{width:`${pct}%`, background:color}} />
      </div>
    </div>
  );
}

// ── SEQUENCE DIFF RENDERER ────────────────────
function SeqDiff({ refSeq, mutSeq }) {
  const ref = refSeq.replace(/[\s]/g,"");
  const mut = mutSeq.replace(/[\s-]/g,"");
  const maxLen = Math.max(ref.length, mut.length);
  const refSpans = [], mutSpans = [];
  for (let i = 0; i < maxLen; i++) {
    const r = ref[i], m = mut[i];
    if (r === undefined) {
      refSpans.push(<span key={i} className="diff-gap">·</span>);
      mutSpans.push(<span key={i} className="base-inserted">{m}</span>);
    } else if (m === undefined) {
      refSpans.push(<span key={i} className="diff-deleted">{r}</span>);
      mutSpans.push(<span key={i} className="diff-gap">∅</span>);
    } else if (r !== m) {
      refSpans.push(<span key={i} className="diff-ref-changed">{r}</span>);
      mutSpans.push(<span key={i} className="diff-mut-changed">{m}</span>);
    } else {
      refSpans.push(<span key={i} className={`base-${r}`}>{r}</span>);
      mutSpans.push(<span key={i} className={`base-${m}`}>{m}</span>);
    }
  }
  return (
    <div className="seq-diff-block">
      <div className="seq-diff-row">
        <span className="seq-diff-tag">REF:</span>
        <span className="seq-diff-bases">{refSpans}</span>
      </div>
      <div className="seq-diff-row">
        <span className="seq-diff-tag">MUT:</span>
        <span className="seq-diff-bases">{mutSpans}</span>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// MG1 — BLAST ALIGNMENT
// ══════════════════════════════════════════════
function BlastMinigame({ onComplete, onLoseLive, onScoreBonus }) {
  const d = window.MG1_DATA;
  const mounted = useMounted();
  const [selectedHit, setSelectedHit] = useState(null);
  const [hitSubmitted, setHitSubmitted] = useState(false);
  const [mutAnswer, setMutAnswer] = useState(null);
  const [mutSubmitted, setMutSubmitted] = useState(false);
  const [phase, setPhase] = useState("hit");

  const submitHit = () => {
    if (!selectedHit) return;
    setHitSubmitted(true);
    const hit = d.hits.find(h => h.id === selectedHit);
    if (hit.correct) {
      onScoreBonus(30, "+30 pts — hit correcto");
    } else {
      onLoseLive({
        reason: hit.explanation,
        lesson: "En BLAST: E-value bajo = hit significativo. 2e-18 significa probabilidad casi nula de ser por azar. 5e-4 ocurre frecuentemente al azar. También: mayor % identidad y score más alto indican mejor alineamiento."
      });
    }
    setTimeout(() => { if (mounted.current) setPhase("mut"); }, 800);
  };

  const submitMut = () => {
    if (mutAnswer === null) return;
    setMutSubmitted(true);
    if (mutAnswer !== d.mutTypeQ.correct) {
      onLoseLive({
        reason: `Seleccionaste: "${d.mutTypeQ.options[mutAnswer]}". Correcto: "${d.mutTypeQ.options[d.mutTypeQ.correct]}"`,
        lesson: d.mutTypeQ.explanation
      });
    } else {
      onScoreBonus(20, "+20 pts — mutación clasificada");
    }
    setTimeout(() => { if (mounted.current) onComplete(); }, 1200);
  };

  return (
    <div className="minigame-wrapper">
      <div className="mg-header">
        <div className="mg-title">{d.title}</div>
        <div className="mg-subtitle">{d.subtitle}</div>
        <div className="mg-lives-warning">{d.lives_warning}</div>
      </div>
      <div className="blast-legend">
        <span><span style={{color:"var(--amber)"}}>E-value</span>: prob. de hit por azar — más bajo = mejor</span>
        <span><span style={{color:"var(--glow3)"}}>Identidad</span>: % bases iguales</span>
        <span><span style={{color:"var(--purple)"}}>Score</span>: puntuación total del alineamiento</span>
      </div>
      <div className="blast-query">
        <div className="blast-query-label">{d.query.label}</div>
        <div className="blast-seq">
          {d.query.seq.split("").map((b,i) => <span key={i} className={`base-${b}`}>{b}</span>)}
        </div>
      </div>

      {(phase === "hit" || hitSubmitted) && (
        <>
          <div className="mg-section-label">◆ Resultados BLAST — Selecciona el hit más significativo:</div>
          <HintBtn
            hint="Ordena por E-value de menor a mayor. El hit con E-value más bajo y mayor % identidad es el mejor candidato filogenéticamente."
            onUse={() => onScoreBonus(-5, "Pista usada −5 pts")}
            disabled={hitSubmitted}
          />
          <div className="blast-hits">
            {d.hits.map(hit => {
              const isSel = selectedHit === hit.id;
              const isOk  = hitSubmitted && hit.correct;
              const isBad = hitSubmitted && isSel && !hit.correct;
              return (
                <div key={hit.id}
                  className={`blast-hit ${isSel?"selected":""} ${isOk?"correct":""} ${isBad?"wrong":""}`}
                  onClick={() => !hitSubmitted && setSelectedHit(hit.id)}
                >
                  <div className="hit-meta">
                    <span className="hit-org">[{hit.id}] {hit.organism}</span>
                    <span className="hit-badge evalue">E: {hit.evalue}</span>
                    <span className="hit-badge identity">ID: {hit.identity}</span>
                    <span className="hit-badge score">Score: {hit.score}</span>
                  </div>
                  <SeqDiff refSeq={hit.ref} mutSeq={hit.query} />
                  <div className="align-identity-bar">
                    {hit.ref.split("").map((rCh,i) => {
                      const qCh = (hit.query.replace(/[\s]/g,""))[i] || "-";
                      return <span key={i} style={{
                        display:"inline-block", width:6, height:4,
                        background: rCh===qCh ? "var(--glow2)" : "var(--red)"
                      }} />;
                    })}
                    <span style={{fontSize:9, color:"var(--muted)", marginLeft:6, fontFamily:"'Share Tech Mono',monospace"}}>
                      identidad visual
                    </span>
                  </div>
                  {hitSubmitted && (
                    <div style={{marginTop:8, fontSize:11, lineHeight:1.5,
                      color: hit.correct ? "var(--glow)" : "var(--red)",
                      fontFamily:"'Exo 2',sans-serif"}}>
                      {hit.correct ? "✓ " : "✗ "}{hit.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {!hitSubmitted && (
            <button className="action-btn" disabled={!selectedHit} onClick={submitHit}>
              Confirmar hit →
            </button>
          )}
        </>
      )}

      {phase === "mut" && (
        <div style={{marginTop:16, animation:"fade-in 0.4s ease forwards"}}>
          <div className="mg-section-label">◆ {d.mutTypeQ.question}</div>
          <HintBtn
            hint="Un SNP cambia exactamente 1 base. Una inserción agrega bases (secuencia más larga). Una deleción quita bases (secuencia más corta). Frameshift: inserción o deleción que no es múltiplo de 3."
            onUse={() => onScoreBonus(-5, "Pista usada −5 pts")}
            disabled={mutSubmitted}
          />
          <div className="choices-container">
            {d.mutTypeQ.options.map((opt, i) => (
              <button key={i}
                className={`choice-btn ${mutAnswer===i?"selected":""} ${mutSubmitted && i===d.mutTypeQ.correct?"correct":""} ${mutSubmitted && mutAnswer===i && i!==d.mutTypeQ.correct?"wrong":""}`}
                onClick={() => !mutSubmitted && setMutAnswer(i)}
                disabled={mutSubmitted}
              >
                <span className="choice-num">{String(i+1).padStart(2,"0")}</span>{opt}
              </button>
            ))}
          </div>
          {mutSubmitted && <div className="alert-info" style={{marginTop:10,fontSize:11}}>{d.mutTypeQ.explanation}</div>}
          {!mutSubmitted && <button className="action-btn" disabled={mutAnswer===null} onClick={submitMut} style={{marginTop:10}}>Clasificar mutación →</button>}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// MG2 — CODON TRANSLATION
// ══════════════════════════════════════════════
const CODON_LOOKUP = {
  AUG:"Met",UUU:"Phe",UUC:"Phe",UUA:"Leu",UUG:"Leu",
  CUU:"Leu",CUC:"Leu",CUA:"Leu",CUG:"Leu",AUU:"Ile",AUC:"Ile",AUA:"Ile",
  GUU:"Val",GUC:"Val",GUA:"Val",GUG:"Val",UCU:"Ser",UCC:"Ser",UCA:"Ser",UCG:"Ser",
  CCU:"Pro",CCC:"Pro",CCA:"Pro",CCG:"Pro",ACU:"Thr",ACC:"Thr",ACA:"Thr",ACG:"Thr",
  GCU:"Ala",GCC:"Ala",GCA:"Ala",GCG:"Ala",UAU:"Tyr",UAC:"Tyr",
  CAU:"His",CAC:"His",CAA:"Gln",CAG:"Gln",AAU:"Asn",AAC:"Asn",AAA:"Lys",AAG:"Lys",
  GAU:"Asp",GAC:"Asp",GAA:"Glu",GAG:"Glu",UGU:"Cys",UGC:"Cys",UGG:"Trp",
  CGU:"Arg",CGC:"Arg",CGA:"Arg",CGG:"Arg",AGU:"Ser",AGC:"Ser",AGA:"Arg",AGG:"Arg",
  GGU:"Gly",GGC:"Gly",GGA:"Gly",GGG:"Gly",UAA:"STOP",UAG:"STOP",UGA:"STOP",
};

const CODON_TABLE_ROWS = [
  [["AUG","Met(inicio)"],["CAG","Gln"],  ["GAU","Asp"],  ["UGG","Trp"]],
  [["UUU","Phe"],         ["CAU","His"],  ["GAA","Glu"],  ["UGU","Cys"]],
  [["UUC","Phe"],         ["CUU","Leu"],  ["GUU","Val"],  ["UGC","Cys"]],
  [["UUA","Leu"],         ["CUG","Leu"],  ["GCU","Ala"],  ["CGU","Arg"]],
  [["UUG","Leu"],         ["CCU","Pro"],  ["ACU","Thr"],  ["GGU","Gly"]],
  [["UCU","Ser"],         ["AAU","Asn"],  ["AAA","Lys"],  ["AAG","Lys"]],
  [["AUU","Ile"],         ["AUA","Ile"],  ["GGA","Gly"],  ["AGU","Ser"]],
  [["UAA","STOP"],        ["UAG","STOP"], ["UGA","STOP"], ["---","---"]],
];

function CodonMinigame({ onComplete, onLoseLive, onScoreBonus }) {
  const d = window.MG2_DATA;
  const mounted = useMounted();
  const [q1Answer, setQ1Answer] = useState(null);
  const [q1Submitted, setQ1Submitted] = useState(false);
  const [q2Answer, setQ2Answer] = useState(null);
  const [q2Submitted, setQ2Submitted] = useState(false);
  const [phase, setPhase] = useState("q1");
  const [revealedUpto, setRevealedUpto] = useState(0);
  const codons = d.question1.codons;

  useEffect(() => {
    if (revealedUpto >= codons.length) return;
    const t = setTimeout(() => { if (mounted.current) setRevealedUpto(p => p+1); }, 280);
    return () => clearTimeout(t);
  }, [revealedUpto, codons.length]);

  const submitQ1 = () => {
    if (q1Answer === null) return;
    setQ1Submitted(true);
    if (q1Answer !== d.question1.correct_idx) {
      onLoseLive({
        reason: `Seleccionaste ${codons[q1Answer]} (${CODON_LOOKUP[codons[q1Answer]] || "?"}). El codón STOP prematuro es UAG en posición 3.`,
        lesson: d.question1.explanation
      });
    } else {
      onScoreBonus(25, "+25 pts — codón STOP identificado");
    }
    setTimeout(() => { if (mounted.current) setPhase("q2"); }, 900);
  };

  const submitQ2 = () => {
    if (q2Answer === null) return;
    setQ2Submitted(true);
    if (q2Answer !== d.question2.correct) {
      onLoseLive({
        reason: `Seleccionaste: "${d.question2.options[q2Answer]}". Correcto: "${d.question2.options[d.question2.correct]}"`,
        lesson: d.question2.explanation
      });
    } else {
      onScoreBonus(20, "+20 pts — tipo de mutación correcto");
    }
    setTimeout(() => { if (mounted.current) onComplete(); }, 1200);
  };

  return (
    <div className="minigame-wrapper">
      <div className="mg-header">
        <div className="mg-title">{d.title}</div>
        <div className="mg-subtitle">{d.subtitle}</div>
        <div className="mg-lives-warning">{d.lives_warning}</div>
      </div>

      {/* Compact codon reference table */}
      <div className="mg-section-label">◆ Tabla de referencia rápida (codones → aminoácidos):</div>
      <div className="codon-grid-compact">
        {CODON_TABLE_ROWS.map((row, ri) => (
          <div key={ri} className="codon-grid-row">
            {row.map(([cod, aa]) => (
              <span key={cod} className={`cgc-pair ${aa==="STOP"?"stop-pair":""}`}>
                <span className="cgc-codon">{cod}</span>
                <span className="cgc-aa">{aa}</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* mRNA comparison */}
      <div className="mg-section-label">◆ Comparación mRNA — original vs mutante:</div>
      <div className="mrna-compare">
        <div className="mrna-row">
          <span className="mrna-row-label">ORIGINAL</span>
          {d.original_mrna.split(" ").map((c,i) => (
            <span key={i} className="mrna-codon-chip">{c}</span>
          ))}
        </div>
        <div className="mrna-row">
          <span className="mrna-row-label">MUTANTE</span>
          {d.mutant_mrna.split(" ").map((c,i) => {
            const orig = d.original_mrna.split(" ")[i];
            const changed = c !== orig;
            return (
              <span key={i} className={`mrna-codon-chip ${changed?"mutated":""}`}>
                {c}
                {changed && <span className="mutation-marker">↑</span>}
              </span>
            );
          })}
        </div>
      </div>

      {/* Animated protein chain */}
      <div className="mg-section-label">◆ Traducción progresiva de la secuencia MUTANTE:</div>
      <div className="protein-chain">
        {codons.map((codon, i) => {
          const aa = CODON_LOOKUP[codon];
          const isStop = aa === "STOP";
          const visible = i < revealedUpto;
          return (
            <div key={i} className={`aa-bead ${isStop?"stop-bead":""} ${!visible?"hidden-bead":""}`}>
              <div className="aa-codon">{codon}</div>
              <div className="aa-name">{isStop ? "■ STOP" : (aa || "?")}</div>
              {!isStop && i < codons.length-1 && !isStop && <div className="aa-link" />}
            </div>
          );
        })}
      </div>
      <div className="protein-summary">
        ↳ Proteína truncada: <span style={{color:"var(--glow)"}}>Met—Gln</span>—<span style={{color:"var(--red)"}}>■STOP</span> → solo 2 aminoácidos funcionales
      </div>

      {/* Q1 */}
      <div className="mg-section-label">◆ {d.question1.text}</div>
      <HintBtn
        hint="Los 3 codones de stop son: UAA, UAG y UGA. Busca cuál de los codones de la secuencia mutante empieza con UA o UG y es diferente al original."
        onUse={() => onScoreBonus(-5, "Pista usada −5 pts")}
        disabled={q1Submitted}
      />
      <div className="codon-selector">
        {codons.map((codon, i) => {
          const aa = CODON_LOOKUP[codon];
          const isStop = aa === "STOP";
          return (
            <button key={i}
              className={`codon-select-btn ${isStop?"is-stop":""} ${q1Answer===i?"selected":""} ${q1Submitted && i===d.question1.correct_idx?"correct":""} ${q1Submitted && q1Answer===i && i!==d.question1.correct_idx?"wrong":""}`}
              onClick={() => !q1Submitted && setQ1Answer(i)}
              disabled={q1Submitted}
            >
              <span className="cs-codon">{codon}</span>
              <span className="cs-aa">{aa || "?"}</span>
              <span className="cs-pos">#{i+1}</span>
            </button>
          );
        })}
      </div>
      {q1Submitted && (
        <div className={q1Answer===d.question1.correct_idx?"alert-success":"alert-danger"} style={{fontSize:11,marginBottom:10}}>
          {d.question1.explanation}
        </div>
      )}
      {!q1Submitted && (
        <button className="action-btn" disabled={q1Answer===null} onClick={submitQ1}>
          Identificar codón STOP →
        </button>
      )}

      {/* Q2 */}
      {phase === "q2" && (
        <div style={{marginTop:18,animation:"fade-in 0.4s ease forwards"}}>
          <div className="mg-section-label">◆ {d.question2.text}</div>
          <div className="choices-container">
            {d.question2.options.map((opt,i) => (
              <button key={i}
                className={`choice-btn ${q2Answer===i?"selected":""} ${q2Submitted && i===d.question2.correct?"correct":""} ${q2Submitted && q2Answer===i && i!==d.question2.correct?"wrong":""}`}
                onClick={() => !q2Submitted && setQ2Answer(i)}
                disabled={q2Submitted}
              >
                <span className="choice-num">{String(i+1).padStart(2,"0")}</span>{opt}
              </button>
            ))}
          </div>
          {q2Submitted && <div className="alert-info" style={{marginTop:10,fontSize:11}}>{d.question2.explanation}</div>}
          {!q2Submitted && <button className="action-btn" disabled={q2Answer===null} onClick={submitQ2} style={{marginTop:10}}>Clasificar mutación →</button>}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// MG3 — PHYLOGENETIC TREE
// ══════════════════════════════════════════════
function PhyloMinigame({ onComplete, onLoseLive, onScoreBonus }) {
  const d = window.MG3_DATA;
  const mounted = useMounted();
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [q2Answer, setQ2Answer] = useState(null);
  const [q2Submitted, setQ2Submitted] = useState(false);
  const [phase, setPhase] = useState("tree");

  const submitTree = () => {
    if (!selected) return;
    setSubmitted(true);
    if (selected !== d.correct_pos) {
      onLoseLive({
        reason: d.explanation_wrong,
        lesson: "En filogenética: menor distancia = mayor cercanía evolutiva. Fila CG001: Bacteria 0.18, Archaea 0.74, Eukarya 0.83, Virus 0.94. El valor mínimo indica el dominio correcto."
      });
    } else {
      onScoreBonus(30, "+30 pts — ubicación filogenética correcta");
    }
    setTimeout(() => { if (mounted.current) setPhase("q2"); }, 1000);
  };

  const submitQ2 = () => {
    if (q2Answer === null) return;
    setQ2Submitted(true);
    if (q2Answer !== d.question2.correct) {
      onLoseLive({ reason: `Seleccionaste: "${d.question2.options[q2Answer]}"`, lesson: d.question2.explanation });
    } else {
      onScoreBonus(20, "+20 pts — interpretación correcta");
    }
    setTimeout(() => { if (mounted.current) onComplete(); }, 1200);
  };

  // SVG cladogram layout
  const W = 500, H = 300;
  const xRoot = 40, xInternal = 100, xLeaf = 210, xLabel = 225, xPos = 370;
  const leaves = [
    { id:"bact",  label:"Bacteria",   y:55,  distIdx:0 },
    { id:"arch",  label:"Archaea",    y:115, distIdx:1 },
    { id:"euk",   label:"Eukarya",    y:175, distIdx:2 },
    { id:"virus", label:"Virus",      y:235, distIdx:3 },
  ];
  const positions = [
    { id:"pos_A", leafId:"bact",  label:"Posición A" },
    { id:"pos_B", leafId:"arch",  label:"Posición B" },
    { id:"pos_C", leafId:"euk",   label:"Posición C" },
  ];

  return (
    <div className="minigame-wrapper">
      <div className="mg-header">
        <div className="mg-title">{d.title}</div>
        <div className="mg-subtitle">{d.subtitle}</div>
        <div className="mg-lives-warning">{d.lives_warning}</div>
      </div>

      <div className="mg-section-label">◆ Matriz de distancias genómicas (fila CG001 resaltada):</div>
      <div className="distance-matrix">
        <table>
          <thead>
            <tr>
              <th>—</th>
              {d.organisms.map(o => <th key={o}>{o.replace(/_/g," ")}</th>)}
            </tr>
          </thead>
          <tbody>
            {d.matrix.map((row, i) => (
              <tr key={i} className={i===4 ? "cg-row" : ""}>
                <th className="dm-row-header">{d.organisms[i].replace(/_/g," ")}</th>
                {row.map((val, j) => (
                  <td key={j} className={`${val===0?"dm-self":""} ${val<0.3&&val>0?"dm-low":""} ${val>0.85?"dm-high":""} ${(i===4||j===4)&&val>0?"dm-highlight":""}`}>
                    {val.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dm-legend">
        <span style={{color:"var(--glow)"}}>■ &lt;0.30 cercano</span>
        <span style={{color:"var(--red)"}}>■ &gt;0.85 lejano</span>
        <span style={{color:"var(--amber)"}}>■ fila/col CG001</span>
      </div>

      <div className="mg-section-label">◆ Cladograma — haz clic donde ubicarías CG-001:</div>
      <HintBtn
        hint="Busca el valor más bajo en la fila 'AGENTE CG001'. Ese organismo es el más cercano evolutivamente. Ubica CG001 dentro de su dominio."
        onUse={() => onScoreBonus(-5, "Pista usada −5 pts")}
        disabled={submitted}
      />
      <div className="phylo-container">
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%", maxHeight:310, display:"block"}}>
          {/* LUCA root label */}
          <text x={xRoot} y={H/2+5} fill="var(--glow2)"
            style={{fontSize:10,fontFamily:"'Share Tech Mono',monospace",letterSpacing:2}}>
            LUCA
          </text>
          {/* Dashed root line */}
          <line x1={xRoot+32} y1={H/2} x2={xInternal} y2={H/2}
            stroke="rgba(15,61,30,0.6)" strokeWidth={1} strokeDasharray="4,3" />
          {/* Vertical backbone */}
          <line x1={xInternal} y1={leaves[0].y} x2={xInternal} y2={leaves[3].y}
            stroke="var(--border)" strokeWidth={2} />

          {leaves.map(leaf => {
            const dist = d.matrix[4][leaf.distIdx];
            const isClosest = dist === Math.min(...d.matrix[4].slice(0,4));
            return (
              <g key={leaf.id}>
                <line x1={xInternal} y1={leaf.y} x2={xLeaf} y2={leaf.y}
                  stroke={isClosest ? "rgba(0,196,83,0.4)" : "var(--border)"} strokeWidth={isClosest?2:1.5} />
                <circle cx={xLeaf} cy={leaf.y} r={8}
                  fill="rgba(7,26,16,0.95)"
                  stroke={isClosest ? "var(--glow2)" : "var(--border)"}
                  strokeWidth={isClosest?2:1.5}
                />
                <text x={xLabel} y={leaf.y+4} fill={isClosest?"var(--glow3)":"var(--text)"}
                  style={{fontSize:10,fontFamily:"'Share Tech Mono',monospace"}}>
                  {leaf.label}
                </text>
                <text x={xLabel+62} y={leaf.y+4}
                  fill={isClosest?"var(--glow)":"var(--muted)"}
                  style={{fontSize:9,fontFamily:"'Share Tech Mono',monospace",fontWeight:isClosest?"700":"300"}}>
                  d={dist.toFixed(2)}{isClosest?" ← min":""}
                </text>
              </g>
            );
          })}

          {positions.map(pos => {
            const parentLeaf = leaves.find(l => l.id === pos.leafId);
            if (!parentLeaf) return null;
            const isSel   = selected === pos.id;
            const isOk    = submitted && pos.id === d.correct_pos;
            const isBad   = submitted && isSel && pos.id !== d.correct_pos;
            return (
              <g key={pos.id} style={{cursor: submitted ? "default" : "pointer"}}
                onClick={() => !submitted && setSelected(pos.id)}>
                <line x1={xLeaf+10} y1={parentLeaf.y} x2={xPos} y2={parentLeaf.y}
                  stroke={isSel?"var(--amber)":isOk?"var(--glow)":"rgba(15,61,30,0.5)"}
                  strokeWidth={isSel||isOk?1.5:1} strokeDasharray={isSel||isOk?"":"3,2"} />
                <rect x={xPos} y={parentLeaf.y-17} width={100} height={32} rx={2}
                  fill={isOk?"rgba(0,255,106,0.1)":isBad?"rgba(255,45,85,0.1)":isSel?"rgba(255,183,0,0.07)":"rgba(7,26,16,0.85)"}
                  stroke={isOk?"var(--glow)":isBad?"var(--red)":isSel?"var(--amber)":"var(--border)"}
                  strokeWidth={isSel||isOk||isBad?1.5:1}
                />
                <text x={xPos+50} y={parentLeaf.y-4} fill={isOk?"var(--glow)":isBad?"var(--red)":isSel?"var(--amber)":"var(--purple)"}
                  textAnchor="middle" style={{fontSize:9,fontFamily:"'Orbitron',monospace",letterSpacing:1}}>
                  CG-001?
                </text>
                <text x={xPos+50} y={parentLeaf.y+10} fill={isSel?"var(--amber)":"var(--muted)"}
                  textAnchor="middle" style={{fontSize:8,fontFamily:"'Share Tech Mono',monospace"}}>
                  {pos.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {submitted && (
        <div className={selected===d.correct_pos?"alert-success":"alert-danger"} style={{fontSize:11,marginBottom:10}}>
          {selected===d.correct_pos ? d.explanation_correct : d.explanation_wrong}
        </div>
      )}
      {!submitted && (
        <button className="action-btn" disabled={!selected} onClick={submitTree}>
          Ubicar CG-001 en el árbol →
        </button>
      )}

      {phase === "q2" && (
        <div style={{marginTop:18,animation:"fade-in 0.4s ease forwards"}}>
          <div className="mg-section-label">◆ {d.question2.text}</div>
          <div className="choices-container">
            {d.question2.options.map((opt,i) => (
              <button key={i}
                className={`choice-btn ${q2Answer===i?"selected":""} ${q2Submitted && i===d.question2.correct?"correct":""} ${q2Submitted && q2Answer===i && i!==d.question2.correct?"wrong":""}`}
                onClick={() => !q2Submitted && setQ2Answer(i)}
                disabled={q2Submitted}
              >
                <span className="choice-num">{String(i+1).padStart(2,"0")}</span>{opt}
              </button>
            ))}
          </div>
          {q2Submitted && <div className="alert-info" style={{marginTop:10,fontSize:11}}>{d.question2.explanation}</div>}
          {!q2Submitted && <button className="action-btn" disabled={q2Answer===null} onClick={submitQ2} style={{marginTop:10}}>Confirmar interpretación →</button>}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// MG4 — MUTATION CLASSIFICATION (with timer)
// ══════════════════════════════════════════════
function MutationMinigame({ onComplete, onLoseLive, onScoreBonus }) {
  const d = window.MG4_DATA;
  const mounted = useMounted();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [timerPaused, setTimerPaused] = useState(false);
  const [currentPair, setCurrentPair] = useState(0);
  const allDone = d.pairs.every(p => submitted[p.id]);

  const handleTimerExpire = useCallback(() => {
    if (!mounted.current) return;
    const unanswered = d.pairs.filter(p => !submitted[p.id]);
    if (unanswered.length > 0) {
      setTimerPaused(true);
      const newSub = {};
      unanswered.forEach(p => { newSub[p.id] = true; });
      setSubmitted(prev => ({...prev, ...newSub}));
      onLoseLive({
        reason: `El tiempo se agotó con ${unanswered.length} mutación(es) sin clasificar.`,
        lesson: "En análisis de crisis: SNP = 1 base cambia; inserción = secuencia más larga; deleción = secuencia más corta; frameshift = inserción/deleción no múltiplo de 3."
      });
    }
  }, [submitted, d.pairs, onLoseLive, mounted]);

  useEffect(() => {
    if (allDone) {
      setTimerPaused(true);
      setTimeout(() => { if (mounted.current) onComplete(); }, 1500);
    }
  }, [allDone]);

  const submitPair = (pair) => {
    const ans = answers[pair.id];
    if (ans === undefined) return;
    setSubmitted(prev => ({...prev, [pair.id]: true}));
    setTimerPaused(true);
    if (ans !== pair.correct) {
      onLoseLive({
        reason: `Gen ${pair.id}: seleccionaste "${pair.options[ans]}". Correcto: "${pair.options[pair.correct]}"`,
        lesson: pair.explanation
      });
    } else {
      onScoreBonus(25, `+25 pts — mutación ${pair.id}/4 correcta`);
    }
    setTimeout(() => { if (mounted.current) { setTimerPaused(false); setCurrentPair(p => p+1); } }, 1400);
  };

  return (
    <div className="minigame-wrapper">
      <div className="mg-header">
        <div className="mg-title">{d.title}</div>
        <div className="mg-subtitle">{d.subtitle}</div>
        <div className="mg-lives-warning">{d.lives_warning}</div>
      </div>
      {!allDone && <CountdownTimer seconds={120} paused={timerPaused} onExpire={handleTimerExpire} />}
      <div className="mut-legend">
        <span><span className="diff-ref-changed">X</span>/<span className="diff-mut-changed">X</span> = sustitución SNP</span>
        <span><span className="base-inserted">X</span> = inserción</span>
        <span><span className="diff-deleted">X</span> = deleción</span>
        <span><span className="diff-gap">∅</span> = posición eliminada</span>
      </div>

      {d.pairs.map((pair, idx) => {
        const ans = answers[pair.id];
        const done = submitted[pair.id];
        const correct = done && ans === pair.correct;
        const isActive = idx === currentPair && !done;
        return (
          <div key={pair.id}
            className={`mut-pair ${done?(correct?"answered-correct":"answered-wrong"):""} ${isActive?"active-pair":""}`}
          >
            <div className="mut-pair-header">
              <div className="mut-pair-label">Gen {pair.id}/4 — {pair.gene}</div>
              {done && <span className={`mut-result-badge ${correct?"badge-ok":"badge-err"}`}>{correct?"✓ CORRECTO":"✗ ERROR"}</span>}
            </div>
            <div className="mut-context">{pair.context}</div>
            <SeqDiff refSeq={pair.ref} mutSeq={pair.mut} />
            <div className="mut-options">
              {pair.options.map((opt, i) => (
                <button key={i}
                  className={`mut-opt ${ans===i?"selected":""} ${done&&i===pair.correct?"correct":""} ${done&&ans===i&&i!==pair.correct?"wrong":""}`}
                  onClick={() => !done && setAnswers(prev => ({...prev, [pair.id]: i}))}
                  disabled={done}
                >{opt}</button>
              ))}
            </div>
            {!done && isActive && (
              <button className="action-btn" disabled={ans===undefined}
                onClick={() => submitPair(pair)} style={{marginTop:8,fontSize:9,padding:"6px 14px"}}>
                Clasificar →
              </button>
            )}
            {done && <div className={`mg-explanation ${correct?"ok":"err"}`}>{pair.explanation}</div>}
          </div>
        );
      })}
      {allDone && (
        <div className={d.pairs.filter(p=>submitted[p.id]&&answers[p.id]===p.correct).length >= d.pass_threshold ? "alert-success":"alert-warn"}
          style={{marginTop:12,fontSize:11}}>
          {`${d.pairs.filter(p=>submitted[p.id]&&answers[p.id]===p.correct).length}/${d.pairs.length} correctas — `}
          {d.pairs.filter(p=>submitted[p.id]&&answers[p.id]===p.correct).length >= d.pass_threshold
            ? "Análisis aprobado. Continuando misión."
            : "Análisis parcial. La misión continúa con datos incompletos."}
        </div>
      )}
    </div>
  );
}

// ── SCORE TOAST ───────────────────────────────
function ScoreToast({ message, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, []);
  return <div className="score-toast">{message}</div>;
}

function PostCredits() {
  return (
    <div className="post-credits">
      <div className="post-credits-text">
        LABORATORIO ABANDONADO — 03:47 AM<br/><br/>
        La pantalla vieja se enciende sola.<br/><br/>
        <span style={{fontSize:14,letterSpacing:4,color:"#a78bfa"}}>
          NUEVA SECUENCIA DETECTADA<br/>
          ORIGEN: DESCONOCIDO<br/>
          CLASIFICACIÓN: ???
        </span>
        <br/><br/>
        <span style={{fontSize:22,letterSpacing:8}}>CORTE.</span>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// MAIN GAME
// ══════════════════════════════════════════════
function Game() {
  const [sceneKey, setSceneKey] = useState("INTRO"); const [audioOn, setAudioOn] = useState(true); const audioStarted = useRef(false); const initAudio = useCallback(() => { if (audioStarted.current) return; audioStarted.current = true; try { window.AudioEngine && window.AudioEngine.startAmbient(); } catch(e) {} }, []); const toggleAudio = useCallback(() => { if (!window.AudioEngine) return; const next = !audioOn; setAudioOn(next); window.AudioEngine.setEnabled(next); if (next) { try { window.AudioEngine.startAmbient(); } catch(e) {} } else { try { window.AudioEngine.stopAmbient(); } catch(e) {} } }, [audioOn]);
  const [stepIdx, setStepIdx]         = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [lives, setLives]             = useState(MAX_LIVES);
  const [score, setScore]             = useState(0);
  const [postCredits, setPostCredits] = useState(false);
  const [gameOver, setGameOver]       = useState(null);
  const [flashRed, setFlashRed]       = useState(false);
  const [pendingPenalty, setPendingPenalty] = useState(null);
  const [toasts, setToasts]           = useState([]);
  const containerRef = useRef(null);
  const gameOverRef  = useRef(false);

  const scenes = window.SCENES;
  const scene  = scenes[sceneKey];

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  });

  const triggerFlash = () => {
    setFlashRed(true);
    setTimeout(() => setFlashRed(false), 600);
  };

  const addToast = (msg) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev.slice(-3), { id, msg }]);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleScoreBonus = useCallback((pts, msg) => {
    setScore(prev => Math.max(0, prev + pts));
    addToast(pts > 0 ? `+${pts} pts` : `${pts} pts`);
  }, []);

  const loseLive = useCallback((info) => {
    if (gameOverRef.current) return;
    triggerFlash();
    setLives(prev => {
      const n = prev - 1;
      if (n <= 0 && !gameOverRef.current) {
        gameOverRef.current = true;
        setTimeout(() => {
          setGameOver({ reason: info.reason, lesson: info.lesson, retryScene: sceneKey, retryStep: stepIdx });
        }, 300);
        return 0;
      }
      return n;
    });
  }, [sceneKey, stepIdx]);

  const handleLoseLive = useCallback(loseLive, [loseLive]);

  const goNext = useCallback((nextKey) => {
    initAudio();
    try { window.AudioEngine && window.AudioEngine.play("sceneTransition"); } catch(e) {}
    const key = nextKey || scene.next;
    setSceneKey(key); setStepIdx(0);
    setShowChoices(false); setShowContinue(false); setPendingPenalty(null);
    setScore(prev => prev + 10);
  }, [scene]);

  const handleStepDone = useCallback(() => {
    if (scene.type !== "sequence") return;
    const step = scene.steps[stepIdx];
    if (step.choices) setShowChoices(true);
    else setShowContinue(true);
  }, [scene, stepIdx]);

  const handleChoice = useCallback((choice) => {
    if (choice.penalty) {
      triggerFlash();
      setLives(prev => {
        const n = prev - 1;
        if (n <= 0 && !gameOverRef.current) {
          gameOverRef.current = true;
          setTimeout(() => {
            setGameOver({ reason: choice.penalty.reason, lesson: choice.penalty.lesson, retryScene: sceneKey, retryStep: stepIdx });
          }, 300);
          return 0;
        }
        return n;
      });
      setPendingPenalty({ ...choice.penalty, next: choice.next });
      setShowChoices(false);
    } else {
      goNext(choice.next);
    }
  }, [goNext, sceneKey, stepIdx]);

  const handleContinue = useCallback(() => {
    const next = stepIdx + 1;
    if (next < scene.steps.length) {
      setStepIdx(next); setShowChoices(false); setShowContinue(false); setPendingPenalty(null);
    } else { goNext(); }
  }, [scene, stepIdx, goNext]);

  const handleRetry = () => {
    gameOverRef.current = false;
    setLives(MAX_LIVES);
    setSceneKey(gameOver.retryScene); setStepIdx(gameOver.retryStep);
    setShowChoices(false); setShowContinue(false); setPendingPenalty(null);
    setGameOver(null);
  };

  const handleRestart = () => {
    gameOverRef.current = false;
    setLives(MAX_LIVES); setScore(0);
    setSceneKey("INTRO"); setStepIdx(0);
    setShowChoices(false); setShowContinue(false); setPendingPenalty(null);
    setGameOver(null); setToasts([]);
  };

  if (postCredits) return <PostCredits />;
  if (gameOver) return <GameOverScreen reason={gameOver.reason} lesson={gameOver.lesson} onRetry={handleRetry} onRestart={handleRestart} />;

  const currentStep = scene.type === "sequence" ? scene.steps[stepIdx] : null;

  return (
    <div className="game-root">
      <DnaCanvas />
      <div className="scanlines" />
      <div className="vignette" />
      {flashRed && <div className="life-lost-overlay" />}
      <div className="toast-container">
        {toasts.map(t => <ScoreToast key={t.id} message={t.msg} onDone={() => removeToast(t.id)} />)}
      </div>

      <div className="game-container" ref={containerRef}>
        <div className="hud-bar">
          <div className="hud-title">OUTBREAK: CÓDIGO GENÉTICO</div>
          <div className="hud-center">
            <LivesDisplay lives={lives} />
            <div className="hud-score">PUNTUACIÓN: {score}</div>
          </div>
          <div className="hud-status" onClick={initAudio}><span className="hud-dot"/>SISTEMA ACTIVO — 2035</div>
              <button className="mute-btn" onClick={() => { initAudio(); toggleAudio(); }} title="Toggle audio">{audioOn ? "♪" : "♪✕"}</button>
        </div>

        <div className="scene-label" key={sceneKey}>{window.SCENE_LABELS[sceneKey] || sceneKey}</div>

        {scene.type === "sequence" && currentStep && (
          <div key={`${sceneKey}-${stepIdx}`}>
            {currentStep.alert && <AlertBar type={currentStep.alert.type} msg={currentStep.alert.msg} />}
            <NarrativeBox speaker={currentStep.speaker} speakerClass={currentStep.speakerClass}
              text={currentStep.text} speed={18} onDone={handleStepDone} />
            {showChoices && currentStep.choices && !pendingPenalty && (
              <div className="choices-container">
                {currentStep.choices.map((c, i) => (
                  <button key={i} className={`choice-btn ${!c.safe?"danger":""}`} onClick={() => handleChoice(c)}>
                    <span className="choice-num">{String(i+1).padStart(2,"0")}</span>
                    {c.label}
                    {!c.safe && <span className="choice-risk">⚠ RIESGO</span>}
                  </button>
                ))}
              </div>
            )}
            {pendingPenalty && (
              <PenaltyBox penalty={pendingPenalty}
                onClose={() => { setPendingPenalty(null); goNext(pendingPenalty.next); }} />
            )}
            {showContinue && !showChoices && !pendingPenalty && (
              <div className="continue-wrap">
                <button className="continue-btn" onClick={handleContinue}>Continuar →</button>
              </div>
            )}
          </div>
        )}

        {scene.type === "minigame" && scene.game === "blast" && (
          <BlastMinigame key={sceneKey} onComplete={() => goNext()} onLoseLive={handleLoseLive} onScoreBonus={handleScoreBonus} />
        )}
        {scene.type === "minigame" && scene.game === "codon" && (
          <CodonMinigame key={sceneKey} onComplete={() => goNext()} onLoseLive={handleLoseLive} onScoreBonus={handleScoreBonus} />
        )}
        {scene.type === "minigame" && scene.game === "phylo" && (
          <PhyloMinigame key={sceneKey} onComplete={() => goNext()} onLoseLive={handleLoseLive} onScoreBonus={handleScoreBonus} />
        )}
        {scene.type === "minigame" && scene.game === "mutations" && (
          <MutationMinigame key={sceneKey} onComplete={() => goNext()} onLoseLive={handleLoseLive} onScoreBonus={handleScoreBonus} />
        )}

        {scene.type === "decision" && (() => {
          try { setTimeout(() => window.AudioEngine && window.AudioEngine.play("tensionSting"), 300); } catch(e) {}
          return null;
        })()}
        {scene.type === "decision" && (
          <div key={sceneKey}>
            <div className="narrative-box">
              <div className="char-label char-player">MOMENTO DECISIVO</div>
              <p className="narrative-text">{scene.text}</p>
            </div>
            <div className="decision-panel">
              {scene.options.map((o, i) => (
                <button key={i} className="decision-btn" onClick={() => goNext(o.next)}>
                  <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"var(--amber)",marginRight:12}}>
                    {String.fromCharCode(65+i)} —
                  </span>
                  {o.label}
                  {o.sublabel && <div style={{fontSize:10,color:"var(--muted)",marginTop:4,fontFamily:"'Share Tech Mono',monospace"}}>↳ {o.sublabel}</div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {scene.type === "ending" && (() => {
          try {
            const sfx = sceneKey.includes("_A") ? "endingA" : sceneKey.includes("_B") ? "endingB" : "endingC";
            setTimeout(() => window.AudioEngine && window.AudioEngine.play(sfx), 600);
          } catch(e) {}
          return null;
        })()}
        {scene.type === "ending" && (
          <div className="ending-screen" key={sceneKey}>
            <div className="ending-title">{scene.title}</div>
            <div className="ending-subtitle">{scene.subtitle}</div>
            <div className="ending-quote">{scene.quote}</div>
            <div className="ending-score">Vidas: {lives}/{MAX_LIVES} · Puntuación: {score}</div>
            <button className="restart-btn" onClick={() => setPostCredits(true)}>Ver escena post-créditos →</button>
            <br/>
            <button className="restart-btn" onClick={handleRestart}>↺ Reiniciar historia</button>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
