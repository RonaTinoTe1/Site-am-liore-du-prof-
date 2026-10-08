(() => {
  "use strict";
  const S = window.SITE, A = window.ATAG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $("#app");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PLANETS = ["#6af2c5", "#ccff79", "#ff6600", "#ffc57a", "#00e5ff", "#f01880"];

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  const nf = (n) => n.toLocaleString("fr-FR");
  const ext = (href, label, cls = "") => `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`;
  const planet = (c, lg) => `<span class="planet${lg ? " planet--lg" : ""}" style="--p:${c}" aria-hidden="true"></span>`;
  const words = (s) => String(s).split(/\s+/).filter(Boolean).length;
  const age = new Date().getFullYear() - 2007;

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

  // EMC (programmes 2024-2026 publiés sur le forum) ajoutée aux niveaux du tronc commun.
  S.niveaux.forEach((nv) => {
    const e = A.emc[nv.id];
    if (e && !nv.parties.some((p) => p.titre === "EMC")) nv.parties.push({ titre: "EMC", sous: e.sous, url: e.url, themes: [{ titre: e.sous, axes: e.axes, emc: true }] });
  });

  const reperes = [], chapters = [];
  S.niveaux.forEach((nv) => {
    nv.total = 0;
    nv.parties.forEach((p, pi) => p.themes.forEach((th, ti) => {
      if (th.axes && !th.chapitres) th.chapitres = [...th.axes.map((a, i) => ({ t: a, kind: "Axe " + (i + 1) })), ...(th.conclusif ? [{ t: th.conclusif, kind: "Objet de travail conclusif" }] : [])];
      const addReps = (list, ctx) => (list || []).forEach((s) => { const r = parseRep(s); if (r) reperes.push({ ...r, lvl: nv.id, couleur: nv.couleur, ctx }); });
      addReps(th.r, th.titre);
      th.chapitres.forEach((c, ci) => { c.id = [nv.id, pi, ti, ci].join("."); nv.total++; chapters.push({ c, nv, p, th }); addReps(c.r, c.t); });
    }));
  });
  const seen = new Set();
  const reps = reperes.filter((r) => { const k = r.date + r.evt; if (seen.has(k)) return false; seen.add(k); return true; }).sort((a, b) => a.y - b.y);

  const done = new Set(store.get("gaby.done", []));
  const saveDone = () => store.set("gaby.done", [...done]);
  const progressOf = (nv) => chapters.filter((x) => x.nv === nv && done.has(x.c.id)).length;

  /* ---------- Fragments ---------- */
  const tag = (nv) => `<span class="tag ${nv.couleur}">${esc(nv.court)}</span>`;
  const progressBar = (nv) => { const d = progressOf(nv), pct = Math.round((d / nv.total) * 100); return `<div class="progress"><i style="width:${pct}%"></i></div><p class="progress-txt" data-prog="${nv.id}">${d}/${nv.total} révisés · ${pct} %</p>`; };
  const countdown = () => `<div class="countdown" data-countdown aria-label="Compte à rebours avant les épreuves">${["jours", "heures", "min", "sec"].map((u) => `<div><b>–</b><span>${u}</span></div>`).join("")}</div>`;
  const pageHead = (crumb, title, text, cls = "") => `<section class="page-head ${cls}"><div class="wrap fade-in"><p class="crumbs"><a href="#/">Accueil</a> / ${esc(crumb)}</p><h1>${title}</h1>${text ? `<p>${text}</p>` : ""}</div></section>`;
  const quoteCard = (c) => `<a class="quote-card" href="${esc(c.url)}" target="_blank" rel="noopener" title="Pourquoi le orange ? Parce que c'est celle que je préfère."><q>${esc(c.q)}</q><small>Gaby, sur le forum ↗</small></a>`;
  const forumCta = (txt) => `<div class="card" style="display:flex;gap:18px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div style="max-width:680px"><span class="label">// le forum</span><p style="margin:.5em 0 0">${txt || "Le forum reste l’espace de travail : questions, devoirs, corrections, cahiers de textes. Beaucoup de lieux y sont réservés aux membres. C’est ainsi."}</p></div>${ext(A.F, "Entrer dans le forum ↗", "btn btn--primary")}</div>`;
  const linkList = (items, locked = true) => `<ul class="links">${items.map(([l, u, s]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener"><span class="${locked ? "lock" : "ext"}">${esc(l)}</span>${s ? `<small>${esc(s)}</small>` : ""}</a></li>`).join("")}</ul>`;

  /* ---------- Arbres (hommage à la bannière du forum) ---------- */
  function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function trees() {
    const W = 900, H = 640, levels = [];
    const grow = (r, x, y, ang, len, d, max) => {
      if (d > max || len < 3) return;
      const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
      (levels[d] = levels[d] || []).push(`M${x.toFixed(1)} ${y.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
      const n = d < 2 ? 2 : r() < 0.25 ? 3 : 2;
      for (let i = 0; i < n; i++) {
        const spread = 0.28 + r() * 0.32, a = ang + (i - (n - 1) / 2) * spread * 1.6 + (r() - 0.5) * 0.25;
        grow(r, x2, y2, a, len * (0.68 + r() * 0.12), d + 1, max);
      }
    };
    [[560, 0.36, 7], [760, 0.3, 21], [380, 0.24, 42], [880, 0.22, 77]].forEach(([x, k, seed]) => grow(rng(seed), x, H, -Math.PI / 2 + (rng(seed + 1)() - 0.5) * 0.15, H * k, 0, 9));
    const paths = levels.map((segs, d) => `<path class="${d < 2 ? "trunk" : "branch"}" d="${segs.join("")}" stroke-width="${Math.max(0.6, 7 * Math.pow(0.68, d)).toFixed(2)}" style="opacity:${d < 2 ? 0.9 : (0.95 - d * 0.07).toFixed(2)};${reduced ? "" : `animation:fadeIn .7s ease ${0.15 * d}s both`}"/>`).join("");
    return `<div class="hero__trees" aria-hidden="true"><svg class="tree" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMaxYMax slice">${paths}</svg></div>`;
  }

  /* ---------- Vues ---------- */
  const views = {};

  views.home = () => {
    const actives = A.classes.flatMap((c) => c.items.filter((i) => !i.veille && !i.mystere).map((i) => ({ ...i, cat: c.cat })));
    return `
    <section class="hero">${trees()}
      <div class="wrap fade-in">
        <p class="hero__kicker"><span class="badge badge--live">Année 2026-2027 en cours</span><span class="label">// ATAG 3.0</span></p>
        <h1><span>AU TRAVAIL</span><span>AVEC <em>GABY</em></span></h1>
        <p class="hero__slogan">Support d'aide et travaux avec élèves.</p>
        <p class="hero__lead">Un forum d'enseignement de l'Histoire-Géographie qui, depuis le 18‑01‑07, constitue un complément des cours. Bref, leçon numéro un : prendre le temps de lire et <span class="shout" id="shout">RÉFLÉCHIR !</span></p>
        <div class="hero__cta">
          ${ext(A.F, "Entrer dans le forum ↗", "btn btn--primary")}
          <a class="btn btn--ghost" href="#/classes">Mon espace de classe</a>
          <a class="btn btn--ghost" href="#/esprit/code-civil">Le code civil</a>
        </div>
        <p class="devise">${planet("#6af2c5")} ${esc(A.devise)}</p>
      </div>
    </section>

    <section class="section"><div class="wrap">
      <div class="section__head"><div><span class="label">// le lieu en chiffres</span><h2>${age} ans de travail, sans interruption</h2></div><p>Un lieu vivant : chaque été, les comptes des élèves sont supprimés et la « bibliothèque d'Alexandrie » désherbée. Ce qui reste, c'est ça.</p></div>
      <div class="stats">
        <div class="stat"><b data-count="${age}">${age}</b><span>années scolaires</span><small>depuis le 18-01-07</small></div>
        ${A.stats.map((s) => `<div class="stat"><b data-count="${s.n}" data-plus="${s.plus ? 1 : 0}">${nf(s.n)}${s.plus ? "+" : ""}</b><span>${esc(s.l)}</span>${s.s ? `<small>${esc(s.s)}</small>` : ""}</div>`).join("")}
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section__head"><div><span class="label">// atag-map</span><h2>Comprendre, aider, travailler</h2></div></div>
      <p class="prof-says" style="max-width:820px">${esc(A.portail.intro)}</p>
      <div class="grid grid--3" style="margin-top:22px">${A.portail.blocs.map((b, i) => `
        <div class="card">${planet(PLANETS[i], true)}<h3 style="margin-top:14px">${esc(b.titre)}</h3><p>${esc(b.texte)}</p><ul class="chips">${b.liens.map(([l, h]) => `<li><a class="chip" href="${h}">${esc(l)}</a></li>`).join("")}</ul></div>`).join("")}
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section__head"><div><span class="label">// travailler</span><h2>Les espaces de classe ouverts cette année</h2></div><a class="btn btn--ghost btn--sm" href="#/classes">Tous les espaces →</a></div>
      <div class="grid grid--3">${actives.map((c) => `
        <div class="card space">${c.cat ? `<span class="label" style="color:var(--muted)">${esc(c.cat)}</span>` : ""}<h3>${planet(c.couleur)} ${esc(c.nom)}</h3><p class="space__desc">${esc(c.desc)}</p>${c.liens[0] ? linkList([c.liens[0]]) : ""}</div>`).join("")}
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section__head"><div><span class="label">// boîte à outils</span><h2>En accès libre, sur tous les écrans</h2></div><p>Le complément public du forum : rien ne remplace la classe, mais tout ceci aide.</p></div>
      <div class="grid grid--3">
        <a class="card" href="#/textes"><span class="card__icon">📚</span><h3>Programmes lisibles</h3><p>2nde, 1ère, Tle, HGGSP et la nouvelle EMC : thèmes, notions, repères. Chaque chapitre se coche une fois révisé.</p></a>
        <a class="card" href="#/methode"><span class="card__icon">🧭</span><h3>Méthodes pas à pas</h3><p>Composition, analyse de documents, croquis, dissertation, étude critique.</p></a>
        <a class="card" href="#/reperes"><span class="card__icon">🎯</span><h3>Quiz de repères</h3><p>${reps.length} dates du programme, des pièges bien placés. Bats ton record.</p></a>
        <a class="card" href="#/oraux"><span class="card__icon">⏱️</span><h3>Chrono Grand oral</h3><p>20 + 10 + 10 minutes, le format en vigueur depuis la session 2024.</p></a>
        <a class="card" href="#/bac"><span class="card__icon">🎓</span><h3>Objectif bac</h3><p>Épreuves, thèmes HGGSP de la session 2027, compte à rebours, check-list.</p></a>
        <button class="card search-open" type="button" style="text-align:left;cursor:pointer;font:inherit"><span class="card__icon">🔎</span><h3>Recherche instantanée</h3><p>Une règle, une classe, un chapitre, une date : <kbd>Ctrl K</kbd> depuis n'importe quelle page.</p></button>
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section__head"><div><span class="label" style="color:var(--prof-ink)">// en orange, comme il se doit</span><h2>Paroles de Gaby</h2></div><p>L'orange est la couleur de correction du prof. Ici aussi, elle lui est réservée.</p></div>
      <div class="grid grid--3">${shuffle(A.citations).slice(0, 6).map(quoteCard).join("")}</div>
      <p class="meditate" style="margin-top:18px">À méditer.</p>
    </div></section>

    <section class="section"><div class="wrap split">
      <div><span class="label">// derniers sujets publics</span><h2>Sur le forum</h2><div class="feed">${A.derniers.map((d) => `<a class="feed__item" href="${esc(d.url)}" target="_blank" rel="noopener"><span class="feed__date">${esc(fmtDate(d.date))}</span><b>${esc(d.titre)}</b></a>`).join("")}</div></div>
      <div><span class="label">// compte à rebours</span><h2>Le bac approche</h2><p class="muted">${esc(S.bac.label)}</p>${countdown()}<p style="margin-top:18px"><a class="btn btn--ghost btn--sm" href="#/bac">Tout savoir sur les épreuves →</a></p></div>
    </div></section>

    <section class="section"><div class="wrap">${forumCta()}</div></section>`;
  };

  views.esprit = () => {
    const B = A.buts, C = A.codeCivil, L = A.loi, M = A.moyens, E = A.evaluation, P = A.pub, K = A.maintenance;
    const butsWords = words([B.intro, ...B.dedicace, ...B.liste, ...B.nest.flat()].join(" "));
    const subs = [["buts", "Buts pédagogiques"], ["moyens", "Moyens"], ["code-civil", "Code civil"], ["loi", "La loi"], ["evaluation", "L'évaluation"], ["publicite", "Sans publicité"], ["maintenance", "Maintenance"]];
    return `
    ${pageHead("La lettre et l'esprit", "La lettre <em style=\"color:var(--link);font-weight:500\">et</em> l'esprit", "Le règlement général, le code civil, quelques préceptes à suivre, des infos sur la maintenance, certaines de ses méthodes… Lieu de la gestion et de l'explicitation, en somme.")}
    <nav class="subnav" aria-label="Sections"><div class="wrap"><ul class="chips">${subs.map(([id, l]) => `<li><a class="chip" href="#/esprit/${id}">${l}</a></li>`).join("")}</ul></div></nav>

    <section class="section anchor" id="e-buts"><div class="wrap split">
      <div class="prose"><span class="label">// buts pédagogiques</span><h2>Ce que ce lieu espère</h2><p class="readtime">${butsWords} mots · ${Math.max(1, Math.round(butsWords / 220))} min de lecture (logorrhée assumée)</p>
        <p class="dedicace">${B.dedicace.map(esc).join("<br>")}</p>
        <p>${esc(B.intro)}</p>
        <ul>${B.liste.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <p>${ext(B.url, "Le texte intégral sur le forum ↗")}</p>
      </div>
      <div><span class="label">// ce lieu doit être compris pour ce qu'il est</span><div class="grid" style="margin-top:14px">${B.nest.map(([t, d]) => `<div class="card"><h3>${esc(t)}</h3><p style="margin:0">${esc(d)}</p></div>`).join("")}</div></div>
    </div></section>

    <section class="section anchor" id="e-moyens"><div class="wrap">
      <span class="label">// moyens</span><h2>Comment ça marche</h2>
      <div class="grid grid--4" style="margin-top:18px">${M.points.map(([t, d], i) => `<div class="card">${planet(PLANETS[i])}<h3 style="margin-top:12px">${esc(t)}</h3><p style="margin:0">${esc(d)}</p></div>`).join("")}</div>
      <p class="tiny" style="margin-top:14px">Dernière actualisation le 26-07-26, « pour rafraîchissement mais le noyau de l'esprit de 2007 perdure ». ${ext(M.url, "Sur le forum ↗")}</p>
    </div></section>

    <section class="section anchor" id="e-code-civil"><div class="wrap">
      <div class="section__head"><div><span class="label">// code civil</span><h2>Les 11 règles du lieu</h2></div><p>Indispensables pour ne pas avoir de surprises en plein travail. Nul n'est censé ignorer la loi. Dernière modification le ${C.maj}.</p></div>
      <div class="rules">${C.regles.map(([t, d, o], i) => `<article class="rule${o ? " rule--orange" : ""}"${o ? ' title="Ici, je corrige en orange."' : ""}><span class="rule__n">Règle ${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join("")}</div>
      <p style="margin-top:16px">${ext(C.url, "Le code civil sur le forum ↗")}</p>
    </div></section>

    <section class="section anchor" id="e-loi"><div class="wrap split">
      <div><span class="label">// rappel de la loi que tu as acceptée</span><h2>Le serment de rentrée</h2>
        <p class="muted">Les règles générales de Forumactif, et trois commentaires du prof :</p>
        <ol class="steps">${L.points.map((p) => `<li><div><span style="font-size:1rem;color:var(--ink-2)">${esc(p)}</span></div></li>`).join("")}</ol>
        <div class="callout"><b>Ajout du 27-01-07</b>${esc(L.ajout)}</div>
      </div>
      <div style="display:grid;align-content:center;gap:18px">
        <p class="prof-says" style="font-size:clamp(1.3rem,2.6vw,1.8rem);line-height:1.3">Bienvenue sur le net où les écrits restent et où chaque mot compte. Cela fait partie de l'exercice que de le comprendre.</p>
        <p>${ext(L.url, "Accepter la loi 2026-2027 sur le forum ↗", "btn btn--primary")}</p>
        <p class="tiny">Réponds à la suite du message : la forme du serment est celle que tu veux, mais tu dois t'engager.</p>
      </div>
    </div></section>

    <section class="section anchor" id="e-evaluation"><div class="wrap">
      <div class="section__head"><div><span class="label">// l'évaluation</span><h2>Le barème, expliqué</h2></div><p>Principes rédigés en novembre 2014, à la demande de l'inspection. Clair, expliqué en amont puis en aval : il est intégré.</p></div>
      <div class="card">
        <div class="scale" role="img" aria-label="Paliers significatifs : 7, 10, 12, 14, 16, et jusqu'à 18-19">${E.paliers.map(([n, d]) => `<span class="scale__mark" style="left:${(n / 20) * 100}%" title="${esc(d)}" tabindex="0"><b>${n === 19 ? "18-19" : n}</b></span>`).join("")}</div>
        <div class="scale__ticks"><span>0</span><span>5</span><span>10</span><span>15</span><span>20</span></div>
        <div class="grid grid--3" style="margin-top:22px">${E.paliers.filter(([n]) => n !== 14 && n !== 16).map(([n, d]) => `<div><b class="mono" style="color:var(--link);font-size:1.2rem">${n === 19 ? "18-19" : n}</b><p style="margin:4px 0 0">${esc(d)}</p></div>`).join("")}<div><b class="mono" style="color:var(--link);font-size:1.2rem">14 · 16</b><p style="margin:4px 0 0">Les autres barrières significatives.</p></div></div>
      </div>
      <div class="split" style="margin-top:16px">
        <div class="card"><h3>Les règles du jeu</h3><ul class="list">${E.regles.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>
        <div class="card"><h3>Refaire un devoir</h3><p>La note sous la moyenne compte double, le devoir refait compte simple. L'élève a travaillé, progressé. C'est le but.</p>
          <div class="calc"><label>Première note (coef 2)<input id="n1" type="number" min="0" max="20" step="0.5" value="8"></label><label>Devoir refait (coef 1)<input id="n2" type="number" min="0" max="20" step="0.5" value="14"></label><div><span class="tiny">Moyenne</span><br><output id="nres">10</output></div></div>
          <p class="tiny" id="nmsg" style="margin-top:8px">8 puis 14 : opération blanche, mais du progrès.</p></div>
      </div>
      <p class="prof-says" style="margin-top:22px">Un jeune ne se réduit pas, redisons-le, à une ligne de statistiques. On est dans l'humain.</p>
      <p>${ext(E.url, "Le texte complet sur le forum ↗")}</p>
    </div></section>

    <section class="section anchor" id="e-publicite"><div class="wrap split">
      <div><span class="label">// pas de publicité sur ce forum</span><h2>Pourquoi ? (et comment)</h2><p>${esc(P.texte)}</p><p class="prof-says">Je m'en retourne à la gestion du lieu !</p><p>${ext(P.url, "Le sujet sur le forum ↗")}</p></div>
      <div class="card"><h3>Le prix de la tranquillité</h3><ul class="links">${P.etapes.map(([y, c]) => `<li><span style="display:flex;justify-content:space-between;padding:9px 10px;border-bottom:1px dashed var(--line)"><b class="mono">${y}</b><span>${esc(c)}</span></span></li>`).join("")}</ul><p class="tiny" style="margin:12px 0 0">Payé par le prof depuis janvier 2008, en toute transparence. Ce site ne contient, lui non plus, ni publicité ni traceur.</p></div>
    </div></section>

    <section class="section anchor" id="e-maintenance"><div class="wrap">
      <span class="label">// maintenance de fin d'année scolaire</span><h2>Le grand ménage de juin</h2>
      <div class="term" style="margin-top:16px"><b>${esc(K.titre)}</b> — travaux réalisés :<ul>${K.travaux.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><br>→ Maintenance achevée.</div>
      <p class="tiny" style="margin-top:12px">${ext(K.url, "Le journal complet sur le forum ↗")}</p>
    </div></section>`;
  };

  views.histoire = () => `
    ${pageHead(`${age} ans`, `${age} ans d'ATAG`, "Depuis 2008, un rapport d'activités clôt chaque année scolaire. Extraits, du premier au dernier, en version courte. (Le prof, lui, ne fait jamais court : c'est prévisible.)")}
    <section class="section" style="padding-top:36px"><div class="wrap">
      <div class="chips" style="margin-bottom:28px"><span class="chip">ATAG 1.0 · 2007</span><span class="chip">ATAG 2.0 · 2013</span><span class="chip" style="border-color:var(--link);color:var(--link)">ATAG 3.0 · 2026</span></div>
      <div class="years">${A.histoire.map(([y, t, d, q], i) => `
        <div class="year${i === A.histoire.length - 1 ? " year--now" : ""}"><span class="year__y">${y}</span><span class="year__dot">${planet(PLANETS[i % PLANETS.length])}</span>
          <div><h3>${esc(t)}</h3><p>${esc(d)}</p>${q ? `<p class="prof-says">${esc(q)}</p>` : ""}</div></div>`).join("")}
      </div>
      <p style="margin-top:28px">${ext(A.rapports, "Lire tous les rapports d'activités sur le forum ↗", "btn btn--primary")}</p>
    </div></section>`;

  views.classes = () => `
    ${pageHead("Classes", "Les espaces de classe", "Un espace par classe sur le forum, avec son cahier de textes tenu à jour. Les forums « en veille » attendent leur prochaine promotion.")}
    <section class="section" style="padding-top:20px"><div class="wrap">
      <p class="tiny">🔒 = réservé aux membres : connecte-toi sur le forum avec ton identifiant (millésime-prénom-rang).</p>
      ${A.classes.map((c, ci) => `
        <div class="catbar">${planet(PLANETS[ci])} ${esc(c.cat)}</div>
        <div class="catbody"><div class="grid grid--2">${c.items.map((it) => {
          const nv = it.prog && S.niveaux.find((n) => n.id === it.prog);
          return `<div class="card space">
            <div class="space__top"><h3>${it.mystere ? "❓" : planet(it.couleur)} ${esc(it.nom)}</h3>${it.mystere ? `<span class="badge">mystère</span>` : it.veille ? `<span class="badge">en veille</span>` : `<span class="badge badge--live">2026-2027</span>`}</div>
            <p class="space__desc">${esc(it.desc)}</p>
            ${it.liens.length ? linkList(it.liens) : ""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">${ext(it.forum, "Ouvrir l'espace ↗", "btn btn--ghost btn--sm")}${nv ? `<a class="btn btn--ghost btn--sm" href="#/niveau/${nv.id}">Programme lisible</a>` : ""}</div>
          </div>`; }).join("")}</div></div>`).join("")}
      <div style="margin-top:28px">${forumCta("L'élève peut à tout moment poser des questions par message privé ou dans l'espace réservé à sa classe. Réponse dès que possible.")}</div>
    </div></section>`;

  views.aides = () => `
    ${pageHead("Aides", "Les aides", "La banque de données, l'assistance technique et éthique, l'ouverture culturelle. Les ressources du forum sont réservées aux membres ; les outils de ce site sont en accès libre.")}
    <nav class="subnav" aria-label="Sections"><div class="wrap"><ul class="chips">${A.aides.map((a) => `<li><a class="chip" href="#/aides/${a.id}">${esc(a.titre)}</a></li>`).join("")}<li><a class="chip" href="#/methode">Méthodes (accès libre)</a></li></ul></div></nav>
    ${A.aides.map((a) => `
    <section class="section anchor" id="a-${a.id}"><div class="wrap split">
      <div>${planet(a.planete, true)}<h2 style="margin-top:14px">${esc(a.titre)}</h2><p class="muted">${esc(a.desc)}</p>${a.id === "banque" ? `<div class="callout" style="margin-top:16px"><b>Le fameux dictionnaire !!!</b>Plus de 1100 définitions, en accès direct : A-M, N-Y et Z.</div>` : ""}</div>
      <div class="card">${linkList(a.items)}</div>
    </div></section>`).join("")}
    <section class="section"><div class="wrap">
      <span class="label">// en accès libre ici</span><h2>Sans se connecter</h2>
      <div class="grid grid--3" style="margin-top:18px">
        <a class="card" href="#/methode"><span class="card__icon">🧭</span><h3>Méthodes pas à pas</h3><p>Les étapes et les pièges de chaque exercice.</p></a>
        <a class="card" href="#/reperes"><span class="card__icon">🎯</span><h3>Quiz de repères</h3><p>Pour s'auto-tester, et la frise complète.</p></a>
        <a class="card" href="#/textes"><span class="card__icon">📚</span><h3>Programmes lisibles</h3><p>Avec notions et repères par chapitre.</p></a>
      </div>
    </div></section>`;

  views.textes = () => {
    const T = A.textes;
    return `
    ${pageHead("Programmes", "Textes officiels, <em style=\"color:var(--link);font-weight:500\">sous cosmétique ATAG</em>", "Les programmes et les définitions d'épreuves, publiés sur le forum. Et, ici, une version lisible de chaque programme : sommaire, notions, repères, suivi des révisions.")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <span class="label">// programmes lisibles</span><h2>Choisis ton niveau</h2>
      <div class="grid grid--4" style="margin-top:18px">${S.niveaux.map((nv) => `<a class="card card--lvl ${nv.couleur}" href="#/niveau/${nv.id}">${tag(nv)}<h3 style="margin-top:12px">${esc(nv.nom)}</h3><p>${esc(nv.accroche)}</p>${progressBar(nv)}</a>`).join("")}</div>
    </div></section>
    <section class="section"><div class="wrap split">
      <div><span class="label">// sur le forum (accès public)</span><h2>Les textes en vigueur</h2><div class="card" style="margin-top:14px"><ul class="links">${T.actuels.map(([l, s, k, lv]) => `<li><a href="${esc(A.F + s)}" target="_blank" rel="noopener"><span class="ext">${esc(l)}</span><small>${esc(k)}${lv ? " · " + esc(S.niveaux.find((n) => n.id === lv).court) : ""}</small></a></li>`).join("")}</ul></div></div>
      <div><span class="label">// pour mémoire</span><h2>Archives</h2><p class="muted">Textes obsolètes, laissés en ligne « pour mémoire ».</p><details class="card"><summary style="cursor:pointer;font-weight:600">${T.archives.length} textes archivés</summary><div style="margin-top:12px">${linkList(T.archives.map(([l, s]) => [l, A.F + s, "obsolète"]), false)}</div></details>
        <div class="callout" style="margin-top:18px"><b>Bac 2027 · HGGSP</b>Années impaires : thèmes 2, 4, 5 et 6 à l'écrit. <a href="#/bac">Le détail des épreuves →</a></div></div>
    </div></section>`;
  };

  views.niveau = (id) => {
    const nv = S.niveaux.find((n) => n.id === id);
    if (!nv) return views.notfound();
    const tab = Math.min(+store.get("gaby.tab." + id, 0) || 0, nv.parties.length - 1);
    const offi = A.textes.actuels.filter((x) => x[3] === id);
    const chips = (n) => n && n.length ? `<p class="chap__lbl">Notions</p><ul class="chips">${n.map((x) => `<li class="chip">${esc(x)}</li>`).join("")}</ul>` : "";
    const repl = (r) => r && r.length ? `<p class="chap__lbl">Repères</p><ul class="reps">${r.map((s) => { const p = parseRep(s); return p ? `<li><b>${esc(p.date)}</b><span>${esc(p.evt)}</span></li>` : ""; }).join("")}</ul>` : "";
    const theme = (th, ti, pi, p) => {
      const ids = th.chapitres.map((c) => c.id), d = ids.filter((x) => done.has(x)).length;
      const bac = nv.id === "hggsp" && pi === 1 && [1, 3, 4, 5].includes(ti);
      return `<details class="theme" ${ti === 0 ? "open" : ""}>
        <summary><span class="theme__num">${th.emc ? "EMC" : "T" + (ti + 1)}</span><span class="theme__title">${esc(th.titre)}${bac ? `<span class="badge badge--bac">bac 2027</span>` : ""}</span><span class="theme__count" data-tc="${ids.join(",")}">${d}/${ids.length} <svg class="theme__chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></span></summary>
        <div class="theme__body">
          ${th.n || th.r ? `<div class="callout">${chips(th.n)}${repl(th.r)}</div>` : ""}
          ${th.france ? `<div class="callout"><b>Question spécifique sur la France</b>${esc(th.france)}</div>` : ""}
          ${th.chapitres.map((c, ci) => `<div class="chap"><div class="chap__top"><h4>${c.kind ? `<span class="chap__lbl" style="display:block;margin:0 0 4px">${esc(c.kind)}</span>` : `<span class="muted mono" style="font-size:.8rem">Ch. ${ci + 1} · </span>`}${esc(c.t)}</h4><label class="check"><input type="checkbox" data-done="${c.id}" ${done.has(c.id) ? "checked" : ""}> Révisé</label></div>${chips(c.n)}${repl(c.r)}</div>`).join("")}
          ${p.url ? `<p class="tiny" style="margin:4px 0 0">${ext(p.url, "Le programme officiel complet, sur le forum ↗")}</p>` : ""}
        </div></details>`;
    };
    return `<div class="${nv.couleur}">
      ${pageHead(nv.nom, `${esc(nv.nom)} <span class="muted" style="font-weight:400;font-size:.42em;vertical-align:middle">${esc(nv.matiere)}${A.emc[nv.id] ? " · EMC" : ""}</span>`, esc(nv.accroche))}
      <section class="section" style="padding-top:28px"><div class="wrap">
        <div style="max-width:420px">${progressBar(nv)}</div>
        <div class="tabs" role="tablist">${nv.parties.map((p, i) => `<button class="tab" role="tab" type="button" data-tab="${i}" aria-selected="${i === tab}">${esc(p.titre)}</button>`).join("")}<button class="tab" type="button" data-print style="margin-left:auto">Imprimer</button></div>
        ${nv.parties.map((p, i) => `<div data-panel="${i}" ${i === tab ? "" : "hidden"}><p class="part__sub">${esc(p.sous)}</p>${p.themes.map((th, ti) => theme(th, ti, i, p)).join("")}</div>`).join("")}
        <div class="grid grid--2" style="margin-top:28px">
          <div class="card"><span class="label">// textes officiels</span><h3 style="margin-top:8px">Sous cosmétique ATAG</h3>${linkList(offi.map(([l, s]) => [l, A.F + s, "forum"]), false)}</div>
          <a class="card" href="#/reperes?${nv.id}"><span class="label">// repères</span><h3 style="margin-top:8px">S'entraîner sur les dates</h3><p>Le quiz filtré sur le programme de ${esc(nv.nom)}.</p></a>
        </div>
        <div style="margin-top:16px">${forumCta()}</div>
      </div></section></div>`;
  };

  views.methode = () => `
    ${pageHead("Méthode", "Les méthodes, pas à pas", "Ce qu'on attend de toi à chaque exercice, dans l'ordre, avec les pièges à éviter. Les fiches détaillées du prof sont dans la banque de données du forum.")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <ul class="chips" style="margin-bottom:24px">${S.methodes.map((m) => `<li><a class="chip" href="#/methode/${m.id}">${m.icone} ${esc(m.titre)}</a></li>`).join("")}</ul>
      <div class="grid grid--2">${S.methodes.map((m) => `
        <article class="card method" id="m-${m.id}">
          <div class="method__head"><span class="label">// ${esc(m.pour)}</span><span style="font-size:1.4rem">${m.icone}</span></div>
          <h3 style="margin-top:8px">${esc(m.titre)}</h3><p>${esc(m.resume)}</p>
          <ol class="steps">${m.etapes.map(([t, d]) => `<li><div><b>${esc(t)}</b><span>${esc(d)}</span></div></li>`).join("")}</ol>
          <p class="chap__lbl">Pièges classiques</p><ul class="pitfalls">${m.pieges.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        </article>`).join("")}
      </div>
      <div class="card" style="margin-top:20px"><span class="label">// les fiches du prof (forum, membres)</span><h3 style="margin-top:8px">Pour aller plus loin</h3>${linkList(A.aides[0].items.slice(0, 4))}</div>
    </div></section>`;

  views.oraux = () => {
    const O = S.oral;
    return `
    ${pageHead("Grand oral", "Oraux &amp; Grand oral", "Le format en vigueur depuis la session 2024, un chrono pour s'entraîner, la grille du jury et des pistes de questions.")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <p class="prof-says">Lire la suite devient dès lors urgentissime pour tout élève suivant cette spécialité. — ${ext(A.F + "t3091-definition-de-l-epreuve-dite-du-grand-oral", "la définition officielle, sur le forum ↗")}</p>
      <div class="card" style="margin-top:18px"><span class="label">// chrono grand oral</span><h2 style="margin-top:8px">Entraînement en conditions réelles</h2>
        <div class="timer">
          <div class="ring"><svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" id="ringFg" cx="60" cy="60" r="52" stroke-dasharray="326.73" stroke-dashoffset="0"/></svg>
            <div class="ring__txt"><div class="ring__time" id="tTime">20:00</div><div class="ring__phase" id="tPhase">Préparation</div></div></div>
          <div>
            <ul class="phases" id="phases">${O.phases.map((p, i) => `<li data-phase="${i}"><b>${esc(p.nom)}</b><code>${p.min} min</code><small>${esc(p.note)}</small></li>`).join("")}</ul>
            <div class="ctrls"><button class="btn btn--primary" id="tStart" type="button">Démarrer</button><button class="btn btn--ghost" id="tNext" type="button">Phase suivante</button><button class="btn btn--ghost" id="tReset" type="button">Réinitialiser</button></div>
            <p class="tiny" style="margin-top:12px">Un signal sonore marque la fin de chaque phase. Clique sur une phase pour y aller directement.</p>
          </div>
        </div>
      </div>
      <div class="split" style="margin-top:20px">
        <div class="card"><span class="label">// grille d'évaluation</span><h3 style="margin-top:8px">Ce que le jury regarde</h3><ol class="steps">${O.criteres.map((c) => `<li><div><b>${esc(c)}</b></div></li>`).join("")}</ol></div>
        <div class="card"><span class="label">// conseils</span><h3 style="margin-top:8px">Pour être convaincant</h3><ul class="list">${O.conseils.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
      </div>
      <h2 style="margin-top:48px">Pistes de questions en HGGSP</h2><p class="muted">Des pistes pour démarrer : à reformuler, préciser et s'approprier avec tes professeurs.</p>
      <div class="grid grid--4">${O.questions.map(([t, q]) => `<div class="card cs"><span class="tag">${esc(t)}</span><p style="margin:12px 0 0;font:600 1.05rem/1.4 var(--serif);color:var(--ink)">${esc(q)}</p></div>`).join("")}</div>
      <div class="split" style="margin-top:20px">
        <div class="card"><span class="label">// exposé en classe</span><h3 style="margin-top:8px">Réussir un exposé</h3><ul class="list">${O.expose.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
        <div class="card"><span class="label">// emc · seconde</span><h3 style="margin-top:8px">Le premier oral d'EMC</h3><p>Consignes et guide pour le premier oral, dans l'espace de la classe.</p>${linkList([["EMC 2de : consignes et guide pour le premier oral", A.F + "t3999-emc-2de-consignes-et-guide-pour-le-premier-oral"]])}</div>
      </div>
    </div></section>`;
  };

  views.reperes = (filter) => {
    const lv = S.niveaux.some((n) => n.id === filter) ? filter : "all";
    return `
    ${pageHead("Repères", "Les repères, en jeu", "Une date, quatre propositions, un seul bon choix. Les mauvaises réponses sont volontairement proches : pas de chance au hasard.")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <div class="quiz__filters" role="group" aria-label="Filtrer par niveau">
        <button class="tab" type="button" data-qf="all" aria-selected="${lv === "all"}">Tous</button>
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

  views.bac = () => `
    ${pageHead("Bac", "Objectif bac", "Comment tu es évalué, combien de temps il reste, et quoi faire d'ici là. Les textes officiels sont mis en ligne tôt : « je suis très en avance ».")}
    <section class="section" style="padding-top:28px"><div class="wrap">
      <div class="card"><span class="label">// compte à rebours</span><h2 style="margin-top:8px">${esc(S.bac.label)}</h2>${countdown()}<p class="tiny" style="margin-top:12px">Les dates officielles sont publiées par le ministère de l'Éducation nationale : vérifie-les sur education.gouv.fr.</p></div>
      <div class="grid grid--2" style="margin-top:20px">${S.bacInfos.map((b) => `<div class="card"><h3>${esc(b.titre)}</h3><p style="margin:0">${esc(b.texte)}</p></div>`).join("")}</div>
      <div class="card" style="margin-top:16px"><span class="label">// sources, sous cosmétique ATAG</span>${linkList([["Définition des épreuves de la spécialité HGGSP (Tale)", A.F + "t3090-definition-des-epreuves-de-la-specialite-hggsp-tale", "forum"], ["Définition de l'épreuve dite du grand oral", A.F + "t3091-definition-de-l-epreuve-dite-du-grand-oral", "forum"]], false)}</div>
      <h2 style="margin-top:48px">La check-list de révision</h2><p class="muted">Coche au fur et à mesure : c'est enregistré sur ton appareil.</p>
      <div class="grid grid--4">${S.checklist.map(([t, items], i) => `<div class="card"><span class="label">// ${esc(t)}</span><ul style="list-style:none;padding:0;margin:12px 0 0;display:grid;gap:10px">${items.map((it, j) => `<li><label class="check" style="white-space:normal;color:var(--ink-2);font-size:.92rem;align-items:flex-start"><input type="checkbox" data-done="bac.${i}.${j}" ${done.has(`bac.${i}.${j}`) ? "checked" : ""}> ${esc(it)}</label></li>`).join("")}</ul></div>`).join("")}</div>
      <div class="grid grid--2" style="margin-top:20px">
        <a class="card" href="#/oraux"><span class="label">// grand oral</span><h3 style="margin-top:8px">S'entraîner au Grand oral</h3><p>Le chrono 20 + 10 + 10, la grille, les conseils.</p></a>
        <a class="card" href="#/methode/dissert"><span class="label">// HGGSP</span><h3 style="margin-top:8px">Dissertation &amp; étude critique</h3><p>Les deux exercices de l'écrit, pas à pas.</p></a>
      </div>
    </div></section>`;

  views.notfound = () => `
    <section class="section"><div class="wrap" style="text-align:center;max-width:640px">
      <p class="label">// erreur 404</p><h1>Ce ne sont pas les archives que vous recherchez.</h1>
      <p class="muted">Cette page a peut-être été désherbée avec la bibliothèque d'Alexandrie.</p>
      <a class="btn btn--primary" href="#/">Retour à l'accueil</a>
    </div></section>`;

  /* ---------- Comportements ---------- */
  let cleanup = [];
  const onLeave = (fn) => cleanup.push(fn);

  function bindLevel(id) {
    $$("[data-tab]").forEach((b) => b.addEventListener("click", () => {
      $$("[data-tab]").forEach((x) => x.setAttribute("aria-selected", x === b));
      $$("[data-panel]").forEach((p) => (p.hidden = p.dataset.panel !== b.dataset.tab));
      store.set("gaby.tab." + id, +b.dataset.tab);
    }));
    const pr = $("[data-print]"); if (pr) pr.addEventListener("click", () => window.print());
  }

  function refreshProgress() {
    S.niveaux.forEach((nv) => {
      const d = progressOf(nv), pct = Math.round((d / nv.total) * 100);
      $$(`[data-prog="${nv.id}"]`).forEach((el) => { el.textContent = `${d}/${nv.total} révisés · ${pct} %`; el.previousElementSibling.firstElementChild.style.width = pct + "%"; });
    });
    $$("[data-tc]").forEach((el) => { const ids = el.dataset.tc.split(","); el.firstChild.textContent = `${ids.filter((x) => done.has(x)).length}/${ids.length} `; });
  }

  function bindCounters() {
    const els = $$("[data-count]");
    if (!els.length || reduced || !("IntersectionObserver" in window)) return;
    const run = (el) => {
      const n = +el.dataset.count, plus = el.dataset.plus === "1", t0 = performance.now(), dur = 1400;
      const step = (t) => { const k = Math.min(1, (t - t0) / dur), v = Math.round(n * (1 - Math.pow(1 - k, 3))); el.textContent = nf(v) + (plus && k === 1 ? "+" : ""); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.4 });
    els.forEach((el) => { el.textContent = "0"; io.observe(el); });
    onLeave(() => io.disconnect());
  }

  function bindCalc() {
    const a = $("#n1"), b = $("#n2"), out = $("#nres"), msg = $("#nmsg");
    if (!a) return;
    const upd = () => {
      const x = Math.min(20, Math.max(0, +a.value || 0)), y = Math.min(20, Math.max(0, +b.value || 0));
      const m = Math.round(((2 * x + y) / 3) * 100) / 100;
      out.textContent = String(m).replace(".", ",");
      msg.textContent = y > x ? (m >= 10 ? "Du progrès, et la moyenne. C'est le but." : "Du progrès. On tombe, on se relève.") : "Refaire, c'est pour progresser : vise plus haut que la première note.";
    };
    [a, b].forEach((i) => i.addEventListener("input", upd)); upd();
  }

  function bindTimer() {
    const P = S.oral.phases, C = 326.73;
    let i = 0, left = P[0].min * 60, running = false, end = 0;
    const el = { time: $("#tTime"), phase: $("#tPhase"), ring: $("#ringFg"), start: $("#tStart") };
    const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    function draw() {
      const total = P[i].min * 60;
      el.time.textContent = fmt(Math.max(0, Math.ceil(left)));
      el.phase.textContent = P[i].nom;
      el.ring.style.strokeDashoffset = String(C * (1 - left / total));
      el.ring.style.stroke = left <= 30 ? "var(--prof)" : "var(--link)";
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
    function go(k, autostart) { i = k; left = P[i].min * 60; if (autostart) end = Date.now() + left * 1000; else running = false; draw(); }
    function tick() {
      if (!running) return;
      left = (end - Date.now()) / 1000;
      if (left <= 0) {
        beep();
        if (i < P.length - 1) go(i + 1, true);
        else { running = false; left = 0; draw(); toast("Fin de l'épreuve. Le jury te remercie. À méditer."); return; }
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
    const tid = setInterval(tick, 250);
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
      $("#frise").innerHTML = list.map((r) => `<li class="${r.couleur}"><b>${esc(r.date)}</b><span>${esc(r.evt)}</span>${tag(S.niveaux.find((n) => n.id === r.lvl))}</li>`).join("");
    }
    function next() {
      const list = pool();
      if (list.length < 4 || !$("#qQ")) return;
      let q; do { q = pick(list); } while (list.length > 1 && q === last);
      last = q;
      const uniq = [], seenD = new Set(), seenY = new Set();
      reps.filter((r) => r.date !== q.date && r.y !== q.y).sort((a, b) => Math.abs(a.y - q.y) - Math.abs(b.y - q.y)).forEach((r) => { if (!seenD.has(r.date) && !seenY.has(r.y) && uniq.length < 8) { seenD.add(r.date); seenY.add(r.y); uniq.push(r.date); } });
      const opts = shuffle([q.date, ...shuffle(uniq).slice(0, 3)]);
      $("#qCtx").textContent = `// ${S.niveaux.find((n) => n.id === q.lvl).court} · quelle date ?`;
      $("#qQ").textContent = q.evt.charAt(0).toUpperCase() + q.evt.slice(1);
      $("#qOpts").innerHTML = opts.map((o) => `<button class="quiz__opt" type="button">${esc(o)}</button>`).join("");
      $$("#qOpts button").forEach((b) => b.addEventListener("click", () => answer(b, q)));
      lock = false;
    }
    function answer(b, q) {
      if (lock) return; lock = true;
      const ok = b.textContent === q.date;
      $$("#qOpts button").forEach((x) => { x.disabled = true; if (x.textContent === q.date) x.classList.add("ok"); });
      if (ok) { score++; streak++; if (streak > best) { best = streak; store.set("gaby.best", best); } if (streak === 5) toast("Série de 5. Cela va mieux en le disant."); if (streak === 10) toast("10 d'affilée. Boss de fin de niveau en vue."); if (streak === 25) toast("25. Tu pourrais écrire le dictionnaire (les 1100 définitions)."); }
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
    const s = Math.max(0, Math.floor((new Date(S.bac.date) - Date.now()) / 1000));
    const v = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
    els.forEach((el) => $$("b", el).forEach((b, k) => (b.textContent = String(v[k]).padStart(k ? 2 : 1, "0"))));
  }
  setInterval(tickCountdown, 1000);

  /* ---------- Le cri ---------- */
  const calm = () => store.get("gaby.calm", false);
  function shoutWord(el) { el.classList.remove("is-on"); void el.offsetWidth; el.classList.add("is-on"); setTimeout(() => el.classList.remove("is-on"), 950); }
  function heroShout() {
    const el = $("#shout"); if (!el) return;
    const mots = ["RÉFLÉCHIR !", "RÉFLÉCHIR !", "SE RELIRE !", "MÉDITER !"];
    let t = setTimeout(function loop() {
      if (!document.hidden && !calm()) { el.textContent = pick(mots); shoutWord(el); }
      t = setTimeout(loop, 5500 + Math.random() * 5000);
    }, 1600);
    onLeave(() => clearTimeout(t));
  }
  function cri(word) {
    const box = $("#cri");
    $("#criTxt").textContent = word || pick(S.cris);
    box.hidden = false;
    if (!reduced) { document.body.classList.remove("shake"); void document.body.offsetWidth; document.body.classList.add("shake"); }
    setTimeout(() => { box.hidden = true; document.body.classList.remove("shake"); toast("Pardon. C'était juste pour vérifier que vous suiviez. On reprend."); }, 1100);
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
    ...[["L'esprit", "Buts, moyens, code civil, loi, évaluation", "#/esprit"], ["Espaces de classe", "Cahiers de textes 2026-2027", "#/classes"], ["Programmes", "Textes officiels et programmes lisibles", "#/textes"], ["Aides", "Banque de données, assistance, culture", "#/aides"], ["Chrono Grand oral", "20 + 10 + 10 minutes", "#/oraux"], ["Objectif bac", "Épreuves, thèmes 2027, check-list", "#/bac"], [`${age} ans d'ATAG`, "Les rapports d'activités", "#/histoire"]].map(([label, sub, href]) => ({ type: "Page", label, sub, href })),
    ...A.codeCivil.regles.map(([t, d], i) => ({ type: "Règle " + (i + 1), label: t, sub: d.slice(0, 90) + "…", extra: d, href: "#/esprit/code-civil" })),
    ...[["Buts pédagogiques", "buts"], ["Moyens", "moyens"], ["Rappel de la loi", "loi"], ["Barème et évaluation", "evaluation"], ["Pas de publicité", "publicite"], ["Maintenance de fin d'année", "maintenance"]].map(([l, id]) => ({ type: "Esprit", label: l, sub: "La lettre et l'esprit", href: "#/esprit/" + id })),
    ...A.classes.flatMap((c) => c.items.map((it) => ({ type: "Classe", label: it.nom, sub: `${c.cat} · ${it.desc}`, extra: it.liens.map((l) => l[0]).join(" ") + " cahier de textes", href: "#/classes" }))),
    ...A.aides.flatMap((a) => a.items.map(([l, u, s]) => ({ type: "Aide", label: l, sub: a.titre + (s ? " · " + s : ""), href: u, ext: true }))),
    ...A.textes.actuels.map(([l, s]) => ({ type: "Texte", label: l, sub: "Textes officiels, sur le forum", href: A.F + s, ext: true })),
    ...A.histoire.map(([y, t]) => ({ type: y, label: t, sub: "Histoire du lieu", href: "#/histoire" })),
    ...S.niveaux.map((nv) => ({ type: nv.court, cls: nv.couleur, label: nv.nom + " — " + nv.matiere, sub: nv.accroche, href: "#/niveau/" + nv.id })),
    ...chapters.map(({ c, nv, p, th }) => ({ type: nv.court, cls: nv.couleur, label: c.t, sub: `${p.titre} · ${th.titre}`, extra: [...(c.n || []), ...(th.n || [])].join(" "), href: "#/niveau/" + nv.id })),
    ...S.methodes.map((m) => ({ type: "Méthode", label: m.titre, sub: m.resume, href: "#/methode/" + m.id })),
    ...reps.map((r) => ({ type: "Repère", cls: r.couleur, label: `${r.date} — ${r.evt}`, sub: r.ctx, href: "#/reperes?" + r.lvl })),
    { type: "Lien", label: "Le forum AU TRAVAIL AVEC GABY", sub: A.F, href: A.F, ext: true }
  ].map((x) => ({ ...x, hay: norm([x.label, x.sub, x.extra, x.type].join(" ")) }));

  const pal = $("#palette"), palIn = $("#paletteInput"), palList = $("#paletteList");
  let palSel = 0;
  function palRender() {
    const toks = norm(palIn.value.trim()).split(/\s+/).filter(Boolean);
    const res = (toks.length ? index.filter((x) => toks.every((t) => x.hay.includes(t))).sort((a, b) => norm(b.label).includes(toks[0]) - norm(a.label).includes(toks[0])) : index.filter((x) => x.type === "Page" || x.type === "Lien")).slice(0, 30);
    palSel = 0;
    palList.innerHTML = res.length ? res.map((x, k) => `<li role="option" aria-selected="${k === 0}"><a href="${esc(x.href)}" ${x.ext ? 'target="_blank" rel="noopener"' : ""}><span class="tag ${x.cls || ""}"${x.cls ? "" : ' style="background:var(--bar);color:var(--ink)"'}>${esc(x.type)}</span><span>${esc(x.label)}${x.ext ? " ↗" : ""}</span><small>${esc(x.sub || "")}</small></a></li>`).join("") : `<li class="palette__empty">Rien trouvé. Même dans la bibliothèque d'Alexandrie.</li>`;
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
    if (kpos === konami.length) { kpos = 0; document.body.classList.toggle("boss"); toast(document.body.classList.contains("boss") ? "Boss de fin de niveau vaincu. Pas de soluce : retourne travailler." : "Retour au travail."); }
  });

  /* ---------- Routeur ---------- */
  const titles = { home: "", esprit: "La lettre et l'esprit", histoire: `${age} ans d'ATAG`, classes: "Espaces de classe", aides: "Aides", textes: "Programmes", niveau: "", methode: "Méthode", oraux: "Grand oral", reperes: "Repères", bac: "Objectif bac", notfound: "Page introuvable" };
  function route() {
    cleanup.forEach((f) => f()); cleanup = [];
    let raw = location.hash.replace(/^#\/?/, "");
    if (raw.startsWith("devoirs")) { location.replace("#/classes"); return; }
    const [path, query] = raw.split("?");
    const [name, arg] = path.split("/");
    const view = name === "" ? "home" : views[name] && name !== "notfound" ? name : "notfound";
    app.innerHTML = view === "niveau" ? views.niveau(arg) : view === "reperes" ? views.reperes(query) : views[view]();
    const nv = view === "niveau" && S.niveaux.find((n) => n.id === arg);
    const ttl = nv ? nv.nom : titles[view];
    document.title = ttl ? `${ttl} — AU TRAVAIL AVEC GABY` : "AU TRAVAIL AVEC GABY — Support d'aide et travaux avec élèves";
    $$(".nav a").forEach((a) => { const h = a.getAttribute("href"); const on = h === "#/" + name || (view === "niveau" && h === "#/textes"); a.toggleAttribute("aria-current", on); if (on) a.setAttribute("aria-current", "page"); });
    $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false");

    if (view === "home") { heroShout(); bindCounters(); }
    if (view === "esprit") bindCalc();
    if (view === "niveau" && nv) bindLevel(arg);
    if (view === "oraux") bindTimer();
    if (view === "reperes") bindQuiz(query);
    $$(".search-open", app).forEach((b) => b.addEventListener("click", palOpen));
    tickCountdown();

    const target = arg && ({ esprit: "#e-", aides: "#a-", methode: "#m-" }[view]);
    const el = target && $(target + arg);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }));
    else window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  app.addEventListener("change", (e) => {
    const id = e.target.dataset && e.target.dataset.done;
    if (!id) return;
    e.target.checked ? done.add(id) : done.delete(id);
    saveDone(); refreshProgress();
    if (e.target.checked && !id.startsWith("bac") && Math.random() < 0.15) toast(pick(["Révisé ? Dont acte.", "Cela va mieux en le disant.", "Révisé. À méditer quand même."]));
  });

  /* ---------- Chrome global ---------- */
  $("#themeBtn").addEventListener("click", () => {
    const light = document.documentElement.dataset.theme !== "light";
    if (light) document.documentElement.dataset.theme = "light"; else delete document.documentElement.dataset.theme;
    try { localStorage.setItem("gaby.theme", light ? "light" : "dark"); } catch (e) {}
    if (light) toast("Thème papier. Le noir reste le choix du lieu : économie d'énergie et confort des yeux.");
  });
  $("#menuBtn").addEventListener("click", () => { const o = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", o); });
  $$(".topbar .search-open").forEach((b) => b.addEventListener("click", palOpen));
  $("#criBtn").addEventListener("click", () => cri());
  const calmT = $("#calmToggle"); calmT.checked = calm();
  calmT.addEventListener("change", () => { store.set("gaby.calm", calmT.checked); toast(calmT.checked ? "Mode calme. (Il ne tiendra pas longtemps.)" : "Mode normal. Vous êtes prévenus."); });
  $(".skip").addEventListener("click", (e) => { e.preventDefault(); app.focus(); });
  const note = $("#mobileNote");
  if (!store.get("gaby.note", false)) note.hidden = false;
  note.querySelector("button").addEventListener("click", () => { note.hidden = true; store.set("gaby.note", true); });
  const qt = pick(A.citations); $("#quote").innerHTML = `« ${esc(qt.q)} » — Gaby`;
  $("#actualise").textContent = `ATAG 3.0 · dernière actualisation le ${A.actualise}`;
  window.addEventListener("beforeprint", () => $$("details.theme").forEach((d) => (d.open = true)));
  window.addEventListener("hashchange", route);
  route();

  console.log("%cAU TRAVAIL AVEC GABY", "font:700 20px Georgia;color:#6af2c5", "\nTu ouvres la console ? Leçon numéro un : prendre le temps de lire et réfléchir. À méditer.");
})();
