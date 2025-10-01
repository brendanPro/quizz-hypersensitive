export const QUESTIONS_LABELS = [
  // Partie 1 : L’Environnement
  "Je suis gêné(e) par des bruits forts, entêtants ou répétitifs (aspirateur, perceuse, musique trop forte, aboiement)",
  "Je deviens en colère, irritable ou stressé(e) lorsque des bruits me dérangent",
  "Les lumières vives me dérangent",
  "Je suis gêné(e) par les odeurs intenses",
  "Je suis gêné(e) par les textures de vêtements et ai besoin de me sentir à l’aise dans mes vêtements",
  "Je porte des lunettes de soleil / plisse les yeux / me bouche le nez ou les oreilles pour faire face à mon environnement et peux me gratter dans des vêtements inconfortables",
  "J’ai besoin de solitude régulière pour garder ou retrouver mon équilibre émotionnel surtout après un environnement stimulant",
  "Je fais mon possible pour éviter les situations inquiétantes ou perturbatrices",
  "J’ai besoin d’avoir un moment seul(e) après une journée harassante pour recharger mes batteries",
  "Je me sens exténué(e) par le stress et la charge mentale",
  "Je suis sensible aux effets de la caféine, de l’alcool ou de la drogue",
  "Je sursaute facilement",
  "Je m'énerve, je perds mes moyens ou stresse lorsque j'ai beaucoup de choses à faire en même temps",
  "J’étouffe lorsque c’est l’effervescence autour de moi et je supporte mal la foule",
  "Je suis stressé(e) par les imprévus ou les changements soudains",
  "J'évite de commettre des erreurs ou des oublis",
  "Il m’arrive de passer du temps à imaginer des scénarios catastrophes afin de me sentir préparé(e) à toute éventualité",
  "Je passe du temps à réfléchir à mes expériences ou à anticiper les conséquences possibles de mes choix",
  "Je suis en quête de sens ainsi qu’en questionnement sur ce qui m’entoure",

  // Partie 2 : Émotionnel, Intuition & Sensitif
  "Je suis une personne consciencieuse",
  "J'ai une vie intérieure riche et complexe",
  "Je me pose 1 000 questions à la minute et ai besoin de me parler à moi-même",
  "J’éprouve des difficultés à regarder certains films ou à lire des histoires violentes ou tristes",
  "Je ressens plus intensément que la plupart des gens les moments de beauté (musique, art, nature…)",
  "J’ai tendance à rougir même lors d’une situation banale",
  "Je me sens submergé(e) par mes émotions même lors de situations banales",
  "La faim provoque en moi une réaction vive et perturbe ma concentration et mon humeur",
  "Lorsque l'on m'observe pendant que je travaille, je perds mes moyens et j'obtiens un résultat bien pire que si on me laisse tranquille",
  "J’ai envie de verser une larme, ressens des papillons dans le ventre, des frissons…",
  "Je ressens une forte intuition qui me guide souvent dans mes choix",
  "Je remarque des détails subtils que d’autres semblent ignorer",
  "Ma capacité d’empathie est si forte que je ressens les émotions des autres même si je ne suis pas concerné(e) par le sujet",
  "Lorsque les autres se sentent mal à l'aise dans leur environnement matériel, je sens ce que je dois faire pour les soulager (changer l'éclairage, proposer d'autres sièges, ouvrir une fenêtre…)",
  "Je suis capable de pressentir ce que les personnes vont dire ou anticiper leurs besoins",

  // Partie 3 : Interactions sociales
  "J’ai besoin d’avoir des moments seul(e) après des interactions sociales pour recharger mes batteries même si les interactions étaient agréables car cela m’épuise",
  "J’ai besoin de profondeur dans mes échanges avec les autres sinon je m’ennuie vite ou je me sens agacé(e)",
  "J’ai tendance à éviter les conflits ou à y réagir fortement",
  "Lorsque j'étais enfant, mes parents ou mes enseignants semblaient me considérer comme sensible, à fleur de peau ou timide",
  "Je suis mal à l’aise lors de discussions tendues ou en entendant des mensonges",
  "Je suis très sensible à ce que les autres dégagent comme énergie (négative ou positive)",
  "Les critiques ou les remarques négatives m’affectent",
  "Je ressens la douleur ou la tristesse des autres comme si elles étaient les miennes",
  "Les humeurs des autres m’affectent",
  "Je me trompe rarement sur les gens juste en les regardant et ressentant leur énergie",
  "Je ressens beaucoup les gens sans qu’ils aient besoin d’ouvrir la bouche",
  "J’arrive à percevoir lorsqu’une personne ne va pas bien",
  "Je me sens incompris(e) ou différent(e) des autres du fait de ma sensibilité",
  "Je remarque des choses que les gens ne perçoivent pas",
  "Je suis sensible à la douleur",
  "Je suis mal à l’aise lorsque les gens s’approchent trop près de moi et investissent mon espace personnel",
];


export const MAX_VALUE_PER_QUESTION = 4;


export const QUESSTIONS_PART = {
  part1 : {
    label: 'Partie 1: L\'environement',
    index: 0
  }, 
  part2: {
    label: 'Partie 2: Emotionnel, Intuition & Senditif',
    index: 19
  },
  part3: {
    label: 'Partie 3: Interactions Sociales',
    index: 33
  }
}

export const RESULT_DESCRIPTION = [
  {
    score: 50,
    description: 'faible sensibilité',
  },{
    score: 100,
    description: 'sensibilité modérée',
  },{
    score: 150,
    description: 'sensibilité élevée',
  },{
    score: 170,
    description: 'hypersensibilité',
  },{
    score: 200,
    description: 'forte hypersensibilité',
  }
]