export const QUESTIONS_LABELS = [
  // Partie 1 : L’Environnement
  '1. Je suis gêné(e) par les bruits forts, entêtants ou répétitifs (aspirateur, perceuse, musique trop forte, aboiement …)',
  '2. Je deviens en colère, irritable ou stressé(e) lorsque des bruits me dérangent',
  '3. Les lumières vives me dérangent',
  '4. Je suis gêné(e) par les odeurs intenses',
  '5. Je suis gêné(e) par les textures de vêtements et ai besoin de m’y sentir à l’aise',
  '6. Je porte des lunettes de soleil / plisse les yeux / me bouche le nez ou les oreilles pour faire face à mon environnement et peux me gratter dans des vêtements inconfortables',
  '7. J’ai besoin de solitude régulière pour garder ou retrouver mon équilibre émotionnel surtout après un environnement stimulant',
  '8. Je fais mon possible pour éviter les situations inquiétantes ou perturbantes',
  '9. J’ai besoin d’avoir un moment seul(e) après une journée harassante pour recharger mes batteries',
  '10. Je me sens exténué(e) par le stress et la charge mentale',
  '11. Je suis sensible aux effets de la caféine, de l’alcool ou de la drogue',
  '12. Je sursaute facilement',
  "13. Je m'énerve, je perds mes moyens ou stresse lorsque j'ai beaucoup de choses à faire en même temps",
  '14. J’étouffe lorsque c’est l’effervescence autour de moi et je supporte mal la foule',
  '15. Je suis stressé(e) par les imprévus ou les changements soudains',
  "16. J'évite de commettre des erreurs ou des oublis",
  '17. Il m’arrive de passer du temps à imaginer des scénarios catastrophes afin de me sentir préparé(e) à toute éventualité',
  '18. Je passe du temps à réfléchir à mes expériences ou à anticiper les conséquences possibles de mes choix',
  '19. Je suis en quête de sens ainsi qu’en questionnement sur ce qui m’entoure',

  // Partie 2 : Émotionnel, Intuition & Sensitif
  '20. Je suis une personne consciencieuse',
  "21. J'ai une vie intérieure riche et complexe",
  '22. Je me pose 1 000 questions à la minute et ai besoin de me parler à moi-même',
  '23. J’éprouve des difficultés à regarder certains films ou à lire des histoires violentes ou tristes',
  '24. Je ressens plus intensément que la plupart des gens les moments de beauté (musique, art, nature…)',
  '25. J’ai tendance à rougir même lors d’une situation banale',
  '26. Je me sens submergé(e) par mes émotions même lors de situations banales',
  '27. La faim provoque en moi une réaction vive et perturbe ma concentration et mon humeur',
  "28. Lorsque l'on m'observe pendant que je travaille, je perds mes moyens et j'obtiens un résultat bien pire que si on me laisse tranquille",
  '29. J’ai, de manière régulière, envie de verser une larme, ressens des papillons dans le ventre, des frissons…',
  '30. Je ressens une forte intuition qui me guide souvent dans mes choix',
  '31. Je remarque des détails subtils que d’autres semblent ignorer',
  '32. Ma capacité d’empathie est si forte que je ressens les émotions des autres même si je ne suis pas concerné(e) par le sujet',
  "33. Lorsque les autres se sentent mal à l'aise dans leur environnement matériel, je sens ce que je dois faire pour les soulager (changer l'éclairage, proposer d'autres sièges, ouvrir une fenêtre…)",
  '34. Je suis capable de pressentir ce que les personnes vont dire ou anticiper leurs besoins',

  // Partie 3 : Interactions sociales
  '35. J’ai besoin d’avoir des moments seul(e) après des interactions sociales pour recharger mes batteries même si les interactions étaient agréables car cela m’épuise',
  '36. J’ai besoin de profondeur dans mes échanges avec les autres sinon je m’ennuie vite ou je me sens agacé(e)',
  '37. J’ai tendance à éviter les conflits ou à y réagir fortement',
  "38. Considéré(e) comme sensible, timide ou à fleur de peau, j'ai pu être mis(e) de côté pendant mon enfance par mes camarades",
  '39. Je suis mal à l’aise lors de discussions tendues ou en entendant des mensonges',
  '40. Je suis très sensible à ce que les autres dégagent comme énergie (négative ou positive)',
  '41. Les critiques ou les remarques négatives m’affectent',
  '42. Je ressens la douleur ou la tristesse des autres comme si elles étaient les miennes',
  '43. Les humeurs des autres m’affectent',
  '44. Je me trompe rarement à propos des gens. Juste en les regardant et en ressentant leur énergie, je sais prédire leur personnalité',
  '45. Je ressens beaucoup les gens sans qu’ils aient besoin d’ouvrir la bouche',
  '46. J’arrive à percevoir lorsqu’une personne ne va pas bien',
  '47. Je me sens incompris(e) ou différent(e) des autres du fait de ma sensibilité',
  '48. Je remarque des choses que les gens ne perçoivent pas',
  '49. Je suis sensible à la douleur',
  '50. Je suis mal à l’aise lorsque les gens s’approchent trop près de moi et investissent mon espace personnel',
];

