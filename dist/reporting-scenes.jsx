// reporting-scenes.jsx — IQS Reporting Ecosystem reel
// Procurement-focused: predictability, accountability, automation.

const IQS_R = {
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
  display: '"Space Grotesk", sans-serif',
  body: '"IBM Plex Sans", sans-serif',
  mono: '"IBM Plex Mono", monospace',
};

// ── Shared ────────────────────────────────────────────────────────
function RGrid({ opacity = 0.05 }) {
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

function RPulse({ color = IQS_R.cyan, size = 8 }) {
  const t = useTime();
  const op = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 4));
  return <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color, opacity: op,
    boxShadow: `0 0 ${size * 1.5}px ${color}`,
  }} />;
}

function RChrome({ label }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 56,
      background: 'rgba(5,17,31,0.95)',
      borderBottom: `1px solid ${IQS_R.border}`,
      display: 'flex', alignItems: 'center',
      padding: '0 36px', gap: 18,
      fontFamily: IQS_R.body, zIndex: 10,
    }}>
      <div style={{
        background: '#fff', padding: '5px 12px', borderRadius: 5,
        fontFamily: IQS_R.display, fontWeight: 700, fontSize: 18,
        color: IQS_R.navy, letterSpacing: '-0.5px',
      }}>IQS</div>
      <div style={{ fontSize: 11, color: IQS_R.muted, letterSpacing: 2 }}>{label}</div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <RPulse />
        <div style={{ fontSize: 11, color: IQS_R.cyan, letterSpacing: 2 }}>REPORTING ECOSYSTEM</div>
      </div>
    </div>
  );
}

function RCornerMeta({ t, label }) {
  const op = clamp(t / 0.6, 0, 1);
  return (
    <div style={{
      position: 'absolute', bottom: 36, right: 48,
      fontFamily: IQS_R.mono, fontSize: 11, color: IQS_R.muted,
      letterSpacing: 1.5, opacity: op, textAlign: 'right', lineHeight: 1.8,
    }}>
      <div>{label}</div>
      <div style={{ color: IQS_R.cyan }}>● REC {String(Math.floor(t * 10) / 10).padEnd(4, '0').slice(0, 4)}s</div>
    </div>
  );
}

