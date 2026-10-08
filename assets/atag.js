/* Contenu repris du forum « AU TRAVAIL AVEC GABY » (relevé du 08-10-26, pages publiques uniquement).
   Les textes du prof sont reproduits fidèlement ; seules quelques coquilles ont été corrigées. */
(() => {
  const F = "https://autravailavecgaby.forumactif.fr/";
  const t = (slug) => F + slug;

  window.ATAG = {
    F,
    titre: "AU TRAVAIL AVEC GABY",
    slogan: "Support d'aide et travaux avec élèves",
    devise: "Je te serai fidèle, quoi qu'il advienne",
    creation: "2007-01-18",
    actualise: "08-10-26",

    stats: [
      { n: 20078, l: "messages postés" },
      { n: 1055, l: "sujets ouverts" },
      { n: 9454, l: "messages du prof" },
      { n: 140, l: "connectés en même temps", s: "record du 02-10-24" },
      { n: 5000, l: "photocopies économisées par an", s: "« largement au-dessus »", plus: true }
    ],

    portail: {
      intro: "AU TRAVAIL AVEC GABY est un forum d'enseignement de l'Histoire-Géographie qui depuis le 18-01-07 constitue un complément des cours que je dispense aux élèves qui me sont confiés.",
      fin: "Ce lieu est un espace de travail, le portail sert à illustrer d'une autre manière ce qu'il est. Mais « AU TRAVAIL AVEC GABY » est avant tout un espace numérique-extension du cours. Sa vocation est d'être utile aux élèves le temps d'une année scolaire.",
      blocs: [
        { titre: "Comprendre", texte: "Tout forum a son règlement : tu dois aussi connaître les règles propres à ce lieu, indispensables pour ne pas avoir de surprises en plein travail. Élèves, parents, collègues et autres autorités supérieures : découvrez ce que j'en espère.", liens: [["Le code civil", "#/esprit/code-civil"], ["Les buts pédagogiques", "#/esprit/buts"], ["La loi à accepter", "#/esprit/loi"]] },
        { titre: "Aider", texte: "Éléments de méthode, conseils, et le fameux dictionnaire !!! L'élève peut à tout moment me poser des questions par message privé ou dans l'espace réservé à sa classe ; c'est une aide en ligne multiforme. Je réponds dès que possible.", liens: [["La banque de données", "#/aides"], ["Méthodes pas à pas", "#/methode"], ["Assistance technique/éthique", "#/aides/assistance"]] },
        { titre: "Travailler", texte: "Un espace par classe, les cahiers de textes, les textes officiels sous cosmétique ATAG… et même un espace d'ouverture culturelle, de quoi nourrir sa culture générale en somme.", liens: [["Les espaces de classe", "#/classes"], ["Les textes officiels", "#/textes"], ["Ouverture culturelle", "#/aides/culture"]] }
      ]
    },

    citations: [
      ["Bienvenue sur le net où les écrits restent et où chaque mot compte.", "t4474-rappel-de-la-loi-que-tu-as-acceptee-2026-2027"],
      ["Bref, leçon numéro un, prendre le temps de lire et réfléchir.", "t502-rapports-d-activites-un-par-an-en-fin-d-annee-scolaire"],
      ["Je ne détiens pas la science infuse.", "t13-buts-pedagogiques"],
      ["Ce n'est pas parce que l'élève me demande ici les sujets du prochain bac blanc que je vais les lui donner !", "t13-buts-pedagogiques"],
      ["Pourquoi le orange ? Parce que c'est celle que je préfère.", "t11-code-civil"],
      ["Ils surfent comme ils marchent.", "t502-rapports-d-activites-un-par-an-en-fin-d-annee-scolaire"],
      ["On peut faire du vélo sans 27 vitesses et sans freins à disque.", "t502-rapports-d-activites-un-par-an-en-fin-d-annee-scolaire"],
      ["L'IA, la belle affaire pourrait-on dire.", "t502-rapports-d-activites-un-par-an-en-fin-d-annee-scolaire"],
      ["Un jeune ne se réduit pas, redisons-le, à une ligne de statistiques. On est dans l'humain.", "t1984-ma-pratique-pedagogique-sur-un-autre-sujet-que-le-numerique-l-evaluation"],
      ["Certains marchent à 10 mois, d'autres à 18. On tombe, on se relève. On retombe… mais à la fin, tout le monde maîtrise.", "t1984-ma-pratique-pedagogique-sur-un-autre-sujet-que-le-numerique-l-evaluation"],
      ["Le ton sec de certaines interventions n'est pas signe non plus de néo-fascisme.", "t15-moyens"],
      ["Je m'en retourne à la gestion du lieu !", "t416-pas-de-publicite-sur-ce-forum-pourquoi-et-comment"],
      ["Il ne reste plus qu'à le mettre en œuvre le temps venu ^^", "t3994-emc-programme-de-tale"],
      ["Trêve de blabla, en route,", "t1984-ma-pratique-pedagogique-sur-un-autre-sujet-que-le-numerique-l-evaluation"]
    ].map(([q, s]) => ({ q, url: t(s) })),

    /* ---------- La lettre et l'esprit ---------- */
    codeCivil: {
      url: t("t11-code-civil"), maj: "26-07-26",
      regles: [
        ["L'identification", "Aucun nom de quiconque ne doit apparaître dans aucun sujet. Cette règle vaut aussi pour moi d'où le fait que je me présente sous mon surnom usuel, Gaby. Pour t'identifier auprès de tous au premier coup d'œil : millésime de l'élève en début d'année scolaire-prénom-rang dans l'ordre alphabétique de classe (exemple fictif : 2006ALEXANDRE1). Toute tentative de contourner la consigne entraînera la suppression de l'inscription… et la nécessité de se réinscrire avec l'option bonnet d'âne (ancêtre du boulet). Les signatures sont interdites ; les avatars sont autorisés s'ils ont un lien direct avec la matière : pour l'histoire, un personnage historique ayant existé ; pour la géographie, un paysage naturel ou humanisé sans aucun visage."],
        ["Les coordonnées", "Les informations que vous mettez en vous inscrivant doivent être vraies. Elles ne sont pas affichées sur le forum mais cela permet de vous contacter via un lien. Donc ne bluffez pas. En revanche, ne postez jamais vos coordonnées ou autres données personnelles. Si j'en trouve, j'édite le post et j'enlève l'information."],
        ["Le langage, verset 1", "Pas de langage SMS. Pour l'orthographe ou les fautes de frappe, on en fait tous mais se relire est utile… Ou passer le texte au correcteur d'orthographe est une garantie efficace. Tout post avec du langage SMS sera enlevé."],
        ["Le langage, verset 2", "Pas de flood non plus. Tout flood est supprimé."],
        ["Le langage, verset 3", "Il est interdit d'écrire dans une autre couleur que celle du forum dans les posts de travail (sauf exception négociée au préalable). Ceci afin de rendre la lecture plus claire, moins fatigante à l'œil mais aussi pour éviter les conflits de code couleur quand j'édite vos travaux."],
        ["Droit d'auteur et droit d'image", "Aucun usage d'avatar ou de photo dont vous n'avez pas les droits ne doit être fait. De même, pas de photo de vous ou autre personne reconnaissable. On peut flouter des photos, et encore, après accord des autorités légales (= moi)."],
        ["Principes de correction à respecter à tout prix !", "Jamais tu n'utilises la couleur orange ou une variante. C'est la couleur de correction du professeur comme celle de l'admin. Pourquoi le orange ? Parce que c'est celle que je préfère. Ici, je corrige en orange. De plus, quand j'édite un post pour y mettre un commentaire, tu ne dois JAMAIS toucher à ce commentaire. Si tel était le cas, ce serait une faute entraînant immédiatement un bannissement temporaire.", true],
        ["Non-divulgation des codes", "Comme tout code, celui qui vous permet d'accéder au forum et de travailler est personnel. Le prêter à un camarade ou un tiers est une erreur car les posts apparaîtraient sous votre pseudo, qui serait aussi celui visé par les sanctions éventuelles. Il faut donc une grande rigueur morale."],
        ["Responsabilité de chacun vis-à-vis de son travail", "Comme tout support informatique, le forum est sécurisé mais un travail peut être perdu. Chacun est donc tenu de conserver une épreuve de ses travaux sur son propre PC, une disquette, une clé USB ou tout autre support. Je me dégage de toute responsabilité vis-à-vis d'une perte de travail."],
        ["Du bon usage du CDI et de la salle informatique", "L'accès à ces salles de travail, et aux piouts (PC en français courant) suppose que l'on a un travail à effectuer. Le surf sur le forum ne saurait être une excuse (une couverture) au surf sauvage sur d'autres sites…"],
        ["Hiérarchie des sanctions applicables", "Selon la gravité de la faute : suppression des posts concernés ; bannissement temporaire de l'élève (faute grave) ; bannissement définitif de l'élève (faute grave répétée). Le bannissement définitif est une sanction grave applicable dès prononcé et irrévocable."]
      ]
    },

    loi: {
      url: t("t4474-rappel-de-la-loi-que-tu-as-acceptee-2026-2027"),
      points: [
        "Je suis le seul administrateur. Il n'y aura pas de modérateur. J'assume entièrement la responsabilité de ce lieu. Et serai impitoyable car c'est un lieu de travail même si certains topics sont plus funs.",
        "Il te faudra donc respecter ces règles, surtout sur les propos qui peuvent déborder.",
        "Pour avoir le droit d'utiliser ce lieu, ce qui sera d'ailleurs un devoir, tu dois répondre à la suite de ce message que tu as bien relu ces règles et que tu as conscience de tout cela. La forme de ce serment sera celle que tu veux. Mais tu dois t'engager à respecter ces règles."
      ],
      ajout: "Les allusions politiques seront systématiquement supprimées. Ce forum est neutre, une des vertus de l'historien même si un philosophe démontrerait que c'est une vue de l'esprit."
    },

    buts: {
      url: t("t13-buts-pedagogiques"),
      dedicace: ["À mes élèves,", "À mes amis,", "Aux parents qui viennent avec leur jeune,", "Aux curieux,", "Aux collègues qui me supportent,", "À mon chef d'établissement,", "À mes IPR actuels et passés,"],
      intro: "Depuis les années 2002-2003, je réfléchissais à la constitution d'un forum. Je me suis lancé durant l'année 2006/2007. Et voici ce lieu… dont les buts sont ici explicités (liste non exhaustive).",
      liste: [
        "L'élève peut me poser une question quand il veut. Sur un travail à faire, sur un point de cours mal compris etc.",
        "L'élève y retrouve des documents du cours distribués, d'autres pas encore étudiés mais qui peuvent l'aider.",
        "L'élève possède un espace où il peut donner son travail, ou une copie informatique d'un travail rendu sur feuille par ailleurs.",
        "L'élève malade ou en voyage lointain peut me retrouver pour demander des précisions plus particulières, voire la version numérique du cours (abus à éviter…).",
        "Le professeur peut guider de loin l'avancée du travail d'un élève ou d'un groupe et faire un suivi individualisé au rythme de l'élève.",
        "L'élève en révision fait l'objet d'une attention privilégiée aussi, s'il en exprime le besoin.",
        "Celui qui ne connaît pas ce genre de forums apprend son utilisation, son intérêt, ses limites.",
        "Quelques économies de photocopies, non négligeables même si ce n'est pas un but premier (en 2026, le nombre s'établit largement au-dessus de 5000 par année scolaire).",
        "Lieu de suivi du travail des élèves lorsqu'avec mes collègues du CDI, on conduit le travail d'une classe, surtout en EMC."
      ],
      nest: [
        ["Un lieu de travail, prolongement du cours", "Il ne peut être réservé qu'aux seuls élèves qui me sont confiés. C'est bien une sorte d'agora privée, et si je me refuse d'aider les autres élèves, ce n'est pas par égoïsme mais parce que tout cela prend déjà énormément de temps et n'a pas à contrecarrer le travail des collègues."],
        ["Un lieu vivant", "Les travaux des élèves sont supprimés en fin d'année, parce que ce qui compte est la construction de l'esprit et non le résultat intermédiaire qu'est l'exercice. Celui qui veut garder son œuvre peut le faire, sur son PC."],
        ["Jamais à la place de la classe", "La classe reste le lieu primordial, celui où je vois la réaction de l'élève face à la difficulté. Il ne faut donc pas attendre plus de ce lieu que ce qu'il peut apporter !"],
        ["Humain, donc faillible", "Je ne détiens pas la science infuse. Ce que je donne n'est que le reflet de ma façon d'enseigner. Je peux commettre des erreurs. Les élèves y retrouvent mon esprit, l'ambiance que je désire mettre dans mon enseignement."],
        ["Une question peut amener une non-réponse", "Une question peut être traitée de façon nébuleuse, afin que l'élève poursuive son questionnement. En revanche, le forum laissé « semi-ouvert » à la consultation permet de montrer comment nous travaillons. Car je n'ai rien à cacher."]
      ]
    },

    moyens: {
      url: t("t15-moyens"),
      points: [
        ["Le temps", "Afin de donner le temps à chacun de faire le travail, celui-ci est le plus souvent donné longtemps à l'avance. Mais celui qui s'y prend au dernier moment est souvent surpris… Maîtriser le temps dont on dispose est un enjeu clé de l'autonomie."],
        ["L'apprentissage", "Un certain nombre d'heures doit être consacré à l'apprentissage de l'usage de ce genre de lieux. Mais activement, via des travaux à faire. Et les élèves apprennent vite, savent mutualiser."],
        ["Le ton", "Vous remarquerez si vous en prenez le temps que mes remarques pédagogiques sont dans un style et les remarques de rappel bien plus cassantes. C'est pour que chacun fasse bien la distinction !"],
        ["Le choix du forum", "La souplesse qu'il permet ne me fait aucunement regretter d'avoir développé ce type de lieu et non un site ou un blog. Il représente pour les élèves un plus ludique qui les immerge dans un espace qu'ils doivent apprendre à maîtriser. Même s'il ne remplacera jamais la salle de classe !"]
      ]
    },

    evaluation: {
      url: t("t1984-ma-pratique-pedagogique-sur-un-autre-sujet-que-le-numerique-l-evaluation"),
      paliers: [
        [7, "La plus basse note attribuée, systématiquement (sauf exception : l'élève comprend alors qu'il y a un gros problème)."],
        [10, "Une copie très imparfaite, mais attestant d'un effort sérieux, de progrès."],
        [12, "Une copie qui traite le sujet, imparfaitement et incomplètement."],
        [14, "Palier significatif."],
        [16, "Palier significatif."],
        [19, "Une copie excellente peut aller aisément vers 18-19 (le 20 existe !)."]
      ],
      regles: [
        "Un élève qui n'a pas la moyenne peut systématiquement refaire le devoir.",
        "Tout croquis réalisé à la maison part d'une base de 10, puis on ajuste.",
        "Les critères restent les mêmes mais l'exigence augmente avec le temps : un même croquis aurait 15 en octobre et 12 en avril.",
        "Un 9 est vraiment insatisfaisant."
      ]
    },

    pub: {
      url: t("t416-pas-de-publicite-sur-ce-forum-pourquoi-et-comment"),
      texte: "Les bandeaux de publicité commencent à être très voyants sur forumactif. Je ne veux pas que cela devienne agressif à l'œil. C'est du travail, c'est aussi un choix esthétique et éthique.",
      etapes: [["2008", "18 €"], ["2011", "17,82 €"], ["2012", "17,82 €"], ["2013", "idem"], ["2014", "idem"], ["2015", "18,50 €"], ["2023", "un peu plus de 50 €"]]
    },

    maintenance: {
      url: t("t4233-maintenance-de-fin-d-annee-scolaire"),
      titre: "Maintenance Juin 2026",
      travaux: ["Suppression des comptes Y12 et Y13", "Nettoyage du forum Y13 redevenu Y11", "Nettoyage du forum Euroland", "Nettoyage des forums Y12-1 et Y12-2, refonte des groupes de classe européenne", "Suppression des comptes HGGSP-P, nettoyage du forum HGGSP-P", "Nettoyage du forum LE GROUÈGNEUR", "Nettoyage des forums HGGSP-1 et HGGSP-2, suppression des comptes", "Nettoyage des archives (cahiers de textes 2017-2018 à 2020-2021)", "Désherbage modeste de la bibliothèque d'Alexandrie", "Rédaction du rapport d'activités 2025-2026"]
    },

    /* ---------- 19 ans d'histoire ---------- */
    rapports: t("t502-rapports-d-activites-un-par-an-en-fin-d-annee-scolaire"),
    histoire: [
      ["2007", "Le lieu ouvre", "18 janvier : naissance du forum. Le 20, le code civil ; le 21, les buts pédagogiques et les moyens.", "Je me suis lancé durant l'année 2006/2007. Et voici ce lieu…"],
      ["2008", "Vierge de toute publicité", "Pour son premier anniversaire, le forum devient sans publicité. Premier rapport d'activités en juillet.", "J'ai décidé de rédiger une sorte de rapport d'activité, qui ponctuera désormais chaque fin d'année scolaire."],
      ["2009", "Bilan, deuxième", "Les questions du premier rapport servent à nouveau.", "Nous pouvons les réutiliser cette année, elles restent valables !"],
      ["2010", "Le pionnier", "Arrivée du vidéoprojecteur en classe ; Facebook émerge, MSN décline.", "Je fus un pionnier dans l'usage d'un tel support."],
      ["2011", "Faire court (essai)", "Rapport centré sur la fréquentation et l'usage en cours.", "Une fois n'est pas coutume, nous allons faire un peu plus court cette année."],
      ["2012", "Une saison à part", "Une année qui n'a rien eu à voir avec les précédentes.", ""],
      ["2013", "ATAG 2.0", "Refonte profonde : esthétique, structure et nature du travail avec les élèves.", "Il ne s'appelle plus « AU TRAVAIL AVEC GABY » MAIS « AU TRAVAIL AVEC GABY 2.0 »."],
      ["2014", "L'évaluation", "Novembre : le prof publie ses principes de correction, à la demande de l'inspection.", "Il est surprenant d'étudier notre rapport au temps."],
      ["2015", "Le temps du recul", "Sur l'évaluation des pratiques et la pression du retour sur investissement.", "J'en passe et des meilleures."],
      ["2016", "Prendre le temps", "Dernier rapport avant une pause de trois ans.", "Prendre le temps. Et le prendre avec les principaux concernés, ici, les élèves."],
      ["2019", "Réforme du lycée", "Les nouveaux programmes et la spécialité HGGSP arrivent sur le forum.", "La pertinence d'un rapport d'activité annuel ne m'est plus apparue depuis."],
      ["2020", "Confinement", "Des salons Discord qui reproduisent la structure du forum, classe par classe. Plus de 90 % de présents.", "Au regard des récents événements, il est clair qu'il y aura un rapport pour l'année 2019-2020…"],
      ["2021", "Encore", "Le système tient, une deuxième année.", "Une année encore plus marquée par les problèmes sanitaires et leurs conséquences."],
      ["2022", "15 ans, grand ménage", "Plus de 30 000 messages ramenés à 19 236 : la sobriété numérique comme principe.", "15 ans que ce lieu existe."],
      ["2023", "La réforme en plein", "Première année de pleine application de la réforme du lycée.", "Année éprouvante."],
      ["2024", "Record : 140 connectés", "Le 2 octobre, 140 utilisateurs en ligne en même temps.", "Il semblerait que la maîtrise des outils soit en recul."],
      ["2025", "Retour à la norme", "Une année d'attention à la maîtrise de l'outil.", "Le niveau de maîtrise en fin d'année est tout à fait satisfaisant."],
      ["2026", "L'IA, et la frugalité", "Le forum, gardé tel quel, comme démonstration de sobriété efficace.", "Le conserver tel quel devient presque une démonstration du possible en toute légèreté, économie, frugalité pourtant efficace…"],
      ["2026", "ATAG 3.0", "Une nouvelle façade, lisible partout, au service du même lieu. Le forum reste l'espace de travail.", ""]
    ],

    /* ---------- Espaces de classe (2026-2027) ---------- */
    classes: [
      { cat: "SECONDE", items: [
        { nom: "Histoire-Géographie-EMC 2de M", veille: true, couleur: "#6FEB28", prog: "2nde", desc: "Ce lieu rassemble les sujets concernant les élèves de 2de M en Histoire, Géographie.", forum: t("f14-histoire-geographie-emc-2de-m-forum-en-veille"),
          liens: [["Cahier de textes HG 2de M (2024-2025)", t("t3990-cahier-de-textes-hg-2de-m-2024-2025")], ["Cahier de textes EMC 2de M (2024-2025)", t("t3991-cahier-de-textes-emc-2de-m-2024-2025")], ["EMC 2de : consignes et guide pour le premier oral", t("t3999-emc-2de-consignes-et-guide-pour-le-premier-oral")]] }
      ]},
      { cat: "PREMIÈRE", items: [
        { nom: "Première HGGSP", couleur: "#D6DE62", prog: "hggsp", desc: "Forum des élèves de Première HGGSP : on y trouve l'ensemble des sujets concernant cette classe.", forum: t("f2-premiere-hggsp"),
          liens: [["Cahier de textes HGGSP-P", t("t4449-cahier-de-textes-hggsp-p")]] },
        { nom: "Histoire-Géographie-EMC Première V", veille: true, couleur: "#E8F000", prog: "1ere", desc: "Forum des élèves de Première V.", forum: t("f6-histoire-geographie-emc-premiere-v-forum-en-veille"),
          liens: [["Cahier de textes HG Première V (2025-2026)", t("t4237-cahier-de-textes-emc-premiere-v-2025-2026")], ["Cahier de textes EMC Première V (2025-2026)", t("t4238-cahier-de-textes-emc-premiere-v-2025-2026")]] },
        { nom: "Histoire-Géographie-EMC Première W", veille: true, couleur: "#E6640E", prog: "1ere", desc: "Forum des élèves de Première W.", forum: t("f17-histoire-geographie-emc-premiere-w-forum-en-veille"),
          liens: [["Cahier de textes HG Première W (2025-2026)", t("t4234-cahier-de-textes-hg-premiere-w-2025-2026")], ["Cahier de textes EMC Première W (2025-2026)", t("t4235-cahier-de-textes-emc-premiere-w-2025-2026")]] },
        { nom: "LE GROUÈGNEUR", mystere: true, desc: "Que cela peut-il être ??", forum: t("f5-le-grouegneur"), liens: [] }
      ]},
      { cat: "TERMINALE", items: [
        { nom: "Terminale 4 : HGGSP-1", couleur: "#F00000", prog: "hggsp", desc: "Les futurs étudiants (^^) retrouvent ici tout ce qui les concerne directement.", forum: t("f11-terminale-4-hggsp-1"),
          liens: [["Cahier de textes HGGSP-1 2026-2027", t("t4463-cahier-de-textes-hggsp-1-2026-2027")], ["Notions clés à connaître absolument", t("t4011-notions-cles-a-connaitre-aboslument")], ["HGGSP : se cultiver avec pertinence", t("t3370-hggsp-se-cultiver-avec-pertinence")]] },
        { nom: "Terminale HGGSP-2", couleur: "#F01880", prog: "hggsp", desc: "Les futurs bacheliers retrouvent ici tout ce qui les concerne directement.", forum: t("f20-terminale-hggsp-2"),
          liens: [["Cahier de textes HGGSP-2 2026-2027", t("t4464-cahier-de-textes-hggsp-2-2026-2027")], ["Notions clés à connaître absolument", t("t4012-notions-cles-a-connaitre-aboslument-hggsp-2")], ["HGGSP : se cultiver avec pertinence", t("t3095-hggsp-se-cultiver-avec-pertinence")]] }
      ]},
      { cat: "DNL SPACE", items: [
        { nom: "Year 12", couleur: "#1AAFD4", desc: "The “Year 12” department.", forum: t("f37-year-12"),
          liens: [["Cahier de textes Y12 2026-2027", t("t4435-cahier-de-textes-y12-2026-2027")]] },
        { nom: "Year 11", veille: true, couleur: "#0058F0", desc: "The year 11 department, young but strong students!", forum: t("f30-year-11-forum-en-veille"),
          liens: [["Cahier de textes Y11 2026-2027", t("t4434-cahier-de-textes-y11-2026-2027")]] },
        { nom: "Euroland", couleur: "#9BABEB", desc: "Several topics such as a Translator (English to French), new words classified… as another example.", forum: t("f52-euroland"),
          liens: [["Translator English to French", t("dnl-space-f52/translator-english-to-french-t215.htm")], ["Some words about…", t("t3348-some-words-about-2021-2022")], ["Les exigences finales théoriques", t("t3788-les-exigences-finales-theoriques")]] }
      ]}
    ],

    /* ---------- Aides ---------- */
    aides: [
      { id: "banque", titre: "Banque de données", planete: "#6AF2C5", desc: "Méthodes, conseils, discours, fonds de carte… et surtout un DICTIONNAIRE de plus de 1100 définitions.", items: [
        ["Guide méthodologique de tout devoir écrit (tous niveaux)", t("t17-guide-methodologique-de-tout-devoir-ecrit-tous-niveaux"), "Dissertation, composition, RQP"],
        ["Réussir l'épreuve d'analyse / étude critique de document(s)", t("t1368-reussir-l-epreuve-d-analyse-etude-critique-de-documents-nouveau-programme"), "Nouveau programme"],
        ["Comment présenter une composition", t("t1308-comment-presenter-une-composition-seconde"), "Seconde"],
        ["Décryptage des remarques du professeur sur les copies", t("t501-decryptage-des-remarques-du-professeur-sur-les-copies"), "Saisir le sens des annotations"],
        ["Quelques grands discours", t("banque-de-donnees-f27/quelques-grands-discours-t83.htm"), "Sources"],
        ["Fonds de carte spécifiques", t("t700-fonds-de-carte-specifiques"), "Croquis"],
        ["Dictionnaire d'histoire et géographie : A à M", t("t85-dictionnaire-d-histoire-et-geographie"), "Plus de 1100 définitions"],
        ["Dictionnaire d'histoire et géographie : N à Y", t("t85p25-dictionnaire-d-histoire-et-geographie"), ""],
        ["Dictionnaire d'histoire et géographie : Z", t("t85p50-dictionnaire-d-histoire-et-geographie"), ""]
      ]},
      { id: "assistance", titre: "Assistance technique/éthique", planete: "#CCFF79", desc: "Les non-initiés apprennent ici les bases techniques mais aussi éthiques (plagiat…) !", items: [
        ["Surfer efficacement dans ce forum", t("assistance-technique-f31/surfer-efficacement-dans-ce-forum-en-cours-de-redaction-t1002.htm"), "Les rudiments"],
        ["Créer un lien", t("assistance-technique-f31/creer-un-lien-t7.htm"), ""],
        ["Comment héberger une image", t("t1432-comment-heberger-une-image"), "Et un avatar"],
        ["Comment insérer un tableau dans un message", t("t2911-comment-inserer-un-tableau-dans-un-message"), ""],
        ["La vidéo sur le forum, ça marche !!!", t("t510-la-video-sur-le-forum-ca-marche"), ""],
        ["Du plagiat et des raisons de le proscrire", t("t1197-du-plagiat-et-des-raisons-de-le-proscrire"), "Éthique"]
      ]},
      { id: "culture", titre: "A piece of the moon — Mare Foecunditatis", planete: "#FFC57A", desc: "L'espace d'ouverture culturelle, ouvert à tous les membres : de quoi nourrir sa culture générale en somme.", items: [
        ["Conseils cinématographiques", t("t369-conseils-cinematographiques"), "Films"],
        ["Play-list / juke-box", t("t1635-play-list-juke-box"), "Musique"],
        ["L'espace culturel complet", t("f58-a-piece-of-the-moon-mare-foecunditatis"), "Lectures et plus encore"]
      ]}
    ],

    /* ---------- Textes officiels ---------- */
    textes: {
      forum: t("f32-textes-officiels"),
      actuels: [
        ["Programme d'histoire-géographie de 2de", "t2699-programme-d-histoire-geographie-de-2de", "Programme", "2nde"],
        ["Programme d'histoire-géographie de Première", "t2700-programme-d-histoire-geographie-de-premiere", "Programme", "1ere"],
        ["Programme d'histoire-géographie de Terminale", "t2800-programme-d-histoire-geographie-de-tale", "Programme", "tle"],
        ["Programme de la spécialité HGGSP, Première", "t2701-programme-de-la-specialite-hggsp-niveau-premiere", "Programme", "hggsp"],
        ["Programme de la spécialité HGGSP, Terminale", "t2830-programme-de-la-specialite-hggsp-niveau-tale", "Programme", "hggsp"],
        ["EMC : programme de Seconde (rentrée 2024)", "t3995-emc-programme-de-seconde", "Programme", "2nde"],
        ["EMC : programme de Première (rentrée 2025)", "t3993-emc-programme-de-premiere", "Programme", "1ere"],
        ["EMC : programme de Terminale (rentrée 2026)", "t3994-emc-programme-de-tale", "Programme", "tle"],
        ["Définition des épreuves de la spécialité HGGSP (Tale)", "t3090-definition-des-epreuves-de-la-specialite-hggsp-tale", "Épreuve"],
        ["Définition de l'épreuve dite du grand oral", "t3091-definition-de-l-epreuve-dite-du-grand-oral", "Épreuve"]
      ],
      archives: [
        ["Définition des nouvelles épreuves du baccalauréat général (Bac 2021)", "t2720-definition-des-nouvelles-epreuves-du-baccalaureat-general-bac-2021"],
        ["L'épreuve spécifique du bac en section européenne", "t211-l-epreuve-specifique-du-bac-en-section-europeenne"],
        ["Conditions d'attribution de la mention européenne au baccalauréat", "t1063-conditions-d-attribution-de-la-mention-europeenne-au-baccalaureat"],
        ["La loi concernant l'élection des délégués", "t307-la-loi-concernant-l-election-des-delegues"]
      ]
    },

    emc: {
      "2nde": { sous: "Droits, libertés et responsabilité", url: t("t3995-emc-programme-de-seconde"), axes: ["L'État de droit garantit les droits et libertés et un pluralisme démocratique", "Liberté et responsabilité : l'exemple de l'information (vecteurs, nécessité et enjeux)", "Droits et responsabilité : l'exemple de la protection de l'environnement et de la sauvegarde de la biodiversité"] },
      "1ere": { sous: "Cohésion et diversité dans une société démocratique", url: t("t3993-emc-programme-de-premiere"), axes: ["Les valeurs et les principes de la République à l'épreuve de la cohésion sociale", "La République et la Nation"] },
      "tle": { sous: "La vie démocratique : débat, délibération et prise de décision", url: t("t3994-emc-programme-de-tale"), axes: ["Les principes et les espaces du débat démocratique", "La délibération dans les institutions"] }
    },

    derniers: [
      ["Rappel de la loi que tu as acceptée (2026-2027)", "2026-10-02", "t4474-rappel-de-la-loi-que-tu-as-acceptee-2026-2027"],
      ["Rapports d'activités (un par an, en fin d'année scolaire)", "2026-07-07", "t502-rapports-d-activites-un-par-an-en-fin-d-annee-scolaire"],
      ["Maintenance de fin d'année scolaire", "2026-06-15", "t4233-maintenance-de-fin-d-annee-scolaire"],
      ["Définition des épreuves de la spécialité HGGSP (Tale)", "2025-12-12", "t3090-definition-des-epreuves-de-la-specialite-hggsp-tale"],
      ["EMC : programme de Seconde", "2024-06-15", "t3995-emc-programme-de-seconde"]
    ].map(([titre, date, s]) => ({ titre, date, url: t(s) }))
  };
})();
