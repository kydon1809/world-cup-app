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
    }
  };