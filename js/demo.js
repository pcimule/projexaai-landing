/* ==========================================================================
   ProjexaAI Landing — Interactive Demo Engine v2
   11 animated scenes — all operational + intelligence modules
   ========================================================================== */
(function () {
  'use strict';

  const SCENE_DURATION = 7000; // ms per scene
  const TRANSITION_MS  = 220;

  /* ── Sidebar nav helper ──────────────────────────────────────────── */
  function sidebar(active) {
    const items = [
      { icon: 'fa-gauge-high',        label: 'Dashboard',   key: 'dashboard'  },
      { icon: 'fa-diagram-project',   label: 'Fases',       key: 'fases'      },
      { icon: 'fa-wallet',            label: 'Presupuesto', key: 'budget'     },
      { icon: 'fa-receipt',           label: 'Costos',      key: 'costs'      },
      { icon: 'fa-hard-hat',          label: 'Obreros',     key: 'workers'    },
      { icon: 'fa-camera',            label: 'Bitácora',    key: 'bitacora'   },
      { icon: 'fa-wand-magic-sparkles', label: 'IA',        key: 'ia'         },
    ];
    return `<nav class="idd-side">
      <div class="idd-logo">P</div>
      ${items.map(i => `<div class="idd-nav${i.key === active ? ' active' : ''}">
        <i class="fa-solid ${i.icon}"></i><span>${i.label}</span>
      </div>`).join('')}
    </nav>`;
  }

  /* ── Utility: animated counter ──────────────────────────────────── */
  function animCounter(el, duration) {
    const target   = parseFloat(el.dataset.counter);
    const decimals = parseInt(el.dataset.decimals  || '0', 10);
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const t0       = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (e * target).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
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

  /* ── Utility: stagger-reveal ─────────────────────────────────────── */
  function stagger(els, delay, gap) {
    els.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity .35s ease, transform .35s ease';
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      }, delay + i * gap);
    });
  }

  /* ── Utility: reveal single element ─────────────────────────────── */
  function reveal(el, delay) {
    setTimeout(() => {
      if (!el) return;
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, delay);
  }

  /* ══════════════════════════════════════════════════════════════════
     SCENE 0 — Dashboard EVM
  ══════════════════════════════════════════════════════════════════ */
  const scene0 = {
    url: 'app.projexaai.com/#/dashboard',
    render: () => `
<div class="idd-layout">
  ${sidebar('dashboard')}
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
    <div class="idd-ai-pill" id="s0Pill" style="opacity:0;transform:translateY(6px)">
      <i class="fa-solid fa-wand-magic-sparkles"></i>
      <span><strong>IA:</strong> CPI 1.08 — costo bajo control. SPI 0.94 requiere atención en cronograma.</span>
    </div>
  </div>
</div>`,
    animate(c) {
      setTimeout(() => c.querySelectorAll('[data-counter]').forEach(el => animCounter(el, 900)), 300);
      setTimeout(() => {
        c.querySelectorAll('.idd-bar').forEach((b, i) => setTimeout(() => {
          b.style.transition = 'height .45s cubic-bezier(.4,0,.2,1)';
          b.style.height = b.dataset.h + '%';
        }, i * 35));
      }, 700);
      setTimeout(() => {
        c.querySelectorAll('.idd-pb-fill').forEach((b, i) => setTimeout(() => {
          b.style.transition = 'width .6s cubic-bezier(.4,0,.2,1)';
          b.style.width = b.dataset.w + '%';
        }, i * 110));
      }, 1100);
      reveal(c.querySelector('#s0Pill'), 2800);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 1 — IA Cuantificador
  ══════════════════════════════════════════════════════════════════ */
  const scene1 = {
    url: 'app.projexaai.com/#/ia-quantifier',
    render: () => `
<div class="idd-layout">
  ${sidebar('ia')}
  <div class="idd-main">
    <div class="idd-toprow"><h4 class="idd-page-title">Cuantificador IA</h4></div>
    <div class="idd-ia-grid">
      <div class="idd-ia-left">
        <div class="idd-upload-zone">
          <div class="idd-upload-inner" id="s1Idle">
            <i class="fa-solid fa-cloud-arrow-up"></i><span>Arrastra tu plano PDF aquí</span>
          </div>
          <div class="idd-upload-done" id="s1Done" style="display:none">
            <i class="fa-solid fa-file-pdf" style="color:#b91c1c"></i>
            <div>
              <div class="idd-fname">plano-arquitectonico-A1.pdf</div>
              <div class="idd-fstatus" id="s1Status">Analizando...</div>
            </div>
          </div>
        </div>
        <div class="idd-chat" id="s1Chat"></div>
      </div>
      <div class="idd-ia-right">
        <div class="idd-table-title">Lista generada <span class="idd-ai-badge">IA</span></div>
        <div class="idd-table">
          <div class="idd-tr idd-tr-h"><span>Material</span><span>Unid.</span><span>Cant.</span><span>P.Unit</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Cemento Portland</span><span>saco</span><span>420</span><span>$12.50</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Bloque 6"</span><span>u</span><span>8 400</span><span>$0.85</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Varilla #4</span><span>qq</span><span>38</span><span>$48.00</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Arena gruesa</span><span>m³</span><span>24</span><span>$28.00</span></div>
          <div class="idd-tr idd-item" style="opacity:0;transform:translateY(6px)"><span>Mano de obra</span><span>jornal</span><span>180</span><span>$35.00</span></div>
        </div>
        <button class="idd-import-btn" id="s1Btn" style="opacity:0;transform:translateY(6px)">
          <i class="fa-solid fa-file-import"></i> Importar al presupuesto
        </button>
      </div>
    </div>
  </div>
</div>`,
    animate(c) {
      const idle = c.querySelector('#s1Idle'), done = c.querySelector('#s1Done');
      const status = c.querySelector('#s1Status'), chat = c.querySelector('#s1Chat');
      setTimeout(() => {
        idle.style.cssText += 'transition:opacity .25s;opacity:0';
        setTimeout(() => {
          idle.style.display = 'none';
          done.style.cssText = 'display:flex;opacity:0;transition:opacity .3s';
          requestAnimationFrame(() => { done.style.opacity = '1'; });
        }, 260);
      }, 400);
      setTimeout(() => {
        const m = document.createElement('div');
        m.className = 'idd-msg idd-msg-sys';
        m.textContent = 'Plano recibido. Detecté 6 ambientes y 3 plantas. ¿Genero lista completa o por fase?';
        m.style.cssText = 'opacity:0;transition:opacity .3s';
        chat.appendChild(m);
        requestAnimationFrame(() => { m.style.opacity = '1'; });
      }, 900);
      setTimeout(() => {
        const m = document.createElement('div');
        m.className = 'idd-msg idd-msg-usr';
        chat.appendChild(m);
        typewrite(m, 'Lista completa con mano de obra.', 38);
      }, 1700);
      setTimeout(() => {
        const m = document.createElement('div');
        m.className = 'idd-msg idd-msg-think';
        m.innerHTML = '<span></span><span></span><span></span>';
        chat.appendChild(m);
        setTimeout(() => {
          m.remove();
          status.innerHTML = '<i class="fa-solid fa-check" style="color:#047857"></i> Listo — 6 ambientes';
        }, 1200);
      }, 2600);
      setTimeout(() => stagger(Array.from(c.querySelectorAll('.idd-item')), 0, 130), 3900);
      reveal(c.querySelector('#s1Btn'), 5400);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 2 — Gantt + Ruta Crítica
  ══════════════════════════════════════════════════════════════════ */
  const scene2 = {
    url: 'app.projexaai.com/#/phases',
    render: () => `
<div class="idd-layout">
  ${sidebar('fases')}
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
        <div class="idd-gh-months"><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span></div>
        <div style="width:38px"></div>
      </div>
      <div class="idd-gantt-rows" id="s2Rows"></div>
    </div>
    <div class="idd-cpm-pill" id="s2Pill" style="opacity:0;transform:translateY(6px)">
      <i class="fa-solid fa-route"></i>
      <span><strong>CPM calculado:</strong> ruta crítica en Estructura · 0 días de holgura · retraso estimado +12d</span>
    </div>
  </div>
</div>`,
    animate(c) {
      const phases = [
        { name:'Cimentación',  left:0,  w:14, crit:false, pct:'100%' },
        { name:'Estructura',   left:12, w:35, crit:true,  pct:'85%'  },
        { name:'Mampostería',  left:30, w:28, crit:false, pct:'60%'  },
        { name:'Instalaciones',left:42, w:30, crit:false, pct:'40%'  },
        { name:'Acabados',     left:62, w:33, crit:false, pct:'10%'  },
      ];
      const rows = c.querySelector('#s2Rows');
      phases.forEach((p, i) => {
        const row = document.createElement('div');
        row.className = 'idd-gr'; row.style.opacity = '0';
        row.innerHTML = `<span class="idd-gr-name">${p.name}</span>
          <div class="idd-gr-track">
            <div class="idd-gr-bar${p.crit?' crit':''}" style="left:${p.left}%;width:0" data-w="${p.w}">
              ${p.crit?'<span class="idd-crit-tag">Ruta crítica</span>':''}
            </div>
          </div>
          <span class="idd-gr-pct">${p.pct}</span>`;
        rows.appendChild(row);
        setTimeout(() => {
          row.style.transition = 'opacity .3s';
          row.style.opacity = '1';
          setTimeout(() => {
            const bar = row.querySelector('.idd-gr-bar');
            bar.style.transition = 'width .7s cubic-bezier(.4,0,.2,1)';
            bar.style.width = bar.dataset.w + '%';
          }, 120);
        }, 300 + i * 220);
      });
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'idd-today-line';
        rows.appendChild(line);
      }, 2600);
      reveal(c.querySelector('#s2Pill'), 3200);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 3 — Presupuesto
  ══════════════════════════════════════════════════════════════════ */
  const scene3 = {
    url: 'app.projexaai.com/#/budget',
    render: () => `
<div class="idd-layout">
  ${sidebar('budget')}
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Presupuesto</h4>
      <div style="display:flex;gap:6px">
        <button class="idd-btn-sec">Exportar PDF</button>
        <button class="idd-btn-pri">+ Partida</button>
      </div>
    </div>

    <div class="idd-budget-summary">
      <div class="idd-bscard"><div class="idd-bsl">Total presup.</div><div class="idd-bsv navy" data-counter="210000" data-prefix="$" data-decimals="0">$0</div></div>
      <div class="idd-bscard"><div class="idd-bsl">Materiales</div><div class="idd-bsv blue" data-counter="126000" data-prefix="$" data-decimals="0">$0</div></div>
      <div class="idd-bscard"><div class="idd-bsl">Mano de obra</div><div class="idd-bsv purple" data-counter="63000" data-prefix="$" data-decimals="0">$0</div></div>
      <div class="idd-bscard"><div class="idd-bsl">Equipo</div><div class="idd-bsv amber" data-counter="21000" data-prefix="$" data-decimals="0">$0</div></div>
    </div>

    <div class="idd-budget-table">
      <div class="idd-btr idd-btr-h"><span>Partida</span><span>Fase</span><span>Und.</span><span>Cant.</span><span>P.Unit</span><span>Total</span></div>
      <div class="idd-btr idd-bitem" style="opacity:0;transform:translateY(5px)">
        <span>Concreto 3000PSI</span><span class="idd-phase-tag">Estructura</span><span>m³</span><span>180</span><span>$120</span><span class="idd-bold">$21,600</span>
      </div>
      <div class="idd-btr idd-bitem" style="opacity:0;transform:translateY(5px)">
        <span>Varilla corrugada #4</span><span class="idd-phase-tag">Estructura</span><span>qq</span><span>220</span><span>$48</span><span class="idd-bold">$10,560</span>
      </div>
      <div class="idd-btr idd-bitem" style="opacity:0;transform:translateY(5px)">
        <span>Bloque 6"</span><span class="idd-phase-tag mamp">Mampostería</span><span>u</span><span>8 400</span><span>$0.85</span><span class="idd-bold">$7,140</span>
      </div>
      <div class="idd-btr idd-bitem" style="opacity:0;transform:translateY(5px)">
        <span>Mano de obra — albañil</span><span class="idd-phase-tag mamp">Mampostería</span><span>jornal</span><span>320</span><span>$35</span><span class="idd-bold">$11,200</span>
      </div>
      <div class="idd-btr idd-bitem" style="opacity:0;transform:translateY(5px)">
        <span>Andamios tubulares</span><span class="idd-phase-tag inst">Instalaciones</span><span>mes</span><span>3</span><span>$1,200</span><span class="idd-bold">$3,600</span>
      </div>
      <div class="idd-btr idd-btotal" id="s3Total" style="opacity:0">
        <span>TOTAL PRESUPUESTO</span><span></span><span></span><span></span><span></span>
        <span class="idd-bold" data-counter="210000" data-prefix="$" data-decimals="0">$0</span>
      </div>
    </div>
  </div>
</div>`,
    animate(c) {
      setTimeout(() => c.querySelectorAll('.idd-bscard [data-counter]').forEach(el => animCounter(el, 900)), 300);
      setTimeout(() => stagger(Array.from(c.querySelectorAll('.idd-bitem')), 0, 140), 700);
      setTimeout(() => {
        const total = c.querySelector('#s3Total');
        if (total) {
          total.style.transition = 'opacity .4s';
          total.style.opacity = '1';
          const kv = total.querySelector('[data-counter]');
          if (kv) animCounter(kv, 700);
        }
      }, 2500);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 4 — Costos reales
  ══════════════════════════════════════════════════════════════════ */
  const scene4 = {
    url: 'app.projexaai.com/#/costs',
    render: () => `
<div class="idd-layout">
  ${sidebar('costs')}
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Costos reales</h4>
      <button class="idd-btn-pri" id="s4AddBtn"><i class="fa-solid fa-plus"></i> Nuevo costo</button>
    </div>
    <div class="idd-cost-summary">
      <div class="idd-cs"><div class="idd-cs-l">Presupuestado</div><div class="idd-cs-v navy" data-counter="210000" data-prefix="$" data-decimals="0">$0</div></div>
      <div class="idd-cs"><div class="idd-cs-l">Gastado</div><div class="idd-cs-v blue" data-counter="134200" data-prefix="$" data-decimals="0">$0</div></div>
      <div class="idd-cs"><div class="idd-cs-l">Disponible</div><div class="idd-cs-v green" data-counter="75800" data-prefix="$" data-decimals="0">$0</div></div>
      <div class="idd-cs"><div class="idd-cs-l">Desviación</div><div class="idd-cs-v amber">+2.1%</div></div>
    </div>
    <div class="idd-cost-table">
      <div class="idd-ctr idd-ctr-h"><span>Descripción</span><span>Categoría</span><span>Fase</span><span>Monto</span></div>
      <div class="idd-ctr idd-centry" style="opacity:0;transform:translateY(5px)"><span>Concreto 3000PSI — 18m³</span><span class="idd-cat mat">Material</span><span>Estructura</span><span>$4,320</span></div>
      <div class="idd-ctr idd-centry" style="opacity:0;transform:translateY(5px)"><span>Jornales semana 18</span><span class="idd-cat lab">Mano obra</span><span>Mampostería</span><span>$2,800</span></div>
      <div class="idd-ctr idd-centry" style="opacity:0;transform:translateY(5px)"><span>Varillas corrugadas #4</span><span class="idd-cat mat">Material</span><span>Estructura</span><span>$1,960</span></div>
      <div class="idd-ctr idd-centry" style="opacity:0;transform:translateY(5px)"><span>Andamios (alquiler)</span><span class="idd-cat eq">Equipo</span><span>Estructura</span><span>$640</span></div>
      <div class="idd-new-entry-form" id="s4Form" style="display:none">
        <div class="idd-nef-fields">
          <span class="idd-nef-input" id="s4Desc"></span>
          <span class="idd-cat mat">Material</span>
          <span>Mampostería</span>
          <span class="idd-nef-amount">$<span id="s4Amt" data-counter="3840" data-decimals="0">0</span></span>
        </div>
      </div>
    </div>
  </div>
</div>`,
    animate(c) {
      setTimeout(() => c.querySelectorAll('[data-counter]').forEach(el => animCounter(el, 1000)), 300);
      setTimeout(() => stagger(Array.from(c.querySelectorAll('.idd-centry')), 0, 150), 700);
      setTimeout(() => {
        const btn = c.querySelector('#s4AddBtn');
        if (btn) { btn.classList.add('idd-btn-pulse'); setTimeout(() => btn.classList.remove('idd-btn-pulse'), 400); }
        setTimeout(() => {
          const form = c.querySelector('#s4Form');
          if (!form) return;
          form.style.cssText = 'display:block;opacity:0;transition:opacity .3s';
          requestAnimationFrame(() => { form.style.opacity = '1'; });
          const desc = c.querySelector('#s4Desc');
          if (desc) setTimeout(() => typewrite(desc, 'Bloques 6" — semana 19', 40, () => {
            const amt = c.querySelector('#s4Amt');
            if (amt) animCounter(amt, 600);
          }), 200);
        }, 400);
      }, 2200);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 5 — Trabajadores / Obreros
  ══════════════════════════════════════════════════════════════════ */
  const scene5 = {
    url: 'app.projexaai.com/#/workers',
    render: () => `
<div class="idd-layout">
  ${sidebar('workers')}
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Obreros</h4>
      <button class="idd-btn-pri"><i class="fa-solid fa-plus"></i> Agregar obrero</button>
    </div>

    <div class="idd-workers-summary">
      <div class="idd-ws"><i class="fa-solid fa-users" style="color:#1e40af"></i><div><div class="idd-ws-v" data-counter="18" data-decimals="0">0</div><div class="idd-ws-l">Total activos</div></div></div>
      <div class="idd-ws"><i class="fa-solid fa-calendar-check" style="color:#047857"></i><div><div class="idd-ws-v" data-counter="15" data-decimals="0">0</div><div class="idd-ws-l">Presentes hoy</div></div></div>
      <div class="idd-ws"><i class="fa-solid fa-clock" style="color:#d97706"></i><div><div class="idd-ws-v" data-counter="312" data-decimals="0">0</div><div class="idd-ws-l">Horas esta semana</div></div></div>
      <div class="idd-ws"><i class="fa-solid fa-dollar-sign" style="color:#6d28d9"></i><div><div class="idd-ws-v" data-counter="10920" data-prefix="$" data-decimals="0">$0</div><div class="idd-ws-l">Nómina semana</div></div></div>
    </div>

    <div class="idd-worker-table">
      <div class="idd-wtr idd-wtr-h"><span>Nombre</span><span>Especialidad</span><span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>Total h.</span></div>
      <div class="idd-wtr idd-wrow" style="opacity:0;transform:translateY(5px)">
        <span class="idd-wname"><div class="idd-wavatar" style="background:#1e40af">JR</div>Juan Ramírez</span>
        <span class="idd-wspec">Albañil</span>
        <span class="idd-wday ok" id="w0d0"></span><span class="idd-wday ok" id="w0d1"></span><span class="idd-wday ok" id="w0d2"></span><span class="idd-wday ok" id="w0d3"></span><span class="idd-wday ok" id="w0d4"></span>
        <span class="idd-whrs">40h</span>
      </div>
      <div class="idd-wtr idd-wrow" style="opacity:0;transform:translateY(5px)">
        <span class="idd-wname"><div class="idd-wavatar" style="background:#0891b2">ML</div>María López</span>
        <span class="idd-wspec">Fierrero</span>
        <span class="idd-wday ok"></span><span class="idd-wday ok"></span><span class="idd-wday ok"></span><span class="idd-wday absent">A</span><span class="idd-wday ok"></span>
        <span class="idd-whrs">32h</span>
      </div>
      <div class="idd-wtr idd-wrow" style="opacity:0;transform:translateY(5px)">
        <span class="idd-wname"><div class="idd-wavatar" style="background:#7c3aed">CA</div>Carlos Ajú</span>
        <span class="idd-wspec">Carpintero</span>
        <span class="idd-wday ok"></span><span class="idd-wday ok"></span><span class="idd-wday half">½</span><span class="idd-wday ok"></span><span class="idd-wday ok"></span>
        <span class="idd-whrs">36h</span>
      </div>
      <div class="idd-wtr idd-wrow" style="opacity:0;transform:translateY(5px)">
        <span class="idd-wname"><div class="idd-wavatar" style="background:#047857">PE</div>Pedro Estrada</span>
        <span class="idd-wspec">Electricista</span>
        <span class="idd-wday ok"></span><span class="idd-wday ok"></span><span class="idd-wday ok"></span><span class="idd-wday ok"></span><span class="idd-wday ok"></span>
        <span class="idd-whrs">40h</span>
      </div>
    </div>
  </div>
</div>`,
    animate(c) {
      setTimeout(() => c.querySelectorAll('[data-counter]').forEach(el => animCounter(el, 900)), 300);
      setTimeout(() => stagger(Array.from(c.querySelectorAll('.idd-wrow')), 0, 160), 700);
      // animate attendance check marks appearing
      setTimeout(() => {
        c.querySelectorAll('.idd-wday.ok').forEach((d, i) => {
          setTimeout(() => {
            d.textContent = '✓';
            d.classList.add('filled');
          }, i * 60);
        });
      }, 1600);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 6 — Bitácora
  ══════════════════════════════════════════════════════════════════ */
  const scene6 = {
    url: 'app.projexaai.com/#/bitacora',
    render: () => `
<div class="idd-layout">
  ${sidebar('bitacora')}
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Bitácora de obra</h4>
      <button class="idd-btn-pri"><i class="fa-solid fa-plus"></i> Nueva entrada</button>
    </div>
    <div class="idd-bita-list" id="s6List"></div>
    <div class="idd-bita-cta" id="s6Cta" style="opacity:0;transform:translateY(6px)">
      <i class="fa-solid fa-shield-halved"></i>
      <span>Historial completo · Trazable para auditorías y reportes a clientes</span>
    </div>
  </div>
</div>`,
    animate(c) {
      const entries = [
        { date:'Hoy · 14:32', title:'Vaciado de columnas — eje B', desc:'Vaciado de 8 columnas eje B, piso 3. Mezcla 3000 PSI. Temperatura: 28°C.', tags:['Estructura','Avance +3%','Soleado 28°C'], photos:['#0891b2','#1e40af','#7c3aed'], extra:'+4' },
        { date:'Ayer · 09:15', title:'Encofrado columnas eje B y C', desc:'Se encofró la totalidad de las columnas previstas para vaciado.', tags:['Estructura','Avance +1%'], photos:['#1e40af','#0891b2'], extra:'+2' },
        { date:'Hace 2 días · 16:00', title:'Inspección de armado — eje A', desc:'Inspector verificó densidad de armado. Aprobado sin observaciones.', tags:['Estructura','Inspección','Aprobado'], photos:['#047857','#0891b2'], extra:'' },
      ];
      const list = c.querySelector('#s6List');
      entries.forEach((e, i) => {
        const card = document.createElement('div');
        card.className = 'idd-bcard';
        card.style.cssText = 'opacity:0;transform:translateY(8px)';
        const photos = e.photos.map((col, pi) =>
          `<div class="idd-bphoto" style="background:linear-gradient(135deg,${col},${col}99)">${pi===e.photos.length-1&&e.extra?e.extra:''}</div>`).join('');
        const tags = e.tags.map(t => `<span class="idd-btag">${t}</span>`).join('');
        card.innerHTML = `<div class="idd-bcard-date">${e.date}</div>
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
          card.style.opacity = '1'; card.style.transform = 'translateY(0)';
        }, 300 + i * 300);
      });
      reveal(c.querySelector('#s6Cta'), 2500);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 7 — Multi-proyecto / Portafolio
  ══════════════════════════════════════════════════════════════════ */
  const scene7 = {
    url: 'app.projexaai.com/#/projects',
    render: () => `
<div class="idd-layout">
  ${sidebar('dashboard')}
  <div class="idd-main">
    <div class="idd-toprow">
      <div>
        <h4 class="idd-page-title">Mis proyectos</h4>
        <span class="idd-proj-name">Constructora XYZ · 3 activos</span>
      </div>
      <button class="idd-btn-pri">+ Nuevo proyecto</button>
    </div>
    <div class="idd-proj-grid">
      <div class="idd-pcard featured" style="opacity:0;transform:translateY(8px)">
        <div class="idd-pcard-top">
          <span class="idd-pcard-name">Torre Central</span>
          <span class="idd-pbadge on">Activo</span>
        </div>
        <div class="idd-pcard-stats">
          <span>Avance</span><strong>62%</strong>
        </div>
        <div class="idd-pbar-wrap"><div class="idd-pbar-fill" data-w="62" style="width:0;background:#1e40af"></div></div>
        <div class="idd-pcard-meta">$210,000 · 5 fases · Piso 12</div>
        <div class="idd-pcard-kpis">
          <span class="idd-pkpi k-blue">CPI 1.08</span>
          <span class="idd-pkpi k-teal">SPI 0.94</span>
        </div>
      </div>
      <div class="idd-pcard" style="opacity:0;transform:translateY(8px)">
        <div class="idd-pcard-top">
          <span class="idd-pcard-name">Residencial Los Pinos</span>
          <span class="idd-pbadge on">Activo</span>
        </div>
        <div class="idd-pcard-stats"><span>Avance</span><strong>38%</strong></div>
        <div class="idd-pbar-wrap"><div class="idd-pbar-fill" data-w="38" style="width:0;background:#0891b2"></div></div>
        <div class="idd-pcard-meta">$85,000 · 4 fases · Residencial</div>
        <div class="idd-pcard-kpis">
          <span class="idd-pkpi k-green">CPI 1.02</span>
          <span class="idd-pkpi k-green">SPI 1.01</span>
        </div>
      </div>
      <div class="idd-pcard" style="opacity:0;transform:translateY(8px)">
        <div class="idd-pcard-top">
          <span class="idd-pcard-name">Bodega Industrial A4</span>
          <span class="idd-pbadge plan">Planificación</span>
        </div>
        <div class="idd-pcard-stats"><span>Avance</span><strong>0%</strong></div>
        <div class="idd-pbar-wrap"><div class="idd-pbar-fill" data-w="0" style="width:0;background:#7c3aed"></div></div>
        <div class="idd-pcard-meta">$320,000 · 6 fases · Industrial</div>
        <div class="idd-pcard-kpis">
          <span class="idd-pkpi" style="background:#f1f5f9;color:#64748b">Sin datos aún</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
    animate(c) {
      const cards = c.querySelectorAll('.idd-pcard');
      stagger(Array.from(cards), 200, 250);
      setTimeout(() => {
        c.querySelectorAll('.idd-pbar-fill').forEach((b, i) => {
          setTimeout(() => {
            b.style.transition = 'width .7s cubic-bezier(.4,0,.2,1)';
            b.style.width = b.dataset.w + '%';
          }, i * 120);
        });
      }, 1200);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 8 — Calculadora de Concreto
  ══════════════════════════════════════════════════════════════════ */
  const scene8 = {
    url: 'app.projexaai.com/#/concrete',
    render: () => `
<div class="idd-layout">
  ${sidebar('ia')}
  <div class="idd-main">
    <div class="idd-toprow"><h4 class="idd-page-title">Calculadora de Concreto</h4></div>

    <div class="idd-concrete-wrap">
      <div class="idd-concrete-inputs">
        <div class="idd-ci-card">
          <div class="idd-ci-label">Resistencia f'c</div>
          <div class="idd-ci-select">
            <span class="idd-fc-opt">2000</span>
            <span class="idd-fc-opt">2500</span>
            <span class="idd-fc-opt active" id="s8fc">3000</span>
            <span class="idd-fc-opt">4000</span>
          </div>
          <div class="idd-ci-unit">PSI</div>
        </div>
        <div class="idd-ci-card">
          <div class="idd-ci-label">Volumen</div>
          <div class="idd-ci-value" id="s8vol">18.0</div>
          <div class="idd-ci-unit">m³</div>
        </div>
      </div>

      <div class="idd-concrete-ratio" id="s8Ratio" style="opacity:0;transform:translateY(6px)">
        <div class="idd-cr-title">Dosificación 1 : 2 : 3.5</div>
        <div class="idd-cr-row">
          <div class="idd-cr-item"><div class="idd-cr-val" data-counter="1" data-decimals="0">0</div><div class="idd-cr-lbl">Cemento</div></div>
          <div class="idd-cr-item"><div class="idd-cr-val" data-counter="2" data-decimals="1">0</div><div class="idd-cr-lbl">Arena</div></div>
          <div class="idd-cr-item"><div class="idd-cr-val" data-counter="3.5" data-decimals="1">0</div><div class="idd-cr-lbl">Grava</div></div>
          <div class="idd-cr-item"><div class="idd-cr-val" data-counter="0.50" data-decimals="2">0</div><div class="idd-cr-lbl">A/C</div></div>
        </div>
      </div>

      <div class="idd-concrete-results" id="s8Results">
        <div class="idd-cr-head">Resultado para 18 m³</div>
        <div class="idd-crr idd-critem" style="opacity:0;transform:translateY(5px)">
          <span><i class="fa-solid fa-box" style="color:#1e40af"></i> Cemento</span>
          <span class="idd-bold"><span data-counter="430" data-decimals="0">0</span> sacos (50kg)</span>
        </div>
        <div class="idd-crr idd-critem" style="opacity:0;transform:translateY(5px)">
          <span><i class="fa-solid fa-layer-group" style="color:#d97706"></i> Arena</span>
          <span class="idd-bold">17.8 m³</span>
        </div>
        <div class="idd-crr idd-critem" style="opacity:0;transform:translateY(5px)">
          <span><i class="fa-solid fa-circle-dot" style="color:#64748b"></i> Grava</span>
          <span class="idd-bold">31.2 m³</span>
        </div>
        <div class="idd-crr idd-critem" style="opacity:0;transform:translateY(5px)">
          <span><i class="fa-solid fa-droplet" style="color:#0891b2"></i> Agua</span>
          <span class="idd-bold">3,870 L</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
    animate(c) {
      // t=500: "Calcular" pressed — ratio appears
      setTimeout(() => {
        const fc = c.querySelector('#s8fc');
        if (fc) { fc.classList.add('idd-btn-pulse'); }
      }, 500);
      reveal(c.querySelector('#s8Ratio'), 800);
      setTimeout(() => c.querySelectorAll('#s8Ratio [data-counter]').forEach(el => animCounter(el, 600)), 900);
      // t=1600: results stagger in with counters
      setTimeout(() => {
        stagger(Array.from(c.querySelectorAll('.idd-critem')), 0, 140);
        setTimeout(() => {
          c.querySelectorAll('.idd-critem [data-counter]').forEach(el => animCounter(el, 700));
        }, 200);
      }, 1600);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 9 — Auditoría & Trazabilidad
  ══════════════════════════════════════════════════════════════════ */
  const scene9 = {
    url: 'app.projexaai.com/#/audit',
    render: () => `
<div class="idd-layout">
  ${sidebar('dashboard')}
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Auditoría</h4>
      <div style="display:flex;gap:6px">
        <button class="idd-btn-sec"><i class="fa-solid fa-filter"></i> Filtrar</button>
        <button class="idd-btn-sec">Exportar</button>
      </div>
    </div>
    <div class="idd-audit-filters" id="s9Filters" style="opacity:0;transform:translateY(4px)">
      <span class="idd-filter-pill active">Todos</span>
      <span class="idd-filter-pill">CREATE</span>
      <span class="idd-filter-pill">UPDATE</span>
      <span class="idd-filter-pill">DELETE</span>
      <span class="idd-filter-pill">INVITE</span>
    </div>
    <div class="idd-audit-list" id="s9List"></div>
  </div>
</div>`,
    animate(c) {
      reveal(c.querySelector('#s9Filters'), 300);
      const entries = [
        { user:'piero@...', entity:'costs', action:'CREATE', time:'hace 2h', detail:'Nuevo costo $4,320 — Concreto', color:'blue' },
        { user:'ana@...', entity:'phases', action:'UPDATE', time:'hace 5h', detail:'Avance Estructura: 58% → 62%', color:'teal' },
        { user:'carlos@...', entity:'budget', action:'UPDATE', time:'ayer', detail:'Presupuesto: $200k → $210k', color:'amber' },
        { user:'piero@...', entity:'workers', action:'CREATE', time:'ayer', detail:'Nuevo obrero: Pedro Estrada', color:'green' },
        { user:'ana@...', entity:'users', action:'INVITE', time:'hace 2d', detail:'Invitó a maria@empresa.com', color:'blue' },
      ];
      const list = c.querySelector('#s9List');
      entries.forEach((e, i) => {
        const row = document.createElement('div');
        row.className = 'idd-arow';
        row.style.cssText = 'opacity:0;transform:translateY(5px)';
        const colors = { blue:'#dbeafe/#1e40af', teal:'#cffafe/#0891b2', amber:'#fef3c7/#d97706', green:'#d1fae5/#047857' };
        const [bg, fg] = (colors[e.color] || '#dbeafe/#1e40af').split('/');
        row.innerHTML = `
          <div class="idd-arow-left">
            <div class="idd-aavatar">${e.user.slice(0,2).toUpperCase()}</div>
            <div>
              <div class="idd-auser">${e.user}</div>
              <div class="idd-adetail">${e.detail}</div>
            </div>
          </div>
          <div class="idd-arow-right">
            <span class="idd-aaction" style="background:${bg};color:${fg}">${e.action}</span>
            <span class="idd-aentity">${e.entity}</span>
            <span class="idd-atime">${e.time}</span>
          </div>`;
        list.appendChild(row);
        setTimeout(() => {
          row.style.transition = 'opacity .35s ease, transform .35s ease';
          row.style.opacity = '1'; row.style.transform = 'translateY(0)';
        }, 500 + i * 160);
      });
      // t=2800: expand first row diff
      setTimeout(() => {
        const first = list.querySelector('.idd-arow');
        if (first) {
          const diff = document.createElement('div');
          diff.className = 'idd-adiff';
          diff.innerHTML = `<span class="idd-diff-add">+ costs.amount = $4,320</span><span class="idd-diff-add">+ costs.phase = "Estructura"</span>`;
          diff.style.cssText = 'opacity:0;transition:opacity .3s';
          first.appendChild(diff);
          requestAnimationFrame(() => { diff.style.opacity = '1'; });
        }
      }, 2800);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     SCENE 10 — Reportes PDF
  ══════════════════════════════════════════════════════════════════ */
  const scene10 = {
    url: 'app.projexaai.com/#/reports',
    render: () => `
<div class="idd-layout">
  ${sidebar('dashboard')}
  <div class="idd-main">
    <div class="idd-toprow">
      <h4 class="idd-page-title">Reportes y Exportes</h4>
    </div>

    <div class="idd-reports-grid">
      <div class="idd-rep-card" style="opacity:0;transform:translateY(8px)">
        <div class="idd-rep-icon" style="background:linear-gradient(135deg,#1e40af,#0891b2)"><i class="fa-solid fa-file-pdf"></i></div>
        <div class="idd-rep-info">
          <div class="idd-rep-title">Reporte EVM completo</div>
          <div class="idd-rep-desc">CPI, SPI, EAC, VAC, curvas S y análisis de tendencia</div>
        </div>
        <button class="idd-rep-btn" id="s10BtnEvm">Generar</button>
      </div>
      <div class="idd-rep-card" style="opacity:0;transform:translateY(8px)">
        <div class="idd-rep-icon" style="background:linear-gradient(135deg,#0891b2,#06b6d4)"><i class="fa-solid fa-diagram-project"></i></div>
        <div class="idd-rep-info">
          <div class="idd-rep-title">Gantt + Ruta crítica</div>
          <div class="idd-rep-desc">Cronograma visual con fases, dependencias y holguras</div>
        </div>
        <button class="idd-rep-btn">Generar</button>
      </div>
      <div class="idd-rep-card" style="opacity:0;transform:translateY(8px)">
        <div class="idd-rep-icon" style="background:linear-gradient(135deg,#d97706,#f59e0b)"><i class="fa-solid fa-receipt"></i></div>
        <div class="idd-rep-info">
          <div class="idd-rep-title">Estado de costos</div>
          <div class="idd-rep-desc">Presupuesto vs real por fase, categoría y período</div>
        </div>
        <button class="idd-rep-btn">Generar</button>
      </div>
      <div class="idd-rep-card" style="opacity:0;transform:translateY(8px)">
        <div class="idd-rep-icon" style="background:linear-gradient(135deg,#047857,#10b981)"><i class="fa-solid fa-camera"></i></div>
        <div class="idd-rep-info">
          <div class="idd-rep-title">Reporte de bitácora</div>
          <div class="idd-rep-desc">Entradas, fotos y avances en un documento formal</div>
        </div>
        <button class="idd-rep-btn">Generar</button>
      </div>
    </div>

    <!-- Generating progress overlay -->
    <div class="idd-gen-overlay" id="s10Overlay" style="display:none">
      <div class="idd-gen-box">
        <i class="fa-solid fa-file-pdf" style="font-size:28px;color:#1e40af;margin-bottom:10px"></i>
        <div class="idd-gen-title">Generando Reporte EVM...</div>
        <div class="idd-gen-bar-wrap"><div class="idd-gen-bar" id="s10Bar"></div></div>
        <div class="idd-gen-steps" id="s10Steps">
          <div class="idd-gen-step" id="gs0">✓ Calculando métricas EVM</div>
          <div class="idd-gen-step dimmed" id="gs1">Generando gráficos...</div>
          <div class="idd-gen-step dimmed" id="gs2">Compilando PDF...</div>
        </div>
        <div class="idd-gen-done" id="s10Done" style="display:none">
          <i class="fa-solid fa-circle-check" style="color:#047857"></i> Reporte listo — 2.4 MB
          <button class="idd-import-btn" style="margin-top:8px"><i class="fa-solid fa-download"></i> Descargar PDF</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
    animate(c) {
      stagger(Array.from(c.querySelectorAll('.idd-rep-card')), 200, 200);

      // t=1800: click "Generar" EVM
      setTimeout(() => {
        const btn = c.querySelector('#s10BtnEvm');
        if (btn) btn.classList.add('idd-btn-pulse');
        setTimeout(() => {
          const overlay = c.querySelector('#s10Overlay');
          if (!overlay) return;
          overlay.style.display = 'flex';
          overlay.style.opacity = '0';
          overlay.style.transition = 'opacity .3s';
          requestAnimationFrame(() => { overlay.style.opacity = '1'; });

          // animate progress bar
          const bar = c.querySelector('#s10Bar');
          if (bar) {
            bar.style.transition = 'none'; bar.style.width = '0%';
            requestAnimationFrame(() => {
              bar.style.transition = 'width 2.2s cubic-bezier(.4,0,.2,1)';
              bar.style.width = '100%';
            });
          }

          // step highlights
          setTimeout(() => {
            const gs1 = c.querySelector('#gs1');
            if (gs1) gs1.classList.remove('dimmed');
          }, 700);
          setTimeout(() => {
            const gs2 = c.querySelector('#gs2');
            if (gs2) gs2.classList.remove('dimmed');
          }, 1500);
          setTimeout(() => {
            const done = c.querySelector('#s10Done');
            const steps = c.querySelector('#s10Steps');
            if (done && steps) {
              steps.style.cssText = 'display:none';
              done.style.cssText = 'display:block';
            }
          }, 2400);
        }, 350);
      }, 1800);
    }
  };

  /* ══════════════════════════════════════════════════════════════════
     DEMO CONTROLLER
  ══════════════════════════════════════════════════════════════════ */
  const SCENES = [scene0, scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10];

  const screenEl  = document.getElementById('idemoScreen');
  const urlEl     = document.getElementById('idemoUrl');
  const dotsEl    = document.querySelectorAll('.idemo-dot');
  const sceneBtns = document.querySelectorAll('.ids-btn');
  const prevBtn   = document.getElementById('idemoPrev');
  const nextBtn   = document.getElementById('idemoNext');
  const playBtn   = document.getElementById('idemoPlayPause');
  const playIcon  = document.getElementById('idemoPlayIcon');
  const progBar   = document.getElementById('idemoProgress');

  if (!screenEl) return;

  let current   = 0;
  let isPlaying = true;
  let autoTimer = null;
  let progStart = 0;

  function goTo(n) {
    const next = ((n % SCENES.length) + SCENES.length) % SCENES.length;
    current = next;

    dotsEl.forEach((d, i)  => d.classList.toggle('active', i === next));
    sceneBtns.forEach((b)  => b.classList.toggle('active', +b.dataset.scene === next));

    // reset all progress fills
    document.querySelectorAll('.ids-prog-fill').forEach(f => {
      f.style.transition = 'none'; f.style.width = '0%';
    });

    // also sync active scene button progress bar


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

    if (isPlaying) { scheduleNext(); startProgress(); }
  }

  function scheduleNext() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => goTo(current + 1), SCENE_DURATION);
  }

  function startProgress() {
    if (!progBar) return;
    progBar.style.transition = 'none'; progBar.style.width = '0%';
    progStart = Date.now();
    requestAnimationFrame(() => {
      progBar.style.transition = `width ${SCENE_DURATION}ms linear`;
      progBar.style.width = '100%';
    });
    // active scene button progress
    const activeFill = document.querySelector('.ids-btn.active .ids-prog-fill');
    if (activeFill) {
      activeFill.style.transition = 'none'; activeFill.style.width = '0%';
      requestAnimationFrame(() => {
        activeFill.style.transition = `width ${SCENE_DURATION}ms linear`;
        activeFill.style.width = '100%';
      });
    }
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (playIcon) playIcon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    if (isPlaying) { scheduleNext(); startProgress(); }
    else {
      clearTimeout(autoTimer);
      if (progBar) {
        const pct = Math.min(((Date.now() - progStart) / SCENE_DURATION) * 100, 100);
        progBar.style.transition = 'none'; progBar.style.width = pct + '%';
      }
    }
  }

  // controls
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  if (playBtn) playBtn.addEventListener('click', togglePlay);
  dotsEl.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  sceneBtns.forEach((b)   => b.addEventListener('click', () => goTo(+b.dataset.scene)));

  // pause on hover
  screenEl.addEventListener('mouseenter', () => { if (isPlaying) clearTimeout(autoTimer); });
  screenEl.addEventListener('mouseleave', () => { if (isPlaying) scheduleNext(); });

  // keyboard (only when section is visible)
  document.addEventListener('keydown', (e) => {
    const s = document.getElementById('tour');
    if (!s) return;
    const r = s.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === ' ')          { e.preventDefault(); togglePlay(); }
  });

  // IntersectionObserver — start on enter viewport
  const demoSection = document.getElementById('tour');
  if (demoSection) {
    let started = false;
    function startDemo() { if (started) return; started = true; goTo(0); }
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { startDemo(); obs.disconnect(); }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    obs.observe(demoSection);
    if (demoSection.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setTimeout(startDemo, 400);
    }
  }
})();
