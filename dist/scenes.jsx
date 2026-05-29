// scenes.jsx — IQS brand reel scenes
// All scenes live inside a Stage with the IQS palette.

const IQS = {
  navy: '#05111F',
  panel: '#0C1929',
  panel2: '#0F2035',
  border: 'rgba(0,194,232,0.18)',
  cyan: '#00C2E8',
  cyanDim: 'rgba(0,194,232,0.15)',
  gold: '#D4A843',
  white: '#FFFFFF',
  silver: '#C8D6E5',
  muted: '#5B7A94',
  green: '#00E5A0',
  amber: '#F0A500',
  red: '#FF4B4B',
  display: '"Space Grotesk", sans-serif',
  body: '"IBM Plex Sans", sans-serif',
  mono: '"IBM Plex Mono", monospace',
};

// Tiny utility: render a vertical grid of fine lines (engineering blueprint feel)
function Grid({ opacity = 0.06 }) {
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

// Status pulse dot used in chrome bars
function PulseDot({ color = IQS.cyan, size = 8 }) {
  const t = useTime();
  const op = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 4));
  return <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color, opacity: op,
    boxShadow: `0 0 ${size * 1.5}px ${color}`,
  }} />;
}

// Top chrome bar — shown across most scenes for continuity
function Chrome({ label = 'IQS — INSPECTION CONSOLE' }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 56,
      background: 'rgba(5,17,31,0.95)',
      borderBottom: `1px solid ${IQS.border}`,
      display: 'flex', alignItems: 'center',
      padding: '0 36px',
      gap: 18,
      fontFamily: IQS.body,
      zIndex: 10,
    }}>
      <div style={{
        background: '#fff', padding: '5px 12px', borderRadius: 5,
        fontFamily: IQS.display, fontWeight: 700, fontSize: 18,
        color: IQS.navy, letterSpacing: '-0.5px',
      }}>IQS</div>
      <div style={{
        fontSize: 11, color: IQS.muted, letterSpacing: 2,
      }}>{label}</div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <PulseDot />
        <div style={{ fontSize: 11, color: IQS.cyan, letterSpacing: 2 }}>LIVE</div>
      </div>
    </div>
  );
}

