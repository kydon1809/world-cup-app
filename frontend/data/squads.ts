// frontend/data/squads.ts

export const DEFAULT_SQUAD = {
    Goalkeepers: [{ name: "Starting GK", number: 1 }, { name: "Backup GK", number: 12 }],
    Defenders: [{ name: "Center Back", number: 4 }, { name: "Fullback", number: 2 }, { name: "Center Back", number: 5 }, { name: "Fullback", number: 3 }],
    Midfielders: [{ name: "Defensive Mid", number: 6 }, { name: "Central Mid", number: 8 }, { name: "Attacking Mid", number: 10 }],
    Forwards: [{ name: "Right Winger", number: 7 }, { name: "Striker", number: 9 }, { name: "Left Winger", number: 11 }]
  };
  
  export const TEAM_SQUADS: Record<string, any> = {
    "Argentina": {
      Goalkeepers: [
        { name: "Emiliano MARTINEZ", number: 23 }, { name: "Geronimo RULLI", number: 12 }, { name: "Franco ARMANI", number: 1 }
      ],
      Defenders: [
        { name: "Cristian ROMERO", number: 13 }, { name: "Nicolas OTAMENDI", number: 19 }, { name: "Nahuel MOLINA", number: 26 }, { name: "Marcos ACUNA", number: 8 }, { name: "Lisandro MARTINEZ", number: 25 }
      ],
      Midfielders: [
        { name: "Rodrigo DE PAUL", number: 7 }, { name: "Enzo FERNANDEZ", number: 24 }, { name: "Alexis MAC ALLISTER", number: 20 }, { name: "Leandro PAREDES", number: 5 }
      ],
      Forwards: [
        { name: "Lionel MESSI", number: 10 }, { name: "Julian ALVAREZ", number: 9 }, { name: "Lautaro MARTINEZ", number: 22 }, { name: "Alejandro GARNACHO", number: 17 }
      ]
    },
    "France": {
      Goalkeepers: [
        { name: "Mike MAIGNAN", number: 16 }, { name: "Alphonse AREOLA", number: 23 }, { name: "Brice SAMBA", number: 1 }
      ],
      Defenders: [
        { name: "William SALIBA", number: 2 }, { name: "Dayot UPAMECANO", number: 4 }, { name: "Jules KOUNDE", number: 5 }, { name: "Theo HERNANDEZ", number: 22 }
      ],
      Midfielders: [
        { name: "Aurelien TCHOUAMENI", number: 8 }, { name: "Adrien RABIOT", number: 14 }, { name: "Eduardo CAMAVINGA", number: 6 }, { name: "Antoine GRIEZMANN", number: 7 }
      ],
      Forwards: [
        { name: "Kylian MBAPPE", number: 10 }, { name: "Ousmane DEMBELE", number: 11 }, { name: "Marcus THURAM", number: 15 }, { name: "Randal KOLO MUANI", number: 12 }
      ]
    },
    "England": {
      Goalkeepers: [
        { name: "Jordan PICKFORD", number: 1 }, { name: "Aaron RAMSDALE", number: 13 }, { name: "Dean HENDERSON", number: 23 }
      ],
      Defenders: [
        { name: "John STONES", number: 5 }, { name: "Kyle WALKER", number: 2 }, { name: "Harry MAGUIRE", number: 6 }, { name: "Luke SHAW", number: 3 }, { name: "Trent ALEXANDER-ARNOLD", number: 8 }
      ],
      Midfielders: [
        { name: "Jude BELLINGHAM", number: 10 }, { name: "Declan RICE", number: 4 }, { name: "Phil FODEN", number: 11 }, { name: "Cole PALMER", number: 20 }
      ],
      Forwards: [
        { name: "Harry KANE", number: 9 }, { name: "Bukayo SAKA", number: 7 }, { name: "Marcus RASHFORD", number: 19 }, { name: "Ollie WATKINS", number: 18 }
      ]
    },
    "USA": {
      Goalkeepers: [
        { name: "Matt TURNER", number: 1 }, { name: "Ethan HORVATH", number: 18 }, { name: "Drake CALLENDER", number: 22 }
      ],
      Defenders: [
        { name: "Antonee ROBINSON", number: 5 }, { name: "Chris RICHARDS", number: 3 }, { name: "Tim REAM", number: 13 }, { name: "Sergino DEST", number: 2 }
      ],
      Midfielders: [
        { name: "Weston MCKENNIE", number: 8 }, { name: "Tyler ADAMS", number: 4 }, { name: "Yunus MUSAH", number: 6 }, { name: "Gio REYNA", number: 7 }
      ],
      Forwards: [
        { name: "Christian PULISIC", number: 10 }, { name: "Folarin BALOGUN", number: 20 }, { name: "Timothy WEAH", number: 21 }, { name: "Ricardo PEPI", number: 9 }
      ]
    },
    "Brazil": {
      Goalkeepers: [
        { name: "ALISSON", number: 1 }, { name: "EDERSON", number: 23 }, { name: "BENTO", number: 12 }
      ],
      Defenders: [
        { name: "MARQUINHOS", number: 4 }, { name: "GABRIEL MAGALHAES", number: 3 }, { name: "DANILO", number: 2 }, { name: "WENDELL", number: 6 }
      ],
      Midfielders: [
        { name: "BRUNO GUIMARAES", number: 5 }, { name: "Lucas PAQUETA", number: 8 }, { name: "Douglas LUIZ", number: 15 }, { name: "Joao GOMES", number: 17 }
      ],
      Forwards: [
        { name: "VINICIUS JUNIOR", number: 7 }, { name: "RODRYGO", number: 10 }, { name: "RAPHINHA", number: 11 }, { name: "ENDRICK", number: 9 }
      ]
    },
    "Spain": {
    Goalkeepers: [
      { name: "Unai SIMON", number: 23 }, { name: "David RAYA", number: 1 }, { name: "Alex REMIRO", number: 13 }
    ],
    Defenders: [
      { name: "Dani CARVAJAL", number: 2 }, { name: "Robin LE NORMAND", number: 3 }, { name: "Aymeric LAPORTE", number: 14 }, { name: "Marc CUCURELLA", number: 24 }, { name: "Jesus NAVAS", number: 22 }
    ],
    Midfielders: [
      { name: "RODRI", number: 16 }, { name: "Fabian RUIZ", number: 8 }, { name: "PEDRI", number: 20 }, { name: "Mikel MERINO", number: 6 }, { name: "Dani OLMO", number: 10 }
    ],
    Forwards: [
      { name: "Lamine YAMAL", number: 19 }, { name: "Alvaro MORATA", number: 7 }, { name: "Nico WILLIAMS", number: 17 }, { name: "Mikel OYARZABAL", number: 21 }, { name: "Ferran TORRES", number: 11 }
    ]
  },
  "Germany": {
    Goalkeepers: [
      { name: "Manuel NEUER", number: 1 }, { name: "Marc-Andre TER STEGEN", number: 22 }, { name: "Oliver BAUMANN", number: 12 }
    ],
    Defenders: [
      { name: "Antonio RUEDIGER", number: 2 }, { name: "Jonathan TAH", number: 4 }, { name: "Joshua KIMMICH", number: 6 }, { name: "Maximilian MITTELSTAEDT", number: 18 }, { name: "Nico SCHLOTTERBECK", number: 15 }
    ],
    Midfielders: [
      { name: "Toni KROOS", number: 8 }, { name: "Ilkay GUNDOGAN", number: 21 }, { name: "Robert ANDRICH", number: 23 }, { name: "Jamal MUSIALA", number: 10 }, { name: "Florian WIRTZ", number: 17 }
    ],
    Forwards: [
      { name: "Kai HAVERTZ", number: 7 }, { name: "Niclas FUELLKRUG", number: 9 }, { name: "Leroy SANE", number: 19 }, { name: "Thomas MUELLER", number: 13 }
    ]
  },
  "Portugal": {
    Goalkeepers: [
      { name: "Diogo COSTA", number: 22 }, { name: "Rui PATRICIO", number: 1 }, { name: "Jose SA", number: 12 }
    ],
    Defenders: [
      { name: "Ruben DIAS", number: 4 }, { name: "PEPE", number: 3 }, { name: "Joao CANCELO", number: 20 }, { name: "Nuno MENDES", number: 19 }, { name: "Diogo DALOT", number: 5 }
    ],
    Midfielders: [
      { name: "Bruno FERNANDES", number: 8 }, { name: "Bernardo SILVA", number: 10 }, { name: "VITINHA", number: 23 }, { name: "Joao PALHINHA", number: 6 }, { name: "Ruben NEVES", number: 18 }
    ],
    Forwards: [
      { name: "Cristiano RONALDO", number: 7 }, { name: "Rafael LEAO", number: 17 }, { name: "Joao FELIX", number: 11 }, { name: "Diogo JOTA", number: 21 }, { name: "Goncalo RAMOS", number: 9 }
    ]
  },
  "Netherlands": {
    Goalkeepers: [
      { name: "Bart VERBRUGGEN", number: 1 }, { name: "Mark FLEKKEN", number: 23 }, { name: "Justin BIJLOW", number: 13 }
    ],
    Defenders: [
      { name: "Virgil VAN DIJK", number: 4 }, { name: "Stefan DE VRIJ", number: 6 }, { name: "Nathan AKE", number: 5 }, { name: "Denzel DUMFRIES", number: 22 }, { name: "Micky VAN DE VEN", number: 15 }
    ],
    Midfielders: [
      { name: "Jerdy SCHOUTEN", number: 24 }, { name: "Tijjani REIJNDERS", number: 14 }, { name: "Xavi SIMONS", number: 7 }, { name: "Joey VEERMAN", number: 16 }, { name: "Georginio WIJNALDUM", number: 8 }
    ],
    Forwards: [
      { name: "Memphis DEPAY", number: 10 }, { name: "Cody GAKPO", number: 11 }, { name: "Donyell MALEN", number: 18 }, { name: "Wout WEGHORST", number: 9 }, { name: "Brian BROBBEY", number: 19 }
    ]
  },
  "Italy": {
    Goalkeepers: [
      { name: "Gianluigi DONNARUMMA", number: 1 }, { name: "Guglielmo VICARIO", number: 12 }, { name: "Alex MERET", number: 26 }
    ],
    Defenders: [
      { name: "Alessandro BASTONI", number: 21 }, { name: "Riccardo CALAFIORI", number: 5 }, { name: "Federico DIMARCO", number: 3 }, { name: "Giovanni DI LORENZO", number: 2 }, { name: "Matteo DARMIAN", number: 13 }
    ],
    Midfielders: [
      { name: "Nicolo BARELLA", number: 18 }, { name: "JORGINHO", number: 8 }, { name: "Davide FRATTESI", number: 7 }, { name: "Lorenzo PELLEGRINI", number: 10 }, { name: "Bryan CRISTANTE", number: 16 }
    ],
    Forwards: [
      { name: "Federico CHIESA", number: 14 }, { name: "Gianluca SCAMACCA", number: 9 }, { name: "Mateo RETEGUI", number: 19 }, { name: "Mattia ZACCAGNI", number: 20 }, { name: "Stephan EL SHAARAWY", number: 22 }
    ]
  },
  "Belgium": {
    Goalkeepers: [
      { name: "Koen CASTEELS", number: 1 }, { name: "Matz SELS", number: 12 }, { name: "Thomas KAMINSKI", number: 13 }
    ],
    Defenders: [
      { name: "Jan VERTONGHEN", number: 5 }, { name: "Wout FAES", number: 4 }, { name: "Timothy CASTAGNE", number: 21 }, { name: "Arthur THEATE", number: 3 }, { name: "Zeno DEBAST", number: 2 }
    ],
    Midfielders: [
      { name: "Kevin DE BRUYNE", number: 7 }, { name: "Amadou ONANA", number: 24 }, { name: "Youri TIELEMANS", number: 8 }, { name: "Orel MANGALA", number: 18 }, { name: "Yannick CARRASCO", number: 11 }
    ],
    Forwards: [
      { name: "Romelu LUKAKU", number: 10 }, { name: "Jeremy DOKU", number: 22 }, { name: "Leandro TROSSARD", number: 9 }, { name: "Lois OPENDA", number: 20 }, { name: "Charles DE KETELAERE", number: 14 }
    ]
  },
  "Croatia": {
    Goalkeepers: [
      { name: "Dominik LIVAKOVIC", number: 1 }, { name: "Ivica IVUSIC", number: 23 }, { name: "Nediljko LABROVIC", number: 12 }
    ],
    Defenders: [
      { name: "Josko GVARDIOL", number: 4 }, { name: "Josip SUTALO", number: 6 }, { name: "Borna SOSA", number: 19 }, { name: "Josip STANISIC", number: 2 }, { name: "Domagoj VIDA", number: 21 }
    ],
    Midfielders: [
      { name: "Luka MODRIC", number: 10 }, { name: "Mateo KOVACIC", number: 8 }, { name: "Marcelo BROZOVIC", number: 11 }, { name: "Lovro MAJER", number: 7 }, { name: "Mario PASALIC", number: 15 }
    ],
    Forwards: [
      { name: "Andrej KRAMARIC", number: 9 }, { name: "Bruno PETKOVIC", number: 17 }, { name: "Ivan PERISIC", number: 14 }, { name: "Ante BUDIMIR", number: 16 }, { name: "Marko PJACA", number: 20 }
    ]
  },
  "Uruguay": {
    Goalkeepers: [
      { name: "Sergio ROCHET", number: 1 }, { name: "Santiago MELE", number: 23 }, { name: "Franco ISRAEL", number: 12 }
    ],
    Defenders: [
      { name: "Ronald ARAUJO", number: 4 }, { name: "Jose Maria GIMENEZ", number: 2 }, { name: "Mathias OLIVERA", number: 16 }, { name: "Nahitan NANDEZ", number: 8 }, { name: "Matias VINA", number: 17 }
    ],
    Midfielders: [
      { name: "Federico VALVERDE", number: 15 }, { name: "Manuel UGARTE", number: 5 }, { name: "Rodrigo BENTANCUR", number: 6 }, { name: "Nicolas DE LA CRUZ", number: 7 }, { name: "Giorgian DE ARRASCAETA", number: 10 }
    ],
    Forwards: [
      { name: "Darwin NUNEZ", number: 19 }, { name: "Facundo PELLISTRI", number: 11 }, { name: "Maximiliano ARAUJO", number: 20 }, { name: "Luis SUAREZ", number: 9 }, { name: "Brian RODRIGUEZ", number: 14 }
    ]
  },
  "Colombia": {
    Goalkeepers: [
      { name: "Camilo VARGAS", number: 12 }, { name: "David OSPINA", number: 1 }, { name: "Alvaro MONTERO", number: 22 }
    ],
    Defenders: [
      { name: "Davinson SANCHEZ", number: 23 }, { name: "Daniel MUNOZ", number: 21 }, { name: "Jhon LUCUMI", number: 3 }, { name: "Johan MOJICA", number: 17 }, { name: "Carlos CUESTA", number: 2 }
    ],
    Midfielders: [
      { name: "James RODRIGUEZ", number: 10 }, { name: "Jefferson LERMA", number: 16 }, { name: "Richard RIOS", number: 6 }, { name: "Jhon ARIAS", number: 11 }, { name: "Kevin CASTANO", number: 5 }
    ],
    Forwards: [
      { name: "Luis DIAZ", number: 7 }, { name: "Jhon CORDOBA", number: 24 }, { name: "Rafael SANTOS BORRE", number: 19 }, { name: "Jhon DURAN", number: 14 }, { name: "Miguel BORJA", number: 9 }
    ]
  },
  "Mexico": {
    Goalkeepers: [
      { name: "Julio GONZALEZ", number: 1 }, { name: "Carlos ACEVEDO", number: 12 }, { name: "Raul RANGEL", number: 23 }
    ],
    Defenders: [
      { name: "Cesar MONTES", number: 3 }, { name: "Johan VASQUEZ", number: 5 }, { name: "Jorge SANCHEZ", number: 19 }, { name: "Gerardo ARTEAGA", number: 6 }, { name: "Israel REYES", number: 2 }
    ],
    Midfielders: [
      { name: "Edson ALVAREZ", number: 4 }, { name: "Luis CHAVEZ", number: 24 }, { name: "Orbelin PINEDA", number: 17 }, { name: "Luis ROMO", number: 7 }, { name: "Erick SANCHEZ", number: 14 }
    ],
    Forwards: [
      { name: "Santiago GIMENEZ", number: 11 }, { name: "Julian QUINONES", number: 9 }, { name: "Uriel ANTUNA", number: 15 }, { name: "Alexis VEGA", number: 10 }, { name: "Guillermo MARTINEZ", number: 22 }
    ]
  },
  "Switzerland": {
    Goalkeepers: [
      { name: "Yann SOMMER", number: 1 }, { name: "Gregor KOBEL", number: 21 }, { name: "Yvon MVOGO", number: 12 }
    ],
    Defenders: [
      { name: "Manuel AKANJI", number: 5 }, { name: "Fabian SCHAR", number: 22 }, { name: "Ricardo RODRIGUEZ", number: 13 }, { name: "Silvan WIDMER", number: 3 }, { name: "Nico ELVEDI", number: 4 }
    ],
    Midfielders: [
      { name: "Granit XHAKA", number: 10 }, { name: "Remo FREULER", number: 8 }, { name: "Michel AEBISCHER", number: 20 }, { name: "Xherdan SHAQIRI", number: 23 }, { name: "Denis ZAKARIA", number: 6 }
    ],
    Forwards: [
      { name: "Breel EMBOLO", number: 7 }, { name: "Ruben VARGAS", number: 17 }, { name: "Dan NDOYE", number: 19 }, { name: "Kwadwo DUAH", number: 18 }, { name: "Zeki AMDOUNI", number: 25 }
    ]
  },
  "Japan": {
    Goalkeepers: [
      { name: "Zion SUZUKI", number: 23 }, { name: "Daiya MAEKAWA", number: 1 }, { name: "Taishi Brandon NOZAWA", number: 12 }
    ],
    Defenders: [
      { name: "Takehiro TOMIYASU", number: 22 }, { name: "Ko ITAKURA", number: 4 }, { name: "Hiroki ITO", number: 21 }, { name: "Yukinari SUGAWARA", number: 2 }, { name: "Shogo TANIGUCHI", number: 3 }
    ],
    Midfielders: [
      { name: "Wataru ENDO", number: 6 }, { name: "Hidemasa MORITA", number: 5 }, { name: "Takumi MINAMINO", number: 8 }, { name: "Takefusa KUBO", number: 20 }, { name: "Daichi KAMADA", number: 15 }
    ],
    Forwards: [
      { name: "Kaoru MITOMA", number: 7 }, { name: "Ayase UEDA", number: 9 }, { name: "Ritsu DOAN", number: 10 }, { name: "Takuma ASANO", number: 18 }, { name: "Daizen MAEDA", number: 25 }
    ]
  },
  "Senegal": {
    Goalkeepers: [
      { name: "Edouard MENDY", number: 16 }, { name: "Seny DIENG", number: 1 }, { name: "Mory DIAW", number: 23 }
    ],
    Defenders: [
      { name: "Kalidou KOULIBALY", number: 3 }, { name: "Moussa NIAKHATE", number: 19 }, { name: "Ismail JAKOBS", number: 14 }, { name: "Youssouf SABALY", number: 21 }, { name: "Abdou DIALLO", number: 22 }
    ],
    Midfielders: [
      { name: "Pape Matar SARR", number: 15 }, { name: "Idrissa GUEYE", number: 5 }, { name: "Nampalys MENDY", number: 6 }, { name: "Lamine CAMARA", number: 25 }, { name: "Cheikhou KOUYATE", number: 8 }
    ],
    Forwards: [
      { name: "Sadio MANE", number: 10 }, { name: "Ismaila SARR", number: 18 }, { name: "Nicolas JACKSON", number: 7 }, { name: "Iliman NDIAYE", number: 13 }, { name: "Habib DIALLO", number: 20 }
    ]
  },
  "Morocco": {
    Goalkeepers: [
      { name: "Yassine BOUNOU", number: 1 }, { name: "Munir MOHAMEDI", number: 12 }, { name: "El Mehdi BENABID", number: 22 }
    ],
    Defenders: [
      { name: "Achraf HAKIMI", number: 2 }, { name: "Nayef AGUERD", number: 6 }, { name: "Romain SAISS", number: 6 }, { name: "Noussair MAZRAOUI", number: 3 }, { name: "Yahia ATTIYAT ALLAH", number: 25 }
    ],
    Midfielders: [
      { name: "Sofyan AMRABAT", number: 4 }, { name: "Azzedine OUNAHI", number: 8 }, { name: "Bilal EL KHANNOUSS", number: 23 }, { name: "Ismael SAEBARI", number: 11 }, { name: "Amir RICHARDSON", number: 24 }
    ],
    Forwards: [
      { name: "Hakim ZIYECH", number: 7 }, { name: "Youssef EN-NESYRI", number: 19 }, { name: "Brahim DIAZ", number: 10 }, { name: "Amine ADLI", number: 21 }, { name: "Ayoub EL KAABI", number: 20 }
    ]
  },
  "Ecuador": {
    Goalkeepers: [
      { name: "Alexander DOMINGUEZ", number: 22 }, { name: "Hernan GALINDEZ", number: 1 }, { name: "Moises RAMIREZ", number: 12 }
    ],
    Defenders: [
      { name: "Piero HINCAPIE", number: 3 }, { name: "Willian PACHO", number: 6 }, { name: "Felix TORRES", number: 2 }, { name: "Angelo PRECIADO", number: 17 }, { name: "Jose HURTADO", number: 4 }
    ],
    Midfielders: [
      { name: "Moises CAICEDO", number: 23 }, { name: "Kendry PAEZ", number: 10 }, { name: "Carlos GRUEZO", number: 8 }, { name: "Alan FRANCO", number: 21 }, { name: "Joao ORTIZ", number: 16 }
    ],
    Forwards: [
      { name: "Enner VALENCIA", number: 13 }, { name: "Jeremy SARMIENTO", number: 16 }, { name: "Kevin RODRIGUEZ", number: 11 }, { name: "John YEBOAH", number: 9 }, { name: "Jordy CAICEDO", number: 19 }
    ]
  },
  "Canada": {
    Goalkeepers: [
      { name: "Maxime CREPEAU", number: 16 }, { name: "Dayne ST. CLAIR", number: 1 }, { name: "Tom MCGILL", number: 22 }
    ],
    Defenders: [
      { name: "Alphonso DAVIES", number: 19 }, { name: "Alistair JOHNSTON", number: 2 }, { name: "Moise BOMBITO", number: 15 }, { name: "Derek CORNELIUS", number: 13 }, { name: "Kamal MILLER", number: 4 }
    ],
    Midfielders: [
      { name: "Stephen EUSTAQUIO", number: 7 }, { name: "Ismael KONE", number: 8 }, { name: "Jonathan OSORIO", number: 21 }, { name: "Mathieu CHOINIERE", number: 24 }, { name: "Samuel PIETTE", number: 6 }
    ],
    Forwards: [
      { name: "Jonathan DAVID", number: 10 }, { name: "Cyle LARIN", number: 9 }, { name: "Tajon BUCHANAN", number: 17 }, { name: "Jacob SHAFFELBURG", number: 14 }, { name: "Liam MILLAR", number: 23 }
    ]
  },
  "Korea Republic": {
    Goalkeepers: [
      { name: "Jo HYEON-WOO", number: 21 }, { name: "Kim SEUNG-GYU", number: 1 }, { name: "Song BUM-KEUN", number: 12 }
    ],
    Defenders: [
      { name: "Kim MIN-JAE", number: 4 }, { name: "Seol YOUNG-WOO", number: 22 }, { name: "Kim YOUNG-GWON", number: 19 }, { name: "Lee KEE-JE", number: 2 }, { name: "Jung SEUNG-HYUN", number: 15 }
    ],
    Midfielders: [
      { name: "Hwang IN-BEOM", number: 6 }, { name: "Lee KANG-IN", number: 18 }, { name: "Lee JAE-SUNG", number: 10 }, { name: "Jeong WOO-YEONG", number: 17 }, { name: "Park YONG-WOO", number: 5 }
    ],
    Forwards: [
      { name: "Son HEUNG-MIN", number: 7 }, { name: "Hwang HEE-CHAN", number: 11 }, { name: "Cho GUE-SUNG", number: 9 }, { name: "Oh HYEON-GYU", number: 20 }, { name: "Joo MIN-KYU", number: 16 }
    ]
  },
  "Norway": {
    Goalkeepers: [
      { name: "Orjan NYLAND", number: 1 }, { name: "Egil SELVIK", number: 12 }, { name: "Mathias DYNGELAND", number: 21 }
    ],
    Defenders: [
      { name: "Leo OSTIGARD", number: 4 }, { name: "Kristoffer AJER", number: 3 }, { name: "Julian RYERSON", number: 14 }, { name: "Marcus PEDERSEN", number: 2 }, { name: "Birger MELING", number: 5 }
    ],
    Midfielders: [
      { name: "Martin ODEGAARD", number: 10 }, { name: "Sander BERGE", number: 8 }, { name: "Oscar BOBB", number: 22 }, { name: "Antonio NUSA", number: 20 }, { name: "Kristian THORSTVEDT", number: 18 }
    ],
    Forwards: [
      { name: "Erling HAALAND", number: 9 }, { name: "Alexander SORLOTH", number: 19 }, { name: "Jorgen STRAND LARSEN", number: 11 }, { name: "Aron DONNUM", number: 15 }
    ]
  },
  "Türkiye": {
    Goalkeepers: [
      { name: "Mert GUNOK", number: 1 }, { name: "Altay BAYINDIR", number: 12 }, { name: "Ugurcan CAKIR", number: 23 }
    ],
    Defenders: [
      { name: "Merih DEMIRAL", number: 3 }, { name: "Abdulkerim BARDAKCI", number: 14 }, { name: "Ferdi KADIOGLU", number: 20 }, { name: "Mert MULDUR", number: 18 }, { name: "Kaan AYHAN", number: 22 }
    ],
    Midfielders: [
      { name: "Hakan CALHANOGLU", number: 10 }, { name: "Arda GULER", number: 8 }, { name: "Orkun KOKCU", number: 6 }, { name: "Ismail YUKSEK", number: 16 }, { name: "Salih OZCAN", number: 15 }
    ],
    Forwards: [
      { name: "Baris Alper YILMAZ", number: 21 }, { name: "Kenan YILDIZ", number: 19 }, { name: "Kerem AKTURKOGLU", number: 7 }, { name: "Cenk TOSUN", number: 9 }
    ]
  },
  "Austria": {
    Goalkeepers: [
      { name: "Patrick PENTZ", number: 13 }, { name: "Heinz LINDNER", number: 1 }, { name: "Niklas HEDL", number: 12 }
    ],
    Defenders: [
      { name: "Stefan POSCH", number: 5 }, { name: "Kevin DANSO", number: 4 }, { name: "Philipp LIENHART", number: 15 }, { name: "Maximilian WOBER", number: 2 }, { name: "Phillipp MWENE", number: 16 }
    ],
    Midfielders: [
      { name: "Marcel SABITZER", number: 9 }, { name: "Konrad LAIMER", number: 20 }, { name: "Christoph BAUMGARTNER", number: 19 }, { name: "Nicolas SEIWALD", number: 6 }, { name: "Romano SCHMID", number: 18 }
    ],
    Forwards: [
      { name: "Marko ARNAUTOVIC", number: 7 }, { name: "Michael GREGORITSCH", number: 11 }, { name: "Andreas WEIMANN", number: 14 }, { name: "Marco GRULL", number: 21 }
    ]
  },
  "Poland": {
    Goalkeepers: [
      { name: "Wojciech SZCZESNY", number: 1 }, { name: "Lukasz SKORUPSKI", number: 12 }, { name: "Marcin BULKA", number: 22 }
    ],
    Defenders: [
      { name: "Jakub KIWIOR", number: 14 }, { name: "Jan BEDNAREK", number: 5 }, { name: "Pawel DAWIDOWICZ", number: 3 }, { name: "Przemyslaw FRANKOWSKI", number: 19 }, { name: "Nicola ZALEWSKI", number: 21 }
    ],
    Midfielders: [
      { name: "Piotr ZIELINSKI", number: 10 }, { name: "Sebastian SZYMANSKI", number: 11 }, { name: "Jakub MODER", number: 8 }, { name: "Bartosz SLISZ", number: 24 }, { name: "Jakub PIOTROWSKI", number: 6 }
    ],
    Forwards: [
      { name: "Robert LEWANDOWSKI", number: 9 }, { name: "Karol SWIDERSKI", number: 16 }, { name: "Krzysztof PIATEK", number: 23 }, { name: "Adam BUKSA", number: 14 }
    ]
  },
  "Australia": {
    Goalkeepers: [
      { name: "Maty RYAN", number: 1 }, { name: "Joe GAUCI", number: 18 }, { name: "Cameron BURGESS", number: 12 }
    ],
    Defenders: [
      { name: "Harry SOUTTAR", number: 19 }, { name: "Kye ROWLES", number: 4 }, { name: "Aziz BEHICH", number: 16 }, { name: "Nathaniel ATKINSON", number: 3 }, { name: "Gethin JONES", number: 2 }
    ],
    Midfielders: [
      { name: "Jackson IRVINE", number: 22 }, { name: "Riley MCGREE", number: 14 }, { name: "Keanu BACCUS", number: 17 }, { name: "Connor METCALFE", number: 8 }, { name: "Aiden O'NEILL", number: 13 }
    ],
    Forwards: [
      { name: "Craig GOODWIN", number: 23 }, { name: "Mitchell DUKE", number: 15 }, { name: "Martin BOYLE", number: 6 }, { name: "Kusini YENGI", number: 9 }
    ]
  },
  "Scotland": {
    Goalkeepers: [
      { name: "Angus GUNN", number: 1 }, { name: "Liam KELLY", number: 12 }, { name: "Zander CLARK", number: 21 }
    ],
    Defenders: [
      { name: "Andy ROBERTSON", number: 3 }, { name: "Kieran TIERNEY", number: 6 }, { name: "Grant HANLEY", number: 5 }, { name: "Jack HENDRY", number: 13 }, { name: "Anthony RALSTON", number: 2 }
    ],
    Midfielders: [
      { name: "Scott MCTOMINAY", number: 4 }, { name: "John MCGINN", number: 7 }, { name: "Callum MCGREGOR", number: 8 }, { name: "Billy GILMOUR", number: 14 }, { name: "Ryan CHRISTIE", number: 11 }
    ],
    Forwards: [
      { name: "Che ADAMS", number: 10 }, { name: "Lawrence SHANKLAND", number: 19 }, { name: "James FORREST", number: 20 }, { name: "Tommy CONWAY", number: 9 }
    ]
  }
  };