/* Contenu du site. Tout est ici : modifier ce fichier suffit pour mettre le site à jour. */
window.SITE = {
  forumUrl: "https://autravailavecgaby.forumactif.fr/",

  // Date indicative des épreuves de spécialité (à ajuster dès la publication officielle).
  bac: { date: "2027-06-15T08:00:00", label: "Épreuves de spécialité — mi-juin 2027 (date indicative)" },

  annonces: [
    { date: "2026-10-08", titre: "Le site fait peau neuve", texte: "Cours, méthodes, Grand Oral, quiz de repères : tout est réorganisé, lisible sur téléphone et en mode sombre. Les échanges continuent sur le forum." }
  ],

  // Cahier de textes : { date: "AAAA-MM-JJ", niveau: "2nde" | "1ère" | "Tle" | "HGGSP", titre: "...", detail: "..." }
  devoirs: [],

  niveaux: [
    {
      id: "2nde", nom: "Seconde", court: "2nde", matiere: "Histoire-Géographie", couleur: "c2",
      accroche: "De la Méditerranée antique aux Lumières, des risques naturels aux mobilités : les bases de tout le lycée.",
      parties: [
        {
          titre: "Histoire", sous: "Grandes étapes de la formation du monde moderne",
          themes: [
            { titre: "Le monde méditerranéen : empreintes de l’Antiquité et du Moyen Âge", chapitres: [
              { t: "La Méditerranée antique : les empreintes grecques et romaines", n: ["Démocratie athénienne", "Citoyenneté", "Empire romain", "Christianisation de l’Empire"], r: ["Ve s. av. J.-C. : apogée d’Athènes (Périclès)", "27 av. J.-C. : Auguste, premier empereur", "212 : édit de Caracalla", "313 : édit de Milan"] },
              { t: "La Méditerranée médiévale : espace d’échanges et de conflits à la croisée de trois civilisations", n: ["Chrétienté latine", "Empire byzantin", "Monde musulman", "Croisades", "Échanges commerciaux"], r: ["800 : couronnement de Charlemagne", "1054 : schisme entre Rome et Constantinople", "1096-1099 : première croisade", "1453 : prise de Constantinople par les Ottomans"] }
            ]},
            { titre: "XVe-XVIe siècles : un nouveau rapport au monde, un temps de mutation intellectuelle", chapitres: [
              { t: "L’ouverture atlantique : les conséquences de la découverte du « Nouveau Monde »", n: ["Grandes découvertes", "Empires espagnol et portugais", "Traite atlantique", "Économie-monde"], r: ["1492 : Christophe Colomb atteint l’Amérique", "1498 : Vasco de Gama atteint les Indes", "1519-1522 : expédition de Magellan", "1521 : Cortés s’empare de Tenochtitlan"] },
              { t: "Renaissance, humanisme et réformes religieuses : les mutations de l’Europe", n: ["Humanisme", "Imprimerie", "Renaissance artistique", "Réforme protestante", "Réforme catholique"], r: ["Vers 1450 : imprimerie de Gutenberg", "1517 : les 95 thèses de Luther", "1545-1563 : concile de Trente"] }
            ]},
            { titre: "L’État à l’époque moderne : France et Angleterre", chapitres: [
              { t: "L’affirmation de l’État dans le royaume de France", n: ["Monarchie absolue", "Administration royale", "Guerres de religion", "Versailles"], r: ["1539 : ordonnance de Villers-Cotterêts", "1598 : édit de Nantes", "1661-1715 : règne personnel de Louis XIV", "1685 : révocation de l’édit de Nantes"] },
              { t: "Le modèle britannique et son influence", n: ["Parlement", "Monarchie parlementaire", "Habeas corpus", "Révolutions anglaises"], r: ["1679 : Habeas Corpus Act", "1689 : Bill of Rights (Glorieuse Révolution)"] }
            ]},
            { titre: "Dynamiques et ruptures dans les sociétés des XVIIe et XVIIIe siècles", chapitres: [
              { t: "Les Lumières et le développement des sciences", n: ["Lumières", "Raison", "Révolution scientifique", "Salons et Encyclopédie"], r: ["1687 : Newton publie les Principia", "1751 : début de la publication de l’Encyclopédie"] },
              { t: "Tensions, mutations et crispations de la société d’ordres", n: ["Société d’ordres", "Privilèges", "Essor de la bourgeoisie", "Esclavage colonial"], r: ["1685 : Code noir", "4 août 1789 : abolition des privilèges"] }
            ]}
          ]
        },
        {
          titre: "Géographie", sous: "Environnement, développement, mobilité : les défis d’un monde en transition",
          themes: [
            { titre: "Sociétés et environnements : des équilibres fragiles", france: "La France : des milieux métropolitains et ultramarins entre valorisation et protection", chapitres: [
              { t: "Les sociétés face aux risques", n: ["Aléa", "Vulnérabilité", "Risque", "Résilience", "Prévention"] },
              { t: "Des ressources majeures sous pression : tensions, gestion", n: ["Ressource", "Eau", "Énergie", "Gestion durable", "Conflit d’usage"] }
            ]},
            { titre: "Territoires, populations et développement : quels défis ?", france: "La France : dynamiques démographiques, inégalités socio-économiques", chapitres: [
              { t: "Des territoires inégalement développés", n: ["Développement", "IDH", "Inégalités", "Développement durable"] },
              { t: "Des trajectoires démographiques différenciées : les défis du nombre et du vieillissement", n: ["Transition démographique", "Fécondité", "Vieillissement", "Croissance démographique"] }
            ]},
            { titre: "Des mobilités généralisées", france: "La France : mobilités, transports et enjeux d’aménagement", chapitres: [
              { t: "Les migrations internationales", n: ["Migration", "Flux", "Pays de départ et d’accueil", "Réfugiés", "Diaspora"] },
              { t: "Le tourisme et ses espaces", n: ["Tourisme international", "Mise en tourisme", "Aménagement", "Surtourisme"] }
            ]},
            { titre: "L’Afrique australe : un espace en profonde mutation", chapitres: [
              { t: "Des milieux à valoriser et à ménager", n: ["Milieux", "Ressources minières", "Parcs naturels"] },
              { t: "Les défis de la transition et du développement pour des pays inégalement développés", n: ["Héritages de l’apartheid", "Inégalités", "Pays émergent"] },
              { t: "Des territoires traversés et remodelés par des mobilités complexes", n: ["Mobilités régionales", "Corridors de transport", "Migrations de travail"] }
            ]}
          ]
        }
      ]
    },

    {
      id: "1ere", nom: "Première", court: "1ère", matiere: "Histoire-Géographie", couleur: "c1",
      accroche: "1789-1918 : nations, empires et nationalités. Et une géographie des métropoles, des espaces productifs et de la Chine.",
      parties: [
        {
          titre: "Histoire", sous: "Nations, empires, nationalités (de 1789 aux lendemains de la Première Guerre mondiale)",
          themes: [
            { titre: "L’Europe face aux révolutions", chapitres: [
              { t: "La Révolution française et l’Empire : une nouvelle conception de la nation", n: ["Souveraineté nationale", "Monarchie constitutionnelle", "République", "Code civil"], r: ["1789 : États généraux, prise de la Bastille, DDHC", "1792 : proclamation de la République", "1804 : sacre de Napoléon Ier et Code civil", "1815 : défaite de Waterloo"] },
              { t: "L’Europe entre restauration et révolution (1814-1848)", n: ["Restauration", "Libéralisme", "Nationalisme", "Révolution"], r: ["1814-1815 : congrès de Vienne", "1830 : révolution de Juillet", "1848 : « printemps des peuples »"] }
            ]},
            { titre: "La France dans l’Europe des nationalités : politique et société (1848-1871)", chapitres: [
              { t: "La difficile entrée dans l’âge démocratique : la Deuxième République et le Second Empire", n: ["Suffrage universel masculin", "Coup d’État", "Empire autoritaire puis libéral"], r: ["1848 : suffrage universel masculin et abolition de l’esclavage", "2 décembre 1851 : coup d’État de Louis-Napoléon Bonaparte"] },
              { t: "L’industrialisation et l’accélération des transformations économiques et sociales en France", n: ["Industrialisation", "Chemin de fer", "Exode rural", "Monde ouvrier", "Capitalisme"], r: ["1864 : droit de grève"] },
              { t: "La France et la construction de nouveaux États par la guerre et la diplomatie", n: ["Unité italienne", "Unité allemande", "Bismarck", "Cavour"], r: ["1861 : proclamation du royaume d’Italie", "18 janvier 1871 : proclamation de l’Empire allemand"] }
            ]},
            { titre: "La Troisième République avant 1914 : un régime politique, un empire colonial", chapitres: [
              { t: "La mise en œuvre du projet républicain", n: ["République", "Laïcité", "Libertés fondamentales", "École gratuite, laïque et obligatoire"], r: ["4 septembre 1870 : proclamation de la République", "1881-1882 : lois Ferry", "1894-1906 : affaire Dreyfus", "1905 : loi de séparation des Églises et de l’État"] },
              { t: "Permanences et mutations de la société française jusqu’en 1914", n: ["Monde rural", "Syndicalisme", "Place des femmes", "Immigration"], r: ["1884 : loi Waldeck-Rousseau sur les syndicats", "1895 : création de la CGT"] },
              { t: "Métropole et colonies", n: ["Colonisation", "Empire colonial", "Code de l’indigénat", "« Mission civilisatrice »"], r: ["1830 : début de la conquête de l’Algérie", "1884-1885 : conférence de Berlin"] }
            ]},
            { titre: "La Première Guerre mondiale : le « suicide de l’Europe » et la fin des empires européens", chapitres: [
              { t: "Un embrasement mondial et ses grandes étapes", n: ["Guerre totale", "Guerre de mouvement / de position", "Systèmes d’alliances"], r: ["1916 : batailles de Verdun et de la Somme", "1917 : entrée en guerre des États-Unis, révolutions russes", "11 novembre 1918 : armistice"] },
              { t: "Les sociétés en guerre : des civils acteurs et victimes de la guerre", n: ["Mobilisation", "Front intérieur", "Violences de masse", "Génocide des Arméniens"], r: ["1915 : génocide des Arméniens"] },
              { t: "Sortir de la guerre : la tentative de construction d’un ordre des nations démocratiques", n: ["Traités de paix", "SDN", "Droit des peuples à disposer d’eux-mêmes"], r: ["1919 : traité de Versailles", "1923 : traité de Lausanne"] }
            ]}
          ]
        },
        {
          titre: "Géographie", sous: "Les dynamiques d’un monde en recomposition",
          themes: [
            { titre: "La métropolisation : un processus mondial différencié", france: "La France : la métropolisation et ses effets", chapitres: [
              { t: "Les villes à l’échelle mondiale : le poids croissant des métropoles", n: ["Métropole", "Métropolisation", "Ville mondiale", "Hiérarchie urbaine"] },
              { t: "Des métropoles inégales et en mutation", n: ["Étalement urbain", "Fragmentation", "Gentrification", "Ville durable"] }
            ]},
            { titre: "Une diversification des espaces et des acteurs de la production", france: "La France : les espaces de production et leurs dynamiques", chapitres: [
              { t: "Les espaces de production dans le monde : une diversité croissante", n: ["Espace productif", "Chaîne de valeur", "Firme multinationale", "Tertiarisation"] },
              { t: "Métropolisation, littoralisation des espaces productifs et accroissement des flux", n: ["Littoralisation", "Interface", "Flux", "Zone industrialo-portuaire"] }
            ]},
            { titre: "Les espaces ruraux : une multifonctionnalité toujours plus marquée", france: "La France : des espaces ruraux multifonctionnels, entre initiatives locales et politiques européennes", chapitres: [
              { t: "La fragmentation des espaces ruraux", n: ["Espace rural", "Périurbanisation", "Fragmentation"] },
              { t: "Affirmation des fonctions non agricoles et conflits d’usages", n: ["Multifonctionnalité", "Conflit d’usage", "Agriculture productive / durable"] }
            ]},
            { titre: "La Chine : des recompositions spatiales multiples", chapitres: [
              { t: "Développement et inégalités", n: ["Développement", "Inégalités régionales", "Littoral / intérieur", "Urbanisation"] },
              { t: "Des recompositions spatiales à toutes les échelles", n: ["Recomposition spatiale", "Nouvelles routes de la soie", "Mégalopole"], r: ["2013 : lancement des Nouvelles routes de la soie"] }
            ]}
          ]
        }
      ]
    },

    {
      id: "tle", nom: "Terminale", court: "Tle", matiere: "Histoire-Géographie", couleur: "ct",
      accroche: "Des années 1930 à nos jours : puissances, modèles politiques, mondialisation. La dernière ligne droite.",
      parties: [
        {
          titre: "Histoire", sous: "Les relations entre les puissances et l’opposition des modèles politiques, des années 1930 à nos jours",
          themes: [
            { titre: "Fragilités des démocraties, totalitarismes et Seconde Guerre mondiale (1929-1945)", chapitres: [
              { t: "L’impact de la crise de 1929 : déséquilibres économiques et sociaux", n: ["Krach boursier", "Grande Dépression", "Chômage de masse", "New Deal"], r: ["24 octobre 1929 : « jeudi noir » à Wall Street", "1933 : New Deal de Roosevelt", "1936 : Front populaire"] },
              { t: "Les régimes totalitaires", n: ["Totalitarisme", "Fascisme", "Nazisme", "Stalinisme", "Propagande et terreur"], r: ["1922 : Mussolini au pouvoir", "1933 : Hitler chancelier", "1937-1938 : Grande Terreur en URSS"] },
              { t: "La Seconde Guerre mondiale", n: ["Guerre d’anéantissement", "Shoah", "Régime de Vichy", "Collaboration", "Résistance"], r: ["1er septembre 1939 : invasion de la Pologne", "18 juin 1940 : appel du général de Gaulle", "1942 : conférence de Wannsee", "6 juin 1944 : débarquement en Normandie", "8 mai 1945 : capitulation allemande", "6 et 9 août 1945 : Hiroshima et Nagasaki"] }
            ]},
            { titre: "La multiplication des acteurs internationaux dans un monde bipolaire (de 1945 au début des années 1970)", chapitres: [
              { t: "La fin de la Seconde Guerre mondiale et les débuts d’un nouvel ordre mondial", n: ["ONU", "Bretton Woods", "Procès de Nuremberg", "Crime contre l’humanité"], r: ["1944 : accords de Bretton Woods", "1945 : création de l’ONU", "1948 : Déclaration universelle des droits de l’homme"] },
              { t: "Une nouvelle donne géopolitique : bipolarisation et émergence du tiers-monde", n: ["Guerre froide", "Décolonisation", "Tiers-monde", "Non-alignement"], r: ["1947 : doctrine Truman", "1948 : création de l’État d’Israël", "1949 : création de l’OTAN et de la République populaire de Chine", "1955 : conférence de Bandung", "1962 : crise de Cuba"] },
              { t: "La France : une nouvelle place dans le monde", n: ["IVe et Ve Républiques", "Guerre d’Algérie", "Construction européenne", "Indépendance nationale"], r: ["1954-1962 : guerre d’Algérie", "1957 : traités de Rome", "1958 : naissance de la Ve République"] }
            ]},
            { titre: "Les remises en cause économiques, politiques et sociales des années 1970 à 1991", chapitres: [
              { t: "La modification des grands équilibres économiques et politiques mondiaux", n: ["Chocs pétroliers", "Libéralisme", "Mondialisation", "Fin de la guerre froide"], r: ["1973 : premier choc pétrolier", "1979 : révolution iranienne", "9 novembre 1989 : chute du mur de Berlin", "1991 : disparition de l’URSS"] },
              { t: "Un tournant social, politique et culturel, la France de 1974 à 1988", n: ["Alternance", "Cohabitation", "Droits des femmes", "Décentralisation"], r: ["1975 : loi Veil", "1981 : abolition de la peine de mort", "1982 : lois de décentralisation", "1986 : première cohabitation"] }
            ]},
            { titre: "Le monde, l’Europe et la France depuis les années 1990, entre coopérations et conflits", chapitres: [
              { t: "Nouveaux rapports de puissance et enjeux mondiaux", n: ["Hyperpuissance", "Terrorisme", "Multilatéralisme", "Puissances émergentes"], r: ["11 septembre 2001 : attentats aux États-Unis", "2003 : guerre en Irak", "2022 : invasion de l’Ukraine par la Russie"] },
              { t: "La construction européenne entre élargissement, approfondissement et remises en question", n: ["Élargissement", "Approfondissement", "Euro", "Euroscepticisme"], r: ["1992 : traité de Maastricht", "2002 : mise en circulation de l’euro", "2004 : élargissement à dix nouveaux États", "2016 : référendum sur le Brexit"] },
              { t: "La République française", n: ["Principes républicains", "Laïcité", "Parité", "Engagement citoyen"], r: ["2000 : loi sur la parité", "2004 : loi sur les signes religieux à l’école"] }
            ]}
          ]
        },
        {
          titre: "Géographie", sous: "Des territoires dans la mondialisation : entre intégrations et rivalités",
          themes: [
            { titre: "Mers et océans : au cœur de la mondialisation", france: "La France : une puissance maritime ?", chapitres: [
              { t: "Mers et océans : vecteurs essentiels de la mondialisation", n: ["Maritimisation", "Conteneurisation", "Détroits et canaux", "Câbles sous-marins"] },
              { t: "Mers et océans : entre appropriation, protection et liberté de circulation", n: ["ZEE", "Haute mer", "Aires marines protégées", "Piraterie"], r: ["1982 : convention de Montego Bay"] }
            ]},
            { titre: "Dynamiques territoriales, coopérations et tensions dans la mondialisation", france: "La France : les dynamiques différenciées des territoires transfrontaliers", chapitres: [
              { t: "Des territoires inégalement intégrés dans la mondialisation", n: ["Centres et périphéries", "Métropoles", "Intégration", "Marges"] },
              { t: "Coopérations, tensions et régulations aux échelles mondiale, régionale et locale", n: ["Régulation", "OMC", "Organisations régionales", "Tensions"] }
            ]},
            { titre: "L’Union européenne dans la mondialisation : des dynamiques complexes", france: "La France : un rayonnement international différencié et une inégale attractivité dans la mondialisation", chapitres: [
              { t: "L’Union européenne, un espace plus ou moins ouvert sur le monde", n: ["Espace Schengen", "Marché unique", "Frontières externes", "Politique de cohésion"] }
            ]},
            { titre: "Thème conclusif : la France et ses régions dans l’UE et dans la mondialisation", chapitres: [
              { t: "Lignes de force et recompositions", n: ["Régions", "Attractivité", "Aménagement du territoire"] }
            ]}
          ]
        }
      ]
    },

    {
      id: "hggsp", nom: "HGGSP", court: "HGGSP", matiere: "Histoire-géographie, géopolitique et sciences politiques", couleur: "cs",
      accroche: "La spécialité qui décrypte le monde : démocratie, puissances, frontières, guerre et paix, mémoires, patrimoine, environnement, connaissance.",
      parties: [
        {
          titre: "Première", sous: "Spécialité — 4 h par semaine",
          themes: [
            { titre: "Comprendre un régime politique : la démocratie", axes: ["Penser la démocratie : démocratie directe et démocratie représentative", "Avancées et reculs des démocraties"], conclusif: "L’Union européenne et la démocratie",
              n: ["Démocratie directe / représentative", "Citoyenneté", "Souveraineté", "Régime autoritaire"],
              r: ["1944 : droit de vote des femmes en France", "1974 : révolution des Œillets au Portugal"] },
            { titre: "Analyser les dynamiques des puissances internationales", axes: ["Essor et déclin des puissances : un regard historique", "Formes indirectes de la puissance : une approche géopolitique"], conclusif: "La puissance des États-Unis aujourd’hui",
              n: ["Puissance", "Hard power", "Soft power", "Hégémonie"],
              r: ["1520-1566 : règne de Soliman le Magnifique"] },
            { titre: "Étudier les divisions politiques du monde : les frontières", axes: ["Tracer des frontières, approche géopolitique", "Les frontières en débat"], conclusif: "Les frontières internes et externes de l’Union européenne",
              n: ["Frontière", "Limes", "Dyade", "Espace Schengen"],
              r: ["1648 : traités de Westphalie", "1961 : construction du mur de Berlin", "1985 : accords de Schengen"] },
            { titre: "S’informer : un regard critique sur les sources et modes de communication", axes: ["Les grandes révolutions techniques de l’information", "Liberté ou contrôle de l’information : un débat politique fondamental"], conclusif: "L’information à l’heure d’Internet",
              n: ["Liberté de la presse", "Censure", "Médias de masse", "Désinformation"],
              r: ["1881 : loi sur la liberté de la presse", "1991 : naissance du World Wide Web"] },
            { titre: "Analyser les relations entre États et religions", axes: ["Pouvoir et religion : des liens historiques traditionnels", "États et religions : une inégale sécularisation"], conclusif: "États et religions en Inde",
              n: ["Sécularisation", "Laïcité", "Théocratie", "Religion d’État"],
              r: ["1947 : indépendance et partition de l’Inde"] }
          ]
        },
        {
          titre: "Terminale", sous: "Spécialité — 6 h par semaine · épreuve écrite de 4 h",
          themes: [
            { titre: "De nouveaux espaces de conquête", axes: ["Conquêtes, affirmations de puissance et rivalités", "Enjeux diplomatiques et coopérations"], conclusif: "La Chine : à la conquête de l’espace, des mers et des océans",
              n: ["Espace extra-atmosphérique", "Océans", "Coopération internationale", "New Space"],
              r: ["1957 : lancement de Spoutnik", "1961 : Youri Gagarine, premier homme dans l’espace", "1967 : traité de l’espace", "1969 : Apollo 11, premiers pas sur la Lune", "1998 : début de l’assemblage de l’ISS"] },
            { titre: "Faire la guerre, faire la paix : formes de conflits et modes de résolution", axes: ["La dimension politique de la guerre : des conflits interétatiques aux enjeux transnationaux", "Le défi de la construction de la paix"], conclusif: "Le Moyen-Orient : conflits régionaux et tentatives de paix impliquant des acteurs internationaux",
              n: ["Guerre", "Paix", "Clausewitz", "Conflit asymétrique", "Terrorisme"],
              r: ["1993 : accords d’Oslo"] },
            { titre: "Histoire et mémoires", axes: ["Histoire et mémoires des conflits", "Histoire, mémoire et justice"], conclusif: "L’histoire et les mémoires du génocide des Juifs et des Tsiganes",
              n: ["Histoire", "Mémoire", "Génocide", "Crime contre l’humanité", "Justice transitionnelle"],
              r: ["1945-1946 : procès de Nuremberg", "1961 : procès Eichmann", "1994 : génocide des Tutsi au Rwanda", "1995 : discours de Jacques Chirac au Vél’ d’Hiv", "2002 : entrée en fonction de la Cour pénale internationale"] },
            { titre: "Identifier, protéger et valoriser le patrimoine : enjeux géopolitiques", axes: ["Usages sociaux et politiques du patrimoine", "Patrimoine, la préservation entre tensions et concurrences"], conclusif: "La France et le patrimoine, des actions majeures de valorisation et de protection",
              n: ["Patrimoine matériel / immatériel", "UNESCO", "Patrimonialisation", "Surtourisme"],
              r: ["1972 : convention du patrimoine mondial de l’UNESCO", "2001 : destruction des bouddhas de Bamiyan", "2019 : incendie de Notre-Dame de Paris", "2024 : réouverture de Notre-Dame de Paris"] },
            { titre: "L’environnement, entre exploitation et protection : un enjeu planétaire", axes: ["Exploiter, préserver et protéger", "Le changement climatique : approches historique et géopolitique"], conclusif: "Les États-Unis et la question environnementale : tensions et contrastes",
              n: ["Environnement", "Anthropocène", "Développement durable", "GIEC"],
              r: ["1972 : conférence de Stockholm", "1988 : création du GIEC", "1992 : sommet de la Terre à Rio", "1997 : protocole de Kyoto", "2015 : accord de Paris (COP21)"] },
            { titre: "L’enjeu de la connaissance", axes: ["Produire et diffuser des connaissances", "La connaissance, enjeu politique et géopolitique"], conclusif: "Le cyberespace : conflictualité et coopération",
              n: ["Société de la connaissance", "Fuite des cerveaux", "Cyberespace", "Renseignement"],
              r: ["1969 : premier message sur ARPANET", "2013 : révélations d’Edward Snowden"] }
          ]
        }
      ]
    }
  ],

  methodes: [
    { id: "analyse", titre: "Analyser un ou deux documents", pour: "2nde · 1ère · Tle", icone: "📜",
      resume: "Présenter, comprendre, expliquer, critiquer. Jamais paraphraser.",
      etapes: [
        ["Décortiquer la consigne", "Entourez les verbes (montrez, expliquez, confrontez) et les mots-clés : ils fixent ce qu’on attend de vous."],
        ["Présenter le document", "Nature, auteur (et son point de vue), date, contexte, destinataire, idée générale. Une phrase par élément suffit."],
        ["Prélever et expliquer", "Citez le document entre guillemets, puis expliquez avec vos connaissances. Citation + explication = un argument."],
        ["Organiser la réponse", "Deux ou trois paragraphes qui répondent à la consigne, chacun introduit par une idée claire."],
        ["Porter un regard critique", "Intérêt et limites : qui parle, pour qui, ce que le document dit… et ce qu’il ne dit pas."]
      ],
      pieges: ["Paraphraser le document", "Réciter le cours sans lien avec le texte", "Oublier le contexte historique"] },
    { id: "compo", titre: "Rédiger une composition", pour: "2nde · 1ère · Tle", icone: "✍️",
      resume: "Une problématique, un plan, des exemples précis. Et une conclusion qui répond.",
      etapes: [
        ["Analyser le sujet", "Définissez chaque terme, repérez les bornes chronologiques et spatiales. Le sujet, rien que le sujet."],
        ["Construire la problématique", "Une vraie question qui pose un enjeu, pas une reformulation du titre."],
        ["Bâtir le plan", "2 ou 3 parties, chronologiques ou thématiques, chacune répondant à un aspect de la problématique."],
        ["Écrire l’introduction", "Accroche, définitions, bornes, problématique, annonce du plan."],
        ["Développer", "Chaque paragraphe : une idée, un argument, un exemple daté et localisé."],
        ["Conclure", "Bilan qui répond à la problématique, puis une ouverture pertinente."],
        ["Relire", "Gardez 10 minutes : orthographe, dates, noms propres."]
      ],
      pieges: ["Plan catalogue", "Introduction sans problématique", "Exemples flous (« à un moment, quelque part »)"] },
    { id: "croquis", titre: "Réaliser un croquis ou un schéma", pour: "2nde · 1ère · Tle", icone: "🗺️",
      resume: "Un croquis est une démonstration : la légende, c’est votre plan.",
      etapes: [
        ["Donner un titre", "Le titre reprend le sujet exactement."],
        ["Organiser la légende", "2 ou 3 parties titrées, comme le plan d’une composition."],
        ["Choisir les figurés", "Surfaces (aplats, hachures), points (cercles, pictogrammes), lignes (flèches, limites)."],
        ["Utiliser des couleurs qui parlent", "Du clair au foncé pour une intensité ; rouge pour les dynamiques ou les tensions ; bleu pour l’eau."],
        ["Placer la nomenclature", "Les noms de lieux essentiels, écrits horizontalement, lisibles."],
        ["Soigner", "Crayon d’abord, couleurs ensuite. Un croquis propre est un croquis qui convainc."]
      ],
      pieges: ["Légende en liste non organisée", "Trop d’informations", "Figurés incohérents avec la légende"] },
    { id: "dissert", titre: "La dissertation", pour: "HGGSP", icone: "🧭",
      resume: "Démontrer, pas raconter. Un plan qui avance vers une réponse.",
      etapes: [
        ["Analyser le sujet", "Mots-clés, sens, bornes, sous-entendus. Repérez le ou les thèmes du programme mobilisés."],
        ["Formuler la problématique", "Faites apparaître la tension du sujet : pourquoi la question se pose-t-elle ?"],
        ["Construire un plan démonstratif", "2 ou 3 parties, 2 ou 3 sous-parties. Chaque partie fait progresser la réponse."],
        ["Mobiliser des exemples multi-scalaires", "Local, national, mondial : variez les échelles, les acteurs et les périodes."],
        ["Soigner les transitions", "Une phrase qui conclut la partie et annonce la suivante."],
        ["Conclure", "Réponse nette à la problématique, puis une ouverture."]
      ],
      pieges: ["Hors-sujet par récitation", "Absence de notions de science politique", "Pas de réponse en conclusion"] },
    { id: "etude", titre: "L’étude critique de document(s)", pour: "HGGSP", icone: "🔍",
      resume: "Un titre et une consigne guident : dégagez le sens et la portée, puis critiquez.",
      etapes: [
        ["Lire le titre et la consigne", "Ils indiquent l’angle attendu. Votre réponse doit les suivre."],
        ["Présenter le ou les documents", "Nature, auteur, date, contexte, destinataire, intention."],
        ["Analyser", "Dégagez le sens du document à l’aide de citations et de vos connaissances."],
        ["Confronter", "S’il y a deux documents : points communs, différences, complémentarités."],
        ["Critiquer", "Portée et limites : point de vue de l’auteur, silences, représentativité."],
        ["Rédiger", "Introduction, développement organisé, conclusion qui répond à la consigne."]
      ],
      pieges: ["Description sans analyse", "Critique réduite à « le document est subjectif »", "Oublier la consigne"] },
    { id: "reviser", titre: "Réviser efficacement", pour: "Tous niveaux", icone: "🧠",
      resume: "Relire ne suffit pas : on apprend en se testant.",
      etapes: [
        ["Une fiche par chapitre", "Problématique, plan, notions, repères, trois exemples précis."],
        ["Se tester", "Quiz, flashcards, questions à voix haute. Le quiz de repères du site est fait pour ça."],
        ["Espacer", "Revoir à J+1, J+3, J+7, J+21. C’est la répétition espacée."],
        ["Expliquer à quelqu’un", "Si vous savez l’expliquer simplement, vous l’avez compris."],
        ["S’entraîner en temps limité", "Refaites des sujets dans les conditions de l’épreuve."],
        ["Dormir", "La mémoire se consolide la nuit. Ce n’est pas une option."]
      ],
      pieges: ["Surligner tout le manuel", "Réviser la veille uniquement", "Ne jamais s’entraîner à l’écrit"] }
  ],

  oral: {
    phases: [
      { id: "prep", nom: "Préparation", min: 20, note: "Organisez vos idées et préparez un support si vous le souhaitez." },
      { id: "expose", nom: "Exposé", min: 5, note: "Debout, sans notes. Présentez la question et pourquoi vous l’avez choisie, puis répondez-y." },
      { id: "echange", nom: "Échange avec le jury", min: 10, note: "Le jury approfondit : précisez, argumentez, illustrez." },
      { id: "orientation", nom: "Projet d’orientation", min: 5, note: "Le lien entre votre question et votre projet." }
    ],
    criteres: ["Qualité orale", "Prise de parole en continu", "Qualité des connaissances", "Qualité de l’interaction", "Construction de l’argumentation"],
    conseils: [
      "Choisissez une question problématisée qui vous intéresse vraiment : ça s’entend.",
      "Accroche, définitions, problématique, deux ou trois temps, conclusion. Comme une mini-dissertation.",
      "Regardez le jury, pas le plafond. Parlez plus lentement que vous ne le pensez nécessaire.",
      "Entraînez-vous à voix haute, chronométré, devant quelqu’un.",
      "Préparez trois exemples précis par question : ce sont eux qui convainquent pendant l’échange."
    ],
    questions: [
      ["Tle · Thème 1", "La conquête spatiale est-elle redevenue un enjeu de puissance ?"],
      ["Tle · Thème 2", "Peut-on encore gagner une guerre au XXIe siècle ?"],
      ["Tle · Thème 3", "Juger les crimes de masse permet-il de réconcilier une société ?"],
      ["Tle · Thème 4", "Pourquoi le patrimoine est-il une cible dans les conflits ?"],
      ["Tle · Thème 5", "Les États peuvent-ils agir efficacement face au changement climatique ?"],
      ["Tle · Thème 6", "Le cyberespace est-il devenu un champ de bataille ?"],
      ["1ère · Thème 4", "Les réseaux sociaux fragilisent-ils la démocratie ?"],
      ["1ère · Thème 3", "Une frontière peut-elle disparaître ?"]
    ],
    expose: [
      "Une idée par diapositive, pas de pavés de texte.",
      "Annoncez votre plan dès le début et respectez-le.",
      "Citez vos sources : titre, auteur, date.",
      "Répartissez la parole et le temps à l’avance si vous êtes en groupe.",
      "Finissez par une conclusion claire, puis ouvrez aux questions."
    ]
  },

  bacInfos: [
    { titre: "Histoire-Géographie (tronc commun)", texte: "Évaluée en contrôle continu, à partir des moyennes de Première et de Terminale. Chaque devoir compte : la régularité paie." },
    { titre: "HGGSP en Terminale", texte: "Épreuve écrite de 4 h, coefficient 16 : une dissertation et une étude critique de document(s)." },
    { titre: "HGGSP arrêtée en fin de Première", texte: "Évaluée en contrôle continu, coefficient 8." },
    { titre: "Grand Oral", texte: "20 minutes de préparation, 20 minutes d’épreuve, coefficient 10. Deux questions préparées, le jury en choisit une." }
  ],

  checklist: [
    ["J-30", ["Faire la liste des chapitres et cocher ceux déjà maîtrisés", "Une fiche par chapitre", "Un sujet complet par semaine en temps limité"]],
    ["J-7", ["Relire les fiches et les repères", "Refaire les croquis et schémas de mémoire", "Quiz de repères chaque jour"]],
    ["La veille", ["Préparer convocation, pièce d’identité, stylos, montre", "Relecture légère, rien de nouveau", "Se coucher tôt"]],
    ["Le jour J", ["Lire tous les sujets avant de choisir", "Brouillon : problématique et plan d’abord", "Garder 10 minutes pour relire"]]
  ],

  cris: ["ATTENTION !", "SORTEZ UNE FEUILLE !", "LA PROBLÉMATIQUE !", "CONTEXTUALISEZ !", "ON SE RÉVEILLE !", "1789 !", "LE CROQUIS !", "SOURCEZ !", "ÉCOUTEZ !", "LA CONSIGNE !"],

  citations: [
    ["L’histoire est la science des hommes dans le temps.", "Marc Bloch"],
    ["La géographie, ça sert, d’abord, à faire la guerre.", "Yves Lacoste"],
    ["Le passé n’est jamais mort. Il n’est même pas passé.", "William Faulkner"],
    ["Ceux qui ne peuvent se souvenir du passé sont condamnés à le répéter.", "George Santayana"]
  ]
};