// ─── SCENE 1: Monday morning hook ─────────────────────────────────
function SceneMonday() {
  const { localTime } = useSprite();
  const t = localTime;

  // Animated time ticking: starts at 06:47:00 → 09:00:00 fast
  const timeP = Easing.easeOutCubic(clamp((t - 0.2) / 2.5, 0, 1));
  const startMin = 6 * 60 + 47;
  const endMin = 9 * 60;
  const totalSec = startMin * 60 + Math.floor(timeP * (endMin - startMin) * 60);
  const hh = Math.floor(totalSec / 3600);
  const mm = Math.floor((totalSec % 3600) / 60);
  const ss = Math.floor(totalSec % 60);
  const clockStr = `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;

  // Headline appears after clock settles
  const headlineOp = clamp((t - 2.3) / 0.5, 0, 1);
  const headlineY = (1 - Easing.easeOutCubic(headlineOp)) * 24;

  // Inbox notification slides in around 1.5s
  const notifP = Easing.easeOutCubic(clamp((t - 1.4) / 0.6, 0, 1));

  return (
    <>
      <RGrid opacity={0.05} />

      {/* Day badge */}
      <div style={{
        position: 'absolute', top: 130, left: 120,
        opacity: clamp(t / 0.4, 0, 1),
      }}>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 13, color: IQS_R.cyan,
          letterSpacing: 4, textTransform: 'uppercase',
        }}>00 · MONDAY</div>
      </div>

      {/* Big clock */}
      <div style={{
        position: 'absolute', top: 200, left: 120, right: 120,
        opacity: clamp(t / 0.3, 0, 1),
      }}>
        <div style={{
          fontFamily: IQS_R.mono, fontSize: 11, color: IQS_R.muted,
          letterSpacing: 3, marginBottom: 12,
        }}>WEEK 47 / 2026 · EUROPE/ROME</div>
        <div style={{
          fontFamily: IQS_R.display, fontWeight: 700,
          fontSize: 240, color: IQS_R.white,
          letterSpacing: '-8px', lineHeight: 0.9,
          fontVariantNumeric: 'tabular-nums',
        }}>{clockStr.slice(0, 5)}</div>
        <div style={{
          fontFamily: IQS_R.mono, fontSize: 32, color: IQS_R.cyan,
          letterSpacing: 4, marginTop: -8,
        }}>:{clockStr.slice(6, 8)}</div>
      </div>

      {/* Headline */}
      <div style={{
        position: 'absolute', top: 720, left: 120, right: 120,
        fontFamily: IQS_R.display, fontWeight: 700, fontSize: 80,
        color: IQS_R.white, lineHeight: 1.0, letterSpacing: '-2.5px',
        opacity: headlineOp,
        transform: `translateY(${headlineY}px)`,
      }}>
        Every Monday.<br/>
        <span style={{ color: IQS_R.cyan }}>09:00 sharp.</span>
      </div>

      {/* Inbox notification card sliding in from right */}
      <div style={{
        position: 'absolute',
        top: 220, right: 120,
        width: 420,
        background: IQS_R.panel,
        border: `1px solid ${IQS_R.border}`,
        borderRadius: 10,
        padding: '18px 22px',
        opacity: notifP,
        transform: `translateX(${(1 - notifP) * 60}px)`,
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: IQS_R.mono, fontSize: 10, color: IQS_R.cyan,
          letterSpacing: 2, marginBottom: 8,
        }}>
          <div style={{ width: 6, height: 6, background: IQS_R.green, borderRadius: '50%' }} />
          NEW · inbox.procurement
        </div>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 13, color: IQS_R.muted, marginBottom: 4,
        }}>From: reports@iqs-ww.com</div>
        <div style={{
          fontFamily: IQS_R.display, fontSize: 18, fontWeight: 600, color: IQS_R.white,
          letterSpacing: '-0.3px', marginBottom: 6,
        }}>Flash Report — Week 47</div>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 12, color: IQS_R.silver, lineHeight: 1.5,
        }}>APP-B · CRA Clad Linepipe · 2 attachments</div>
        <div style={{
          display: 'flex', gap: 6, marginTop: 10,
        }}>
          <span style={{
            fontFamily: IQS_R.mono, fontSize: 9, fontWeight: 600,
            padding: '3px 8px', borderRadius: 3,
            background: 'rgba(0,194,232,0.15)', color: IQS_R.cyan,
            letterSpacing: 1,
          }}>📄 .DOCX</span>
          <span style={{
            fontFamily: IQS_R.mono, fontSize: 9, fontWeight: 600,
            padding: '3px 8px', borderRadius: 3,
            background: 'rgba(0,229,160,0.15)', color: IQS_R.green,
            letterSpacing: 1,
          }}>📊 .XLSX</span>
        </div>
      </div>

      <RCornerMeta t={t} label="00 / MONDAY 09:00" />
    </>
  );
}

// ─── SCENE 2: Pipeline (data → Python → reports) ──────────────────
function ScenePipeline() {
  const { localTime } = useSprite();
  const t = localTime;

  const headerOp = clamp(t / 0.4, 0, 1);

  // Three columns with arrows between them
  const colY = 380;
  const col1X = 140;
  const col2X = 760;
  const col3X = 1380;
  const colW = 400;

  // Stagger appearance
  const col1Op = clamp(t / 0.5, 0, 1);
  const arrow1Op = clamp((t - 0.8) / 0.4, 0, 1);
  const col2Op = clamp((t - 1.1) / 0.5, 0, 1);
  const arrow2Op = clamp((t - 1.9) / 0.4, 0, 1);
  const col3Op = clamp((t - 2.2) / 0.5, 0, 1);

  // Animated rows in col1 (data streaming)
  const rowCount = Math.min(6, Math.floor((t - 0.3) * 4));

  // Python progress bar
  const pyP = Easing.easeOutCubic(clamp((t - 1.3) / 1.5, 0, 1));

  return (
    <>
      <RGrid opacity={0.04} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 130, left: 120, opacity: headerOp,
      }}>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 13, color: IQS_R.cyan,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12,
        }}>01 · Automated Pipeline</div>
        <div style={{
          fontFamily: IQS_R.display, fontWeight: 700, fontSize: 56,
          color: IQS_R.white, letterSpacing: '-1.5px', lineHeight: 1,
        }}>From the field, to your inbox.</div>
      </div>

      {/* COL 1: Raw daily data */}
      <div style={{
        position: 'absolute', left: col1X, top: colY, width: colW,
        opacity: col1Op,
      }}>
        <div style={{
          fontFamily: IQS_R.mono, fontSize: 11, color: IQS_R.muted,
          letterSpacing: 2, marginBottom: 14,
        }}>INPUT</div>
        <div style={{
          fontFamily: IQS_R.display, fontWeight: 600, fontSize: 22,
          color: IQS_R.white, marginBottom: 18,
        }}>Daily production data</div>
        <div style={{
          background: IQS_R.panel,
          border: `1px solid rgba(255,255,255,0.06)`,
          borderRadius: 8, padding: 16,
          fontFamily: IQS_R.mono, fontSize: 11,
          color: IQS_R.silver, lineHeight: 1.9,
        }}>
          {[
            { d: 'Mon', n: '142', s: 'OK' },
            { d: 'Tue', n: '156', s: 'OK' },
            { d: 'Wed', n: '138', s: 'NCR' },
            { d: 'Thu', n: '161', s: 'OK' },
            { d: 'Fri', n: '149', s: 'OK' },
            { d: 'Sat', n: '098', s: 'OK' },
          ].slice(0, rowCount).map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              padding: '5px 0',
              animation: 'rfade 0.3s ease-out',
            }}>
              <span style={{ color: IQS_R.muted }}>{r.d}</span>
              <span>{r.n} pipes</span>
              <span style={{ color: r.s === 'NCR' ? IQS_R.amber : IQS_R.green }}>{r.s}</span>
            </div>
          ))}
        </div>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 12, color: IQS_R.muted,
          marginTop: 12, lineHeight: 1.5,
        }}>
          Logged on-site by IQS inspectors — every shift, every phase.
        </div>
      </div>

      {/* Arrow 1 */}
      <div style={{
        position: 'absolute', left: col1X + colW + 20, top: colY + 140,
        width: 180, height: 2,
        background: `linear-gradient(90deg, ${IQS_R.cyan}, transparent)`,
        opacity: arrow1Op,
      }}>
        <div style={{
          position: 'absolute', right: 0, top: -5,
          fontFamily: IQS_R.mono, fontSize: 16, color: IQS_R.cyan,
        }}>▶</div>
      </div>

      {/* COL 2: Quality Engine */}
      <div style={{
        position: 'absolute', left: col2X, top: colY, width: colW,
        opacity: col2Op,
      }}>
        <div style={{
          fontFamily: IQS_R.mono, fontSize: 11, color: IQS_R.muted,
          letterSpacing: 2, marginBottom: 14,
        }}>PROCESS</div>
        <div style={{
          fontFamily: IQS_R.display, fontWeight: 600, fontSize: 22,
          color: IQS_R.white, marginBottom: 18,
        }}>IQS Quality Engine</div>
        <div style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(0,194,232,0.10), transparent 70%)',
          border: `1px solid ${IQS_R.border}`,
          borderRadius: 8, padding: '18px 18px',
        }}>
          {[
            { lbl: 'Validate', detail: '6,847 records · 0 errors' },
            { lbl: 'Aggregate', detail: 'By phase · by shift · by NCR' },
            { lbl: 'Compute KPIs', detail: 'Semaphores · forecast · trend' },
            { lbl: 'Render', detail: 'DOCX + XLSX · IQS template' },
          ].map((step, i) => {
            const stepStart = 0.3 + i * 0.35;
            const stepP = clamp((pyP * 2.0) - i * 0.45, 0, 1);
            const done = stepP > 0.95;
            const active = stepP > 0.05 && !done;
            const idle = stepP <= 0.05;
            const op = clamp((t - 1.3 - i * 0.18) / 0.35, 0, 1);
            const color = done ? IQS_R.green : active ? IQS_R.cyan : IQS_R.muted;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 0',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                opacity: op,
              }}>
                {/* status indicator */}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  border: `1.5px solid ${color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: done ? `${IQS_R.green}22` : 'transparent',
                  boxShadow: active ? `0 0 14px ${IQS_R.cyan}` : 'none',
                  flexShrink: 0,
                  position: 'relative',
                }}>
                  {done && (
                    <div style={{
                      fontFamily: IQS_R.body, fontSize: 14, color: IQS_R.green,
                      fontWeight: 700, lineHeight: 1,
                    }}>✓</div>
                  )}
                  {active && (
                    <div style={{
                      position: 'absolute', inset: -4,
                      borderRadius: '50%',
                      border: `1px solid ${IQS_R.cyan}`,
                      opacity: 0.5,
                      animation: 'rpulse 1.2s ease-out infinite',
                    }} />
                  )}
                  {idle && (
                    <div style={{
                      width: 6, height: 6, background: IQS_R.muted,
                      borderRadius: '50%',
                    }} />
                  )}
                </div>
                {/* label + detail */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: IQS_R.body, fontSize: 13, fontWeight: 600,
                    color: idle ? IQS_R.muted : IQS_R.white,
                    letterSpacing: 0.2, marginBottom: 2,
                  }}>{step.lbl}</div>
                  <div style={{
                    fontFamily: IQS_R.mono, fontSize: 10,
                    color: idle ? 'rgba(91,122,148,0.5)' : IQS_R.muted,
                    letterSpacing: 0.5,
                  }}>{step.detail}</div>
                </div>
                {/* mini progress bar for active step */}
                <div style={{
                  width: 50, height: 3, background: 'rgba(255,255,255,0.06)',
                  borderRadius: 2, overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', width: `${stepP * 100}%`,
                    background: color,
                    boxShadow: active ? `0 0 6px ${IQS_R.cyan}` : 'none',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 12, color: IQS_R.muted,
          marginTop: 12, lineHeight: 1.5,
        }}>
          Same format. Same KPIs. <strong style={{color: IQS_R.silver}}>Every</strong> week.
        </div>
      </div>

      {/* Arrow 2 */}
      <div style={{
        position: 'absolute', left: col2X + colW + 20, top: colY + 140,
        width: 180, height: 2,
        background: `linear-gradient(90deg, ${IQS_R.cyan}, transparent)`,
        opacity: arrow2Op,
      }}>
        <div style={{
          position: 'absolute', right: 0, top: -5,
          fontFamily: IQS_R.mono, fontSize: 16, color: IQS_R.cyan,
        }}>▶</div>
      </div>

      {/* COL 3: Outputs */}
      <div style={{
        position: 'absolute', left: col3X, top: colY, width: colW,
        opacity: col3Op,
      }}>
        <div style={{
          fontFamily: IQS_R.mono, fontSize: 11, color: IQS_R.muted,
          letterSpacing: 2, marginBottom: 14,
        }}>OUTPUT</div>
        <div style={{
          fontFamily: IQS_R.display, fontWeight: 600, fontSize: 22,
          color: IQS_R.white, marginBottom: 18,
        }}>Delivered to your inbox</div>
        {/* DOCX card */}
        <div style={{
          background: IQS_R.panel,
          border: `1px solid ${IQS_R.border}`,
          borderRadius: 8, padding: '16px 18px', marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 14,
          opacity: clamp((t - 2.7) / 0.4, 0, 1),
          transform: `translateX(${(1 - clamp((t - 2.7)/0.5, 0, 1)) * 20}px)`,
        }}>
          <div style={{
            width: 44, height: 56, background: IQS_R.paper, borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: IQS_R.display, fontWeight: 700, fontSize: 12,
            color: IQS_R.navy, flexShrink: 0,
          }}>DOC</div>
          <div>
            <div style={{
              fontFamily: IQS_R.display, fontSize: 15, fontWeight: 600,
              color: IQS_R.white, marginBottom: 3,
            }}>Flash Report.docx</div>
            <div style={{
              fontFamily: IQS_R.body, fontSize: 11, color: IQS_R.muted,
            }}>Executive summary · narrative · forecast</div>
          </div>
        </div>
        {/* XLSX card */}
        <div style={{
          background: IQS_R.panel,
          border: `1px solid ${IQS_R.border}`,
          borderRadius: 8, padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 14,
          opacity: clamp((t - 2.95) / 0.4, 0, 1),
          transform: `translateX(${(1 - clamp((t - 2.95)/0.5, 0, 1)) * 20}px)`,
        }}>
          <div style={{
            width: 44, height: 56, background: '#1f7a47', borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: IQS_R.display, fontWeight: 700, fontSize: 12,
            color: '#fff', flexShrink: 0,
          }}>XLS</div>
          <div>
            <div style={{
              fontFamily: IQS_R.display, fontSize: 15, fontWeight: 600,
              color: IQS_R.white, marginBottom: 3,
            }}>KPI Tables.xlsx</div>
            <div style={{
              fontFamily: IQS_R.body, fontSize: 11, color: IQS_R.muted,
            }}>Production · NCR log · trend data</div>
          </div>
        </div>
      </div>

      <RCornerMeta t={t} label="01 / PIPELINE" />
    </>
  );
}

