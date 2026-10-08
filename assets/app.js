(() => {
  "use strict";
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $("#app");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

  /* ---------- Modèle ---------- */
  const ROMAN = { I: 1, V: 5, X: 10 };
  const roman = (s) => [...s].reduce((acc, c, i, a) => { const v = ROMAN[c], n = ROMAN[a[i + 1]] || 0; return acc + (v < n ? -v : v); }, 0);
  function yearOf(d) {
    const neg = /av\. J\.-C\./.test(d);
    const rm = d.match(/^([IVX]+)e s\./);
    if (rm) { const y = (roman(rm[1]) - 1) * 100 + 50; return neg ? -y : y; }
    const nums = d.match(/\d+/g) || ["0"];
    const y = +(nums.find((n) => n.length >= 3) || nums[0]);
    return neg ? -y : y;
  }
  const parseRep = (s) => { const i = s.indexOf(" : "); return i < 0 ? null : { date: s.slice(0, i), evt: s.slice(i + 3), y: yearOf(s.slice(0, i)) }; };

  const reperes = [];
  const chapters = [];
  S.niveaux.forEach((nv) => {
    nv.total = 0;
    nv.parties.forEach((p, pi) => p.themes.forEach((th, ti) => {
      if (th.axes) th.chapitres = [...th.axes.map((a, i) => ({ t: a, kind: "Axe " + (i + 1) })), { t: th.conclusif, kind: "Objet de travail conclusif" }];
      const addReps = (list, ctx) => (list || []).forEach((s) => { const r = parseRep(s); if (r) reperes.push({ ...r, lvl: nv.id, couleur: nv.couleur, ctx, href: "#/niveau/" + nv.id }); });
      addReps(th.r, th.titre);
      th.chapitres.forEach((c, ci) => {
        c.id = [nv.id, pi, ti, ci].join(".");
        nv.total++;
        chapters.push({ c, nv, p, th, pi });
        addReps(c.r, c.t);
      });
    }));
  });
  const seen = new Set();
  const reps = reperes.filter((r) => { const k = r.date + r.evt; if (seen.has(k)) return false; seen.add(k); return true; }).sort((a, b) => a.y - b.y);

  const done = new Set(store.get("gaby.done", []));
  const saveDone = () => store.set("gaby.done", [...done]);
  const progressOf = (nv) => chapters.filter((x) => x.nv === nv && done.has(x.c.id)).length;

  /* ---------- Fragments ---------- */
  const tag = (nv) => `<span class="tag ${nv.couleur}" style="background:var(--lvl)">${esc(nv.court)}</span>`;
  const progressBar = (nv) => { const d = progressOf(nv), pct = Math.round((d / nv.total) * 100); return `<div class="progress"><i style="width:${pct}%"></i></div><p class="progress-txt" data-prog="${nv.id}">${d}/${nv.total} révisés · ${pct} %</p>`; };
  const countdown = () => `<div class="countdown" data-countdown aria-label="Compte à rebours avant les épreuves">${["jours", "heures", "min", "sec"].map((u) => `<div><b>–</b><span>${u}</span></div>`).join("")}</div>`;
  const feed = (items, empty) => items.length ? `<div class="feed">${items.map((a) => `<article class="feed__item"><div class="feed__date">${esc(fmtDate(a.date))}${a.niveau ? `<br><span class="muted">${esc(a.niveau)}</span>` : ""}</div><div><h3>${esc(a.titre)}</h3><p>${esc(a.texte || a.detail || "")}</p></div></article>`).join("")}</div>` : `<div class="empty">${empty}</div>`;
  const pageHead = (crumb, title, text, cls = "") => `<section class="page-head ${cls}"><div class="wrap fade-in"><p class="crumbs"><a href="#/">Accueil</a> / ${esc(crumb)}</p><h1>${title}</h1>${text ? `<p>${text}</p>` : ""}</div></section>`;
  const forumCta = (txt = "Une question sur un cours, un devoir, une méthode ? Le forum de la classe reste ouvert.") => `<div class="card" style="display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div><span class="label">// le forum</span><p style="margin:.4em 0 0">${txt}</p></div><a class="btn btn--accent" href="${S.forumUrl}" target="_blank" rel="noopener">Ouvrir le forum ↗</a></div>`;

  function heroBg() {
    let paths = "";
    for (let i = 0; i < 16; i++) {
      let d = "";
      for (let x = 0; x <= 1400; x += 70) {
        const y = 30 + i * 38 + Math.sin(x / 210 + i * 0.7) * 22 + Math.cos(x / 95 + i) * 6;
        d += (x ? " L" : "M") + x + " " + y.toFixed(1);
      }
      paths += `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${i % 4 === 0 ? 1.6 : 0.8}"/>`;
    }
    return `<div class="hero__bg" aria-hidden="true"><svg viewBox="0 0 1400 640" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="hf" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".15"/><stop offset=".55" stop-color="#fff" stop-opacity="1"/></linearGradient><mask id="hm"><rect width="1400" height="640" fill="url(#hf)"/></mask></defs><g mask="url(#hm)">${paths}</g></svg></div>`;
  }

  /* ---------- Vues ---------- */
  const views = {};

  views.home = () => {
    const [n2, n1, nt, ns] = S.niveaux;
    return `
    <section class="hero">${heroBg()}
      <div class="wrap fade-in">
        <p class="hero__kicker label">// Histoire · Géographie · HGGSP — de la 2nde à la Terminale</p>
        <h1>Au travail <em>avec</em> Gaby.</h1>
        <p class="hero__lead">Ici, on lit les documents, on contextualise, on cherche la problématique et… <span class="shout" id="shout">ON ARGUMENTE !</span> Voilà. Cours, méthodes, oraux et devoirs : tout est au même endroit.</p>
        <div class="hero__cta">
          <a class="btn btn--primary" href="#/methode">Les méthodes</a>
          <a class="btn btn--ghost" href="#/reperes">Quiz de repères</a>
          <a class="btn btn--ghost" href="#/oraux">Chrono Grand Oral</a>
        </div>
        <div class="hero__meta"><span><b>${S.niveaux.length}</b> programmes</span><span><b>${chapters.length}</b> chapitres et axes</span><span><b>${reps.length}</b> repères</span><span><b>${S.methodes.length}</b> méthodes</span></div>
        <div class="frise" aria-label="Le programme d’histoire sur la frise du temps">
          <div class="frise__bar">
            <a class="frise__seg c2" href="#/niveau/2nde"><b>Seconde</b><span>Antiquité → XVIIIe s.</span></a>
            <a class="frise__seg c1" href="#/niveau/1ere"><b>Première</b><span>1789 → 1918</span></a>
            <a class="frise__seg ct" href="#/niveau/tle"><b>Terminale</b><span>1929 → aujourd’hui</span></a>
          </div>
          <div class="frise__ticks"><span>Ve s. av. J.-C.</span><span>1789</span><span>1918</span><span>${new Date().getFullYear()}</span></div>
        </div>
      </div>
    </section>

    <section class="section"><div class="wrap">
      <div class="section__head"><div><span class="label">// votre classe</span><h2>Choisissez votre niveau</h2></div><p>Chaque chapitre se coche une fois révisé : la progression reste enregistrée sur votre appareil.</p></div>
      <div class="grid grid--4">${[n2, n1, nt, ns].map((nv) => `
        <a class="card card--lvl ${nv.couleur}" href="#/niveau/${nv.id}">${tag(nv)}<h3 style="margin-top:12px">${esc(nv.nom)}</h3><p>${esc(nv.accroche)}</p>${progressBar(nv)}</a>`).join("")}
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section__head"><div><span class="label">// boîte à outils</span><h2>De quoi travailler, vraiment</h2></div></div>
      <div class="grid grid--3">
        <a class="card" href="#/reperes"><span class="card__icon">🎯</span><h3>Quiz de repères</h3><p>${reps.length} dates du programme, des pièges bien placés. Battez votre record.</p></a>
        <a class="card" href="#/oraux"><span class="card__icon">⏱️</span><h3>Chrono Grand Oral</h3><p>Préparation, exposé, échange, orientation : entraînez-vous en conditions réelles.</p></a>
        <a class="card" href="#/methode"><span class="card__icon">🧭</span><h3>Méthodes pas à pas</h3><p>Composition, analyse de documents, croquis, dissertation, étude critique.</p></a>
        <a class="card" href="#/devoirs"><span class="card__icon">📒</span><h3>Devoirs &amp; annonces</h3><p>Le cahier de textes, toujours à jour, filtrable par classe.</p></a>
        <a class="card" href="#/bac"><span class="card__icon">🎓</span><h3>Objectif bac</h3><p>Épreuves, coefficients, compte à rebours et check-list de révision.</p></a>
        <button class="card search-open" type="button" style="text-align:left;cursor:pointer;font:inherit;color:inherit"><span class="card__icon">🔎</span><h3>Recherche instantanée</h3><p>Un chapitre, une notion, une date : <kbd>Ctrl K</kbd> depuis n’importe quelle page.</p></button>
      </div>
    </div></section>

    <section class="section"><div class="wrap split">
      <div><span class="label">// annonces</span><h2>Dernières nouvelles</h2>${feed(S.annonces.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3), "<b>Rien de neuf</b>Le calme avant la tempête.")}</div>
      <div><span class="label">// compte à rebours</span><h2>Le bac approche</h2><p class="muted">${esc(S.bac.label)}</p>${countdown()}<p style="margin-top:18px"><a class="btn btn--ghost btn--sm" href="#/bac">Tout savoir sur les épreuves →</a></p></div>
    </div></section>

    <section class="section"><div class="wrap prof">
      <div><span class="label">// le prof</span><h2>Qui est Gaby ?</h2>
        <p>Professeur d’histoire-géographie et d’HGGSP, de la Seconde à la Terminale. Ce site rassemble tout ce qu’il faut pour suivre ses cours : programmes, méthodes, préparation aux oraux et devoirs.</p>
        <p class="muted">Conseil d’ancien élève : restez attentifs. On ne sait jamais quand le prochain mot sera <span class="shout" data-mini>CRIÉ</span>.</p>
      </div>
      <div class="prof__card"><span class="label">// fiche signalétique</span>
        <dl><dt>Matières</dt><dd>Histoire-Géographie · HGGSP</dd><dt>Niveaux</dt><dd>2nde · 1ère · Terminale</dd><dt>Signe particulier</dt><dd>Hausse la voix sans prévenir. Ce n’est pas de la colère : c’est de la pédagogie.</dd><dt>Contact</dt><dd>Par le forum de la classe</dd></dl>
      </div>
    </div></section>

    <section class="section"><div class="wrap">${forumCta()}</div></section>`;
  };

  views.niveau = (id) => {
    const nv = S.niveaux.find((n) => n.id === id);
    if (!nv) return views.notfound();
    const tab = Math.min(+store.get("gaby.tab." + id, 0) || 0, nv.parties.length - 1);
    const theme = (th, ti) => {
      const ids = th.chapitres.map((c) => c.id), d = ids.filter((x) => done.has(x)).length;
      const chips = (n) => n && n.length ? `<p class="chap__lbl">Notions</p><ul class="chips">${n.map((x) => `<li class="chip">${esc(x)}</li>`).join("")}</ul>` : "";
      const repl = (r) => r && r.length ? `<p class="chap__lbl">Repères</p><ul class="reps">${r.map((s) => { const p = parseRep(s); return p ? `<li><b>${esc(p.date)}</b><span>${esc(p.evt)}</span></li>` : ""; }).join("")}</ul>` : "";
      return `<details class="theme" ${ti === 0 ? "open" : ""}>
        <summary><span class="theme__num">T${ti + 1}</span><span class="theme__title">${esc(th.titre)}</span><span class="theme__count" data-tc="${ids.join(",")}">${d}/${ids.length} <svg class="theme__chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></span></summary>
        <div class="theme__body">
          ${th.n || th.r ? `<div class="callout">${chips(th.n)}${repl(th.r)}</div>` : ""}
          ${th.france ? `<div class="callout"><b>Question spécifique sur la France</b>${esc(th.france)}</div>` : ""}
          ${th.chapitres.map((c, ci) => `<div class="chap"><div class="chap__top"><h4>${c.kind ? `<span class="chap__lbl" style="display:block;margin:0 0 4px">${esc(c.kind)}</span>` : `<span class="muted mono" style="font-size:.8rem">Ch. ${ci + 1} · </span>`}${esc(c.t)}</h4><label class="check"><input type="checkbox" data-done="${c.id}" ${done.has(c.id) ? "checked" : ""}> Révisé</label></div>${chips(c.n)}${repl(c.r)}</div>`).join("")}
        </div></details>`;
    };
    return `<div class="${nv.couleur}">
      ${pageHead(nv.nom, `${esc(nv.nom)} <span class="muted" style="font-weight:400;font-size:.45em;vertical-align:middle">${esc(nv.matiere)}</span>`, esc(nv.accroche))}
      <section class="section" style="padding-top:28px"><div class="wrap">
        <div style="max-width:420px">${progressBar(nv)}</div>
        <div class="tabs" role="tablist">${nv.parties.map((p, i) => `<button class="tab" role="tab" type="button" data-tab="${i}" aria-selected="${i === tab}">${esc(p.titre)}</button>`).join("")}<button class="tab" type="button" data-print style="margin-left:auto">Imprimer</button></div>
        ${nv.parties.map((p, i) => `<div data-panel="${i}" ${i === tab ? "" : "hidden"}><p class="part__sub">${esc(p.sous)}</p>${p.themes.map(theme).join("")}</div>`).join("")}
        <div class="grid grid--2" style="margin-top:28px">
          <a class="card" href="#/methode"><span class="label">// méthode</span><h3 style="margin-top:8px">Les méthodes pour ce niveau</h3><p>${nv.id === "hggsp" ? "Dissertation et étude critique de document(s)." : "Composition, analyse de documents, croquis."}</p></a>
          <a class="card" href="#/reperes?${nv.id}"><span class="label">// repères</span><h3 style="margin-top:8px">S’entraîner sur les dates</h3><p>Le quiz filtré sur le programme de ${esc(nv.nom)}.</p></a>
        </div>
        <div style="margin-top:16px">${forumCta()}</div>
      </div></section></div>`;
  };

  views.methode = () => `
    ${pageHead("Méthode", "Les méthodes, pas à pas", "Ce qu’on attend de vous à chaque exercice, dans l’ordre, avec les pièges à éviter.")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <ul class="chips" style="margin-bottom:24px">${S.methodes.map((m) => `<li><a class="chip" style="text-decoration:none" href="#/methode/${m.id}">${m.icone} ${esc(m.titre)}</a></li>`).join("")}</ul>
      <div class="grid grid--2">${S.methodes.map((m) => `
        <article class="card method" id="m-${m.id}">
          <div class="method__head"><span class="label">// ${esc(m.pour)}</span><span style="font-size:1.4rem">${m.icone}</span></div>
          <h3 style="margin-top:8px">${esc(m.titre)}</h3><p>${esc(m.resume)}</p>
          <ol class="steps">${m.etapes.map(([t, d]) => `<li><div><b>${esc(t)}</b><span>${esc(d)}</span></div></li>`).join("")}</ol>
          <p class="chap__lbl">Pièges classiques</p><ul class="pitfalls">${m.pieges.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        </article>`).join("")}
      </div>
      <div style="margin-top:24px">${forumCta("Un doute sur une méthode ? Posez la question sur le forum : si vous vous la posez, d’autres aussi.")}</div>
    </div></section>`;

  views.oraux = () => {
    const O = S.oral;
    return `
    ${pageHead("Oraux", "Oraux &amp; Grand Oral", "Le chrono officiel, la grille d’évaluation, des idées de questions et tout ce qu’il faut pour ne plus redouter la prise de parole.")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <div class="card"><span class="label">// chrono grand oral</span><h2 style="margin-top:8px">Entraînement en conditions réelles</h2>
        <div class="timer">
          <div class="ring"><svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" id="ringFg" cx="60" cy="60" r="52" stroke-dasharray="326.73" stroke-dashoffset="0"/></svg>
            <div class="ring__txt"><div class="ring__time" id="tTime">20:00</div><div class="ring__phase" id="tPhase">Préparation</div></div></div>
          <div>
            <ul class="phases" id="phases">${O.phases.map((p, i) => `<li data-phase="${i}"><b>${esc(p.nom)}</b><code>${p.min} min</code><small>${esc(p.note)}</small></li>`).join("")}</ul>
            <div class="ctrls"><button class="btn btn--primary" id="tStart" type="button">Démarrer</button><button class="btn btn--ghost" id="tNext" type="button">Phase suivante</button><button class="btn btn--ghost" id="tReset" type="button">Réinitialiser</button></div>
            <p class="tiny" style="margin-top:12px">Un signal sonore marque la fin de chaque phase. Cliquez sur une phase pour y aller directement.</p>
          </div>
        </div>
      </div>
      <div class="split" style="margin-top:20px">
        <div class="card"><span class="label">// grille d’évaluation</span><h3 style="margin-top:8px">Ce que le jury regarde</h3><ol class="steps">${O.criteres.map((c) => `<li><div><b>${esc(c)}</b></div></li>`).join("")}</ol></div>
        <div class="card"><span class="label">// conseils</span><h3 style="margin-top:8px">Pour être convaincant</h3><ul class="list">${O.conseils.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
      </div>
      <h2 style="margin-top:48px">Idées de questions en HGGSP</h2><p class="muted">Des pistes pour démarrer : à reformuler, préciser et s’approprier.</p>
      <div class="grid grid--4">${O.questions.map(([t, q]) => `<div class="card cs"><span class="tag" style="background:var(--lvl)">${esc(t)}</span><p style="margin:12px 0 0;font:600 1.05rem/1.4 var(--serif);color:var(--ink)">${esc(q)}</p></div>`).join("")}</div>
      <div class="card" style="margin-top:20px"><span class="label">// exposé en classe</span><h3 style="margin-top:8px">Réussir un exposé</h3><ul class="list">${O.expose.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
    </div></section>`;
  };

  views.reperes = (filter) => {
    const lv = S.niveaux.some((n) => n.id === filter) ? filter : "all";
    return `
    ${pageHead("Repères", "Les repères, en jeu", "Une date, quatre propositions, un seul bon choix. Les mauvaises réponses sont volontairement proches : pas de chance au hasard.")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <div class="quiz__filters" role="group" aria-label="Filtrer par niveau">
        <button class="tab" type="button" data-qf="all" aria-selected="${lv === "all"}" style="--lvl:var(--ink)">Tous</button>
        ${S.niveaux.map((n) => `<button class="tab ${n.couleur}" type="button" data-qf="${n.id}" aria-selected="${lv === n.id}">${esc(n.court)}</button>`).join("")}
      </div>
      <div class="card quiz" style="margin-top:20px">
        <span class="label" id="qCtx">// question</span>
        <p class="quiz__q" id="qQ">…</p>
        <div class="quiz__opts" id="qOpts"></div>
        <div class="quiz__score"><span>Score <b id="qScore">0</b></span><span>Série <b id="qStreak">0</b></span><span>Record <b id="qBest">${store.get("gaby.best", 0)}</b></span></div>
      </div>
      <h2 style="margin-top:56px">La frise complète</h2>
      <p class="muted" id="fCount"></p>
      <ul class="timeline-list" id="frise"></ul>
    </div></section>`;
  };

  views.devoirs = (filter) => {
    const today = new Date().toISOString().slice(0, 10);
    const list = S.devoirs.filter((d) => !filter || filter === "all" || norm(d.niveau) === norm(filter)).sort((a, b) => a.date.localeCompare(b.date));
    const upcoming = list.filter((d) => d.date >= today), past = list.filter((d) => d.date < today).reverse();
    const lvls = ["2nde", "1ère", "Tle", "HGGSP"];
    return `
    ${pageHead("Devoirs", "Devoirs &amp; annonces", "Le cahier de textes de la classe et les informations importantes.")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <div class="quiz__filters" style="justify-content:flex-start" role="group" aria-label="Filtrer par classe">
        <a class="tab" href="#/devoirs" aria-selected="${!filter || filter === "all"}" style="--lvl:var(--ink);text-decoration:none">Toutes les classes</a>
        ${lvls.map((l) => `<a class="tab" href="#/devoirs?${encodeURIComponent(l)}" aria-selected="${filter && norm(filter) === norm(l)}" style="--lvl:var(--ink);text-decoration:none">${l}</a>`).join("")}
      </div>
      <div class="split" style="margin-top:24px">
        <div><span class="label">// à faire</span><h2>Cahier de textes</h2>
          ${feed(upcoming, "<b>Aucun devoir à venir</b>Profitez-en pour faire un tour sur le quiz de repères. Juste un.")}
          ${past.length ? `<details style="margin-top:14px"><summary class="muted" style="cursor:pointer">Devoirs passés (${past.length})</summary><div style="margin-top:12px">${feed(past, "")}</div></details>` : ""}
        </div>
        <div><span class="label">// annonces</span><h2>Informations</h2>${feed(S.annonces.slice().sort((a, b) => b.date.localeCompare(a.date)), "<b>Aucune annonce</b>")}
          <div class="card" style="margin-top:16px"><span class="label">// rendre un travail</span><h3 style="margin-top:8px">Avant de rendre</h3><ul class="list"><li>Nom, prénom, classe et date en haut de la copie.</li><li>La consigne relue, et respectée.</li><li>Les sources citées (titre, auteur, date).</li><li>Une relecture pour l’orthographe et les dates.</li><li>Rendu à l’heure. Toujours.</li></ul></div>
        </div>
      </div>
      <div style="margin-top:24px">${forumCta()}</div>
    </div></section>`;
  };

  views.bac = () => `
    ${pageHead("Bac", "Objectif bac", "Comment vous êtes évalués, combien de temps il reste, et quoi faire d’ici là.")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <div class="card"><span class="label">// compte à rebours</span><h2 style="margin-top:8px">${esc(S.bac.label)}</h2>${countdown()}<p class="tiny" style="margin-top:12px">Les dates officielles sont publiées par le ministère de l’Éducation nationale : vérifiez-les sur education.gouv.fr.</p></div>
      <div class="grid grid--2" style="margin-top:20px">${S.bacInfos.map((b) => `<div class="card"><h3>${esc(b.titre)}</h3><p style="margin:0">${esc(b.texte)}</p></div>`).join("")}</div>
      <h2 style="margin-top:48px">La check-list de révision</h2><p class="muted">Cochez au fur et à mesure : c’est enregistré sur votre appareil.</p>
      <div class="grid grid--4">${S.checklist.map(([t, items], i) => `<div class="card"><span class="label">// ${esc(t)}</span><ul style="list-style:none;padding:0;margin:12px 0 0;display:grid;gap:10px">${items.map((it, j) => `<li><label class="check" style="white-space:normal;color:var(--ink-2);font-size:.92rem;align-items:flex-start"><input type="checkbox" data-done="bac.${i}.${j}" ${done.has(`bac.${i}.${j}`) ? "checked" : ""}> ${esc(it)}</label></li>`).join("")}</ul></div>`).join("")}</div>
      <div class="grid grid--2" style="margin-top:20px">
        <a class="card" href="#/oraux"><span class="label">// grand oral</span><h3 style="margin-top:8px">S’entraîner au Grand Oral</h3><p>Le chrono, la grille, les conseils.</p></a>
        <a class="card" href="#/methode/dissert"><span class="label">// HGGSP</span><h3 style="margin-top:8px">Dissertation &amp; étude critique</h3><p>Les deux exercices de l’épreuve écrite, pas à pas.</p></a>
      </div>
    </div></section>`;

  views.notfound = () => `
    <section class="section"><div class="wrap" style="text-align:center;max-width:640px">
      <p class="label">// erreur 404</p><h1>Ce ne sont pas les archives que vous recherchez.</h1>
      <p class="muted">Cette page n’existe pas, ou elle a été perdue quelque part entre 1789 et aujourd’hui.</p>
      <a class="btn btn--primary" href="#/">Retour à l’accueil</a>
    </div></section>`;

  /* ---------- Comportements par vue ---------- */
  let cleanup = [];
  const onLeave = (fn) => cleanup.push(fn);

  function bindLevel(id) {
    $$("[data-tab]").forEach((b) => b.addEventListener("click", () => {
      $$("[data-tab]").forEach((x) => x.setAttribute("aria-selected", x === b));
      $$("[data-panel]").forEach((p) => (p.hidden = p.dataset.panel !== b.dataset.tab));
      store.set("gaby.tab." + id, +b.dataset.tab);
    }));
    const pr = $("[data-print]");
    if (pr) pr.addEventListener("click", () => window.print());
  }

  function refreshProgress() {
    S.niveaux.forEach((nv) => {
      const d = progressOf(nv), pct = Math.round((d / nv.total) * 100);
      $$(`[data-prog="${nv.id}"]`).forEach((el) => { el.textContent = `${d}/${nv.total} révisés · ${pct} %`; el.previousElementSibling.firstElementChild.style.width = pct + "%"; });
    });
    $$("[data-tc]").forEach((el) => { const ids = el.dataset.tc.split(","); el.firstChild.textContent = `${ids.filter((x) => done.has(x)).length}/${ids.length} `; });
  }

  function bindTimer() {
    const P = S.oral.phases, C = 326.73;
    let i = 0, left = P[0].min * 60, running = false, end = 0, tid = 0;
    const el = { time: $("#tTime"), phase: $("#tPhase"), ring: $("#ringFg"), start: $("#tStart") };
    const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    function draw() {
      const total = P[i].min * 60;
      el.time.textContent = fmt(Math.max(0, Math.ceil(left)));
      el.phase.textContent = P[i].nom;
      el.ring.style.strokeDashoffset = String(C * (1 - left / total));
      el.ring.style.stroke = left <= 30 ? "var(--accent)" : "var(--c1)";
      $$("#phases li").forEach((li, k) => { li.classList.toggle("is-active", k === i); li.classList.toggle("is-done", k < i); });
      el.start.textContent = running ? "Pause" : left < total ? "Reprendre" : "Démarrer";
    }
    function beep() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [0, 0.22].forEach((t) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = 880; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.18, ctx.currentTime + t); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.18); o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.2); });
        setTimeout(() => ctx.close(), 800);
      } catch (e) {}
    }
    function go(k, autostart) {
      i = k; left = P[i].min * 60;
      if (autostart) { end = Date.now() + left * 1000; } else { running = false; }
      draw();
    }
    function tick() {
      if (!running) return;
      left = (end - Date.now()) / 1000;
      if (left <= 0) {
        beep();
        if (i < P.length - 1) go(i + 1, true);
        else { running = false; left = 0; draw(); toast("Fin de l’épreuve. Que la Force soit avec vous."); return; }
      }
      draw();
    }
    el.start.addEventListener("click", () => {
      if (running) { running = false; left = (end - Date.now()) / 1000; }
      else { if (left <= 0) go(0); running = true; end = Date.now() + left * 1000; }
      draw();
    });
    $("#tNext").addEventListener("click", () => go(Math.min(i + 1, P.length - 1), running));
    $("#tReset").addEventListener("click", () => { running = false; go(0); });
    $$("#phases li").forEach((li) => li.addEventListener("click", () => go(+li.dataset.phase, running)));
    tid = setInterval(tick, 250);
    onLeave(() => clearInterval(tid));
    draw();
  }

  function bindQuiz(initial) {
    let lv = S.niveaux.some((n) => n.id === initial) ? initial : "all";
    let score = 0, streak = 0, best = store.get("gaby.best", 0), lock = false, last = null, nt = 0;
    onLeave(() => clearTimeout(nt));
    const pool = () => reps.filter((r) => lv === "all" || r.lvl === lv);
    function renderFrise() {
      const list = pool();
      $("#fCount").textContent = `${list.length} repères, du plus ancien au plus récent.`;
      $("#frise").innerHTML = list.map((r) => { const nv = S.niveaux.find((n) => n.id === r.lvl); return `<li class="${r.couleur}"><b>${esc(r.date)}</b><span>${esc(r.evt)}</span>${tag(nv)}</li>`; }).join("");
    }
    function next() {
      const list = pool();
      if (list.length < 4 || !$("#qQ")) return;
      let q; do { q = pick(list); } while (list.length > 1 && q === last);
      last = q;
      const others = reps.filter((r) => r.date !== q.date && r.y !== q.y);
      const uniq = []; const seenD = new Set(), seenY = new Set();
      others.sort((a, b) => Math.abs(a.y - q.y) - Math.abs(b.y - q.y)).forEach((r) => { if (!seenD.has(r.date) && !seenY.has(r.y) && uniq.length < 8) { seenD.add(r.date); seenY.add(r.y); uniq.push(r.date); } });
      const opts = shuffle([q.date, ...shuffle(uniq).slice(0, 3)]);
      const nv = S.niveaux.find((n) => n.id === q.lvl);
      $("#qCtx").textContent = `// ${nv.court} · quelle date ?`;
      $("#qQ").textContent = q.evt.charAt(0).toUpperCase() + q.evt.slice(1);
      $("#qOpts").innerHTML = opts.map((o) => `<button class="quiz__opt" type="button">${esc(o)}</button>`).join("");
      $$("#qOpts button").forEach((b) => b.addEventListener("click", () => answer(b, q)));
      lock = false;
    }
    function answer(b, q) {
      if (lock) return; lock = true;
      const ok = b.textContent === q.date;
      $$("#qOpts button").forEach((x) => { x.disabled = true; if (x.textContent === q.date) x.classList.add("ok"); });
      if (ok) { score++; streak++; if (streak > best) { best = streak; store.set("gaby.best", best); } if (streak === 5) toast("Série de 5. Pas mal du tout."); if (streak === 10) toast("10 d’affilée. Great Scott !"); if (streak === 25) toast("25. Vous êtes une encyclopédie (celle de Diderot)."); }
      else { b.classList.add("ko"); streak = 0; }
      $("#qScore").textContent = score; $("#qStreak").textContent = streak; $("#qBest").textContent = best;
      nt = setTimeout(next, ok ? 750 : 1600);
    }
    $$("[data-qf]").forEach((b) => b.addEventListener("click", () => {
      lv = b.dataset.qf; $$("[data-qf]").forEach((x) => x.setAttribute("aria-selected", x === b));
      history.replaceState(null, "", lv === "all" ? "#/reperes" : "#/reperes?" + lv);
      renderFrise(); next();
    }));
    renderFrise(); next();
  }

  /* ---------- Compte à rebours ---------- */
  function tickCountdown() {
    const els = $$("[data-countdown]");
    if (!els.length) return;
    let s = Math.max(0, Math.floor((new Date(S.bac.date) - Date.now()) / 1000));
    const v = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
    els.forEach((el) => $$("b", el).forEach((b, k) => (b.textContent = String(v[k]).padStart(k ? 2 : 1, "0"))));
  }
  setInterval(tickCountdown, 1000);

  /* ---------- Le cri ---------- */
  const calm = () => store.get("gaby.calm", false);
  function shoutWord(el) {
    if (!el) return;
    el.classList.remove("is-on"); void el.offsetWidth; el.classList.add("is-on");
    setTimeout(() => el.classList.remove("is-on"), 950);
  }
  function heroShout() {
    const el = $("#shout");
    if (!el) return;
    let t = setTimeout(function loop() {
      if (!document.hidden && !calm()) { el.textContent = pick(["ON ARGUMENTE !", ...S.cris]); shoutWord(el); }
      t = setTimeout(loop, 5500 + Math.random() * 5000);
    }, 1400);
    onLeave(() => clearTimeout(t));
    $$("[data-mini]").forEach((m) => m.addEventListener("mouseenter", () => shoutWord(m)));
  }
  function cri(word) {
    const box = $("#cri");
    $("#criTxt").textContent = word || pick(S.cris);
    box.hidden = false;
    if (!reduced) { document.body.classList.remove("shake"); void document.body.offsetWidth; document.body.classList.add("shake"); }
    setTimeout(() => { box.hidden = true; document.body.classList.remove("shake"); toast("Pardon. C’était juste pour vérifier que vous suiviez. On reprend."); }, 1100);
  }
  (function scheduleCri() {
    let fired = false;
    try { fired = sessionStorage.getItem("gaby.cri") === "1"; } catch (e) {}
    if (fired) return;
    setTimeout(function tryCri() {
      if (calm() || !$("#palette").hidden) return;
      if (document.hidden) { setTimeout(tryCri, 5000); return; }
      try { sessionStorage.setItem("gaby.cri", "1"); } catch (e) {}
      cri();
    }, 45000 + Math.random() * 60000);
  })();

  /* ---------- Toast ---------- */
  let toastT = 0;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    t.style.animation = "none"; void t.offsetWidth; t.style.animation = "";
    clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 3600);
  }

  /* ---------- Recherche (Ctrl K) ---------- */
  const index = [
    ...S.niveaux.map((nv) => ({ type: nv.court, cls: nv.couleur, label: nv.nom + " — " + nv.matiere, sub: nv.accroche, href: "#/niveau/" + nv.id })),
    ...chapters.map(({ c, nv, p, th }) => ({ type: nv.court, cls: nv.couleur, label: c.t, sub: `${p.titre} · ${th.titre}`, extra: [...(c.n || []), ...(th.n || [])].join(" "), href: "#/niveau/" + nv.id })),
    ...S.methodes.map((m) => ({ type: "Méthode", cls: "", label: m.titre, sub: m.resume, href: "#/methode/" + m.id })),
    ...reps.map((r) => ({ type: "Repère", cls: r.couleur, label: `${r.date} — ${r.evt}`, sub: r.ctx, href: "#/reperes?" + r.lvl })),
    { type: "Page", label: "Chrono Grand Oral", sub: "Oraux, grille d’évaluation, idées de questions", href: "#/oraux" },
    { type: "Page", label: "Devoirs & annonces", sub: "Cahier de textes", href: "#/devoirs" },
    { type: "Page", label: "Objectif bac", sub: "Épreuves, compte à rebours, check-list", href: "#/bac" },
    { type: "Lien", label: "Le forum de la classe", sub: S.forumUrl, href: S.forumUrl, ext: true }
  ].map((x) => ({ ...x, hay: norm([x.label, x.sub, x.extra, x.type].join(" ")) }));

  const pal = $("#palette"), palIn = $("#paletteInput"), palList = $("#paletteList");
  let palSel = 0, palRes = [];
  function palRender() {
    const q = norm(palIn.value.trim()), toks = q.split(/\s+/).filter(Boolean);
    palRes = (toks.length ? index.filter((x) => toks.every((t) => x.hay.includes(t))).sort((a, b) => (norm(b.label).includes(toks[0]) - norm(a.label).includes(toks[0]))) : index.filter((x) => x.type === "Page" || x.type === "Lien" || S.niveaux.some((n) => n.court === x.type && x.label.startsWith(n.nom + " —")))).slice(0, 30);
    palSel = 0;
    palList.innerHTML = palRes.length ? palRes.map((x, k) => `<li role="option" aria-selected="${k === 0}"><a href="${esc(x.href)}" ${x.ext ? 'target="_blank" rel="noopener"' : ""}><span class="tag ${x.cls || ""}" style="background:${x.cls ? "var(--lvl)" : "var(--ink)"}">${esc(x.type)}</span><span>${esc(x.label)}</span><small>${esc(x.sub || "")}</small></a></li>`).join("") : `<li class="palette__empty">Rien trouvé. Même dans les archives.</li>`;
  }
  function palMove(d) {
    const items = $$("li[role=option]", palList); if (!items.length) return;
    palSel = (palSel + d + items.length) % items.length;
    items.forEach((li, k) => li.setAttribute("aria-selected", k === palSel));
    items[palSel].scrollIntoView({ block: "nearest" });
  }
  function palOpen() { pal.hidden = false; palIn.value = ""; palRender(); setTimeout(() => palIn.focus(), 10); }
  function palClose() { pal.hidden = true; }
  palIn.addEventListener("input", palRender);
  palIn.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); palMove(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); palMove(-1); }
    else if (e.key === "Enter") { const a = $$("li[role=option] a", palList)[palSel]; if (a) { a.click(); palClose(); } }
  });
  pal.addEventListener("click", (e) => { if (e.target === pal || e.target.closest("a")) palClose(); });

  /* ---------- Clavier global ---------- */
  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let kpos = 0;
  document.addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? palOpen() : palClose(); return; }
    if (e.key === "Escape" && !pal.hidden) { palClose(); return; }
    if (e.key === "/" && !typing && pal.hidden) { e.preventDefault(); palOpen(); return; }
    kpos = e.key === konami[kpos] || e.key.toLowerCase() === konami[kpos] ? kpos + 1 : e.key === konami[0] ? 1 : 0;
    if (kpos === konami.length) { kpos = 0; document.body.classList.toggle("mode-88"); toast(document.body.classList.contains("mode-88") ? "Great Scott ! Mode 88 mph activé." : "Retour en " + new Date().getFullYear() + "."); }
  });

  /* ---------- Routeur ---------- */
  const titles = { home: "", niveau: "", methode: "Méthode", oraux: "Oraux & Grand Oral", reperes: "Repères", devoirs: "Devoirs", bac: "Objectif bac", notfound: "Page introuvable" };
  function route() {
    cleanup.forEach((f) => f()); cleanup = [];
    const raw = location.hash.replace(/^#\/?/, "");
    const [path, query] = raw.split("?");
    const [name, arg] = path.split("/");
    const view = name === "" ? "home" : views[name] && name !== "notfound" ? name : "notfound";
    app.innerHTML = view === "niveau" ? views.niveau(arg) : view === "reperes" ? views.reperes(query) : view === "devoirs" ? views.devoirs(query && decodeURIComponent(query)) : views[view]();
    const nv = view === "niveau" && S.niveaux.find((n) => n.id === arg);
    document.title = (nv ? nv.nom : titles[view]) ? `${nv ? nv.nom : titles[view]} — Au travail avec Gaby` : "Au travail avec Gaby — Histoire-Géo & HGGSP";
    $$(".nav a").forEach((a) => { const h = a.getAttribute("href"); a.toggleAttribute("aria-current", h === "#/" + name || (nv && h === "#/niveau/" + arg)); if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page"); });
    $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false");

    if (view === "home") heroShout();
    if (view === "niveau" && nv) bindLevel(arg);
    if (view === "oraux") bindTimer();
    if (view === "reperes") bindQuiz(query);
    $$(".search-open", app).forEach((b) => b.addEventListener("click", palOpen));
    tickCountdown();

    if (view === "methode" && arg && $("#m-" + arg)) { $("#m-" + arg).scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); }
    else { window.scrollTo(0, 0); }
    app.focus({ preventScroll: true });
  }

  app.addEventListener("change", (e) => {
    const id = e.target.dataset && e.target.dataset.done;
    if (!id) return;
    e.target.checked ? done.add(id) : done.delete(id);
    saveDone(); refreshProgress();
    if (e.target.checked && !id.startsWith("bac") && Math.random() < 0.12) toast("Révisé ? Vraiment ? Bon. Je vous fais confiance.");
  });

  /* ---------- Chrome global ---------- */
  $("#themeBtn").addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("gaby.theme", next); } catch (e) {}
  });
  $("#menuBtn").addEventListener("click", () => { const o = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", o); });
  $$(".topbar .search-open").forEach((b) => b.addEventListener("click", palOpen));
  $("#criBtn").addEventListener("click", () => cri());
  const calmT = $("#calmToggle"); calmT.checked = calm();
  calmT.addEventListener("change", () => { store.set("gaby.calm", calmT.checked); toast(calmT.checked ? "Mode calme. (Il ne tiendra pas longtemps.)" : "Mode normal. Vous êtes prévenus."); });
  $(".skip").addEventListener("click", (e) => { e.preventDefault(); app.focus(); });
  const [qt, qa] = pick(S.citations); $("#quote").textContent = `« ${qt} » — ${qa}`;
  window.addEventListener("beforeprint", () => $$("details.theme").forEach((d) => (d.open = true)));
  window.addEventListener("hashchange", route);
  route();

  console.log("%cAu travail avec Gaby", "font:700 22px Georgia;color:#d63a2a", "\nVous ouvrez la console ? Respect. Maintenant, retournez réviser vos repères.");
})();
