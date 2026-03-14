window.A4P_DATA = {
  club: {
    id: 'club_001',
    name: 'Académie de Performances — Club Démo',
    sport: 'Multi-sports',
    season: '2026',
    staffNote: "Le collectif présente une forte capacité d'engagement, mais une vigilance sur la régulation émotionnelle dans les temps de pression."
  },
  teams: [
    { id:'u18', name:'U18 Rugby', category:'U18', sport:'Rugby', playersTested:18, mentalScore:64, alerts:3, dominantProfile:'CMP-2' },
    { id:'u16', name:'U16 Rugby', category:'U16', sport:'Rugby', playersTested:16, mentalScore:69, alerts:1, dominantProfile:'CMP-1' },
    { id:'seniors', name:'Seniors', category:'Seniors', sport:'Rugby', playersTested:24, mentalScore:72, alerts:1, dominantProfile:'CMP-1' }
  ],
  players: [
    { id:'p1', teamId:'u18', firstname:'Lucas', lastname:'Martin', position:'3/4 centre', score:64, confiance:56, regulation:44, engagement:75, stabilite:81, profil:'Mobilisation forte mais régulation fluctuante', alert:'orange', lastTest:'2026-03-13' },
    { id:'p2', teamId:'u18', firstname:'Tom', lastname:'Bernard', position:'Demi', score:52, confiance:47, regulation:39, engagement:68, stabilite:54, profil:'Fonctionnement mental irrégulier', alert:'red', lastTest:'2026-03-13' },
    { id:'p3', teamId:'u18', firstname:'Hugo', lastname:'Petit', position:'Pilier', score:71, confiance:67, regulation:63, engagement:78, stabilite:76, profil:'Socle mental solide et mobilisable', alert:'green', lastTest:'2026-03-13' },
    { id:'p4', teamId:'u18', firstname:'Maxime', lastname:'Roux', position:'Arrière', score:69, confiance:63, regulation:58, engagement:77, stabilite:78, profil:'Mobilisation forte mais régulation fluctuante', alert:'green', lastTest:'2026-03-13' },
    { id:'p5', teamId:'u18', firstname:'Léo', lastname:'Dubois', position:'Ailier', score:61, confiance:55, regulation:49, engagement:71, stabilite:69, profil:'Mobilisation forte mais régulation fluctuante', alert:'orange', lastTest:'2026-03-13' },
    { id:'p6', teamId:'u16', firstname:'Nolan', lastname:'Garcia', position:'Centre', score:70, confiance:68, regulation:61, engagement:72, stabilite:79, profil:'Socle mental solide et mobilisable', alert:'green', lastTest:'2026-03-13' },
    { id:'p7', teamId:'seniors', firstname:'Alex', lastname:'Henry', position:'3e ligne', score:73, confiance:70, regulation:66, engagement:75, stabilite:77, profil:'Socle mental solide et mobilisable', alert:'green', lastTest:'2026-03-13' }
  ],
  modules: [
    { id:'pmp', title:'Profil Mental (PMP)', status:'En attente', type:'warn', link:'https://alexandregriffet-cmd.github.io/PMP-A4P-Acad-mie-de-Performances-/' },
    { id:'cmp', title:'Compétences Mentales (CMP)', status:'Synchronisé', type:'success', link:'https://alexandregriffet-cmd.github.io/CMP-A4P-ACADEMIE-DE-PERFORMANCES-/', summary:"Questionnaire dynamique, radar et synthèse professionnelle." },
    { id:'psycho', title:'Équilibre Psycho-Émotionnel', status:'En attente', type:'warn', link:'https://alexandregriffet-cmd.github.io/Module-psycho-motionnelle-/' }
  ]
}