// ─── SCENE 3: Flash Report composing on paper ─────────────────────
function SceneFlashReport() {
  const { localTime } = useSprite();
  const t = localTime;

  const headerOp = clamp(t / 0.4, 0, 1);

  // Paper sheet slides up
  const paperOp = clamp((t - 0.3) / 0.5, 0, 1);
  const paperY = (1 - Easing.easeOutCubic(paperOp)) * 30;

  return (
    <>
      <RGrid opacity={0.04} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 130, left: 120, opacity: headerOp,
      }}>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 13, color: IQS_R.cyan,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12,
        }}>02 · Inside the Flash Report</div>
        <div style={{
          fontFamily: IQS_R.display, fontWeight: 700, fontSize: 56,
          color: IQS_R.white, letterSpacing: '-1.5px', lineHeight: 1,
        }}>Management-ready. No assembly required.</div>
      </div>

      {/* PAPER SHEET */}
      <div style={{
        position: 'absolute', top: 360, left: '50%',
        width: 1100, height: 640,
        transform: `translateX(-50%) translateY(${paperY}px)`,
        background: IQS_R.paper,
        borderRadius: 6,
        boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,194,232,0.2)',
        opacity: paperOp,
        padding: '40px 56px',
        overflow: 'hidden',
        fontFamily: IQS_R.body,
        color: IQS_R.paperInk,
      }}>
        {/* Doc header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          paddingBottom: 18,
          borderBottom: '2px solid #1A1A1A',
          opacity: clamp((t - 0.7) / 0.3, 0, 1),
        }}>
          <div>
            <div style={{
              fontFamily: IQS_R.display, fontWeight: 700, fontSize: 26,
              letterSpacing: '-0.5px', marginBottom: 4,
            }}>FLASH REPORT — Week 47 / 2026</div>
            <div style={{
              fontFamily: IQS_R.body, fontSize: 12, color: '#555',
            }}>Order 77821 · APP-B · CRA Clad Linepipe · Bremen Special Pipe</div>
          </div>
          <div style={{
            background: '#1A1A1A', color: '#fff',
            padding: '6px 12px', borderRadius: 4,
            fontFamily: IQS_R.display, fontWeight: 700, fontSize: 13,
            letterSpacing: '-0.3px',
          }}>IQS</div>
        </div>

        {/* Section: Executive summary */}
        <div style={{
          marginTop: 22,
          opacity: clamp((t - 1.1) / 0.4, 0, 1),
        }}>
          <div style={{
            fontFamily: IQS_R.body, fontSize: 10, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
            color: '#888', marginBottom: 6,
          }}>Executive Summary</div>
          <div style={{ fontSize: 13, lineHeight: 1.55, color: '#222' }}>
            Production continues nominally across welding and HT phases. UT inspection on track at 96%.
            Final inspection bottleneck identified — 2 holds on PWHT certificates require client review.
            Forecast: full PO closure by Week 51, contingent on hydro test acceleration.
          </div>
        </div>

        {/* KPI TABLE */}
        <div style={{
          marginTop: 22,
          opacity: clamp((t - 1.6) / 0.4, 0, 1),
        }}>
          <div style={{
            fontFamily: IQS_R.body, fontSize: 10, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
            color: '#888', marginBottom: 10,
          }}>Production KPI · Phase status</div>
          <table style={{
            width: '100%', borderCollapse: 'collapse',
            fontSize: 12,
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #999' }}>
                <th style={{ textAlign: 'left', padding: '6px 0', fontWeight: 600, width: '32%' }}>Phase</th>
                <th style={{ textAlign: 'right', padding: '6px 8px', fontWeight: 600 }}>PO Qty</th>
                <th style={{ textAlign: 'right', padding: '6px 8px', fontWeight: 600 }}>Released</th>
                <th style={{ textAlign: 'right', padding: '6px 8px', fontWeight: 600 }}>%</th>
                <th style={{ textAlign: 'center', padding: '6px 8px', fontWeight: 600, width: '80px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { p: 'Welding (CS + Clad)', q: 4461, r: 4461, pct: 100, st: 'G' },
                { p: 'Heat Treatment', q: 4461, r: 4372, pct: 98, st: 'G' },
                { p: 'UT Inspection', q: 4461, r: 4282, pct: 96, st: 'A' },
                { p: 'Hydro Test', q: 4461, r: 4104, pct: 92, st: 'A' },
                { p: 'Final Inspection', q: 4461, r: 1115, pct: 25, st: 'R' },
              ].map((row, i) => {
                const rowOp = clamp((t - 1.7 - i * 0.12) / 0.3, 0, 1);
                const stColor = row.st === 'G' ? '#1f7a47' : row.st === 'A' ? '#c47a00' : '#b8341e';
                return (
                  <tr key={i} style={{
                    borderBottom: '1px solid #ddd',
                    opacity: rowOp,
                  }}>
                    <td style={{ padding: '8px 0' }}>{row.p}</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.q.toLocaleString()}</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.r.toLocaleString()}</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: stColor }}>{row.pct}%</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block', width: 18, height: 18, borderRadius: '50%',
                        background: stColor, verticalAlign: 'middle',
                      }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Forecast row at bottom */}
        <div style={{
          position: 'absolute', bottom: 36, left: 56, right: 56,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28,
          opacity: clamp((t - 3.0) / 0.5, 0, 1),
          paddingTop: 18,
          borderTop: '1px solid #ccc',
        }}>
          {[
            { l: 'Forecast Completion', v: 'Week 51', sub: 'On critical path' },
            { l: 'NCR Open', v: '12', sub: '2 critical · 10 minor' },
            { l: 'Next Week Plan', v: '3 Witness Pts', sub: 'PWHT · Hydro · MDR' },
          ].map((b, i) => (
            <div key={i}>
              <div style={{
                fontFamily: IQS_R.body, fontSize: 9, fontWeight: 700,
                letterSpacing: 2, textTransform: 'uppercase',
                color: '#888', marginBottom: 4,
              }}>{b.l}</div>
              <div style={{
                fontFamily: IQS_R.display, fontWeight: 700, fontSize: 22,
                color: '#1A1A1A', marginBottom: 3, letterSpacing: '-0.4px',
              }}>{b.v}</div>
              <div style={{ fontSize: 11, color: '#666' }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <RCornerMeta t={t} label="02 / FLASH REPORT" />
    </>
  );
}

// ─── SCENE 3.5: Technical Inspection Report — Pipe Storage & Handling ─
function SceneStorageReport() {
  const { localTime } = useSprite();
  const t = localTime;

  const headerOp = clamp(t / 0.4, 0, 1);

  // Paper sheet slides up
  const paperOp = clamp((t - 0.3) / 0.5, 0, 1);
  const paperY = (1 - Easing.easeOutCubic(paperOp)) * 30;

  // Inspection items (checklist on the left of the paper)
  const items = [
    { lbl: 'Cradle / rack spacing ≤ 4 m', st: 'P' },
    { lbl: 'End caps fitted — both ends', st: 'P' },
    { lbl: 'Heat / grade segregation', st: 'P' },
    { lbl: 'Bevel protectors in place', st: 'O' },
    { lbl: 'Wood dunnage — no ground contact', st: 'P' },
    { lbl: 'Stack height ≤ 4 layers', st: 'P' },
    { lbl: 'Pipe ID / heat # legible', st: 'O' },
    { lbl: 'Drainage & runoff adequate', st: 'F' },
    { lbl: 'Stencil & marking integrity', st: 'P' },
  ];

  return (
    <>
      <RGrid opacity={0.04} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 130, left: 120, opacity: headerOp,
      }}>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 13, color: IQS_R.cyan,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12,
        }}>03 · Technical Inspection Report</div>
        <div style={{
          fontFamily: IQS_R.display, fontWeight: 700, fontSize: 56,
          color: IQS_R.white, letterSpacing: '-1.5px', lineHeight: 1,
        }}>Pipe storage &amp; handling — on the record.</div>
      </div>

      {/* PAPER SHEET */}
      <div style={{
        position: 'absolute', top: 360, left: '50%',
        width: 1280, height: 640,
        transform: `translateX(-50%) translateY(${paperY}px)`,
        background: IQS_R.paper,
        borderRadius: 6,
        boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,194,232,0.2)',
        opacity: paperOp,
        padding: '36px 48px',
        overflow: 'hidden',
        fontFamily: IQS_R.body,
        color: IQS_R.paperInk,
      }}>
        {/* Doc header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          paddingBottom: 16,
          borderBottom: '2px solid #1A1A1A',
          opacity: clamp((t - 0.7) / 0.3, 0, 1),
        }}>
          <div>
            <div style={{
              fontFamily: IQS_R.display, fontWeight: 700, fontSize: 24,
              letterSpacing: '-0.5px', marginBottom: 4,
            }}>TECHNICAL INSPECTION REPORT</div>
            <div style={{
              fontFamily: IQS_R.display, fontWeight: 500, fontSize: 15,
              color: '#444', marginBottom: 6, letterSpacing: '-0.2px',
            }}>Pipe Storage &amp; Handling — Yard Audit</div>
            <div style={{
              fontFamily: IQS_R.body, fontSize: 11, color: '#666',
            }}>Order 77821 · APP-B · Yard B-3, Bremen Special Pipe · Inspector: M. Rauer · 23 Nov 2026</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              fontFamily: IQS_R.mono, fontSize: 10, color: '#888',
              letterSpacing: 1.5, textAlign: 'right', lineHeight: 1.6,
            }}>
              <div>DOC TIR-2026-W47-018</div>
              <div>REV 01 · 4 PAGES</div>
            </div>
            <div style={{
              background: '#1A1A1A', color: '#fff',
              padding: '6px 12px', borderRadius: 4,
              fontFamily: IQS_R.display, fontWeight: 700, fontSize: 13,
              letterSpacing: '-0.3px',
            }}>IQS</div>
          </div>
        </div>

        {/* Two-column body: checklist | photos + summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: 36,
          marginTop: 20,
        }}>
          {/* LEFT — Inspection checklist */}
          <div style={{
            opacity: clamp((t - 1.0) / 0.4, 0, 1),
          }}>
            <div style={{
              fontFamily: IQS_R.body, fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: '#888', marginBottom: 10,
            }}>Inspection items — 9 checkpoints</div>
            <div>
              {items.map((it, i) => {
                const rowOp = clamp((t - 1.15 - i * 0.10) / 0.3, 0, 1);
                const color = it.st === 'P' ? '#1f7a47' : it.st === 'O' ? '#c47a00' : '#b8341e';
                const label = it.st === 'P' ? 'PASS' : it.st === 'O' ? 'OBS' : 'FAIL';
                const bg = it.st === 'P' ? 'rgba(31,122,71,0.08)' : it.st === 'O' ? 'rgba(196,122,0,0.10)' : 'rgba(184,52,30,0.10)';
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '7px 0',
                    borderBottom: i < items.length - 1 ? '1px solid #e6e0d0' : 'none',
                    opacity: rowOp,
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 4,
                      background: color,
                      color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: IQS_R.display, fontWeight: 700, fontSize: 12,
                      flexShrink: 0,
                    }}>{it.st === 'P' ? '✓' : it.st === 'O' ? '!' : '✗'}</div>
                    <div style={{ flex: 1, fontSize: 12.5, color: '#222' }}>{it.lbl}</div>
                    <div style={{
                      fontFamily: IQS_R.mono, fontSize: 9, fontWeight: 700,
                      letterSpacing: 1.2, color, background: bg,
                      padding: '3px 8px', borderRadius: 3,
                    }}>{label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Photo evidence + finding summary */}
          <div>
            {/* Summary tiles */}
            <div style={{
              opacity: clamp((t - 1.1) / 0.4, 0, 1),
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8,
              marginBottom: 18,
            }}>
              {[
                { v: '6', l: 'Pass', c: '#1f7a47' },
                { v: '2', l: 'Observation', c: '#c47a00' },
                { v: '1', l: 'Finding', c: '#b8341e' },
              ].map((s, i) => (
                <div key={i} style={{
                  border: `1px solid ${s.c}`,
                  borderLeft: `4px solid ${s.c}`,
                  padding: '8px 12px',
                  background: '#fff',
                }}>
                  <div style={{
                    fontFamily: IQS_R.display, fontWeight: 700, fontSize: 28,
                    color: s.c, lineHeight: 1, letterSpacing: '-0.5px',
                  }}>{s.v}</div>
                  <div style={{
                    fontFamily: IQS_R.body, fontSize: 9, fontWeight: 700,
                    letterSpacing: 1.5, textTransform: 'uppercase',
                    color: '#666', marginTop: 4,
                  }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Photo grid */}
            <div style={{
              fontFamily: IQS_R.body, fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: '#888', marginBottom: 8,
              opacity: clamp((t - 1.4) / 0.4, 0, 1),
            }}>Photo evidence — 4 / 18</div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 8,
            }}>
              {[
                { lbl: 'Rack B-3 · row 4', tone: '#9eb1c2', acc: '#1f7a47' },
                { lbl: 'End cap detail · DN24', tone: '#a8b8a0', acc: '#1f7a47' },
                { lbl: 'Drainage south corner', tone: '#b09a82', acc: '#b8341e' },
                { lbl: 'Stencil — heat 4471', tone: '#92a0b0', acc: '#c47a00' },
              ].map((ph, i) => {
                const phOp = clamp((t - 1.6 - i * 0.12) / 0.3, 0, 1);
                return (
                  <div key={i} style={{
                    position: 'relative', height: 118,
                    background: ph.tone,
                    borderRadius: 4, overflow: 'hidden',
                    opacity: phOp,
                  }}>
                    {/* Abstract pipe-yard illustration */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `
                        linear-gradient(180deg, rgba(0,0,0,0.15), transparent 30%),
                        repeating-linear-gradient(90deg,
                          rgba(0,0,0,0.18) 0 14px,
                          rgba(255,255,255,0.05) 14px 28px)`,
                    }} />
                    <div style={{
                      position: 'absolute', top: 6, left: 8,
                      width: 6, height: 6, background: ph.acc,
                      borderRadius: '50%',
                      boxShadow: `0 0 0 2px rgba(255,255,255,0.6)`,
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.7))',
                      padding: '14px 8px 6px',
                      fontFamily: IQS_R.mono, fontSize: 9.5,
                      color: '#fff', letterSpacing: 0.5,
                      display: 'flex', justifyContent: 'space-between',
                    }}>
                      <span>{ph.lbl}</span>
                      <span style={{ opacity: 0.75 }}>IMG-{String(i+1).padStart(2,'0')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom — recommendations strip */}
        <div style={{
          position: 'absolute', bottom: 28, left: 48, right: 48,
          paddingTop: 14,
          borderTop: '1px solid #ccc',
          display: 'flex', alignItems: 'flex-start', gap: 20,
          opacity: clamp((t - 2.8) / 0.5, 0, 1),
        }}>
          <div style={{ flex: '0 0 auto' }}>
            <div style={{
              fontFamily: IQS_R.body, fontSize: 9, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: '#888', marginBottom: 4,
            }}>Recommended action</div>
            <div style={{
              fontFamily: IQS_R.display, fontWeight: 700, fontSize: 18,
              color: '#b8341e', letterSpacing: '-0.3px',
            }}>Re-grade SE drainage · clear within 7 d</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: IQS_R.body, fontSize: 9, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: '#888', marginBottom: 4,
            }}>Signed off</div>
            <div style={{
              fontFamily: IQS_R.display, fontWeight: 600, fontSize: 13,
              color: '#222',
            }}>M. Rauer — IQS Lead Inspector</div>
          </div>
        </div>
      </div>

      <RCornerMeta t={t} label="03 / TECHNICAL INSPECTION" />
    </>
  );
}