// ─── SCENE 1: Title reveal ─────────────────────────────────────────
function SceneTitle() {
  const { localTime, progress } = useSprite();
  const t = localTime;

  // Logo card slides in
  const logoOp = clamp(t / 0.5, 0, 1);
  const logoY = (1 - Easing.easeOutCubic(clamp(t / 0.7, 0, 1))) * 30;

  // Headline appears word by word
  const lines = [
    { text: 'Quality Inspection', delay: 0.5 },
    { text: 'for the ', italicAfter: 'Global', delay: 0.9 },
    { text: 'Energy Industry.', delay: 1.4 },
  ];

  // Sub
  const subOp = clamp((t - 2.0) / 0.6, 0, 1);

  // Background scan beam
  const beamX = interpolate([0, 3], [-200, 1920], Easing.easeInOutQuad)(t);

  return (
    <>
      <Grid opacity={0.05} />
      {/* scanning beam */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: beamX, width: 240,
        background: `linear-gradient(90deg, transparent, ${IQS.cyan}22, transparent)`,
        pointerEvents: 'none',
      }} />

      {/* Logo lockup */}
      <div style={{
        position: 'absolute', top: 220, left: 120,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: logoOp,
        transform: `translateY(${logoY}px)`,
      }}>
        <div style={{
          background: '#fff', padding: '12px 22px', borderRadius: 8,
          fontFamily: IQS.display, fontWeight: 700, fontSize: 38,
          color: IQS.navy, letterSpacing: '-1px',
        }}>IQS</div>
        <div style={{
          fontFamily: IQS.body, fontSize: 13, color: IQS.cyan,
          letterSpacing: 3, textTransform: 'uppercase',
          borderLeft: `1px solid ${IQS.border}`, paddingLeft: 16,
        }}>
          Worldwide<br/>Inspection Company
        </div>
      </div>

      {/* Headline */}
      <div style={{
        position: 'absolute', top: 340, left: 120, right: 120,
        fontFamily: IQS.display, fontWeight: 700, fontSize: 96,
        color: IQS.white, lineHeight: 1.05, letterSpacing: '-3px',
      }}>
        {lines.map((line, i) => {
          const lt = clamp((t - line.delay) / 0.6, 0, 1);
          const eased = Easing.easeOutCubic(lt);
          return (
            <div key={i} style={{
              opacity: eased,
              transform: `translateY(${(1 - eased) * 24}px)`,
              marginBottom: 4,
            }}>
              {line.text}
              {line.italicAfter && (
                <span style={{ color: IQS.cyan, fontStyle: 'normal' }}>{line.italicAfter}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Sub */}
      <div style={{
        position: 'absolute', top: 780, left: 124, right: 120,
        fontFamily: IQS.body, fontSize: 22, color: IQS.muted,
        opacity: subOp,
        letterSpacing: 0.3,
        maxWidth: 900,
      }}>
        Third-party inspection, NDT, expediting &amp; QA/QC — with real-time digital reporting.
      </div>

      {/* Corner timecode */}
      <CornerMeta t={t} label="00 / TITLE" />
    </>
  );
}

// Corner meta block: monospace pseudo-readout
function CornerMeta({ t, label }) {
  const op = clamp(t / 0.6, 0, 1);
  return (
    <div style={{
      position: 'absolute', bottom: 36, right: 48,
      fontFamily: IQS.mono, fontSize: 11, color: IQS.muted,
      letterSpacing: 1.5,
      opacity: op, textAlign: 'right',
      lineHeight: 1.8,
    }}>
      <div>{label}</div>
      <div style={{ color: IQS.cyan }}>● REC {String(Math.floor(t * 10) / 10).padEnd(4, '0').slice(0, 4)}s</div>
    </div>
  );
}

// ─── SCENE 2: Pipe inspection ─────────────────────────────────────
function ScenePipe() {
  const { localTime, duration } = useSprite();
  const t = localTime;

  // Cross-section pipe at center. A scanning bar sweeps across, revealing weld points.
  const pipeY = 480;
  const pipeH = 200;
  const pipeX = 200;
  const pipeW = 1520;

  // pipe appears
  const pipeOp = clamp(t / 0.4, 0, 1);
  const pipeScale = 0.94 + 0.06 * Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  // Scan beam sweeps left to right between 0.6s and 3.0s
  const scanT = clamp((t - 0.6) / 2.4, 0, 1);
  const scanX = pipeX + pipeW * Easing.easeInOutCubic(scanT);

  // Weld points along the pipe — defect/clean labels appear after scan passes them
  const welds = [
    { x: 380, label: 'WELD 142A', status: 'OK' },
    { x: 620, label: 'WELD 142B', status: 'OK' },
    { x: 880, label: 'WELD 143A', status: 'HOLD' },
    { x: 1140, label: 'WELD 143B', status: 'OK' },
    { x: 1430, label: 'WELD 144A', status: 'OK' },
  ];

  // Section header
  const headerOp = clamp(t / 0.4, 0, 1);

  return (
    <>
      <Grid opacity={0.04} />

      {/* Section header */}
      <div style={{
        position: 'absolute', top: 130, left: 120,
        opacity: headerOp,
      }}>
        <div style={{
          fontFamily: IQS.body, fontSize: 13, color: IQS.cyan,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12,
        }}>01 · NDT &amp; Dimensional Control</div>
        <div style={{
          fontFamily: IQS.display, fontWeight: 700, fontSize: 56,
          color: IQS.white, letterSpacing: '-1.5px', lineHeight: 1,
        }}>Every weld. Every joint. Every meter.</div>
      </div>

      {/* Subtitle row with metrics */}
      <div style={{
        position: 'absolute', top: 320, left: 120,
        display: 'flex', gap: 48, opacity: clamp((t - 0.3) / 0.5, 0, 1),
      }}>
        {['UT · Ultrasonic', 'RT · Radiographic', 'PT · Penetrant', 'MT · Magnetic'].map((m) => (
          <div key={m} style={{
            fontFamily: IQS.mono, fontSize: 13, color: IQS.silver,
            letterSpacing: 0.5,
            paddingLeft: 14, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 6,
              width: 6, height: 6, background: IQS.cyan,
            }} />
            {m}
          </div>
        ))}
      </div>

      {/* PIPE — outer cylinder */}
      <div style={{
        position: 'absolute', left: pipeX, top: pipeY, width: pipeW, height: pipeH,
        opacity: pipeOp,
        transform: `scale(${pipeScale})`,
        transformOrigin: 'center',
      }}>
        {/* Pipe body — gradient to simulate steel cylinder */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 12,
          background: `linear-gradient(180deg,
            #1a2c3e 0%, #2a4258 18%, #3d5972 42%, #2a4258 78%, #0a1622 100%)`,
          border: `1px solid ${IQS.border}`,
          boxShadow: `inset 0 0 60px rgba(0,194,232,0.05)`,
        }} />
        {/* End caps for depth */}
        <div style={{
          position: 'absolute', left: -8, top: 0, width: 16, height: pipeH,
          background: '#0a1622', borderRadius: '50%',
          border: `1px solid ${IQS.border}`,
        }} />
        <div style={{
          position: 'absolute', right: -8, top: 0, width: 16, height: pipeH,
          background: '#0a1622', borderRadius: '50%',
          border: `1px solid ${IQS.border}`,
        }} />
        {/* Weld bands */}
        {welds.map((w, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: w.x - pipeX, top: -4, width: 3, height: pipeH + 8,
            background: t > 0.6 + i * 0.3 && t < scanT * 3 + 1
              ? IQS.cyan
              : 'rgba(255,255,255,0.15)',
            transition: 'background 0.2s',
          }} />
        ))}
      </div>

      {/* SCAN BEAM */}
      {scanT > 0 && scanT < 1 && (
        <div style={{
          position: 'absolute', left: scanX - 60, top: pipeY - 40,
          width: 120, height: pipeH + 80,
          background: `linear-gradient(90deg,
            transparent 0%,
            ${IQS.cyan}40 45%,
            ${IQS.cyan} 50%,
            ${IQS.cyan}40 55%,
            transparent 100%)`,
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute', left: 60, top: -28,
            transform: 'translateX(-50%)',
            fontFamily: IQS.mono, fontSize: 11, color: IQS.cyan,
            letterSpacing: 1.5, whiteSpace: 'nowrap',
          }}>UT SCAN ►</div>
        </div>
      )}

      {/* Weld labels — appear after scan passes */}
      {welds.map((w, i) => {
        const passedAt = 0.6 + (w.x - pipeX) / pipeW * 2.4;
        const labelOp = clamp((t - passedAt) / 0.3, 0, 1);
        const isHold = w.status === 'HOLD';
        return (
          <div key={i} style={{
            position: 'absolute', left: w.x, top: pipeY + pipeH + 24,
            transform: 'translateX(-50%)',
            opacity: labelOp,
            textAlign: 'center',
          }}>
            <div style={{ width: 1, height: 16, background: isHold ? IQS.amber : IQS.green, margin: '0 auto 6px' }} />
            <div style={{
              fontFamily: IQS.mono, fontSize: 10, color: IQS.muted,
              letterSpacing: 1, marginBottom: 4,
            }}>{w.label}</div>
            <div style={{
              fontFamily: IQS.body, fontSize: 11, fontWeight: 600,
              color: isHold ? IQS.amber : IQS.green,
              letterSpacing: 1, textTransform: 'uppercase',
              padding: '3px 10px',
              background: isHold ? 'rgba(240,165,0,0.12)' : 'rgba(0,229,160,0.12)',
              border: `1px solid ${isHold ? IQS.amber : IQS.green}`,
              borderRadius: 3, display: 'inline-block',
            }}>{w.status === 'HOLD' ? '● HOLD POINT' : '✓ RELEASED'}</div>
          </div>
        );
      })}

      {/* Counter top-right showing pipes inspected ticking */}
      <CounterReadout t={t} from={4302} to={4461} startAt={0.5} endAt={3.0}
        label="PIPES INSPECTED" position={{top: 140, right: 120}} />

      <CornerMeta t={t} label="01 / NDT" />
    </>
  );
}

// Ticking counter readout (mono, large)
function CounterReadout({ from, to, t, startAt = 0, endAt = 2, label, position, color = IQS.cyan }) {
  const p = Easing.easeOutCubic(clamp((t - startAt) / (endAt - startAt), 0, 1));
  const val = Math.floor(from + (to - from) * p);
  return (
    <div style={{
      position: 'absolute', ...position,
      textAlign: 'right',
      opacity: clamp((t - startAt + 0.2) / 0.4, 0, 1),
    }}>
      <div style={{
        fontFamily: IQS.body, fontSize: 11, color: IQS.muted,
        letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 8,
      }}>{label}</div>
      <div style={{
        fontFamily: IQS.display, fontSize: 84, fontWeight: 700, color,
        letterSpacing: '-3px', lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>{val.toLocaleString()}</div>
    </div>
  );
}

// ─── SCENE 3: Phase dashboard ─────────────────────────────────────
function SceneDashboard() {
  const { localTime } = useSprite();
  const t = localTime;

  // Header fade
  const headerOp = clamp(t / 0.4, 0, 1);

  // KPI cards (4) — stagger in
  const kpis = [
    { val: '4,461', label: 'Total pipes', color: IQS.white },
    { val: '94%', label: 'Released', color: IQS.green },
    { val: '12', label: 'NCR open', color: IQS.amber },
    { val: '2', label: 'On hold', color: IQS.red },
  ];

  // Phases with target progress %; bars fill in
  const phases = [
    { name: 'Welding (Clad)', target: 100, color: IQS.green },
    { name: 'Heat Treatment', target: 98, color: IQS.green },
    { name: 'UT Inspection', target: 96, color: IQS.amber },
    { name: 'Hydro Test', target: 92, color: IQS.amber },
    { name: 'Final Inspection', target: 25, color: IQS.red },
  ];

  // bars start filling at t=1.2 and reach target by t=3.4
  const fillP = Easing.easeOutCubic(clamp((t - 1.2) / 2.2, 0, 1));

  return (
    <>
      <Grid opacity={0.04} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 130, left: 120, opacity: headerOp,
      }}>
        <div style={{
          fontFamily: IQS.body, fontSize: 13, color: IQS.cyan,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12,
        }}>02 · Live QC Dashboard</div>
        <div style={{
          fontFamily: IQS.display, fontWeight: 700, fontSize: 56,
          color: IQS.white, letterSpacing: '-1.5px', lineHeight: 1,
        }}>Real-time visibility,<br/>not week-old PDFs.</div>
      </div>

      {/* Dashboard window */}
      <div style={{
        position: 'absolute', top: 360, left: 120, right: 120,
        background: '#030D18',
        border: `1px solid ${IQS.border}`,
        borderRadius: 12, overflow: 'hidden',
        opacity: clamp((t - 0.3) / 0.5, 0, 1),
        transform: `translateY(${(1 - Easing.easeOutCubic(clamp((t - 0.3)/0.6, 0, 1))) * 20}px)`,
      }}>
        {/* Chrome row */}
        <div style={{
          padding: '14px 22px',
          background: IQS.panel,
          borderBottom: `1px solid ${IQS.border}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: IQS.red }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: IQS.amber }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: IQS.green }} />
          <div style={{
            fontFamily: IQS.mono, fontSize: 12, color: IQS.muted, marginLeft: 12,
            letterSpacing: 0.5,
          }}>iqs-ww.com / dashboard · APP-B · CRA Clad Linepipe · Bremen Special Pipe</div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <PulseDot color={IQS.green} size={7} />
            <div style={{ fontFamily: IQS.mono, fontSize: 11, color: IQS.green, letterSpacing: 1 }}>LIVE</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px' }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 28 }}>
            {kpis.map((k, i) => {
              const op = clamp((t - 0.5 - i * 0.15) / 0.4, 0, 1);
              const ty = (1 - Easing.easeOutCubic(op)) * 12;
              return (
                <div key={i} style={{
                  background: IQS.panel,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  borderRadius: 8, padding: 20,
                  textAlign: 'center',
                  opacity: op, transform: `translateY(${ty}px)`,
                }}>
                  <div style={{
                    fontFamily: IQS.display, fontWeight: 700, fontSize: 42,
                    color: k.color, letterSpacing: '-1px', lineHeight: 1,
                  }}>{k.val}</div>
                  <div style={{
                    fontFamily: IQS.body, fontSize: 11, color: IQS.muted,
                    letterSpacing: 2, textTransform: 'uppercase', marginTop: 8,
                  }}>{k.label}</div>
                </div>
              );
            })}
          </div>

          {/* Phase rows */}
          {phases.map((p, i) => {
            const phaseStart = 1.2 + i * 0.18;
            const phaseP = Easing.easeOutCubic(clamp((t - phaseStart) / 1.0, 0, 1));
            const liveP = (p.target / 100) * phaseP;
            const liveDisplay = Math.floor(p.target * phaseP);
            const status = p.target >= 100 ? 'COMPLETE'
              : p.target >= 90 ? 'IN PROGRESS' : 'CRITICAL';
            const stBg = p.color === IQS.green ? 'rgba(0,229,160,0.12)'
              : p.color === IQS.amber ? 'rgba(240,165,0,0.12)'
              : 'rgba(255,75,75,0.12)';
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 0',
                borderBottom: i < phases.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                opacity: clamp((t - phaseStart + 0.3) / 0.4, 0, 1),
              }}>
                <div style={{
                  fontFamily: IQS.body, fontSize: 15, color: IQS.silver,
                  width: 220, flexShrink: 0,
                }}>{p.name}</div>
                <div style={{
                  flex: 1, height: 8, background: 'rgba(255,255,255,0.06)',
                  borderRadius: 4, overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', width: `${liveP * 100}%`,
                    background: p.color, borderRadius: 4,
                    boxShadow: `0 0 12px ${p.color}66`,
                  }} />
                </div>
                <div style={{
                  fontFamily: IQS.display, fontWeight: 700, fontSize: 17,
                  color: p.color, width: 56, textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                }}>{liveDisplay}%</div>
                <div style={{
                  fontFamily: IQS.body, fontSize: 10, fontWeight: 600,
                  letterSpacing: 1.5, padding: '4px 12px',
                  background: stBg, color: p.color,
                  borderRadius: 3, width: 120, textAlign: 'center',
                }}>{status}</div>
              </div>
            );
          })}
        </div>
      </div>

      <CornerMeta t={t} label="02 / DASHBOARD" />
    </>
  );
}

// ─── SCENE 4: Closing — value prop + sign-off ─────────────────────
function SceneClosing() {
  const { localTime } = useSprite();
  const t = localTime;

  const tiles = [
    { num: '30+', lbl: 'Years of experience' },
    { num: '1,000s', lbl: 'km Linepipe inspected' },
    { num: '24/7', lbl: 'Coverage worldwide' },
    { num: 'Global', lbl: 'Oil · Gas · Offshore' },
  ];

  return (
    <>
      <Grid opacity={0.05} />

      {/* Background scan beam, slow */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: interpolate([0, 4], [200, 1800], Easing.easeOutQuad)(t),
        width: 320,
        background: `linear-gradient(90deg, transparent, ${IQS.cyan}18, transparent)`,
        pointerEvents: 'none',
      }} />

      <Sprite start={0} end={4.5}>
        {() => (
          <div style={{
            position: 'absolute', top: 200, left: 0, right: 0,
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: IQS.body, fontSize: 13, color: IQS.cyan,
              letterSpacing: 4, textTransform: 'uppercase', marginBottom: 18,
              opacity: clamp(t / 0.4, 0, 1),
            }}>From first weld to final release</div>
            <div style={{
              fontFamily: IQS.display, fontWeight: 700,
              fontSize: 132, color: IQS.white,
              letterSpacing: '-4px', lineHeight: 0.95,
              opacity: clamp((t - 0.2) / 0.5, 0, 1),
              transform: `translateY(${(1 - Easing.easeOutCubic(clamp((t - 0.2)/0.6,0,1))) * 24}px)`,
            }}>
              IQS is <span style={{ color: IQS.cyan }}>with you.</span>
            </div>
          </div>
        )}
      </Sprite>

      {/* Stat tiles */}
      <div style={{
        position: 'absolute', bottom: 180, left: 120, right: 120,
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: 2,
        border: `1px solid ${IQS.border}`,
        background: IQS.border,
        borderRadius: 10, overflow: 'hidden',
      }}>
        {tiles.map((tile, i) => {
          const start = 1.4 + i * 0.18;
          const op = clamp((t - start) / 0.4, 0, 1);
          const ty = (1 - Easing.easeOutCubic(op)) * 14;
          return (
            <div key={i} style={{
              background: 'rgba(12,25,41,0.95)',
              padding: '36px 24px', textAlign: 'center',
              opacity: op, transform: `translateY(${ty}px)`,
            }}>
              <div style={{
                fontFamily: IQS.display, fontWeight: 700, fontSize: 56,
                color: IQS.cyan, letterSpacing: '-2px', lineHeight: 1,
              }}>{tile.num}</div>
              <div style={{
                fontFamily: IQS.body, fontSize: 12, color: IQS.muted,
                letterSpacing: 2, textTransform: 'uppercase', marginTop: 12,
              }}>{tile.lbl}</div>
            </div>
          );
        })}
      </div>

      {/* Sign-off */}
      <div style={{
        position: 'absolute', bottom: 60, left: 0, right: 0,
        textAlign: 'center',
        opacity: clamp((t - 2.6) / 0.5, 0, 1),
      }}>
        <div style={{
          fontFamily: IQS.body, fontSize: 14, color: IQS.muted,
          letterSpacing: 4, textTransform: 'uppercase',
        }}>iqs-ww.com  ·  info@iqs-ww.com</div>
      </div>

      <CornerMeta t={t} label="03 / SIGN-OFF" />
    </>
  );
}

// ─── Scene transition helper: cross-fade by absolute time windows ───
function SceneFader({ start, end, fade = 0.4, children }) {
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

// ─── Master scene composition ────────────────────────────────────
function IQSReel() {
  const time = useTime();

  // Update root data attr each second for comment context
  React.useEffect(() => {
    const root = document.querySelector('[data-iqs-reel]');
    if (root) root.setAttribute('data-screen-label', `t=${Math.floor(time)}s`);
  }, [Math.floor(time)]);

  return (
    <div data-iqs-reel style={{ position: 'absolute', inset: 0, background: IQS.navy }}>
      <Chrome />

      {/* Scene 1: 0 – 4.0s · Title */}
      <SceneFader start={0} end={4.0} fade={0.5}>
        <Sprite start={0} end={4.5}>
          <SceneTitle />
        </Sprite>
      </SceneFader>

      {/* Scene 2: 4.0 – 8.5s · Pipe */}
      <SceneFader start={4.0} end={8.5} fade={0.45}>
        <Sprite start={4.0} end={9.0}>
          <ScenePipe />
        </Sprite>
      </SceneFader>

      {/* Scene 3: 8.5 – 14.5s · Dashboard */}
      <SceneFader start={8.5} end={14.5} fade={0.45}>
        <Sprite start={8.5} end={15.0}>
          <SceneDashboard />
        </Sprite>
      </SceneFader>

      {/* Scene 4: 14.5 – 20s · Closing */}
      <SceneFader start={14.5} end={20} fade={0.5}>
        <Sprite start={14.5} end={20.5}>
          <SceneClosing />
        </Sprite>
      </SceneFader>
    </div>
  );
}

Object.assign(window, { IQSReel });
