// loading-scenes.jsx — IQS Pre-shipment & port loading reel
// Yard staged → crane lift → vessel filling → bill of lading & sail-away

const IQS_L = {
  navy: '#05111F',
  panel: '#0C1929',
  panel2: '#0F2035',
  border: 'rgba(0,194,232,0.18)',
  cyan: '#00C2E8',
  gold: '#D4A843',
  white: '#FFFFFF',
  silver: '#C8D6E5',
  muted: '#5B7A94',
  green: '#00E5A0',
  amber: '#F0A500',
  red: '#FF4B4B',
  paper: '#F4F1EA',
  paperInk: '#1A1A1A',
  sea: '#0A2336',
  hull: '#1A2A3A',
  hullL: '#2A3D52',
  steel: '#94A4B3',
  steelD: '#5A6976',
  dunnage: '#3A2A1A',
  display: '"Space Grotesk", sans-serif',
  body: '"IBM Plex Sans", sans-serif',
  mono: '"IBM Plex Mono", monospace',
};

// ── Shared chrome ─────────────────────────────────────────────────
function LGrid({ opacity = 0.05 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        linear-gradient(rgba(0,194,232,${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,194,232,${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
      pointerEvents: 'none',
    }} />
  );
}

function LPulse({ color = IQS_L.cyan, size = 8 }) {
  const t = useTime();
  const op = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 4));
  return <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color, opacity: op,
    boxShadow: `0 0 ${size * 1.5}px ${color}`,
  }} />;
}

function LChrome({ label }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 56,
      background: 'rgba(5,17,31,0.95)',
      borderBottom: `1px solid ${IQS_L.border}`,
      display: 'flex', alignItems: 'center',
      padding: '0 36px', gap: 18,
      fontFamily: IQS_L.body, zIndex: 10,
    }}>
      <div style={{
        background: '#fff', padding: '5px 12px', borderRadius: 5,
        fontFamily: IQS_L.display, fontWeight: 700, fontSize: 18,
        color: IQS_L.navy, letterSpacing: '-0.5px',
      }}>IQS</div>
      <div style={{ fontSize: 11, color: IQS_L.muted, letterSpacing: 2 }}>{label}</div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <LPulse />
        <div style={{ fontSize: 11, color: IQS_L.cyan, letterSpacing: 2 }}>PRE-SHIPMENT &amp; LOADING</div>
      </div>
    </div>
  );
}

function LCornerMeta({ t, label }) {
  const op = clamp(t / 0.6, 0, 1);
  return (
    <div style={{
      position: 'absolute', bottom: 36, right: 48,
      fontFamily: IQS_L.mono, fontSize: 11, color: IQS_L.muted,
      letterSpacing: 1.5, opacity: op, textAlign: 'right', lineHeight: 1.8,
    }}>
      <div>{label}</div>
      <div style={{ color: IQS_L.cyan }}>● REC {String(Math.floor(t * 10) / 10).padEnd(4, '0').slice(0, 4)}s</div>
    </div>
  );
}

// ── Pipe-end pyramid stack (steel-look) ───────────────────────────
function PipeEnd({ size = 22 }) {
  const inner = size * 0.55;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 32% 30%, ${IQS_L.silver}, ${IQS_L.steel} 55%, ${IQS_L.steelD} 92%)`,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.45)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: inner, height: inner,
        marginLeft: -inner / 2, marginTop: -inner / 2,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 60% 60%, #0F1922, #060B12)',
        boxShadow: 'inset 0 0 2px rgba(0,0,0,0.9)',
      }} />
    </div>
  );
}

function PipeStack({ baseCount = 6, pipeSize = 22, gap = 1, label, sub }) {
  const stackW = baseCount * (pipeSize + gap) - gap;
  const rowH = pipeSize - 2;          // slight vertical compression for hex-pack look
  const stackH = baseCount * rowH + 4;

  const items = [];
  for (let r = 0; r < baseCount; r++) {
    const count = baseCount - r;
    const rowW = count * (pipeSize + gap) - gap;
    const xOffset = (stackW - rowW) / 2;
    const y = stackH - (r + 1) * rowH - 2;
    for (let c = 0; c < count; c++) {
      items.push(
        <div key={`${r}-${c}`} style={{
          position: 'absolute',
          left: xOffset + c * (pipeSize + gap),
          top: y,
        }}>
          <PipeEnd size={pipeSize} />
        </div>
      );
    }
  }

  return (
    <div style={{ display: 'inline-block', textAlign: 'center' }}>
      <div style={{ width: stackW, height: stackH, position: 'relative' }}>
        {items}
      </div>
      {/* wood dunnage */}
      <div style={{
        width: stackW + 8, height: 6,
        background: `linear-gradient(180deg, ${IQS_L.dunnage}, #2A1E10)`,
        marginTop: 2, marginLeft: -4,
        boxShadow: '0 1px 0 rgba(0,0,0,0.5)',
      }} />
      {label && <div style={{
        fontFamily: IQS_L.mono, fontSize: 11, color: IQS_L.silver,
        letterSpacing: 1, marginTop: 10, fontWeight: 500,
      }}>{label}</div>}
      {sub && <div style={{
        fontFamily: IQS_L.mono, fontSize: 9, color: IQS_L.muted,
        letterSpacing: 1, marginTop: 2,
      }}>{sub}</div>}
    </div>
  );
}