// ─── SCENE 4: Sign-off — 52 weeks ─────────────────────────────────
function SceneSignoff() {
  const { localTime } = useSprite();
  const t = localTime;

  const tiles = [
    { num: '52', lbl: 'Weeks per year' },
    { num: '<24h', lbl: 'Delivery after week-end' },
    { num: '100%', lbl: 'On-time, since 2018' },
    { num: '0', lbl: 'Missed deadlines' },
  ];

  return (
    <>
      <RGrid opacity={0.05} />

      {/* Background slow beam */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: interpolate([0, 4], [200, 1800], Easing.easeOutQuad)(t),
        width: 320,
        background: `linear-gradient(90deg, transparent, ${IQS_R.cyan}18, transparent)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: 200, left: 0, right: 0,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 13, color: IQS_R.cyan,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 18,
          opacity: clamp(t / 0.4, 0, 1),
        }}>Structured transparency, end to end</div>
        <div style={{
          fontFamily: IQS_R.display, fontWeight: 700,
          fontSize: 120, color: IQS_R.white,
          letterSpacing: '-3.5px', lineHeight: 0.98,
          opacity: clamp((t - 0.2) / 0.5, 0, 1),
          transform: `translateY(${(1 - Easing.easeOutCubic(clamp((t - 0.2)/0.6,0,1))) * 24}px)`,
        }}>
          No surprises.<br/>
          <span style={{ color: IQS_R.cyan }}>Just signal.</span>
        </div>
      </div>

      {/* Stat tiles */}
      <div style={{
        position: 'absolute', bottom: 180, left: 120, right: 120,
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: 2,
        border: `1px solid ${IQS_R.border}`,
        background: IQS_R.border,
        borderRadius: 10, overflow: 'hidden',
      }}>
        {tiles.map((tile, i) => {
          const start = 1.6 + i * 0.18;
          const op = clamp((t - start) / 0.4, 0, 1);
          const ty = (1 - Easing.easeOutCubic(op)) * 14;
          return (
            <div key={i} style={{
              background: 'rgba(12,25,41,0.95)',
              padding: '36px 24px', textAlign: 'center',
              opacity: op, transform: `translateY(${ty}px)`,
            }}>
              <div style={{
                fontFamily: IQS_R.display, fontWeight: 700, fontSize: 56,
                color: IQS_R.cyan, letterSpacing: '-2px', lineHeight: 1,
              }}>{tile.num}</div>
              <div style={{
                fontFamily: IQS_R.body, fontSize: 12, color: IQS_R.muted,
                letterSpacing: 2, textTransform: 'uppercase', marginTop: 12,
              }}>{tile.lbl}</div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', bottom: 60, left: 0, right: 0,
        textAlign: 'center',
        opacity: clamp((t - 2.6) / 0.5, 0, 1),
      }}>
        <div style={{
          fontFamily: IQS_R.body, fontSize: 14, color: IQS_R.muted,
          letterSpacing: 4, textTransform: 'uppercase',
        }}>iqs-ww.com  ·  reports@iqs-ww.com</div>
      </div>

      <RCornerMeta t={t} label="04 / SIGN-OFF" />
    </>
  );
}

// ─── Scene fader ──────────────────────────────────────────────────
function RSceneFader({ start, end, fade = 0.4, children }) {
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

// ─── Master ───────────────────────────────────────────────────────
function ReportingReel() {
  const time = useTime();

  React.useEffect(() => {
    const root = document.querySelector('[data-iqs-reporting-reel]');
    if (root) root.setAttribute('data-screen-label', `t=${Math.floor(time)}s`);
  }, [Math.floor(time)]);

  return (
    <div data-iqs-reporting-reel style={{ position: 'absolute', inset: 0, background: IQS_R.navy }}>
      <RChrome label="REPORTING ECOSYSTEM" />

      <RSceneFader start={0} end={4.0} fade={0.5}>
        <Sprite start={0} end={4.5}><SceneMonday /></Sprite>
      </RSceneFader>

      <RSceneFader start={4.0} end={9.0} fade={0.45}>
        <Sprite start={4.0} end={9.5}><ScenePipeline /></Sprite>
      </RSceneFader>

      <RSceneFader start={9.0} end={14.0} fade={0.45}>
        <Sprite start={9.0} end={14.5}><SceneFlashReport /></Sprite>
      </RSceneFader>

      <RSceneFader start={14.0} end={19.5} fade={0.45}>
        <Sprite start={14.0} end={20.0}><SceneStorageReport /></Sprite>
      </RSceneFader>

      <RSceneFader start={19.5} end={25} fade={0.5}>
        <Sprite start={19.5} end={25.5}><SceneSignoff /></Sprite>
      </RSceneFader>
    </div>
  );
}

Object.assign(window, { ReportingReel });
