/* OUTBREAK — Web Audio Engine */
window.AudioEngine = (function() {
  let ctx = null;
  let masterGain = null;
  let ambientNode = null;
  let ambientRunning = false;
  let enabled = true;

  function init() {
    if (ctx) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.55;
      masterGain.connect(ctx.destination);
    } catch(e) { enabled = false; }
  }

  function resume() {
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }

  /* ── low-level helpers ── */
  function osc(freq, type, dur, vol, startTime, endFreq) {
    if (!enabled || !ctx) return;
    const g = ctx.createGain();
    g.connect(masterGain);
    const o = ctx.createOscillator();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, startTime);
    if (endFreq) o.frequency.linearRampToValueAtTime(endFreq, startTime + dur);
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);
    o.connect(g);
    o.start(startTime);
    o.stop(startTime + dur + 0.05);
  }

  function noise(dur, vol, startTime, filterFreq) {
    if (!enabled || !ctx) return;
    const bufSize = ctx.sampleRate * dur;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq || 800;
    filter.Q.value = 0.5;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, startTime);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(masterGain);
    src.start(startTime);
    src.stop(startTime + dur + 0.05);
  }

  /* ── SOUND LIBRARY ── */
  const sounds = {

    // Typewriter key click
    keyClick: function() {
      init(); resume();
      const t = ctx.currentTime;
      noise(0.04, 0.06, t, 3000);
      osc(1200, 'square', 0.03, 0.04, t);
    },

    // Scene transition — digital whoosh
    sceneTransition: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(80, 'sawtooth', 0.4, 0.12, t, 40);
      osc(320, 'sine', 0.3, 0.08, t + 0.1, 180);
      noise(0.25, 0.05, t + 0.05, 600);
      osc(1800, 'sine', 0.15, 0.06, t + 0.2, 900);
    },

    // Alert — danger
    alertDanger: function() {
      init(); resume();
      const t = ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        osc(880, 'square', 0.12, 0.15, t + i * 0.18);
        osc(660, 'square', 0.08, 0.10, t + i * 0.18 + 0.06);
      }
      noise(0.4, 0.04, t, 400);
    },

    // Alert — info / success
    alertInfo: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(523, 'sine', 0.12, 0.10, t);
      osc(659, 'sine', 0.12, 0.10, t + 0.08);
      osc(784, 'sine', 0.18, 0.12, t + 0.16);
    },

    // Choice selected
    choiceSelect: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(440, 'triangle', 0.08, 0.09, t);
      osc(554, 'triangle', 0.10, 0.09, t + 0.05);
    },

    // Wrong answer — penalty
    wrongAnswer: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(220, 'sawtooth', 0.3, 0.18, t, 120);
      osc(180, 'sawtooth', 0.25, 0.14, t + 0.1, 100);
      noise(0.2, 0.07, t, 250);
    },

    // Correct answer
    correctAnswer: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(523, 'sine', 0.1, 0.10, t);
      osc(659, 'sine', 0.1, 0.10, t + 0.07);
      osc(1047,'sine', 0.2, 0.12, t + 0.14);
      osc(1319,'sine', 0.15, 0.08, t + 0.26);
    },

    // Life lost — DNA strand break
    lifeLost: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(400, 'sawtooth', 0.5, 0.20, t, 60);
      noise(0.3, 0.10, t + 0.1, 300);
      osc(120, 'sine', 0.6, 0.15, t + 0.2, 60);
    },

    // Game over
    gameOver: function() {
      init(); resume();
      const t = ctx.currentTime;
      const freqs = [440, 392, 349, 311, 277, 220];
      freqs.forEach((f, i) => {
        osc(f, 'sawtooth', 0.35, 0.15 - i*0.015, t + i * 0.22);
      });
      noise(1.5, 0.06, t + 0.5, 200);
    },

    // Minigame complete
    minigameComplete: function() {
      init(); resume();
      const t = ctx.currentTime;
      const melody = [523,659,784,1047,784,1047,1319];
      melody.forEach((f, i) => {
        osc(f, 'sine', 0.15, 0.13 - i*0.01, t + i * 0.1);
      });
    },

    // Ambient: DNA lab hum — continuous
    startAmbient: function() {
      if (!enabled || ambientRunning) return;
      init(); resume();
      ambientRunning = true;

      const ambGain = ctx.createGain();
      ambGain.gain.value = 0.04;
      ambGain.connect(masterGain);

      // low hum
      const hum = ctx.createOscillator();
      hum.type = 'sine';
      hum.frequency.value = 55;
      hum.connect(ambGain);
      hum.start();

      // mid rumble
      const rumble = ctx.createOscillator();
      rumble.type = 'sine';
      rumble.frequency.value = 110;
      const rumbleGain = ctx.createGain();
      rumbleGain.gain.value = 0.025;
      rumble.connect(rumbleGain);
      rumbleGain.connect(masterGain);
      rumble.start();

      // subtle high frequency digital noise
      const bufSize = ctx.sampleRate * 2;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = buf;
      noiseSrc.loop = true;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 4000;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.012;
      noiseSrc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSrc.start();

      ambientNode = { hum, rumble, noiseSrc, ambGain, rumbleGain, noiseGain };
    },

    stopAmbient: function() {
      if (!ambientNode) return;
      try {
        ambientNode.hum.stop();
        ambientNode.rumble.stop();
        ambientNode.noiseSrc.stop();
      } catch(e) {}
      ambientRunning = false;
      ambientNode = null;
    },

    // tension sting — for decision moments
    tensionSting: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(55,  'sawtooth', 1.5, 0.10, t, 45);
      osc(110, 'sawtooth', 1.2, 0.07, t + 0.3, 90);
      osc(220, 'sine',     0.8, 0.05, t + 0.8);
      noise(0.6, 0.05, t + 1.0, 150);
    },

    // ending fanfare variant A (neutralize — somber)
    endingA: function() {
      init(); resume();
      const t = ctx.currentTime;
      const m = [220,196,174,165,147];
      m.forEach((f,i) => osc(f,'sine',0.6,0.12,t+i*0.4,f*0.85));
    },

    // ending fanfare variant B (contain — hopeful/uncertain)
    endingB: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(261,'sine',0.5,0.10,t);
      osc(329,'sine',0.5,0.10,t+0.3);
      osc(392,'sine',0.8,0.12,t+0.6);
      osc(329,'sine',0.5,0.08,t+1.1);
    },

    // ending fanfare variant C (communicate — ascending, wonder)
    endingC: function() {
      init(); resume();
      const t = ctx.currentTime;
      const m = [261,329,392,523,659,784,1047];
      m.forEach((f,i) => osc(f,'sine',0.4,0.10+i*0.008,t+i*0.25));
      noise(0.3,0.025,t+1.5,1500);
    },

    // hint revealed
    hintReveal: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(880,'sine',0.08,0.07,t);
      osc(1108,'sine',0.10,0.08,t+0.06);
      osc(1318,'sine',0.12,0.09,t+0.12);
    },

    // score bonus popup
    scoreBonus: function() {
      init(); resume();
      const t = ctx.currentTime;
      osc(660,'triangle',0.08,0.08,t);
      osc(880,'triangle',0.10,0.09,t+0.05);
    },
  };

  return {
    play: function(name) {
      if (!enabled) return;
      try { sounds[name] && sounds[name](); } catch(e) {}
    },
    startAmbient: function() {
      if (!enabled) return;
      try { sounds.startAmbient(); } catch(e) {}
    },
    stopAmbient: function() {
      try { sounds.stopAmbient(); } catch(e) {}
    },
    setEnabled: function(val) { enabled = val; },
    isEnabled: function() { return enabled; },
    init,
    resume,
  };
})();
