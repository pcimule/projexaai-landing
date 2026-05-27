/* ==========================================================================
   ProjexaAI Landing — Interactive Demo Engine v1
   5 animated scenes: Dashboard · AI · Gantt · Costs · Bitácora
   ========================================================================== */
(function () {
  'use strict';

  const SCENE_DURATION = 7000; // ms per scene before auto-advance
  const TRANSITION_MS  = 220;  // fade between scenes

  /* ── Utility: animated counter ──────────────────────────────────── */
  function animCounter(el, duration) {
    const target   = parseFloat(el.dataset.counter);
    const decimals = parseInt(el.dataset.decimals  || '0', 10);
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const start    = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = prefix + (e * target).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ── Utility: typewriter ─────────────────────────────────────────── */
  function typewrite(el, text, speed, cb) {
    el.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) { clearInterval(iv); if (cb) cb(); }
    }, speed);
    return iv;
  }

  /* ── Utility: stagger-reveal list ───────────────────────────────── */
  function staggerReveal(els, delay, gap) {
    els.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity .35s ease, transform .35s ease';
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      }, delay + i * gap);
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     SCENE 0 — Dashboard EVM
  ══════════════════════════════════════════════════════════════════ */
  const scene0 = {
    url: 'app.projexaai.com/#/dashboard',
    render: () => `
<div class="idd-layout">
  <nav class="idd-side">
    <div class="idd-logo">P</div>
    <div class="idd-nav active"><i class="fa-solid fa-gauge-high"></i><span>Dashboard</span></div>
    <div class="idd-nav"><i class="fa-solid fa-diagram-project"></i><span>Fases</span></div>
    <div class="idd-nav"><i class="fa-solid fa-wallet"></i><span>Presupuesto</span></div>
    <div class="idd-nav"><i class="fa-solid fa-receipt"></i><span>Costos</span></div>
    <div class="idd-nav"><i class="fa-solid fa-camera"></i><span>Bitácora</span></div>
    <div class="idd-nav"><i class="fa-solid fa-wand-magic-sparkles"></i><span>IA</span></div>
  </nav>
  <div class="idd-main">
    <div class="idd-toprow">
      <div>
        <h4 class="idd-page-title">Dashboard</h4>
        <span class="idd-proj-name"><i class="fa-solid fa-building-columns"></i> Torre Central — Piso 12</span>
      </div>
      <span class="idd-status-badge">▲ En tiempo</span>
    </div>

    <div class="idd-kpis">
      <div class="idd-kpi k-blue"><div class="idd-kl">CPI</div><div class="idd-kv" data-counter="1.08" data-decimals="2">0.00</div></div>
      <div class="idd-kpi k-teal"><div class="idd-kl">SPI</div><div class="idd-kv" data-counter="0.94" data-decimals="2">0.00</div></div>
      <div class="idd-kpi k-green"><div class="idd-kl">Avance</div><div class="idd-kv" data-counter="62" data-suffix="%">0%</div></div>
      <div class="idd-kpi k-amber"><div class="idd-kl">EAC</div><div class="idd-kv" data-counter="218" data-prefix="$" data-suffix="k">$0k</div></div>
      <div class="idd-kpi k-red"><div class="idd-kl">Desv.</div><div class="idd-kv" data-counter="8" data-prefix="-$" data-suffix="k">-$0k</div></div>
    </div>

    <div class="idd-two-col">
      <div class="idd-card">
        <div class="idd-card-hd">Presupuesto vs Real</div>
        <div class="idd-bars-wrap">
          <div class="idd-bar-grp"><div class="idd-bar bar-bg" data-h="72"></div><div class="idd-bar bar-rl" data-h="55"></div><span>Mar</span></div>
          <div class="idd-bar-grp"><div class="idd-bar bar-bg" data-h="80"></div><div class="idd-bar bar-rl" data-h="70"></div><span>Abr</span></div>
          <div class="idd-bar-grp"><div class="idd-bar bar-bg" data-h="65"></div><div class="idd-bar bar-rl" data-h="68"></div><span>May</span></div>
          <div class="idd-bar-grp"><div class="idd-bar bar-bg" data-h="90"></div><div class="idd-bar bar-rl" data-h="82"></div><span>Jun</span></div>
          <div class="idd-bar-grp"><div class="idd-bar bar-bg" data-h="75"></div><div class="idd-bar bar-rl" data-h="78"></div><span>Jul</span></div>
        </div>
        <div class="idd-legend">
          <span class="idd-ldot" style="background:#1e40af"></span>Presupuesto
          <span class="idd-ldot" style="background:#0891b2;margin-left:8px"></span>Real
        </div>
      </div>
      <div class="idd-card">
        <div class="idd-card-hd">Avance por fase</div>
        <div class="idd-phase-list">
          <div class="idd-phase-row"><span>Estructura</span><div class="idd-pb"><div class="idd-pb-fill" data-w="85" style="width:0;background:#1e40af"></div></div><span>85%</span></div>
          <div class="idd-phase-row"><span>Mampostería</span><div class="idd-pb"><div class="idd-pb-fill" data-w="60" style="width:0;background:#0891b2"></div></div><span>60%</span></div>
          <div class="idd-phase-row"><span>Instalaciones</span><div class="idd-pb"><div class="idd-pb-fill" data-w="40" style="width:0;background:#7c3aed"></div></div><span>40%</span></div>
          <div class="idd-phase-row"><span>Acabados</span><div class="idd-pb"><div class="idd-pb-fill" data-w="10" style="width:0;background:#d97706"></div></div><span>10%</span></div>
        </div>
      </div>
    </div>

    <div class="idd-ai-pill" id="s0AiPill" style="opacity:0;transform:translateY(6px)">
      <i class="fa-solid fa-wand-magic-sparkles"></i>
      <span><strong>IA:</strong> CPI 1.08 — costo bajo control. SPI 0.94 requiere atención en cronograma.</span>
    </div>
  </div>
</div>`,

    animate(c) {
      // t=300 counters
      setTimeout(() => c.querySelectorAll('[data-counter]').forEach(el => animCounter(el, 900)), 300);
      // t=700 chart bars grow
      setTimeout(() => {
        c.querySelectorAll('.idd-bar').forEach((b, i) => {
          setTimeout(() => {
            b.style.transition = 'height .45s cubic-bezier(.4,0,.2,1)';
            b.style.height = b.dataset.h + '%';
          }, i * 35);
        });
      }, 700);
      // t=1100 phase bars fill
      setTimeout(() => {
        c.querySelectorAll('.idd-pb-fill').forEach((b, i) => {
          setTimeout(() => {
            b.style.transition = 'width .6s cubic-bezier(.4,0,.2,1)';
            b.style.width = b.dataset.w + '%';
          }, i * 110);
        });
      }, 1100);
      // t=2800 AI pill
      setTimeout(() => {
        const pill = c.querySelector('#s0AiPill');
        if (pill) {
          pill.style.transition = 'opacity .4s, transform .4s';
          pill.style.opacity    = '1';
          pill.style.transform  = 'translateY(0)';
        }
      }, 2800);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 1 — IA Cuantificador
  ══════════════════════════════════════════════════════════════════ */
  const scene1 = {
    url: 'app.projexaai.com/#/ia-quantifier',
    render: () => `
<div class="idd-layout">
  <nav class="idd-side">
    <div class="idd-logo">P</div>
    <div class="idd-nav"><i class="fa-solid fa-gauge-high"></i><span>Dashboard</span></div>
    <div class="idd-nav"><i class="fa-solid fa-diagram-project"></i><span>Fases</span></div>
    <div class="idd-nav"><i class="fa-solid fa-wallet"></i><span>Presupuesto</span></div>
    <div class="idd-nav"><i class="fa-solid fa-receipt"></i><span>Costos</span></div>
    <div class="idd-nav"><i class="fa-solid fa-camera"></i><span>Bitácora</span></div>
    <div class="idd-nav active"><i class="fa-solid fa-wand-magic-sparkles"></i><span>IA</span></div>
  </nav>
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Cuantificador IA</h4>
    </div>
    <div class="idd-ia-grid">
      <!-- Left: upload + chat -->
      <div class="idd-ia-left">
        <div class="idd-upload-zone" id="s1Upload">
          <div class="idd-upload-inner" id="s1UploadIdle">
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <span>Arrastra tu plano PDF aquí</span>
          </div>
          <div class="idd-upload-done" id="s1UploadDone" style="display:none">
            <i class="fa-solid fa-file-pdf" style="color:#b91c1c"></i>
            <div>
              <div class="idd-fname">plano-arquitectonico-A1.pdf</div>
              <div class="idd-fstatus" id="s1Status">Analizando<span id="s1Dots">...</span></div>
            </div>
          </div>
        </div>

        <div class="idd-chat" id="s1Chat">
          <!-- messages injected by JS -->
        </div>
      </div>

      <!-- Right: results table -->
      <div class="idd-ia-right" id="s1Right">
        <div class="idd-table-title">Lista generada <span class="idd-ai-badge">IA</span></div>
        <div class="idd-table">
          <div class="idd-tr idd-tr-h"><span>Material</span><span>Unid.</span><span>Cant.</span><span>P.Unit</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Cemento Portland</span><span>saco</span><span>420</span><span>$12.50</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Bloque 6"</span><span>u</span><span>8 400</span><span>$0.85</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Varilla #4</span><span>qq</span><span>38</span><span>$48.00</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Arena gruesa</span><span>m³</span><span>24</span><span>$28.00</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Mano de obra</span><span>jornal</span><span>180</span><span>$35.00</span></div>
        </div>
        <button class="idd-import-btn" id="s1ImportBtn" style="opacity:0;transform:translateY(6px)">
          <i class="fa-solid fa-file-import"></i> Importar al presupuesto
        </button>
      </div>
    </div>
  </div>
</div>`,

    animate(c) {
      const upload = c.querySelector('#s1UploadIdle');
      const done   = c.querySelector('#s1UploadDone');
      const status = c.querySelector('#s1Status');
      const dots   = c.querySelector('#s1Dots');
      const chat   = c.querySelector('#s1Chat');
      const items  = c.querySelectorAll('.idd-item');
      const btn    = c.querySelector('#s1ImportBtn');

      // t=400: file "arrives"
      setTimeout(() => {
        upload.style.transition = 'opacity .25s';
        upload.style.opacity = '0';
        setTimeout(() => {
          upload.style.display = 'none';
          done.style.display = 'flex';
          done.style.opacity = '0';
          done.style.transition = 'opacity .3s';
          requestAnimationFrame(() => { done.style.opacity = '1'; });
        }, 260);
      }, 400);

      // t=900: system message
      setTimeout(() => {
        const msg = document.createElement('div');
        msg.className = 'idd-msg idd-msg-sys';
        msg.textContent = 'Plano recibido. Detecté 6 ambientes y 3 plantas. ¿Genero lista completa o por fase?';
        msg.style.opacity = '0'; msg.style.transition = 'opacity .3s';
        chat.appendChild(msg);
        requestAnimationFrame(() => { msg.style.opacity = '1'; });
      }, 900);

      // t=1700: user message (typewriter)
      setTimeout(() => {
        const msg = document.createElement('div');
        msg.className = 'idd-msg idd-msg-usr';
        chat.appendChild(msg);
        typewrite(msg, 'Lista completa con mano de obra.', 38);
      }, 1700);

      // t=2600: thinking dots
      setTimeout(() => {
        const msg = document.createElement('div');
        msg.className = 'idd-msg idd-msg-think';
        msg.innerHTML = '<span></span><span></span><span></span>';
        chat.appendChild(msg);

        // t=3800: remove thinking, change status
        setTimeout(() => {
          msg.remove();
          status.innerHTML = '<i class="fa-solid fa-check" style="color:#047857"></i> Listo — 6 ambientes analizados';
        }, 1200);
      }, 2600);

      // t=3900: stagger table rows
      setTimeout(() => staggerReveal(Array.from(items), 0, 130), 3900);

      // t=5400: import button
      setTimeout(() => {
        if (btn) {
          btn.style.transition = 'opacity .4s, transform .4s';
          btn.style.opacity    = '1';
          btn.style.transform  = 'translateY(0)';
        }
      }, 5400);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 2 — Gantt + Ruta Crítica
  ══════════════════════════════════════════════════════════════════ */
  const scene2 = {
    url: 'app.projexaai.com/#/phases',
    render: () => `
<div class="idd-layout">
  <nav class="idd-side">
    <div class="idd-logo">P</div>
    <div class="idd-nav"><i class="fa-solid fa-gauge-high"></i><span>Dashboard</span></div>
    <div class="idd-nav active"><i class="fa-solid fa-diagram-project"></i><span>Fases</span></div>
    <div class="idd-nav"><i class="fa-solid fa-wallet"></i><span>Presupuesto</span></div>
    <div class="idd-nav"><i class="fa-solid fa-receipt"></i><span>Costos</span></div>
  </nav>
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Fases / Gantt</h4>
      <div style="display:flex;gap:6px">
        <button class="idd-btn-sec">Exportar PDF</button>
        <button class="idd-btn-pri">+ Fase</button>
      </div>
    </div>

    <div class="idd-gantt-wrap">
      <div class="idd-gantt-hdr">
        <div class="idd-gh-label">Fase</div>
        <div class="idd-gh-months">
          <span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span>
        </div>
        <div style="width:42px"></div>
      </div>

      <div class="idd-gantt-rows" id="s2Rows">
        <!-- rows injected by JS -->
      </div>
    </div>

    <div class="idd-cpm-pill" id="s2CpmPill" style="opacity:0;transform:translateY(6px)">
      <i class="fa-solid fa-route"></i>
      <span><strong>CPM calculado:</strong> ruta crítica en Estructura · 0 días de holgura · retraso total estimado +12d</span>
    </div>
  </div>
</div>`,

    animate(c) {
      const phases = [
        { name: 'Cimentación',   left: 0,   width: 14, crit: false, pct: '100%' },
        { name: 'Estructura',    left: 12,  width: 35, crit: true,  pct: '85%'  },
        { name: 'Mampostería',   left: 30,  width: 28, crit: false, pct: '60%'  },
        { name: 'Instalaciones', left: 42,  width: 30, crit: false, pct: '40%'  },
        { name: 'Acabados',      left: 62,  width: 33, crit: false, pct: '10%'  },
      ];

      const container = c.querySelector('#s2Rows');

      phases.forEach((p, i) => {
        const row = document.createElement('div');
        row.className = 'idd-gr';
        row.style.opacity = '0';
        row.innerHTML = `
          <span class="idd-gr-name">${p.name}</span>
          <div class="idd-gr-track">
            <div class="idd-gr-bar ${p.crit ? 'crit' : ''}"
                 style="left:${p.left}%;width:0%;transition:width .7s cubic-bezier(.4,0,.2,1)"
                 data-w="${p.width}">
              ${p.crit ? '<span class="idd-crit-tag">Ruta crítica</span>' : ''}
            </div>
          </div>
          <span class="idd-gr-pct">${p.pct}</span>`;
        container.appendChild(row);

        // fade in row
        setTimeout(() => {
          row.style.transition = 'opacity .3s';
          row.style.opacity    = '1';
          // then grow bar
          setTimeout(() => {
            const bar = row.querySelector('.idd-gr-bar');
            bar.style.width = bar.dataset.w + '%';
          }, 120);
        }, 300 + i * 220);
      });

      // t=2600: today line
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'idd-today-line';
        container.appendChild(line);
      }, 2600);

      // t=3200: CPM pill
      setTimeout(() => {
        const pill = c.querySelector('#s2CpmPill');
        if (pill) {
          pill.style.transition = 'opacity .4s, transform .4s';
          pill.style.opacity    = '1';
          pill.style.transform  = 'translateY(0)';
        }
      }, 3200);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 3 — Control de Costos
  ══════════════════════════════════════════════════════════════════ */
  const scene3 = {
    url: 'app.projexaai.com/#/costs',
    render: () => `
<div class="idd-layout">
  <nav class="idd-side">
    <div class="idd-logo">P</div>
    <div class="idd-nav"><i class="fa-solid fa-gauge-high"></i><span>Dashboard</span></div>
    <div class="idd-nav"><i class="fa-solid fa-diagram-project"></i><span>Fases</span></div>
    <div class="idd-nav"><i class="fa-solid fa-wallet"></i><span>Presupuesto</span></div>
    <div class="idd-nav active"><i class="fa-solid fa-receipt"></i><span>Costos</span></div>
  </nav>
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Costos reales</h4>
      <button class="idd-btn-pri" id="s3AddBtn"><i class="fa-solid fa-plus"></i> Nuevo costo</button>
    </div>

    <div class="idd-cost-summary">
      <div class="idd-cs"><div class="idd-cs-l">Presupuestado</div><div class="idd-cs-v navy" data-counter="210000" data-prefix="$" data-decimals="0">$0</div></div>
      <div class="idd-cs"><div class="idd-cs-l">Gastado</div><div class="idd-cs-v blue" data-counter="134200" data-prefix="$" data-decimals="0">$0</div></div>
      <div class="idd-cs"><div class="idd-cs-l">Disponible</div><div class="idd-cs-v green" data-counter="75800" data-prefix="$" data-decimals="0">$0</div></div>
      <div class="idd-cs"><div class="idd-cs-l">Desviación</div><div class="idd-cs-v amber">+2.1%</div></div>
    </div>

    <div class="idd-cost-table">
      <div class="idd-ctr idd-ctr-h"><span>Descripción</span><span>Categoría</span><span>Fase</span><span>Monto</span></div>
      <div class="idd-ctr idd-centry" style="opacity:0;transform:translateY(5px)">
        <span>Concreto 3000PSI — 18m³</span>
        <span class="idd-cat mat">Material</span>
        <span>Estructura</span><span>$4,320</span>
      </div>
      <div class="idd-ctr idd-centry" style="opacity:0;transform:translateY(5px)">
        <span>Jornales semana 18</span>
        <span class="idd-cat lab">Mano obra</span>
        <span>Mampostería</span><span>$2,800</span>
      </div>
      <div class="idd-ctr idd-centry" style="opacity:0;transform:translateY(5px)">
        <span>Varillas corrugadas #4</span>
        <span class="idd-cat mat">Material</span>
        <span>Estructura</span><span>$1,960</span>
      </div>
      <div class="idd-ctr idd-centry" style="opacity:0;transform:translateY(5px)">
        <span>Andamios (alquiler)</span>
        <span class="idd-cat eq">Equipo</span>
        <span>Estructura</span><span>$640</span>
      </div>
      <!-- new entry form, hidden initially -->
      <div class="idd-new-entry-form" id="s3Form" style="display:none">
        <div class="idd-nef-fields">
          <span class="idd-nef-input" id="s3Desc"></span>
          <span class="idd-cat mat">Material</span>
          <span>Mampostería</span>
          <span class="idd-nef-amount">$<span id="s3Amt">0</span></span>
        </div>
      </div>
    </div>
  </div>
</div>`,

    animate(c) {
      // t=300: counters
      setTimeout(() => c.querySelectorAll('[data-counter]').forEach(el => animCounter(el, 1000)), 300);
      // t=700: stagger cost entries
      setTimeout(() => staggerReveal(Array.from(c.querySelectorAll('.idd-centry')), 0, 150), 700);
      // t=2200: simulate "Add cost" click
      setTimeout(() => {
        const btn = c.querySelector('#s3AddBtn');
        if (btn) { btn.classList.add('idd-btn-pulse'); }
        setTimeout(() => {
          if (btn) btn.classList.remove('idd-btn-pulse');
          const form = c.querySelector('#s3Form');
          if (form) {
            form.style.display = 'block';
            form.style.opacity = '0';
            form.style.transition = 'opacity .3s';
            requestAnimationFrame(() => { form.style.opacity = '1'; });
            // typewrite description
            const descEl = c.querySelector('#s3Desc');
            if (descEl) {
              setTimeout(() => {
                typewrite(descEl, 'Bloques 6" — semana 19', 42, () => {
                  // animate amount
                  const amtEl = c.querySelector('#s3Amt');
                  if (amtEl) animCounter(amtEl, 600);
                  amtEl.dataset.counter = '3840';
                });
              }, 200);
            }
          }
        }, 400);
      }, 2200);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 4 — Bitácora
  ══════════════════════════════════════════════════════════════════ */
  const scene4 = {
    url: 'app.projexaai.com/#/bitacora',
    render: () => `
<div class="idd-layout">
  <nav class="idd-side">
    <div class="idd-logo">P</div>
    <div class="idd-nav"><i class="fa-solid fa-gauge-high"></i><span>Dashboard</span></div>
    <div class="idd-nav"><i class="fa-solid fa-diagram-project"></i><span>Fases</span></div>
    <div class="idd-nav active"><i class="fa-solid fa-camera"></i><span>Bitácora</span></div>
    <div class="idd-nav"><i class="fa-solid fa-receipt"></i><span>Costos</span></div>
  </nav>
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Bitácora de obra</h4>
      <button class="idd-btn-pri"><i class="fa-solid fa-plus"></i> Nueva entrada</button>
    </div>

    <div class="idd-bita-list" id="s4List">
      <!-- entries injected by JS -->
    </div>

    <div class="idd-bita-cta" id="s4Cta" style="opacity:0;transform:translateY(6px)">
      <i class="fa-solid fa-shield-halved"></i>
      <span>Historial completo · Trazable para auditorías y reportes a clientes</span>
    </div>
  </div>
</div>`,

    animate(c) {
      const entries = [
        {
          date:   'Hoy · 14:32',
          title:  'Vaciado de columnas — eje B',
          desc:   'Vaciado de 8 columnas eje B, piso 3. Mezcla 3000 PSI. Temperatura: 28°C.',
          tags:   ['Estructura', 'Avance +3%', 'Soleado 28°C'],
          photos: ['#0891b2', '#1e40af', '#7c3aed'],
          extra:  '+4',
        },
        {
          date:   'Ayer · 09:15',
          title:  'Encofrado columnas eje B y C',
          desc:   'Se encofró la totalidad de las columnas previstas para vaciado.',
          tags:   ['Estructura', 'Avance +1%'],
          photos: ['#1e40af', '#0891b2'],
          extra:  '+2',
        },
        {
          date:   'Hace 2 días · 16:00',
          title:  'Inspección de armado — eje A',
          desc:   'Inspector verificó densidad de armado. Aprobado sin observaciones.',
          tags:   ['Estructura', 'Inspeccion', 'Aprobado'],
          photos: ['#047857', '#0891b2'],
          extra:  '',
        },
      ];

      const list = c.querySelector('#s4List');

      entries.forEach((e, i) => {
        const card = document.createElement('div');
        card.className = 'idd-bcard';
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(8px)';
        const photos = e.photos.map((col, pi) =>
          `<div class="idd-bphoto" style="background:linear-gradient(135deg,${col},${col}99)">${pi === e.photos.length - 1 && e.extra ? e.extra : ''}</div>`
        ).join('');
        const tags = e.tags.map(t => `<span class="idd-btag">${t}</span>`).join('');
        card.innerHTML = `
          <div class="idd-bcard-date">${e.date}</div>
          <div class="idd-bcard-body">
            <div class="idd-bphotos">${photos}</div>
            <div class="idd-btext">
              <div class="idd-btitle">${e.title}</div>
              <p class="idd-bdesc">${e.desc}</p>
              <div class="idd-btags">${tags}</div>
            </div>
          </div>`;
        list.appendChild(card);

        setTimeout(() => {
          card.style.transition = 'opacity .4s ease, transform .4s ease';
          card.style.opacity    = '1';
          card.style.transform  = 'translateY(0)';
        }, 300 + i * 300);
      });

      // t=2500: trazability badge
      setTimeout(() => {
        const cta = c.querySelector('#s4Cta');
        if (cta) {
          cta.style.transition = 'opacity .4s, transform .4s';
          cta.style.opacity    = '1';
          cta.style.transform  = 'translateY(0)';
        }
      }, 2500);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     DEMO CONTROLLER
  ══════════════════════════════════════════════════════════════════ */
  const SCENES = [scene0, scene1, scene2, scene3, scene4];

  const screenEl   = document.getElementById('idemoScreen');
  const urlEl      = document.getElementById('idemoUrl');
  const dotsEl     = document.querySelectorAll('.idemo-dot');
  const sceneBtns  = document.querySelectorAll('.ids-btn');
  const prevBtn    = document.getElementById('idemoPrev');
  const nextBtn    = document.getElementById('idemoNext');
  const playBtn    = document.getElementById('idemoPlayPause');
  const playIcon   = document.getElementById('idemoPlayIcon');
  const progressEl = document.getElementById('idemoProgress');

  if (!screenEl) return; // guard: demo section not on page

  let current     = 0;
  let isPlaying   = true;
  let autoTimer   = null;
  let progTimer   = null;
  let progStart   = 0;

  function goTo(n, fromAuto) {
    const next = ((n % SCENES.length) + SCENES.length) % SCENES.length;
    if (next === current && fromAuto) return;

    // update UI
    dotsEl.forEach((d, i)    => d.classList.toggle('active', i === next));
    sceneBtns.forEach((b, i) => b.classList.toggle('active', i === next));

    // clear scene progress bars
    document.querySelectorAll('.ids-prog-fill').forEach(f => {
      f.style.transition = 'none';
      f.style.width = '0%';
    });

    current = next;

    // transition
    screenEl.style.opacity   = '0';
    screenEl.style.transform = 'translateY(6px)';

    setTimeout(() => {
      screenEl.innerHTML = SCENES[current].render();
      if (urlEl) urlEl.textContent = SCENES[current].url;
      screenEl.style.transition = `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`;
      screenEl.style.opacity    = '1';
      screenEl.style.transform  = 'translateY(0)';
      SCENES[current].animate(screenEl);
    }, TRANSITION_MS);

    if (isPlaying) {
      scheduleNext();
      startProgress();
    }
  }

  function scheduleNext() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => goTo(current + 1, true), SCENE_DURATION);
  }

  function startProgress() {
    clearInterval(progTimer);
    if (!progressEl) return;
    progressEl.style.transition = 'none';
    progressEl.style.width = '0%';
    progStart = Date.now();
    requestAnimationFrame(() => {
      progressEl.style.transition = `width ${SCENE_DURATION}ms linear`;
      progressEl.style.width = '100%';
    });
    // also animate the active scene button's progress bar
    const activeBtn = document.querySelector('.ids-btn.active .ids-prog-fill');
    if (activeBtn) {
      activeBtn.style.transition = 'none';
      activeBtn.style.width = '0%';
      requestAnimationFrame(() => {
        activeBtn.style.transition = `width ${SCENE_DURATION}ms linear`;
        activeBtn.style.width = '100%';
      });
    }
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (playIcon) {
      playIcon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }
    if (isPlaying) {
      scheduleNext();
      startProgress();
    } else {
      clearTimeout(autoTimer);
      clearInterval(progTimer);
      if (progressEl) {
        const elapsed = Date.now() - progStart;
        const pct = Math.min((elapsed / SCENE_DURATION) * 100, 100);
        progressEl.style.transition = 'none';
        progressEl.style.width = pct + '%';
      }
    }
  }

  // wire controls
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  if (playBtn) playBtn.addEventListener('click', togglePlay);
  dotsEl.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  sceneBtns.forEach((b, i) => b.addEventListener('click', () => goTo(i)));

  // pause on hover
  screenEl.addEventListener('mouseenter', () => { if (isPlaying) { clearTimeout(autoTimer); clearInterval(progTimer); } });
  screenEl.addEventListener('mouseleave', () => { if (isPlaying) { scheduleNext(); startProgress(); } });

  // keyboard
  document.addEventListener('keydown', (e) => {
    const section = document.getElementById('tour');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === ' ') { e.preventDefault(); togglePlay(); }
  });

  // start when section enters viewport (low threshold for reliability)
  const demoSection = document.getElementById('tour');
  if (demoSection) {
    let started = false;
    function startDemo() {
      if (started) return;
      started = true;
      goTo(0);
    }
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { startDemo(); obs.disconnect(); }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    obs.observe(demoSection);
    // fallback: if section is already in viewport on load
    if (demoSection.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setTimeout(startDemo, 400);
    }
  }
})();