// ── SCENE 1: Yard staging ─────────────────────────────────────────
function SceneYard() {
  const { localTime } = useSprite();
  const t = localTime;

  const headerOp = clamp(t / 0.4, 0, 1);

  const stacks = [
    { lbl: 'LOT-A', sub: '1,118 pcs · HT 4471', d: 0.40 },
    { lbl: 'LOT-B', sub: '1,127 pcs · HT 4482', d: 0.55 },
    { lbl: 'LOT-C', sub: '1,108 pcs · HT 4490', d: 0.70 },
    { lbl: 'LOT-D', sub: '1,108 pcs · HT 4497', d: 0.85 },
  ];

  // CLEARED stamp
  const stampOp = clamp((t - 1.8) / 0.4, 0, 1);
  const stampRot = -8 + (1 - Easing.easeOutCubic(stampOp)) * 8;
  const stampScale = 0.8 + Easing.easeOutCubic(stampOp) * 0.2;

  return (
    <>
      <LGrid opacity={0.04} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 130, left: 120, opacity: headerOp,
      }}>
        <div style={{
          fontFamily: IQS_L.body, fontSize: 13, color: IQS_L.cyan,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12,
        }}>01 · D-1 · Pre-shipment audit</div>
        <div style={{
          fontFamily: IQS_L.display, fontWeight: 700, fontSize: 76,
          color: IQS_L.white, letterSpacing: '-2.2px', lineHeight: 0.98,
        }}>Staged.<br/><span style={{ color: IQS_L.cyan }}>Cleared. Ready.</span></div>
      </div>

      {/* Right-side status panel */}
      <div style={{
        position: 'absolute', top: 200, right: 120, width: 360,
        opacity: clamp((t - 0.6) / 0.5, 0, 1),
      }}>
        <div style={{
          background: IQS_L.panel,
          border: `1px solid ${IQS_L.border}`,
          borderRadius: 10, padding: '20px 22px',
        }}>
          <div style={{
            fontFamily: IQS_L.mono, fontSize: 10, color: IQS_L.muted,
            letterSpacing: 2, marginBottom: 10,
          }}>YARD B-3 · BREMEN SPECIAL PIPE</div>
          <div style={{
            fontFamily: IQS_L.display, fontSize: 22, fontWeight: 600,
            color: IQS_L.white, marginBottom: 14, letterSpacing: '-0.3px',
          }}>Order 77821 — APP-B</div>

          {[
            ['Total pieces', '4,461'],
            ['Lots staged', '4 · LOT A–D'],
            ['NCR open', '0'],
            ['MDR status', 'Released'],
            ['Audit', 'M. Rauer · IQS'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '7px 0',
              borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              fontFamily: IQS_L.body, fontSize: 12,
            }}>
              <span style={{ color: IQS_L.muted }}>{row[0]}</span>
              <span style={{ color: IQS_L.silver, fontWeight: 500 }}>{row[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CLEARED stamp */}
      <div style={{
        position: 'absolute', top: 470, right: 200,
        opacity: stampOp,
        transform: `rotate(${stampRot}deg) scale(${stampScale})`,
        transformOrigin: '50% 50%',
      }}>
        <div style={{
          border: `3px solid ${IQS_L.green}`,
          color: IQS_L.green,
          padding: '8px 22px',
          borderRadius: 6,
          fontFamily: IQS_L.display, fontWeight: 700, fontSize: 26,
          letterSpacing: '4px',
          background: 'rgba(0,229,160,0.06)',
          textShadow: '0 0 10px rgba(0,229,160,0.4)',
        }}>CLEARED FOR SHIPMENT</div>
      </div>

      {/* Pipe stacks */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 110,
        display: 'flex', justifyContent: 'center', gap: 58,
      }}>
        {stacks.map((s, i) => {
          const op = clamp((t - s.d) / 0.5, 0, 1);
          const tY = (1 - Easing.easeOutCubic(op)) * 18;
          return (
            <div key={i} style={{
              opacity: op,
              transform: `translateY(${tY}px)`,
            }}>
              <PipeStack baseCount={6} pipeSize={26} label={s.lbl} sub={s.sub} />
            </div>
          );
        })}
      </div>

      {/* Ground line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 82, height: 1,
        background: 'rgba(0,194,232,0.18)',
        opacity: clamp((t - 0.3) / 0.5, 0, 1),
      }} />

      <LCornerMeta t={t} label="01 / YARD B-3 · BREMERHAVEN" />
    </>
  );
}

// ── SCENE 2: Loading at quay (gantry crane) ───────────────────────
function SceneCrane() {
  const { localTime } = useSprite();
  const t = localTime;

  const headerOp = clamp(t / 0.4, 0, 1);

  // Crane geometry (canvas-ish coordinates)
  // gantry spans x=[200..1500] @ y=120 (top), legs to y=620 (quay)
  // trolley moves left↔right; carries cable & bundle
  // 2 trips: trip1 = pickup yard → drop vessel, trip2 = same
  const cycleDur = 1.4;
  const cycleT = (t % cycleDur) / cycleDur;       // 0..1
  // Phase: 0–.15 = lower at yard, .15–.30 = lift, .30–.65 = traverse right, .65–.80 = lower into hold, .80–.95 = release & raise, .95–1 = traverse left
  const phase = cycleT;

  const xYard = 360;     // pickup x
  const xVessel = 1280;  // drop x
  let trolleyX, hookY, cargoVisible;

  if (phase < 0.15) {
    trolleyX = xYard;
    hookY = 140 + (phase / 0.15) * 360;  // descend to 500
    cargoVisible = false;
  } else if (phase < 0.30) {
    trolleyX = xYard;
    hookY = 500 - ((phase - 0.15) / 0.15) * 360;
    cargoVisible = true;
  } else if (phase < 0.65) {
    const p = (phase - 0.30) / 0.35;
    trolleyX = xYard + (xVessel - xYard) * Easing.easeInOutCubic(p);
    hookY = 140;
    cargoVisible = true;
  } else if (phase < 0.80) {
    trolleyX = xVessel;
    hookY = 140 + ((phase - 0.65) / 0.15) * 360;
    cargoVisible = true;
  } else if (phase < 0.95) {
    trolleyX = xVessel;
    hookY = 500 - ((phase - 0.80) / 0.15) * 360;
    cargoVisible = false;
  } else {
    const p = (phase - 0.95) / 0.05;
    trolleyX = xVessel + (xYard - xVessel) * Easing.easeInOutCubic(p);
    hookY = 140;
    cargoVisible = false;
  }

  // Counter ticks 0 → 3,200 across the 3s scene
  const counterTarget = 3200;
  const counter = Math.floor(Easing.easeInOutCubic(clamp(t / 3.0, 0, 1)) * counterTarget);

  return (
    <>
      <LGrid opacity={0.03} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 130, left: 120, opacity: headerOp,
      }}>
        <div style={{
          fontFamily: IQS_L.body, fontSize: 13, color: IQS_L.cyan,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12,
        }}>02 · D0 · Loading at quay</div>
        <div style={{
          fontFamily: IQS_L.display, fontWeight: 700, fontSize: 56,
          color: IQS_L.white, letterSpacing: '-1.5px', lineHeight: 1,
        }}>From yard to hold —<br/>witnessed pipe by pipe.</div>
      </div>

      {/* Big counter top-right */}
      <div style={{
        position: 'absolute', top: 130, right: 120, textAlign: 'right',
        opacity: clamp((t - 0.2) / 0.4, 0, 1),
      }}>
        <div style={{
          fontFamily: IQS_L.mono, fontSize: 11, color: IQS_L.muted,
          letterSpacing: 2.5, marginBottom: 6,
        }}>PIECES LOADED · LIVE</div>
        <div style={{
          fontFamily: IQS_L.display, fontWeight: 700, fontSize: 110,
          color: IQS_L.cyan, letterSpacing: '-3px', lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 0 30px rgba(0,194,232,0.3)',
        }}>{counter.toLocaleString()}</div>
        <div style={{
          fontFamily: IQS_L.mono, fontSize: 14, color: IQS_L.muted,
          letterSpacing: 2, marginTop: 4,
        }}>/ 4,461</div>
      </div>

      {/* Quay scene container */}
      <div style={{
        position: 'absolute', left: 60, right: 60, bottom: 70, height: 580,
      }}>
        {/* Quay surface */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 540, height: 2,
          background: 'rgba(0,194,232,0.25)',
        }} />
        {/* Quay shadow under */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 542, height: 18,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4), transparent)',
        }} />

        {/* Sea (right side under vessel) */}
        <div style={{
          position: 'absolute', left: 970, right: 0, top: 540, height: 40,
          background: `repeating-linear-gradient(180deg, ${IQS_L.sea} 0 2px, transparent 2px 8px)`,
          opacity: 0.7,
        }} />

        {/* Yard pipe stack (small, shrinking impression — static for brevity) */}
        <div style={{
          position: 'absolute', left: 280, top: 460,
          opacity: 0.95,
        }}>
          <PipeStack baseCount={5} pipeSize={16} />
        </div>
        <div style={{
          position: 'absolute', left: 410, top: 470,
          opacity: 0.7,
        }}>
          <PipeStack baseCount={4} pipeSize={16} />
        </div>

        {/* Vessel hull on right */}
        <div style={{
          position: 'absolute', left: 970, top: 380, width: 760, height: 200,
          background: `linear-gradient(180deg, ${IQS_L.hullL} 0%, ${IQS_L.hull} 60%, #0A1620 100%)`,
          clipPath: 'polygon(0 0, 100% 0, 96% 100%, 4% 100%)',
          borderTop: `2px solid ${IQS_L.steelD}`,
        }}>
          {/* hold opening */}
          <div style={{
            position: 'absolute', left: 60, top: 30, right: 200, height: 80,
            background: '#040A12',
            border: `1px solid ${IQS_L.steelD}`,
            borderRadius: 2,
          }} />
          {/* superstructure block */}
          <div style={{
            position: 'absolute', right: 50, top: -55, width: 130, height: 60,
            background: IQS_L.hullL,
            borderTop: `2px solid ${IQS_L.steelD}`,
          }} />
          <div style={{
            position: 'absolute', right: 70, top: -78, width: 14, height: 26,
            background: '#D4A843',
          }} />
        </div>
        {/* vessel name */}
        <div style={{
          position: 'absolute', left: 1050, top: 530,
          fontFamily: IQS_L.mono, fontSize: 11, color: IQS_L.cyan,
          letterSpacing: 2, opacity: 0.8,
        }}>MV NORDSEE PIONEER · IMO 9876543</div>

        {/* Gantry crane */}
        {/* Left leg */}
        <div style={{
          position: 'absolute', left: 200, top: 120, width: 10, height: 420,
          background: `linear-gradient(90deg, ${IQS_L.steelD}, ${IQS_L.steel}, ${IQS_L.steelD})`,
        }} />
        {/* Right leg */}
        <div style={{
          position: 'absolute', left: 1490, top: 120, width: 10, height: 420,
          background: `linear-gradient(90deg, ${IQS_L.steelD}, ${IQS_L.steel}, ${IQS_L.steelD})`,
        }} />
        {/* Diagonal braces */}
        <div style={{
          position: 'absolute', left: 205, top: 360, width: 6, height: 200,
          background: IQS_L.steelD,
          transform: 'skewX(15deg)', transformOrigin: 'top left',
          opacity: 0.6,
        }} />
        <div style={{
          position: 'absolute', left: 1495, top: 360, width: 6, height: 200,
          background: IQS_L.steelD,
          transform: 'skewX(-15deg)', transformOrigin: 'top right',
          opacity: 0.6,
        }} />
        {/* Top bridge */}
        <div style={{
          position: 'absolute', left: 195, top: 100, width: 1310, height: 22,
          background: `linear-gradient(180deg, ${IQS_L.steel}, ${IQS_L.steelD})`,
          borderBottom: '1px solid rgba(0,0,0,0.3)',
        }} />
        {/* Truss texture on bridge */}
        <div style={{
          position: 'absolute', left: 195, top: 122, width: 1310, height: 12,
          background: `repeating-linear-gradient(90deg, ${IQS_L.steelD} 0 4px, transparent 4px 20px)`,
          opacity: 0.55,
        }} />

        {/* Trolley */}
        <div style={{
          position: 'absolute', left: trolleyX - 30, top: 122, width: 60, height: 22,
          background: `linear-gradient(180deg, ${IQS_L.cyan}, #007FA0)`,
          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
          borderRadius: 2,
        }} />

        {/* Cable */}
        <div style={{
          position: 'absolute', left: trolleyX - 1, top: 144, width: 2, height: Math.max(hookY - 144, 4),
          background: IQS_L.steel,
        }} />

        {/* Hook & cargo bundle */}
        <div style={{
          position: 'absolute', left: trolleyX - 36, top: hookY,
          width: 72, height: 10,
          background: IQS_L.steelD,
          borderRadius: 2,
        }} />
        {cargoVisible && (
          <div style={{
            position: 'absolute', left: trolleyX - 60, top: hookY + 12,
            width: 120, height: 32,
            background: `repeating-linear-gradient(90deg,
              ${IQS_L.steel} 0 6px,
              ${IQS_L.steelD} 6px 7px,
              ${IQS_L.steel} 7px 13px)`,
            border: `1px solid ${IQS_L.steelD}`,
            boxShadow: '0 6px 14px rgba(0,0,0,0.5)',
          }}>
            {/* lashing straps */}
            <div style={{ position: 'absolute', left: 20, top: -2, bottom: -2, width: 3, background: IQS_L.gold }} />
            <div style={{ position: 'absolute', right: 20, top: -2, bottom: -2, width: 3, background: IQS_L.gold }} />
          </div>
        )}
      </div>

      {/* Activity log left bottom */}
      <div style={{
        position: 'absolute', left: 120, bottom: 60, width: 360,
        opacity: clamp((t - 0.4) / 0.5, 0, 1),
        fontFamily: IQS_L.mono, fontSize: 10, color: IQS_L.muted,
        letterSpacing: 0.5, lineHeight: 1.7,
      }}>
        {[
          { t0: 0.5, txt: '08:14 · Lift #001 · Hook secured' },
          { t0: 1.2, txt: '08:42 · Lift #018 · Bundle to Hold-1' },
          { t0: 1.9, txt: '09:17 · Lift #042 · Lashing OK' },
          { t0: 2.5, txt: '09:53 · Lift #074 · Hold-1 50% full' },
        ].map((l, i) => {
          const op = clamp((t - l.t0) / 0.3, 0, 1);
          return (
            <div key={i} style={{
              opacity: op,
              color: i === 3 ? IQS_L.cyan : IQS_L.muted,
            }}>{l.txt}</div>
          );
        })}
      </div>

      <LCornerMeta t={t} label="02 / QUAY · LOADING" />
    </>
  );
}

