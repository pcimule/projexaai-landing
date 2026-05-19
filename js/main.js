/* ProjexaAI Landing v2 — interactions */
(function () {
  const APP_URL = 'https://laguna-property.onrender.com';

  /* ── Year ───────────────────────────────────────────────────── */
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* ── Topbar scroll behaviour ────────────────────────────────── */
  const topbar = document.getElementById('topbar');
  function updateTopbar() {
    const inHero = window.scrollY < (window.innerHeight * 0.6);
    topbar.classList.toggle('dark', inHero);
    topbar.classList.toggle('light', !inHero);
  }
  updateTopbar();
  window.addEventListener('scroll', updateTopbar, { passive: true });

  /* ── Mobile nav ─────────────────────────────────────────────── */
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('topnav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.addEventListener('click', (e) => { if (e.target.tagName === 'A') nav.classList.remove('open'); });
  }

  /* ── Scroll reveal ──────────────────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal],[data-reveal-delay]').forEach((el) => io.observe(el));

  /* ── Subtle hero parallax ───────────────────────────────────── */
  const frame = document.querySelector('.app-frame');
  if (frame && window.matchMedia('(min-width: 1024px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 7;
      const y = (e.clientY / window.innerHeight - 0.5) * 4;
      frame.style.transform = `perspective(1400px) rotateY(${-3 + x}deg) rotateX(${1.5 - y}deg)`;
    });
  }

  /* ── Tour slideshow ─────────────────────────────────────────── */
  const slides = document.querySelectorAll('.tour-slide');
  const tabs   = document.querySelectorAll('.tour-tab');
  const dots   = document.querySelectorAll('.tdot');
  const prevBtn = document.getElementById('tourPrev');
  const nextBtn = document.getElementById('tourNext');
  let current = 0;
  let autoTimer = null;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    tabs[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    tabs[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goToSlide(current + 1), 5000);
  }
  function stopAuto() { clearInterval(autoTimer); }

  tabs.forEach((t) => t.addEventListener('click', () => { goToSlide(+t.dataset.slide); stopAuto(); }));
  dots.forEach((d) => d.addEventListener('click', () => { goToSlide(+d.dataset.slide); stopAuto(); }));
  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(current - 1); stopAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(current + 1); stopAuto(); });

  const tourSection = document.getElementById('tour');
  if (tourSection) {
    const tourObs = new IntersectionObserver((entries) => {
      entries[0].isIntersecting ? startAuto() : stopAuto();
    }, { threshold: 0.2 });
    tourObs.observe(tourSection);
  }

  /* ── Feature modals ─────────────────────────────────────────── */
  const overlay  = document.getElementById('modalOverlay');
  const modalLeft  = document.getElementById('modalLeft');
  const modalRight = document.getElementById('modalRight');
  const closeBtn   = document.getElementById('modalClose');

  const FEATURES = {
    dashboard: {
      kicker: { es:'Módulo', en:'Module', pt:'Módulo' },
      title:  { es:'Dashboard con EVM', en:'EVM Dashboard', pt:'Dashboard com EVM' },
      lead:   { es:'Todas las métricas de gestión del valor ganado calculadas automáticamente a partir de tus fases, presupuesto y costos reales.', en:'All earned value metrics calculated automatically from your phases, budget and actual costs.', pt:'Todas as métricas de valor agregado calculadas automaticamente a partir de fases, orçamento e custos reais.' },
      items:  {
        es: ['CPI, SPI, EV, PV, CV, SV en tiempo real', 'EAC, VAC y fecha estimada de término', 'Gráfico presupuesto vs. real por mes', 'Avance porcentual por fase', 'Semáforo de salud del proyecto'],
        en: ['CPI, SPI, EV, PV, CV, SV in real time', 'EAC, VAC and estimated completion date', 'Budget vs. actual chart by month', 'Percentage progress per phase', 'Project health traffic light'],
        pt: ['CPI, SPI, EV, PV, CV, SV em tempo real', 'EAC, VAC e data estimada de término', 'Gráfico orçamento vs. real por mês', 'Avanço percentual por fase', 'Semáforo de saúde do projeto'],
      },
      screen: () => `
        <div class="mscreen">
          <div class="ms-topbar"><span class="ms-dot r"></span><span class="ms-dot y"></span><span class="ms-dot g"></span><span class="ms-title">Dashboard — Torre Central</span></div>
          <div class="ms-body">
            <div class="ms-section-title">EVM — Valor Ganado</div>
            <div class="ms-kpi-row">
              <div class="ms-kpi b"><div class="ms-kl">CPI</div><div class="ms-kv">1.08</div></div>
              <div class="ms-kpi t"><div class="ms-kl">SPI</div><div class="ms-kv">0.94</div></div>
              <div class="ms-kpi g"><div class="ms-kl">EV</div><div class="ms-kv">$131k</div></div>
              <div class="ms-kpi a"><div class="ms-kl">EAC</div><div class="ms-kv">$218k</div></div>
            </div>
            <div class="ms-section-title">Avance por fase</div>
            <div class="ms-bar-row"><span>Estructura</span><div class="ms-pbar"><div style="width:85%;background:#1e40af"></div></div><span>85%</span></div>
            <div class="ms-bar-row"><span>Mampostería</span><div class="ms-pbar"><div style="width:60%;background:#0891b2"></div></div><span>60%</span></div>
            <div class="ms-bar-row"><span>Instalaciones</span><div class="ms-pbar"><div style="width:40%;background:#7c3aed"></div></div><span>40%</span></div>
            <div class="ms-bar-row"><span>Acabados</span><div class="ms-pbar"><div style="width:10%;background:#d97706"></div></div><span>10%</span></div>
            <div class="ms-section-title">Estado</div>
            <div class="ms-row"><span>Costo bajo control</span><span class="ms-tag blue">CPI > 1</span></div>
            <div class="ms-row"><span>Ligero retraso en cronograma</span><span class="ms-tag amber">SPI 0.94</span></div>
            <div class="ms-row"><span>Fin estimado</span><span class="ms-tag teal">+12 días</span></div>
          </div>
        </div>`,
    },
    gantt: {
      kicker: { es:'Módulo', en:'Module', pt:'Módulo' },
      title:  { es:'Gantt + Ruta crítica', en:'Gantt + Critical Path', pt:'Gantt + Caminho crítico' },
      lead:   { es:'El algoritmo CPM (Critical Path Method) calcula automáticamente la ruta crítica con cada cambio en las fechas o dependencias de tus fases.', en:'The CPM algorithm automatically recalculates the critical path with every change in phase dates or dependencies.', pt:'O algoritmo CPM recalcula automaticamente o caminho crítico a cada mudança nas datas ou dependências das fases.' },
      items:  {
        es: ['Gantt visual con dependencias entre fases', 'Forward & backward pass automático', 'Identificación visual de fases en ruta crítica', 'Exporta el cronograma a PDF en un click', 'Acciones bulk: mover, duplicar, eliminar fases'],
        en: ['Visual Gantt with phase dependencies', 'Automatic forward & backward pass', 'Visual highlighting of critical-path phases', 'Export schedule to PDF in one click', 'Bulk actions: move, duplicate, delete phases'],
        pt: ['Gantt visual com dependências entre fases', 'Forward & backward pass automático', 'Destaque visual das fases no caminho crítico', 'Exportar cronograma para PDF em um clique', 'Ações em massa: mover, duplicar, excluir'],
      },
      screen: () => `
        <div class="mscreen">
          <div class="ms-topbar"><span class="ms-dot r"></span><span class="ms-dot y"></span><span class="ms-dot g"></span><span class="ms-title">Fases / Gantt — Torre Central</span></div>
          <div class="ms-body">
            <div class="ms-section-title">Cronograma · 6 meses</div>
            <div style="background:var(--bg-soft);border-radius:8px;padding:10px;border:1px solid var(--border)">
              ${['Cimentación|0%|10%|false|100%','Estructura|10%|35%|true|85%','Mampostería|30%|28%|false|60%','Instalaciones|42%|30%|false|40%','Acabados|62%|35%|false|10%'].map(r => {
                const [name,left,width,crit,pct] = r.split('|');
                return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;font-size:10px">
                  <span style="width:80px;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name}</span>
                  <div style="flex:1;height:22px;background:var(--bg-deep);border-radius:4px;position:relative;overflow:hidden">
                    <div style="position:absolute;left:${left};width:${width};top:4px;bottom:4px;background:${crit==='true'?'linear-gradient(90deg,#b91c1c,#f97316)':'linear-gradient(90deg,#1e40af,#0891b2)'};border-radius:3px"></div>
                    ${crit==='true'?'<span style="position:absolute;right:4px;top:50%;transform:translateY(-50%);font-size:8px;font-weight:700;color:#fff;background:rgba(185,28,28,.7);padding:1px 5px;border-radius:3px">Crítica</span>':''}
                  </div>
                  <span style="width:28px;text-align:right;font-weight:700;color:var(--text-2)">${pct}</span>
                </div>`;
              }).join('')}
            </div>
            <div class="ms-section-title">Holguras</div>
            <div class="ms-row"><span>Cimentación</span><span class="ms-tag blue">+8 días</span></div>
            <div class="ms-row"><span>Estructura (crítica)</span><span class="ms-tag red">0 días</span></div>
            <div class="ms-row"><span>Mampostería</span><span class="ms-tag teal">+5 días</span></div>
          </div>
        </div>`,
    },
    ia: {
      kicker: { es:'IA', en:'AI', pt:'IA' },
      title:  { es:'Cuantificador con IA', en:'AI Material Takeoff', pt:'Levantamento com IA' },
      lead:   { es:'Sube tus planos arquitectónicos en PDF y la IA analiza ambientes, dimensiones y estructuras para proponer una lista completa de materiales y mano de obra con cantidades.', en:'Upload your architectural plans and AI analyzes rooms, dimensions and structures to propose a full bill of materials and labor.', pt:'Envie suas plantas e a IA analisa ambientes, dimensões e estruturas para propor lista de materiais e mão de obra.' },
      items:  {
        es: ['Soporta PDF, PNG, JPG y HEIC', 'Propone materiales con unidades y cantidades', 'Incluye estimado de jornales de mano de obra', 'Todo editable antes de importar al presupuesto', 'Conversación contextual para ajustar resultados'],
        en: ['Supports PDF, PNG, JPG and HEIC', 'Proposes materials with units and quantities', 'Includes labor day estimates', 'All editable before importing to budget', 'Contextual chat to refine results'],
        pt: ['Suporta PDF, PNG, JPG e HEIC', 'Propõe materiais com unidades e quantidades', 'Inclui estimativa de diárias de mão de obra', 'Tudo editável antes de importar ao orçamento', 'Chat contextual para ajustar resultados'],
      },
      screen: () => `
        <div class="mscreen">
          <div class="ms-topbar"><span class="ms-dot r"></span><span class="ms-dot y"></span><span class="ms-dot g"></span><span class="ms-title">Cuantificador IA</span></div>
          <div class="ms-body">
            <div style="background:var(--bg-soft);border:1.5px dashed var(--border-strong);border-radius:10px;padding:12px;text-align:center;margin-bottom:10px">
              <i class="fa-solid fa-file-image" style="font-size:20px;color:var(--primary);display:block;margin:0 auto 4px"></i>
              <div style="font-size:11px;font-weight:700;color:var(--text-2)">plano-arquitectonico-A1.pdf</div>
              <div style="font-size:10px;color:var(--success);font-weight:700;margin-top:4px"><i class="fa-solid fa-check"></i> Analizado · 6 ambientes detectados</div>
            </div>
            <div class="ms-section-title">Lista propuesta por IA</div>
            <div style="border:1px solid var(--border);border-radius:8px;overflow:hidden;font-size:10px">
              <div style="display:grid;grid-template-columns:1fr 50px 50px 54px;padding:5px 8px;background:var(--bg-deep);font-weight:700;color:var(--text-muted);font-size:9px;text-transform:uppercase">
                <span>Material</span><span style="text-align:right">Unid.</span><span style="text-align:right">Cant.</span><span style="text-align:right">Precio</span>
              </div>
              ${[['Cemento Portland','saco','420','$12.50'],['Bloque 6"','u','8 400','$0.85'],['Varilla #4','qq','38','$48.00'],['Arena gruesa','m³','24','$28.00'],['Mano de obra','jornal','180','$35.00']].map(([mat,u,qty,p])=>`
              <div style="display:grid;grid-template-columns:1fr 50px 50px 54px;padding:6px 8px;border-top:1px solid var(--border)">
                <span>${mat}</span><span style="text-align:right;color:var(--text-muted)">${u}</span><span style="text-align:right;font-weight:700">${qty}</span><span style="text-align:right;color:var(--text-muted)">${p}</span>
              </div>`).join('')}
            </div>
          </div>
        </div>`,
    },
    costs: {
      kicker: { es:'Módulo', en:'Module', pt:'Módulo' },
      title:  { es:'Presupuesto vs. Costos reales', en:'Budget vs. Real Costs', pt:'Orçamento vs. Custos reais' },
      lead:   { es:'Registra cada gasto de la obra y asígnalo a fase, categoría y proveedor. El sistema compara en tiempo real contra el presupuesto y detecta desviaciones antes de que sean un problema.', en:'Log every project expense and assign it to phase, category and supplier. The system compares against the budget in real time and flags variances early.', pt:'Registre cada gasto e atribua a fase, categoria e fornecedor. O sistema compara em tempo real com o orçamento e detecta desvios.' },
      items:  {
        es: ['Registro de costos por categoría (material, mano de obra, equipo)', 'Comparativa automática presupuesto vs. real por fase', 'Desviación acumulada en tiempo real', 'Búsqueda y filtros avanzados', 'Exporta reporte de costos a PDF'],
        en: ['Cost log by category (material, labor, equipment)', 'Automatic budget vs. actual per phase', 'Cumulative variance in real time', 'Advanced search and filters', 'Export cost report to PDF'],
        pt: ['Registro por categoria (material, mão de obra, equipamento)', 'Comparativo automático orçamento vs. real por fase', 'Desvio acumulado em tempo real', 'Busca e filtros avançados', 'Exportar relatório de custos para PDF'],
      },
      screen: () => `
        <div class="mscreen">
          <div class="ms-topbar"><span class="ms-dot r"></span><span class="ms-dot y"></span><span class="ms-dot g"></span><span class="ms-title">Costos reales — Torre Central</span></div>
          <div class="ms-body">
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px">
              ${[['Presup.','$210,000','navy'],['Gastado','$134,200','#1e40af'],['Disponible','$75,800','#047857'],['Desviación','+2.1%','#d97706']].map(([l,v,c])=>`
              <div style="background:var(--bg-soft);border:1px solid var(--border);border-radius:8px;padding:8px">
                <div style="font-size:8px;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);font-weight:700">${l}</div>
                <div style="font-size:15px;font-weight:800;color:${c}">${v}</div>
              </div>`).join('')}
            </div>
            <div class="ms-section-title">Últimos registros</div>
            <div style="border:1px solid var(--border);border-radius:8px;overflow:hidden;font-size:10px">
              ${[['Concreto 3000PSI','Material','Estructura','$4,320','blue'],['Jornales sem. 18','Mano obra','Mampostería','$2,800','amber'],['Varillas #4','Material','Estructura','$1,960','blue'],['Andamios alquiler','Equipo','Estructura','$640','purple']].map(([d,c,f,m,col])=>`
              <div style="display:grid;grid-template-columns:1fr 70px 70px 52px;padding:6px 8px;border-bottom:1px solid var(--border);align-items:center">
                <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d}</span>
                <span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;background:${col==='blue'?'#dbeafe':col==='amber'?'#fef3c7':'#ede9fe'};color:${col==='blue'?'#1e40af':col==='amber'?'#d97706':'#6d28d9'}">${c}</span>
                <span style="color:var(--text-muted)">${f}</span>
                <span style="text-align:right;font-weight:700">${m}</span>
              </div>`).join('')}
            </div>
          </div>
        </div>`,
    },
    bitacora: {
      kicker: { es:'Módulo', en:'Module', pt:'Módulo' },
      title:  { es:'Bitácora de obra', en:'Site Logbook', pt:'Diário de obra' },
      lead:   { es:'Registro diario de actividades con evidencia fotográfica, condiciones climáticas, personal en sitio y avance del día. Historial completo y trazable.', en:'Daily activity log with photo evidence, weather conditions, site personnel and daily progress. Full traceable history.', pt:'Registro diário de atividades com evidência fotográfica, condições climáticas, pessoal no local e avanço do dia.' },
      items:  {
        es: ['Fotos desde cámara o galería (hasta 20 por entrada)', 'Soporte HEIC (iPhone) sin conversión', 'Condiciones del día: clima, temperatura, personal', 'Vinculación a fase y porcentaje de avance', 'Búsqueda y filtro por fecha, fase y palabra clave'],
        en: ['Photos from camera or gallery (up to 20 per entry)', 'HEIC support (iPhone) without conversion', 'Day conditions: weather, temperature, crew', 'Link to phase and progress percentage', 'Search and filter by date, phase and keyword'],
        pt: ['Fotos da câmera ou galeria (até 20 por entrada)', 'Suporte HEIC (iPhone) sem conversão', 'Condições do dia: clima, temperatura, pessoal', 'Vinculação a fase e percentual de avanço', 'Busca e filtro por data, fase e palavra-chave'],
      },
      screen: () => `
        <div class="mscreen">
          <div class="ms-topbar"><span class="ms-dot r"></span><span class="ms-dot y"></span><span class="ms-dot g"></span><span class="ms-title">Bitácora de obra</span></div>
          <div class="ms-body">
            ${[{date:'Hoy · 14:32',title:'Vaciado columnas — eje B',desc:'Vaciado de 8 columnas eje B, piso 3. Mezcla 3000 PSI.',tags:['Estructura','Avance +3%','Soleado 28°C'],photos:['#0891b2','#1e40af','#7c3aed'],extra:'+4'},{date:'Ayer · 09:15',title:'Encofrado columnas eje B y C',desc:'Se encofró la totalidad de columnas previstas para vaciado.',tags:['Estructura','Avance +1%'],photos:['#1e40af','#0891b2'],extra:''}].map(e=>`
            <div style="border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:8px">
              <div style="font-size:9px;font-weight:600;color:var(--text-muted);padding:5px 10px;background:var(--bg-soft);border-bottom:1px solid var(--border)">${e.date}</div>
              <div style="display:flex;gap:8px;padding:10px">
                <div style="display:flex;gap:3px;flex-shrink:0">
                  ${e.photos.map((c,i)=>`<div style="width:38px;height:38px;border-radius:6px;background:linear-gradient(135deg,${c},${c}aa);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700">${i===e.photos.length-1&&e.extra?e.extra:''}</div>`).join('')}
                </div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:11px;font-weight:700;margin-bottom:3px">${e.title}</div>
                  <div style="font-size:10px;color:var(--text-muted);margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.desc}</div>
                  <div style="display:flex;gap:4px;flex-wrap:wrap">${e.tags.map(t=>`<span style="font-size:9px;font-weight:600;padding:2px 6px;border-radius:4px;background:var(--bg-deep);color:var(--text-muted)">${t}</span>`).join('')}</div>
                </div>
              </div>
            </div>`).join('')}
          </div>
        </div>`,
    },
    multiproject: {
      kicker: { es:'Módulo', en:'Module', pt:'Módulo' },
      title:  { es:'Multi-proyecto y multi-empresa', en:'Multi-project & multi-company', pt:'Multi-projeto e multi-empresa' },
      lead:   { es:'Gestiona un portafolio completo de obras desde una sola cuenta. Organiza por empresa u organización, invita a tu equipo y controla quién accede a qué.', en:'Manage a full portfolio of sites from one account. Organize by company or organization, invite your team and control who accesses what.', pt:'Gerencie um portfólio completo de obras de uma só conta. Organize por empresa, convide sua equipe e controle quem acessa o quê.' },
      items:  {
        es: ['Portafolio de proyectos activos en paralelo', 'Organizaciones multi-empresa con roles', 'Roles: org_admin, proyecto_admin, miembro', 'Transferencia de ownership entre usuarios', 'Cada usuario ve solo sus proyectos asignados'],
        en: ['Portfolio of parallel active projects', 'Multi-company organizations with roles', 'Roles: org_admin, project_admin, member', 'Ownership transfer between users', 'Each user sees only their assigned projects'],
        pt: ['Portfólio de projetos ativos em paralelo', 'Organizações multi-empresa com papéis', 'Papéis: org_admin, projeto_admin, membro', 'Transferência de propriedade entre usuários', 'Cada usuário vê apenas seus projetos atribuídos'],
      },
      screen: () => `
        <div class="mscreen">
          <div class="ms-topbar"><span class="ms-dot r"></span><span class="ms-dot y"></span><span class="ms-dot g"></span><span class="ms-title">Mis proyectos — Constructora XYZ</span></div>
          <div class="ms-body">
            ${[{name:'Torre Central',st:'Activo',pct:62,col:'#1e40af',meta:'$210k · 5 fases'},{ name:'Residencial Los Pinos',st:'Activo',pct:38,col:'#0891b2',meta:'$85k · 4 fases'},{name:'Bodega Industrial A4',st:'Planificación',pct:0,col:'#7c3aed',meta:'$320k · 6 fases'}].map(p=>`
            <div style="border:1.5px solid ${p.pct===62?'var(--primary)':'var(--border)'};border-radius:10px;padding:12px;margin-bottom:8px;${p.pct===62?'box-shadow:0 0 0 3px var(--primary-soft)':''}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                <span style="font-size:12px;font-weight:700">${p.name}</span>
                <span style="font-size:9px;font-weight:700;padding:2px 8px;border-radius:999px;background:${p.st==='Activo'?'#d1fae5':'var(--primary-soft)'};color:${p.st==='Activo'?'#047857':'var(--primary)'}">${p.st}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:5px"><span>Avance</span><strong style="color:var(--text);font-size:14px">${p.pct}%</strong></div>
              <div style="height:5px;background:var(--border);border-radius:3px;overflow:hidden;margin-bottom:6px"><div style="width:${p.pct}%;height:100%;background:${p.col};border-radius:3px"></div></div>
              <div style="font-size:10px;color:var(--text-faint)">${p.meta}</div>
            </div>`).join('')}
          </div>
        </div>`,
    },
    offline: {
      kicker: { es:'PWA', en:'PWA', pt:'PWA' },
      title:  { es:'Funciona sin conexión (PWA)', en:'Works offline (PWA)', pt:'Funciona offline (PWA)' },
      lead:   { es:'ProjexaAI es una Progressive Web App instalable en móvil y escritorio. Trabaja en campo sin señal y tus cambios se sincronizan automáticamente al recuperar conexión.', en:'ProjexaAI is an installable Progressive Web App for mobile and desktop. Work in the field with no signal — changes sync automatically when you reconnect.', pt:'ProjexaAI é um PWA instalável em celular e desktop. Trabalhe sem sinal e as alterações sincronizam automaticamente ao reconectar.' },
      items:  {
        es: ['Instálala como app nativa desde el navegador', 'Modo offline: las acciones se encolan en IndexedDB', 'Sincronización automática al recuperar conexión', 'Caché inteligente de activos estáticos (Service Worker)', 'Funciona en Android, iOS, macOS y Windows'],
        en: ['Install as native app from the browser', 'Offline mode: actions queued in IndexedDB', 'Auto-sync when reconnecting', 'Smart caching of static assets (Service Worker)', 'Works on Android, iOS, macOS and Windows'],
        pt: ['Instale como app nativo do navegador', 'Modo offline: ações enfileiradas em IndexedDB', 'Sincronização automática ao reconectar', 'Cache inteligente de ativos (Service Worker)', 'Funciona em Android, iOS, macOS e Windows'],
      },
      screen: () => `
        <div class="mscreen">
          <div class="ms-topbar"><span class="ms-dot r"></span><span class="ms-dot y"></span><span class="ms-dot g"></span><span class="ms-title">ProjexaAI — Modo offline</span></div>
          <div class="ms-body">
            <div style="background:linear-gradient(135deg,var(--navy),var(--navy-2));border-radius:12px;padding:20px;text-align:center;margin-bottom:12px">
              <i class="fa-solid fa-wifi-slash" style="font-size:28px;color:#f97316;margin-bottom:10px;display:block"></i>
              <div style="color:#fff;font-size:13px;font-weight:700;margin-bottom:4px">Sin conexión</div>
              <div style="color:rgba(255,255,255,.5);font-size:11px">Trabajando en modo offline. Tus cambios se guardan localmente.</div>
            </div>
            <div class="ms-section-title">Cola de sincronización</div>
            ${[['Nueva entrada de bitácora','Pendiente','#d97706'],['Costo registrado $4,320','Pendiente','#d97706'],['Avance fase: +3%','Sincronizado','#047857']].map(([a,s,c])=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border);font-size:11px">
              <span>${a}</span><span style="font-size:9px;font-weight:700;color:${c}">${s}</span>
            </div>`).join('')}
            <div style="margin-top:12px;background:var(--primary-soft);border-radius:8px;padding:10px;font-size:11px;color:var(--primary);font-weight:600;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-mobile-screen"></i> Instalar como app: toca "Agregar a pantalla de inicio"
            </div>
          </div>
        </div>`,
    },
    audit: {
      kicker: { es:'Módulo', en:'Module', pt:'Módulo' },
      title:  { es:'Auditoría y trazabilidad', en:'Audit trail', pt:'Auditoria e rastreabilidade' },
      lead:   { es:'Cada acción realizada en la plataforma queda registrada con el usuario, fecha y los cambios específicos realizados (diff). Ideal para auditorías internas, reportes a clientes y resolución de disputas.', en:'Every action on the platform is logged with the user, timestamp and specific changes (diff). Ideal for internal audits, client reports and dispute resolution.', pt:'Cada ação na plataforma é registrada com usuário, data e as mudanças específicas (diff). Ideal para auditorias, relatórios e resolução de disputas.' },
      items:  {
        es: ['Registro completo de quién cambió qué y cuándo', 'Diff expandible con valores anterior y nuevo', 'Filtros por entidad, acción y usuario', 'Búsqueda libre en el historial', 'Exporta el audit trail para reportes'],
        en: ['Full log of who changed what and when', 'Expandable diff with before/after values', 'Filters by entity, action and user', 'Free-text search in history', 'Export audit trail for reporting'],
        pt: ['Registro completo de quem alterou o quê e quando', 'Diff expansível com valores anterior e novo', 'Filtros por entidade, ação e usuário', 'Busca livre no histórico', 'Exportar trilha de auditoria para relatórios'],
      },
      screen: () => `
        <div class="mscreen">
          <div class="ms-topbar"><span class="ms-dot r"></span><span class="ms-dot y"></span><span class="ms-dot g"></span><span class="ms-title">Audit Trail — Torre Central</span></div>
          <div class="ms-body">
            <div class="ms-section-title">Historial de cambios</div>
            ${[['piero@...','costs','CREATE','hace 2h','Nuevo costo $4,320','blue'],['ana@...','phases','UPDATE','hace 5h','Avance: 58% → 62%','teal'],['carlos@...','budget','UPDATE','ayer','Presup. $200k → $210k','amber'],['piero@...','users','INVITE','ayer','Invitó a maria@...','blue']].map(([u,e,a,t,d,col])=>`
            <div style="padding:8px;border-bottom:1px solid var(--border)">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <span style="font-size:10px;font-weight:700;color:var(--text)">${u}</span>
                <span style="font-size:9px;color:var(--text-faint)">${t}</span>
              </div>
              <div style="display:flex;align-items:center;gap:6px">
                <span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;background:${col==='blue'?'#dbeafe':col==='teal'?'#cffafe':'#fef3c7'};color:${col==='blue'?'#1e40af':col==='teal'?'#0891b2':'#d97706'}">${a}</span>
                <span style="font-size:9px;color:var(--text-muted);background:var(--bg-soft);padding:2px 6px;border-radius:4px">${e}</span>
                <span style="font-size:10px;color:var(--text-2)">${d}</span>
              </div>
            </div>`).join('')}
          </div>
        </div>`,
    },
    concrete: {
      kicker: { es:'Herramienta', en:'Tool', pt:'Ferramenta' },
      title:  { es:'Calculadora de concreto', en:'Concrete Calculator', pt:'Calculadora de concreto' },
      lead:   { es:'Herramienta independiente para calcular dosificaciones y mezclas de concreto por resistencia f\'c. Sin necesidad de crear un proyecto completo.', en:"Standalone tool to calculate concrete mix designs by target strength f'c. No need to set up a full project.", pt:"Ferramenta independente para calcular dosagens de concreto por resistência f'c. Sem precisar criar um projeto completo." },
      items:  {
        es: ['Cálculo por f\'c objetivo (2000, 2500, 3000, 4000 PSI)', 'Proporciones cemento : arena : grava : agua', 'Presets guardados y reutilizables', 'Resultado en m³, pie³ o en número de bolsas', 'Accesible desde el sidebar sin proyecto activo'],
        en: ["Calculation by target f'c (2000, 2500, 3000, 4000 PSI)", 'Proportions cement : sand : gravel : water', 'Saved and reusable presets', 'Results in m³, ft³ or number of bags', 'Accessible from sidebar without an active project'],
        pt: ["Cálculo por f'c alvo (2000, 2500, 3000, 4000 PSI)", 'Proporções cimento : areia : brita : água', 'Presets salvos e reutilizáveis', 'Resultado em m³, pé³ ou número de sacos', 'Acessível no menu lateral sem projeto ativo'],
      },
      screen: () => `
        <div class="mscreen">
          <div class="ms-topbar"><span class="ms-dot r"></span><span class="ms-dot y"></span><span class="ms-dot g"></span><span class="ms-title">Calculadora de concreto</span></div>
          <div class="ms-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
              <div><div style="font-size:9px;font-weight:700;color:var(--text-muted);margin-bottom:3px">Resistencia f'c</div><div style="border:1px solid var(--primary);border-radius:6px;padding:6px 10px;font-size:13px;font-weight:700;color:var(--primary)">3000 PSI</div></div>
              <div><div style="font-size:9px;font-weight:700;color:var(--text-muted);margin-bottom:3px">Volumen (m³)</div><div style="border:1px solid var(--border);border-radius:6px;padding:6px 10px;font-size:13px;font-weight:700">18.0</div></div>
            </div>
            <div class="ms-section-title">Dosificación</div>
            <div style="background:var(--bg-soft);border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:10px">
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center">
                ${[['Cemento','1'],['Arena','2.0'],['Grava','3.5'],['A/C','0.50']].map(([l,v])=>`<div><div style="font-size:9px;color:var(--text-muted);font-weight:600">${l}</div><div style="font-size:18px;font-weight:800;color:var(--primary)">${v}</div></div>`).join('')}
              </div>
            </div>
            <div class="ms-section-title">Resultado para 18 m³</div>
            ${[['Cemento','430 sacos (20kg)'],['Arena','17.8 m³'],['Grava','31.2 m³'],['Agua','3,870 L']].map(([l,v])=>`
            <div style="display:flex;justify-content:space-between;font-size:10px;padding:5px 0;border-bottom:1px solid var(--border)"><span style="color:var(--text-muted)">${l}</span><strong>${v}</strong></div>`).join('')}
          </div>
        </div>`,
    },
  };

  function getCurrentLang() { return localStorage.getItem('projexa.lang') || 'es'; }

  function openModal(featureKey) {
    const feat = FEATURES[featureKey];
    if (!feat) return;
    const lang = getCurrentLang();
    modalLeft.innerHTML = `
      <div class="ml-kicker">${feat.kicker[lang]}</div>
      <h2>${feat.title[lang]}</h2>
      <p class="ml-lead">${feat.lead[lang]}</p>
      <ul>${(feat.items[lang]||feat.items.es).map(i=>`<li><i class="fa-solid fa-check"></i>${i}</li>`).join('')}</ul>
      <div class="ml-cta">
        <a href="${APP_URL}" class="btn btn-cta btn-block" style="margin-top:auto">
          <i class="fa-solid fa-rocket"></i>
          ${{es:'Probar esta función',en:'Try this feature',pt:'Testar esta função'}[lang]}
        </a>
      </div>`;
    modalRight.innerHTML = feat.screen();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.feature-card').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.feature));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.feature); } });
  });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