export const MAX_VALUE_PER_QUESTION = 4;

export const QUESSTIONS_PART = {
  part1: {
    label: "Partie 1 : L'environnement",
    index: 0,
  },
  part2: {
    label: 'Partie 2 : Emotionnel, Intuition & Sensitif',
    index: 19,
  },
  part3: {
    label: 'Partie 3 : Interactions Sociales',
    index: 34,
  },
};

export const RESULT_DESCRIPTION = [
  {
    score: 50,
    step: 'Vous êtes faiblement hypersensible',
    profile: '🌿 Votre profil : Stabilité et ancrage',
    description: `Vous présentez une sensibilité mesurée et maîtrisée, signe d’un tempérament stable et ancré. Vous avez la capacité naturelle de conserver votre sang-froid face aux événements, aux émotions d’autrui ou aux situations imprévues. 
      Cela ne signifie pas que vous ne ressentez rien, mais plutôt que vous savez canaliser vos émotions et préserver votre équilibre intérieur. Vous abordez le monde avec calme, recul et discernement, en privilégiant la réflexion avant la réaction.
      Votre stabilité émotionnelle est un atout précieux : elle vous permet d’avancer dans la vie sans vous laisser envahir par le stress ou la nervosité ambiante. Dans un groupe, vous incarnez souvent un repère rassurant, une présence posée sur laquelle les autres peuvent compter. 
      Cette solidité vous aide à prendre des décisions réfléchies et à garder la tête froide, même lorsque tout semble s’accélérer autour de vous.
    `,
    strength: `la maîtrise émotionnelle et la concentration
      Votre capacité à garder le contrôle vous rend particulièrement efficace dans les contextes exigeants. Vous savez faire preuve de patience, de constance et de lucidité, des qualités essentielles pour évoluer dans des environnements complexes ou tendus. 
      Vous êtes capable de trier l’essentiel du superflu, d’agir avec méthode et d’éviter les réactions impulsives. Cette maîtrise vous permet d’avancer avec une grande clarté d’esprit, tout en inspirant confiance à votre entourage.
    `,
    challenge: `reconnaître et valoriser vos émotions
      Si votre stabilité est une force, elle peut parfois se transformer en barrière lorsque les émotions sont trop rationalisées ou mises de côté. 
      À force de vouloir rester calme et raisonnable, vous risquez d’ignorer les signaux émotionnels qui pourraient pourtant vous aider à mieux comprendre vos besoins ou vos limites.
      Vos émotions jouent un rôle fondamental : elles sont le reflet de ce qui vous touche, de vos valeurs profondes et de vos désirs authentiques. En apprenant à les écouter sans les juger, vous gagnerez en équilibre intérieur et en justesse dans vos choix de vie.
    `,
    advice: `cultivez l’écoute intérieure
      Offrez-vous des moments de pause pour vous reconnecter à vos ressentis. 
      Essayez de prêter attention à ce que vous éprouvez avant d’analyser ou de raisonner. Vous pouvez par exemple noter vos émotions dans un carnet, ou simplement vous accorder quelques minutes de silence chaque jour pour observer ce que votre corps et votre cœur expriment.
      Plus vous développerez cette écoute intérieure, plus vous trouverez de cohérence entre ce que vous ressentez, ce que vous pensez et ce que vous décidez. 
      Cette harmonie émotionnelle deviendra une véritable ressource : elle vous aidera à vous affirmer avec authenticité, à mieux comprendre vos besoins et à créer des relations plus profondes et sincères.
    `,
  },
  {
    score: 100,
    step: 'Vous êtes moyennement hypersensible',
    profile: '💫 Votre Profil : Le/la réceptif·ve équilibré·e',
    description: `Vous êtes une personne profondément connectée à vos émotions tout en sachant garder votre centre. Vous ressentez ce qui se passe autour de vous avec finesse, sans pour autant vous laisser submerger. Cette belle justesse intérieure témoigne d’une grande intelligence émotionnelle : vous savez être présent(e), compatissant(e) et à l’écoute, tout en préservant votre espace intérieur.
      Votre cœur est ouvert, mais vos frontières sont claires. Vous avez cette capacité rare de percevoir les nuances émotionnelles d’une situation tout en restant ancré(e), lucide et aligné(e). Cette posture équilibrée vous permet d’être à la fois réceptif(ve) et solide, disponible sans vous perdre dans le tumulte des autres.
    `,
    strength:
      'réside dans votre compréhension fine des autres, dans votre empathie mesurée et consciente. Vous savez quand tendre la main, quand écouter, et aussi quand prendre du recul. Cette qualité fait de vous une personne sur laquelle on peut s’appuyer, un soutien subtil mais précieux, car votre présence apaise et régule naturellement les énergies autour de vous.',
    challenge: `cependant, consiste à veiller à ne pas absorber inconsciemment les tensions ou les émotions collectives. 
      Même équilibré(e), votre sensibilité reste une porte ouverte, et il arrive que certaines atmosphères ou personnes la franchissent sans que vous vous en rendiez compte. Apprenez à repérer ces moments où votre énergie se disperse, et à refermer doucement votre espace émotionnel lorsque cela devient nécessaire.
      Rappelez-vous : accueillir ne veut pas dire porter. Vous pouvez ressentir sans vous charger, comprendre sans vous alourdir.
      voient.`,
    advice: ` accordez-vous régulièrement des instants de recentrage, surtout après des journées riches en interactions. 
      Une marche en pleine nature, quelques respirations profondes, un moment de silence ou une musique qui vous élève peuvent suffire à réharmoniser votre énergie.
      Ces pauses ne sont pas du luxe : elles sont le secret qui vous permet de continuer à donner sans vous vider.
      Plus vous prendrez soin de cet équilibre subtil entre ouverture et protection, plus votre sensibilité deviendra une force rayonnante, stable et profondément inspirante
    `,
  },
  {
    score: 150,
    step: 'Vous êtes hypersensible',
    profile: '💎 Votre Profil : Le/la sensible conscient·e',
    description: `
      Votre sensibilité est une véritable boussole intérieure — sans elle, vous auriez parfois le sentiment de dériver dans les hautes mers. Vous ressentez profondément, percevez les nuances invisibles des relations et captez les émotions ou les intentions bien avant qu’elles ne soient exprimées.\n
      Vous êtes souvent cette personne qui « comprend sans mots », qui ressent les atmosphères et devine ce qui se joue derrière les apparences.
      Votre monde intérieur est d’une richesse rare : vibrant, intuitif, créatif, parfois même poétique. Il vous relie à une profondeur de perception que beaucoup admirent sans toujours la comprendre. 
      Cette hypersensibilité n’est pas un fardeau, mais un don — celui d’être pleinement vivant(e), d’aimer intensément, et de ressentir la beauté là où d’autres ne voient qu’un détail.
    `,
    strength: `réside dans votre empathie naturelle et votre intuition fine. Vous avez le don de vous connecter au cœur des autres, d’apporter douceur, compréhension et réconfort. Votre sensibilité vous rend profondément humain(e) et vous permet d’être un lien entre les mondes visibles et invisibles, entre la raison et le ressenti.`,
    challenge: `en revanche, est d’apprendre à poser des limites émotionnelles claires pour ne pas vous laisser submerger. Votre cœur grand ouvert capte tout — les joies comme les peines — et cela peut parfois vous épuiser si vous ne filtrez pas ce qui vous appartient de ce qui vient de l’extérieur. 
      Vous n’avez pas à tout porter, ni à tout comprendre. 
      Accueillir vos émotions ne signifie pas vous y noyer : cela veut simplement dire les reconnaître, puis les laisser circuler.
    `,
    advice: `accordez-vous régulièrement des moments de retour à vous-même. L’écriture, la nature, la musique ou la création sont vos refuges naturels : des espaces où vous pouvez déposer, transformer et sublimer ce que vous ressentez.
      Ces instants de recentrage ne vous coupent pas du monde, ils vous permettent au contraire d’y revenir plus aligné(e), plus ancré(e) et plus serein(e).
      En apprenant à canaliser votre sensibilité plutôt qu’à la craindre, vous découvrirez qu’elle est votre plus grande force — une lumière douce mais puissante, qui éclaire aussi bien votre chemin que celui des autres.
    `,
  },
  {
    score: 170,
    step: 'Vous êtes fortement hypersensible',
    profile: '🌊 Votre Profil : L’intuitif·ve profond·e',
    description: `Vous ressentez tout — parfois même un peu trop. Les émotions, les ambiances, les sons, les mots, les regards, ou encore les injustices du monde trouvent en vous un écho puissant. 
      Vous captez les vibrations subtiles de la vie, comme si votre antenne intérieure était réglée sur une fréquence que peu perçoivent.
      Cette sensibilité intense est une richesse immense : elle vous relie à la profondeur des êtres et à la vérité des choses. Mais elle demande aussi de la conscience de soi, afin que cette ouverture ne devienne pas une source d’épuisement.
      Vous êtes habité(e) par une grande humanité. 
      Vous ressentez le monde avec le cœur, et cela vous rend profondément vivant(e). Vous percevez ce qui se cache derrière les apparences, vous saisissez les non-dits, les émotions à demi-mot, les vibrations que d’autres ne voient pas. 
      Votre intuition est fine, presqu’instinctive — une boussole intérieure qui vous guide avec une précision étonnante quand vous lui faites confiance.
    `,
    strength: `réside dans votre intuition, votre profondeur et votre humanité sincère. 
      Vous avez ce don rare de comprendre sans analyser, d’aimer sans condition, et de voir au-delà des masques. 
      Vous êtes un être de ressenti et de vérité, capable d’apporter de la lumière dans les zones d’ombre, simplement par votre présence consciente.
    `,
    challenge: `⚖️ Votre défi est d’apprendre à distinguer ce qui vous appartient de ce qui vient des autres. 
      Votre grande réceptivité peut parfois vous amener à absorber les émotions collectives, les tensions ou les tristesses ambiantes. Or, tout ce que vous ressentez n’est pas forcément à vous.
      En développant ce discernement intérieur, vous pourrez rester ouvert(e) sans être perméable, empathique sans vous perdre, compatissant(e) sans vous alourdir.
    `,
    adivce: ` créez dans votre vie des espaces sécurisants — des lieux, des activités ou des personnes qui vous offrent un ancrage doux et rassurant. Ce sont vos bulles d’oxygène émotionnelles, vos ports d’attache entre deux vagues.
      Offrez-vous des moments pour déposer, respirer, écrire, méditer ou simplement être en silence. Votre énergie est un trésor : prenez-en soin comme d’une flamme sacrée.
      Plus vous honorerez cette sensibilité en conscience, plus elle deviendra votre force la plus noble — celle qui éclaire, relie et guérit.
    `,
  },
  {
    score: 200,
    step: 'Vous êtes très fortement hypersensible',
    profile: '🌟 Votre Profil : L’âme vibrante',
    description: `Vous vivez le monde avec une intensité rare. Votre cœur capte tout — la beauté, la douleur, les émotions cachées, les murmures silencieux de ce qui vous entoure. Vous ressentez avant de comprendre, comme si votre âme dialoguait directement avec la vie, sans filtre ni détour.
      Cette hypersensibilité, parfois bouleversante, est aussi une source de sagesse, de créativité et de profondeur spirituelle. Vous percevez le monde non pas seulement avec vos yeux, mais avec votre être tout entier.
      Votre présence est vibrante, magnétique, souvent inspirante pour ceux qui croisent votre chemin. Vous avez cette capacité à ressentir la beauté dans les moindres détails — un regard, une note de musique, une nuance de lumière — et à vous émerveiller là où d’autres passent sans voir. Cette intensité émotionnelle fait de vous un être profondément vivant, réceptif et sincère.
    `,
    strength: `réside dans votre compassion, votre empathie sincère, votre intuition fine — cette petite voix intérieure qui rarement se trompe — et votre faculté à percevoir l’invisible, les énergies, les émotions ou les vérités subtiles que d’autres ne perçoivent pas. Vous êtes un canal sensible entre le visible et l’invisible, entre la matière et l’âme.
    `,
    challenge: `toutefois, est d’apprendre à canaliser cette intensité afin qu’elle vous élève plutôt qu’elle ne vous épuise. Votre cœur immense peut tout absorber, jusqu’à se saturer d’émotions qui ne sont pas les vôtres. L’objectif n’est pas de ressentir moins, mais de ressentir autrement : avec conscience, discernement et douceur.
      Plus vous apprendrez à mettre de la distance bienveillante entre ce que vous captez et ce que vous incarnez, plus votre sensibilité deviendra une force stable et lumineuse.
    `,
    adivce: ` entourez-vous de douceur. Offrez-vous régulièrement des espaces de calme et de ressourcement — la nature, la musique, la méditation, l’écriture, ou simplement le silence.
      Mettez en place une véritable hygiène émotionnelle : repos, ancrage, respiration, moments d’intériorité.
      Et surtout, souvenez-vous : votre hypersensibilité n’est pas une faiblesse à corriger, mais un langage du monde, une manière unique, vibrante et poétique d’entrer en lien avec la vie. C’est votre signature, votre couleur, votre lumière.
    `,
  },
];