// ── SCENE 3: Vessel hold filling (cross-section) ──────────────────
function SceneVessel() {
  const { localTime } = useSprite();
  const t = localTime;

  const headerOp = clamp(t / 0.4, 0, 1);

  // 3 holds filling at different rates
  const holds = [
    { name: 'Hold 1', target: 1.0, d: 0.3, lash: 'Secured' },
    { name: 'Hold 2', target: 1.0, d: 0.5, lash: 'Secured' },
    { name: 'Hold 3', target: 1.0, d: 0.7, lash: 'In progress' },
  ];

  // Counter completes
  const counter = Math.floor(Easing.easeInOutCubic(clamp(t / 2.5, 0, 1)) * 4461);

  return (
    <>
      <LGrid opacity={0.03} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 130, left: 120, opacity: headerOp,
      }}>
        <div style={{
          fontFamily: IQS_L.body, fontSize: 13, color: IQS_L.cyan,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12,
        }}>03 · D0/D1 · On deck</div>
        <div style={{
          fontFamily: IQS_L.display, fontWeight: 700, fontSize: 56,
          color: IQS_L.white, letterSpacing: '-1.5px', lineHeight: 1,
        }}>Hold filling, lashing logged.</div>
      </div>

      {/* Top-right counter */}
      <div style={{
        position: 'absolute', top: 130, right: 120, textAlign: 'right',
        opacity: clamp((t - 0.2) / 0.4, 0, 1),
      }}>
        <div style={{
          fontFamily: IQS_L.mono, fontSize: 11, color: IQS_L.muted,
          letterSpacing: 2.5, marginBottom: 6,
        }}>LOADED · CONFIRMED</div>
        <div style={{
          fontFamily: IQS_L.display, fontWeight: 700, fontSize: 96,
          color: counter >= 4461 ? IQS_L.green : IQS_L.cyan,
          letterSpacing: '-2.5px', lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          textShadow: counter >= 4461
            ? '0 0 30px rgba(0,229,160,0.4)'
            : '0 0 24px rgba(0,194,232,0.3)',
          transition: 'color 0.3s',
        }}>{counter.toLocaleString()}</div>
        <div style={{
          fontFamily: IQS_L.mono, fontSize: 13, color: IQS_L.muted,
          letterSpacing: 2, marginTop: 4,
        }}>/ 4,461 — 100% AT t=2.5s</div>
      </div>

      {/* Vessel cross-section: side-view with 3 holds visible */}
      <div style={{
        position: 'absolute', left: 120, right: 120, bottom: 100, height: 460,
      }}>
        {/* Hull */}
        <div style={{
          position: 'absolute', inset: '60px 0 0 0',
          background: `linear-gradient(180deg, ${IQS_L.hullL} 0%, ${IQS_L.hull} 70%, #050B14 100%)`,
          clipPath: 'polygon(2% 0, 98% 0, 96% 100%, 4% 100%)',
          border: 'none',
        }} />
        {/* Deck line */}
        <div style={{
          position: 'absolute', left: '3%', right: '3%', top: 60, height: 3,
          background: IQS_L.steelD,
        }} />
        {/* Superstructure (small block right) */}
        <div style={{
          position: 'absolute', right: '5%', top: 0, width: 130, height: 60,
          background: IQS_L.hullL,
          borderTop: `2px solid ${IQS_L.steelD}`,
        }} />
        <div style={{
          position: 'absolute', right: '7%', top: -28, width: 12, height: 30,
          background: IQS_L.gold,
        }} />

        {/* 3 holds */}
        {holds.map((h, i) => {
          const left = 90 + i * 410;
          const fillP = Easing.easeOutCubic(clamp((t - h.d) / 2.0, 0, 1));
          const isDone = fillP >= 0.99;
          return (
            <div key={i} style={{
              position: 'absolute', left, top: 90, width: 360, height: 320,
            }}>
              {/* hold opening (frame) */}
              <div style={{
                position: 'absolute', inset: 0,
                background: '#040A12',
                border: `2px solid ${IQS_L.steelD}`,
                borderRadius: 4,
                overflow: 'hidden',
              }}>
                {/* fill — horizontal pipe-rows from bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: `${fillP * 100}%`,
                  background: `
                    repeating-linear-gradient(180deg,
                      ${IQS_L.steel} 0 8px,
                      ${IQS_L.steelD} 8px 9px,
                      ${IQS_L.steel} 9px 17px)`,
                  borderTop: fillP > 0.02 ? `1px solid ${IQS_L.cyan}` : 'none',
                  boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.4)',
                  transition: 'border-color .3s',
                }} />
                {/* lashing straps overlay when full */}
                {fillP > 0.9 && (
                  <>
                    <div style={{
                      position: 'absolute', top: 0, bottom: 0, left: '25%', width: 2,
                      background: IQS_L.gold, opacity: 0.85,
                    }} />
                    <div style={{
                      position: 'absolute', top: 0, bottom: 0, right: '25%', width: 2,
                      background: IQS_L.gold, opacity: 0.85,
                    }} />
                  </>
                )}
              </div>
              {/* label above */}
              <div style={{
                position: 'absolute', top: -34, left: 0,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  fontFamily: IQS_L.display, fontWeight: 600, fontSize: 16,
                  color: IQS_L.white, letterSpacing: '-0.2px',
                }}>{h.name}</div>
                <div style={{
                  fontFamily: IQS_L.mono, fontSize: 11,
                  color: isDone ? IQS_L.green : IQS_L.cyan,
                  letterSpacing: 1,
                }}>{Math.floor(fillP * 100)}%</div>
              </div>
              {/* status chip below */}
              <div style={{
                position: 'absolute', bottom: -32, left: 0,
                display: 'flex', alignItems: 'center', gap: 8,
                fontFamily: IQS_L.mono, fontSize: 10,
                letterSpacing: 1.2,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: isDone ? IQS_L.green : IQS_L.amber,
                  boxShadow: `0 0 8px ${isDone ? IQS_L.green : IQS_L.amber}`,
                }} />
                <span style={{ color: isDone ? IQS_L.green : IQS_L.amber }}>
                  {isDone ? 'LASHED · WITNESSED' : 'LOADING · LIVE'}
                </span>
              </div>
            </div>
          );
        })}

        {/* Water line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: -20, height: 30,
          background: `repeating-linear-gradient(180deg, ${IQS_L.sea} 0 2px, transparent 2px 8px)`,
          opacity: 0.7,
        }} />
      </div>

      <LCornerMeta t={t} label="03 / VESSEL · HOLDS 1-3" />
    </>
  );
}

// ── SCENE 4: Bill of Lading & sail-away ───────────────────────────
function SceneDeparture() {
  const { localTime } = useSprite();
  const t = localTime;

  const headerOp = clamp(t / 0.4, 0, 1);

  // BoL paper slides up
  const paperOp = clamp((t - 0.2) / 0.5, 0, 1);
  const paperY = (1 - Easing.easeOutCubic(paperOp)) * 30;

  // Stamp appears late
  const stampOp = clamp((t - 1.6) / 0.4, 0, 1);
  const stampRot = -10 + (1 - Easing.easeOutCubic(stampOp)) * 14;
  const stampScale = 0.7 + Easing.easeOutCubic(stampOp) * 0.3;

  // Vessel silhouette translates right
  const vesselX = interpolate([0.8, 3.5], [-200, 1100], Easing.easeInOutCubic)(t);
  const vesselOp = clamp((t - 0.6) / 0.6, 0, 1);

  return (
    <>
      <LGrid opacity={0.04} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 130, left: 120, opacity: headerOp,
      }}>
        <div style={{
          fontFamily: IQS_L.body, fontSize: 13, color: IQS_L.gold,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12,
        }}>04 · D+1 · Bill of Lading · Released</div>
        <div style={{
          fontFamily: IQS_L.display, fontWeight: 700, fontSize: 56,
          color: IQS_L.white, letterSpacing: '-1.5px', lineHeight: 1,
        }}>Signed. Stamped. <span style={{ color: IQS_L.gold }}>Sailed.</span></div>
      </div>

      {/* BoL paper */}
      <div style={{
        position: 'absolute', top: 280, left: 120,
        width: 760, height: 460,
        transform: `translateY(${paperY}px)`,
        background: IQS_L.paper,
        borderRadius: 6,
        boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,168,67,0.25)',
        opacity: paperOp,
        padding: '28px 36px',
        overflow: 'hidden',
        fontFamily: IQS_L.body,
        color: IQS_L.paperInk,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          paddingBottom: 12,
          borderBottom: '2px solid #1A1A1A',
        }}>
          <div>
            <div style={{
              fontFamily: IQS_L.display, fontWeight: 700, fontSize: 20,
              letterSpacing: '-0.4px',
            }}>BILL OF LADING</div>
            <div style={{ fontSize: 11, color: '#555', marginTop: 4 }}>
              No. BL-2026-77821-014 · Issued 24 Nov 2026
            </div>
          </div>
          <div style={{
            background: '#1A1A1A', color: '#fff',
            padding: '6px 12px', borderRadius: 4,
            fontFamily: IQS_L.display, fontWeight: 700, fontSize: 13,
            letterSpacing: '-0.3px',
          }}>IQS</div>
        </div>

        {/* Routing */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          gap: 16, alignItems: 'center',
          marginTop: 22,
        }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#888', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Port of loading</div>
            <div style={{ fontFamily: IQS_L.display, fontWeight: 700, fontSize: 22, letterSpacing: '-0.3px' }}>BREMERHAVEN · DE</div>
            <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Berth 14 · Terminal Nord</div>
          </div>
          <div style={{ fontFamily: IQS_L.mono, fontSize: 22, color: IQS_L.gold }}>→</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#888', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Port of discharge</div>
            <div style={{ fontFamily: IQS_L.display, fontWeight: 700, fontSize: 22, letterSpacing: '-0.3px' }}>RAS LAFFAN · QA</div>
            <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>ETA 14 Dec 2026 · 18 d sea</div>
          </div>
        </div>

        {/* Cargo summary */}
        <div style={{
          marginTop: 22,
          background: 'rgba(0,0,0,0.04)',
          padding: '12px 14px',
          borderRadius: 4,
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#888', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Cargo manifest</div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14,
          }}>
            {[
              ['Pieces', '4,461'],
              ['Total weight', '11,840 t'],
              ['Holds used', '3 / 3'],
              ['Lashing', 'Witnessed'],
            ].map((r, i) => (
              <div key={i}>
                <div style={{ fontFamily: IQS_L.display, fontWeight: 700, fontSize: 20, letterSpacing: '-0.3px', color: '#1A1A1A' }}>{r[1]}</div>
                <div style={{ fontSize: 9, color: '#666', textTransform: 'uppercase', letterSpacing: 1.4, marginTop: 2 }}>{r[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vessel & inspector */}
        <div style={{
          marginTop: 18,
          fontSize: 11, color: '#444', lineHeight: 1.6,
        }}>
          <div><strong>Vessel:</strong> MV NORDSEE PIONEER · IMO 9876543 · DWT 24,500 t</div>
          <div><strong>Inspector:</strong> M. Rauer (IQS Lead) · TIR-2026-W47-018 attached</div>
          <div><strong>Shipper:</strong> Bremen Special Pipe GmbH &nbsp;·&nbsp; <strong>Consignee:</strong> Apex Marine FZE</div>
        </div>

        {/* IQS RELEASED stamp */}
        <div style={{
          position: 'absolute', right: 50, bottom: 50,
          opacity: stampOp,
          transform: `rotate(${stampRot}deg) scale(${stampScale})`,
          transformOrigin: '50% 50%',
        }}>
          <div style={{
            border: `3px solid #1f7a47`,
            color: '#1f7a47',
            padding: '10px 22px',
            borderRadius: 6,
            fontFamily: IQS_L.display, fontWeight: 700, fontSize: 22,
            letterSpacing: '3px',
            background: 'rgba(31,122,71,0.06)',
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.8 }}>IQS · ORDER 77821</div>
            <div>RELEASED</div>
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.8, marginTop: 2 }}>24·11·2026</div>
          </div>
        </div>
      </div>

      {/* Vessel silhouette translating */}
      <div style={{
        position: 'absolute', top: 320, right: 0, width: 720, height: 380,
        overflow: 'hidden',
        opacity: vesselOp,
      }}>
        {/* Horizon */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 200, height: 1,
          background: 'rgba(0,194,232,0.2)',
        }} />
        {/* Sea */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 200, bottom: 0,
          background: `linear-gradient(180deg, ${IQS_L.sea}, #040D18)`,
        }}>
          {/* Wave lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: ((t * 60 + i * 80) % 800) - 80,
              top: 30 + i * 22,
              width: 60, height: 1,
              background: 'rgba(0,194,232,0.18)',
            }} />
          ))}
        </div>

        {/* Vessel */}
        <div style={{
          position: 'absolute', left: vesselX, top: 130,
          width: 360, height: 90,
        }}>
          {/* Hull */}
          <div style={{
            position: 'absolute', left: 0, top: 35, width: 360, height: 55,
            background: `linear-gradient(180deg, ${IQS_L.hullL}, ${IQS_L.hull})`,
            clipPath: 'polygon(4% 0, 96% 0, 100% 100%, 0 100%)',
          }} />
          {/* Deck cargo (small lines) */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: 30 + i * 24,
              top: 22, width: 20, height: 12,
              background: IQS_L.steelD,
              borderTop: `1px solid ${IQS_L.steel}`,
            }} />
          ))}
          {/* Superstructure */}
          <div style={{
            position: 'absolute', right: 30, top: 0, width: 60, height: 35,
            background: IQS_L.hullL,
            borderTop: `2px solid ${IQS_L.steelD}`,
          }} />
          <div style={{
            position: 'absolute', right: 50, top: -16, width: 6, height: 18,
            background: IQS_L.gold,
          }} />
          {/* Wake */}
          <div style={{
            position: 'absolute', left: -120, top: 75,
            width: 140, height: 14,
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0.35))`,
            borderRadius: '50%',
            filter: 'blur(2px)',
          }} />
        </div>
      </div>

      {/* Bottom-right tagline */}
      <div style={{
        position: 'absolute', bottom: 70, right: 120,
        textAlign: 'right',
        opacity: clamp((t - 2.4) / 0.5, 0, 1),
      }}>
        <div style={{
          fontFamily: IQS_L.body, fontSize: 13, color: IQS_L.muted,
          letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4,
        }}>Pre-shipment · Loading · Sail-away</div>
        <div style={{
          fontFamily: IQS_L.display, fontSize: 22, color: IQS_L.white,
          fontWeight: 600, letterSpacing: '-0.3px',
        }}>Witnessed end-to-end by IQS.</div>
      </div>

      <LCornerMeta t={t} label="04 / RELEASED · SAILED" />
    </>
  );
}

// ── Scene fader ───────────────────────────────────────────────────
function LSceneFader({ start, end, fade = 0.4, children }) {
  const time = useTime();
  if (time < start - fade || time > end + fade) return null;
  let opacity = 1;
  if (time < start) opacity = clamp((time - (start - fade)) / fade, 0, 1);
  else if (time > end) opacity = clamp(1 - (time - end) / fade, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      {children}
    </div>
  );
}

// ── Master ────────────────────────────────────────────────────────
function LoadingReel() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: IQS_L.navy }}>
      <LChrome label="PRE-SHIPMENT & LOADING" />

      <LSceneFader start={0} end={3.0} fade={0.4}>
        <Sprite start={0} end={3.5}><SceneYard /></Sprite>
      </LSceneFader>

      <LSceneFader start={3.0} end={6.0} fade={0.4}>
        <Sprite start={3.0} end={6.5}><SceneCrane /></Sprite>
      </LSceneFader>

      <LSceneFader start={6.0} end={9.0} fade={0.4}>
        <Sprite start={6.0} end={9.5}><SceneVessel /></Sprite>
      </LSceneFader>

      <LSceneFader start={9.0} end={13} fade={0.4}>
        <Sprite start={9.0} end={13.5}><SceneDeparture /></Sprite>
      </LSceneFader>
    </div>
  );
}

Object.assign(window, { LoadingReel });
