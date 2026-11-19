/* Ilustrações SVG animadas (as "cenas" de motion graphics) e diagramas das questões */
(function () {
  const sky = `<rect width="400" height="220" fill="var(--sky)"/>`;

  // Perfil de um rio: montanha → planície com meandro → mar com delta
  function riverProfile(markers) {
    const m = (n, x, y) => markers ? `<g class="marker"><circle cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${y + 4}">${n}</text></g>` : "";
    const lbl = (x, y, t) => markers ? "" : `<text class="lbl" x="${x}" y="${y}">${t}</text>`;
    return `<svg viewBox="0 0 400 220" role="img" aria-label="Perfil de um rio da nascente à foz">
      ${sky}
      <path d="M0 150 L0 60 L35 20 L70 55 L95 35 L140 95 L230 120 L320 140 L330 150 Z" fill="#8b6b4a"/>
      <path d="M0 120 L50 95 L110 100 L140 95 L230 120 L320 140 L400 150 L400 220 L0 220 Z" fill="#65a30d"/>
      <path d="M28 28 L35 20 L44 30 Z M88 42 L95 35 L102 44 Z" fill="#fff"/>
      <rect x="320" y="146" width="80" height="74" fill="#38bdf8"/>
      <path class="flow" d="M40 40 C60 70, 80 70, 100 95 S 150 110, 170 135 C 190 160, 230 120, 250 150 S 290 175, 320 165" fill="none" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round"/>
      <path class="flow" d="M318 165 L345 150 M318 165 L350 168 M318 165 L342 186" stroke="#0ea5e9" stroke-width="5" stroke-linecap="round" fill="none"/>
      <ellipse cx="338" cy="160" rx="7" ry="4" fill="#4d7c0f"/><ellipse cx="337" cy="177" rx="7" ry="4" fill="#4d7c0f"/>
      <g fill="#166534"><circle cx="120" cy="125" r="7"/><circle cx="200" cy="170" r="8"/><circle cx="280" cy="140" r="7"/><circle cx="60" cy="110" r="6"/></g>
      <line x1="10" y1="205" x2="120" y2="205" class="bracket"/><line x1="135" y1="205" x2="255" y2="205" class="bracket"/><line x1="270" y1="205" x2="390" y2="205" class="bracket"/>
      ${lbl(40, 16, "Nascente")}${lbl(205, 115, "Meandro")}${lbl(345, 140, "Foz em delta")}
      ${lbl(65, 198, "Curso superior")}${lbl(195, 198, "Curso médio")}${lbl(330, 198, "Curso inferior")}
      ${m(1, 40, 40)}${m(2, 212, 140)}${m(3, 352, 160)}${m(4, 65, 192)}${m(5, 195, 192)}${m(6, 330, 192)}
    </svg>`;
  }

  // Bacia hidrográfica vista de cima
  function basin(markers) {
    const m = (n, x, y) => markers ? `<g class="marker"><circle cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${y + 4}">${n}</text></g>` : "";
    const lbl = (x, y, t) => markers ? "" : `<text class="lbl" x="${x}" y="${y}">${t}</text>`;
    return `<svg viewBox="0 0 400 220" role="img" aria-label="Esquema de bacia hidrográfica">
      <rect width="400" height="220" fill="var(--sky)"/>
      <path d="M60 180 C30 120, 50 50, 120 35 C180 15, 260 20, 310 45 C360 70, 365 140, 330 182 Z" fill="#a3e635" stroke="#dc2626" stroke-width="3" stroke-dasharray="8 6" class="dash"/>
      <rect x="0" y="182" width="400" height="38" fill="#38bdf8"/>
      <g fill="none" stroke="#0284c7" stroke-linecap="round" class="flow">
        <path d="M200 50 C205 90, 190 130, 200 185" stroke-width="8"/>
        <path d="M110 95 C140 105, 170 115, 196 130" stroke-width="4"/>
        <path d="M300 80 C270 100, 240 110, 204 120" stroke-width="4"/>
        <path d="M90 140 C130 150, 170 158, 198 160" stroke-width="3"/>
        <path d="M150 70 C150 85, 140 95, 135 100" stroke-width="2"/>
        <path d="M290 140 C260 150, 230 155, 202 155" stroke-width="3"/>
      </g>
      <circle cx="200" cy="50" r="5" fill="#fff" stroke="#0284c7" stroke-width="2"/>
      ${lbl(210, 45, "Nascente")}${lbl(85, 88, "Afluente")}${lbl(240, 175, "Rio principal")}${lbl(200, 207, "Foz")}${lbl(330, 30, "Divisores de água")}
      ${m(1, 200, 32)}${m(2, 110, 82)}${m(3, 220, 140)}${m(4, 200, 205)}${m(5, 335, 75)}
    </svg>`;
  }

  const S = {
    waves: `<svg viewBox="0 0 400 220">${sky}
      <g class="wind"><path d="M20 50 h60 M30 70 h80 M15 90 h50" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/></g>
      <g class="wave-move"><path d="M-400 140 q25 -25 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 V220 H-400Z" fill="#0ea5e9"/></g>
      <g class="wave-move slow"><path d="M-400 160 q25 -15 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 V220 H-400Z" fill="#0369a1"/></g>
      <text class="lbl" x="70" y="30">vento 💨</text></svg>`,

    tide: `<svg viewBox="0 0 400 220"><rect width="400" height="220" fill="#0f172a"/>
      <g class="orbit" style="transform-origin:200px 110px"><circle cx="350" cy="110" r="14" fill="#e5e7eb"/></g>
      <ellipse class="bulge" cx="200" cy="110" rx="78" ry="62" fill="#38bdf8" opacity=".55"/>
      <circle cx="200" cy="110" r="55" fill="#22c55e"/><circle cx="200" cy="110" r="55" fill="#0ea5e9" opacity=".35"/>
      <text class="lbl light" x="200" y="200">A Lua atrai a água: maré alta ⬆️ e maré baixa ⬇️</text></svg>`,

    glacial: `<svg viewBox="0 0 400 220">${sky}
      <text class="lbl" x="200" y="24">Área (milhões de km²)</text>
      <rect class="grow" x="60" y="40" width="300" height="50" rx="8" fill="#0ea5e9" style="--w:300px"/>
      <text class="lbl light" x="80" y="71" text-anchor="start">Glacial Antártico · 20,3</text>
      <rect class="grow d2" x="60" y="120" width="192" height="50" rx="8" fill="#93c5fd" style="--w:192px"/>
      <text class="lbl" x="80" y="151" text-anchor="start">Glacial Ártico · 13</text>
      <text class="lbl" x="200" y="205">Antártico &gt; Ártico ✅</text></svg>`,

    cycle: `<svg viewBox="0 0 400 220">${sky}
      <circle cx="50" cy="40" r="22" fill="#facc15" class="pulse"/>
      <g class="cloud"><ellipse cx="250" cy="45" rx="55" ry="22" fill="#cbd5e1"/><ellipse cx="220" cy="38" rx="30" ry="20" fill="#e2e8f0"/></g>
      <path d="M0 170 Q100 150 200 165 T400 160 V220 H0Z" fill="#65a30d"/>
      <path d="M0 175 Q60 165 120 178 V220 H0Z" fill="#0ea5e9"/>
      <g fill="#166534"><circle cx="160" cy="150" r="12"/><circle cx="180" cy="145" r="14"/></g>
      <g class="vapor"><path d="M50 160 q-6 -10 0 -20 t0 -20" stroke="#bae6fd" stroke-width="4" fill="none"/><path d="M80 160 q-6 -10 0 -20 t0 -20" stroke="#bae6fd" stroke-width="4" fill="none"/><path d="M170 130 q-6 -10 0 -20 t0 -20" stroke="#bbf7d0" stroke-width="4" fill="none"/></g>
      <g class="rain"><line x1="230" y1="70" x2="226" y2="82"/><line x1="250" y1="75" x2="246" y2="87"/><line x1="270" y1="70" x2="266" y2="82"/><line x1="290" y1="72" x2="286" y2="84"/></g>
      <path d="M300 172 Q330 190 300 210" stroke="#0369a1" stroke-width="3" stroke-dasharray="5 5" fill="none" class="dash"/>
      <text class="lbl" x="65" y="110">evaporação</text><text class="lbl" x="175" y="100">transpiração</text>
      <text class="lbl" x="300" y="22">condensação</text><text class="lbl" x="330" y="110">precipitação</text>
      <text class="lbl" x="350" y="205">infiltração</text></svg>`,

    estuary: `<svg viewBox="0 0 400 220"><rect width="400" height="220" fill="#65a30d"/>
      <rect x="0" y="160" width="400" height="60" fill="#0ea5e9"/>
      <path class="flow" d="M200 0 C190 60, 210 110, 200 165" stroke="#0ea5e9" stroke-width="22" fill="none"/>
      <path d="M170 165 L200 125 L230 165 Z" fill="#0ea5e9"/>
      <text class="lbl light" x="200" y="200">Estuário = 1 canal único</text></svg>`,

    delta: `<svg viewBox="0 0 400 220"><rect width="400" height="220" fill="#65a30d"/>
      <rect x="0" y="175" width="400" height="45" fill="#0ea5e9"/>
      <path class="flow" d="M200 0 C195 40, 205 70, 200 100" stroke="#0ea5e9" stroke-width="16" fill="none"/>
      <g class="flow" stroke="#0ea5e9" stroke-width="8" fill="none" stroke-linecap="round">
        <path d="M200 100 C170 130, 130 150, 110 178"/><path d="M200 100 C190 140, 175 160, 165 178"/>
        <path d="M200 100 C210 140, 225 160, 235 178"/><path d="M200 100 C230 130, 270 150, 290 178"/></g>
      <g fill="#4d7c0f" class="pop-in"><ellipse cx="140" cy="165" rx="14" ry="7"/><ellipse cx="200" cy="160" rx="18" ry="8"/><ellipse cx="262" cy="165" rx="14" ry="7"/></g>
      <text class="lbl light" x="200" y="205">Delta = vários canais + ilhas</text></svg>`,

    aquifer: `<svg viewBox="0 0 400 220">${sky}
      <rect y="40" width="400" height="40" fill="#a16207"/><rect y="80" width="400" height="80" fill="#fde68a"/>
      <g fill="#fbbf24">${Array.from({ length: 40 }, (_, i) => `<circle cx="${10 + (i % 20) * 20}" cy="${95 + Math.floor(i / 20) * 35}" r="5"/>`).join("")}</g>
      <rect class="fill-up" y="80" width="400" height="80" fill="#38bdf8" opacity=".5"/>
      <rect y="160" width="400" height="60" fill="#475569"/>
      <g class="rain"><line x1="100" y1="5" x2="96" y2="30"/><line x1="200" y1="0" x2="196" y2="25"/><line x1="300" y1="5" x2="296" y2="30"/></g>
      <text class="lbl light" x="200" y="64">solo</text><text class="lbl" x="200" y="125">arenito poroso = aquífero 💧</text>
      <text class="lbl light" x="200" y="195">rocha impermeável (basalto)</text></svg>`,

    gallon: `<svg viewBox="0 0 400 220">${sky}
      <rect x="120" y="30" width="110" height="170" rx="16" fill="#e0f2fe" stroke="#0369a1" stroke-width="3"/>
      <rect class="fill-up" x="123" y="37" width="104" height="160" rx="12" fill="#1e3a8a"/>
      <rect x="155" y="16" width="40" height="16" rx="4" fill="#38bdf8" class="lift"/>
      <text class="lbl light" x="175" y="125">97,5%</text><text class="lbl light" x="175" y="142">salgada</text>
      <text class="lbl" x="300" y="25">2,5% doce 💧</text>
      <path d="M200 22 Q250 10 268 22" stroke="#0369a1" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
      <text class="lbl" x="310" y="90">🧊 geleiras</text><text class="lbl" x="310" y="120">🟫 subsolo</text><text class="lbl" x="310" y="150">🏞️ rios e lagos</text></svg>`,

    dam: `<svg viewBox="0 0 400 220">${sky}
      <path d="M0 70 H150 V220 H0Z" fill="#0ea5e9"/>
      <path d="M150 50 L190 50 L215 220 L150 220Z" fill="#94a3b8"/>
      <path class="flow" d="M150 120 L230 190" stroke="#facc15" stroke-width="10" fill="none"/>
      <g transform="translate(240 190)"><g class="spin"><rect x="-18" y="-3" width="36" height="6" fill="#334155"/><rect x="-3" y="-18" width="6" height="36" fill="#334155"/></g></g>
      <rect x="265" y="140" width="50" height="35" rx="5" fill="#475569"/><text x="290" y="163" class="lbl light">gerador</text>
      <text x="290" y="125" class="spark">⚡</text>
      <path d="M315 150 L360 90 L395 90" stroke="#1e293b" stroke-width="2" fill="none"/>
      <text class="lbl light" x="70" y="100">reservatório</text><text class="lbl" x="170" y="40">barragem</text><text class="lbl" x="240" y="215">turbina</text></svg>`,

    lock: `<svg viewBox="0 0 400 220">${sky}
      <rect x="0" y="140" width="130" height="80" fill="#0ea5e9"/>
      <rect x="270" y="80" width="130" height="140" fill="#0ea5e9"/>
      <rect x="130" y="60" width="140" height="160" fill="#cbd5e1"/>
      <rect class="lock-water" x="134" y="140" width="132" height="80" fill="#38bdf8"/>
      <rect x="128" y="60" width="6" height="160" fill="#334155"/><rect x="266" y="60" width="6" height="160" fill="#334155"/>
      <g class="lock-boat"><path d="M175 0 h50 l-8 14 h-34 Z" fill="#b45309"/><rect x="190" y="-14" width="18" height="14" fill="#fff"/></g>
      <text class="lbl" x="65" y="130">nível baixo</text><text class="lbl" x="335" y="70">nível alto</text><text class="lbl" x="200" y="50">câmara da eclusa</text></svg>`
  };

  window.SCENES = {
    get(key) {
      if (key === "riverProfile") return riverProfile(false);
      if (key === "basin") return basin(false);
      return S[key] || "";
    },
    diagram(key) {
      return key === "river" ? riverProfile(true) : basin(true);
    }
  };
})();
