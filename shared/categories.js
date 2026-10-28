/**
 * Universal Multi-Category Catalog
 * Categories: Anime & Manga, Movies & Cinema, Video Games, Sports & Football, Hip-Hop & Music
 * Powers: Connect 5, Imposter, Scale Versus, Crucible, 60s Speedrun
 */

const CATEGORIES = {
  ANIME: 'anime',
  MOVIES: 'movies',
  GAMING: 'gaming',
  SPORTS: 'sports',
  MUSIC: 'music'
};

const CATEGORY_NAMES = {
  anime: 'Anime & Manga',
  movies: 'Movies & Cinema',
  gaming: 'Video Games',
  sports: 'Sports & Football',
  music: 'Music & Hip-Hop'
};

// 1. CONNECT 5 DATA PACKS (Character + 5 Stats)
const CONNECT5_DATA = {
  anime: [
    {
      name: 'Monkey D. Luffy',
      series: 'One Piece',
      puzzles: [
        { number: '5th', correctLabel: 'Fifth Emperor of the Sea Announcement', options: ['Fifth Emperor of the Sea Announcement', 'Number of Devil Fruit Gears Unlocked', 'Ranking in Marineford Priority', 'Order He Escaped Impel Down'] },
        { number: '10', correctLabel: 'Target Number of Core Straw Hat Crewmembers', options: ['Target Number of Core Straw Hat Crewmembers', 'Shadows Absorbed in Nightmare Form', 'Minutes Gear Fourth Boundman Lasts', 'Supernovas on Sabaody'] },
        { number: '30,000,000', correctLabel: 'First Ever Bounty Post-Arlong Park (Berries)', options: ['First Ever Bounty Post-Arlong Park (Berries)', 'Bounty After Alabasta Arc', 'Straw Hat Price Given by Shanks', 'Captain Kuro Bounty'] },
        { number: '1,500,000,000', correctLabel: 'Bounty Post-Whole Cake Island (Berries)', options: ['Bounty Post-Whole Cake Island (Berries)', 'Post-Dressrosa Bounty', 'Katakuri Defeat Bonus', 'Price of Gomu Gomu no Mi'] },
        { number: '3,000,000,000', correctLabel: 'Current Yonko Bounty After Defeating Kaido', options: ['Current Yonko Bounty After Defeating Kaido', 'Whitebeard Bounty Value', 'Roger Legend Bounty', 'Cross Guild Marine Bounty'] }
      ]
    },
    {
      name: 'Son Goku',
      series: 'Dragon Ball Z',
      puzzles: [
        { number: '4', correctLabel: 'Four-Star Dragon Ball from Grandpa Gohan', options: ['Four-Star Dragon Ball from Grandpa Gohan', 'Number of Super Saiyan Form Tiers in Z', 'Kaioken Max Multiplier with King Kai', 'Androids Slayed in Cell Games'] },
        { number: '7', correctLabel: 'Number of Dragon Balls Needed to Summon Shenron', options: ['Number of Dragon Balls Needed to Summon Shenron', 'Universe 7 Team Tournament Position', 'Days in Hyperbolic Time Chamber', 'Masters Trained Under in Canon'] },
        { number: '50x', correctLabel: 'Base Power Multiplier for Super Saiyan 1', options: ['Base Power Multiplier for Super Saiyan 1', 'Gravity Resistance on Way to Namek', 'Kaioken Burst Against Frieza', 'Spirit Bomb Energy Rate'] },
        { number: '9000', correctLabel: 'Scouter Reading Level ("It\'s Over 9000!")', options: ['Scouter Reading Level ("It\'s Over 9000!")', 'Nappa Base Power Level', 'Master Roshi Age', 'Snake Way Road Length in Miles'] },
        { number: '3', correctLabel: 'Super Saiyan 3 Form Debut Against Majin Buu', options: ['Super Saiyan 3 Form Debut Against Majin Buu', 'Times Passed to the Other World', 'Sons in the Son Family Household', 'Minutes of Fusion Dance Limit'] }
      ]
    },
    {
      name: 'Naruto Uzumaki',
      series: 'Naruto',
      puzzles: [
        { number: '7th', correctLabel: 'Seventh Hokage of the Hidden Leaf Village', options: ['Seventh Hokage of the Hidden Leaf Village', 'Number of Tails Unlocked in Pain Fight', 'Team Number Designation with Kakashi', 'Number of S-Rank Jutsu Mastered'] },
        { number: '9', correctLabel: 'Nine Tails Sealed Inside His Jinchuriki Seal', options: ['Nine Tails Sealed Inside His Jinchuriki Seal', 'Number of Ninja Academy Graduation Attempts', 'Years Trained Under Jiraiya', 'Jonin Exam Attempt Number'] },
        { number: '1000', correctLabel: 'Multi-Shadow Clone Technique Standard Body Count', options: ['Multi-Shadow Clone Technique Standard Body Count', 'Chakra Rasengan Volts Output', 'Bowls of Ichiraku Ramen Eaten', 'Days of Sage Mode Training'] },
        { number: '4th', correctLabel: 'Fourth Hokage Minato Namikaze as Biological Father', options: ['Fourth Hokage Minato Namikaze as Biological Father', 'Fourth Great Ninja War Central Vanguard', 'Ninja War Phase Arrival', 'Chakra Nature Affinity Tier'] },
        { number: '7', correctLabel: 'Team 7 Member with Sasuke, Sakura, and Kakashi', options: ['Team 7 Member with Sasuke, Sakura, and Kakashi', 'Gates Unlocked Against Madara', 'Days Left for Chunin Prelims', 'Hokage Stone Faces on Mountain'] }
      ]
    }
  ],
  movies: [
    {
      name: 'Darth Vader',
      series: 'Star Wars',
      puzzles: [
        { number: '1977', correctLabel: 'Year of Cinematic Debut in A New Hope', options: ['Year of Cinematic Debut in A New Hope', 'Empire Strikes Back Box Office Release', 'Return of the Jedi Re-Release Year', 'Year George Lucas Wrote First Script'] },
        { number: '4', correctLabel: 'Episode IV: First Screen Appearance', options: ['Episode IV: First Screen Appearance', 'Number of Cybernetic Limbs', 'Death Stars Commanded', 'Sith Inquisitors Trained Personally'] },
        { number: '2nd', correctLabel: 'Second-in-Command to Emperor Palpatine', options: ['Second-in-Command to Emperor Palpatine', 'Rank Among Greatest AFI Movie Villains', 'Order of Death on Second Death Star', 'Duel with Obi-Wan on Mustafar'] },
        { number: '6', correctLabel: 'Episode VI: Return of the Jedi Redemption', options: ['Episode VI: Return of the Jedi Redemption', 'Minutes of Screen Time in A New Hope', 'Lightsaber Form VI Mastery', 'Star Destroyers in Personal Fleet'] },
        { number: '136.5M', correctLabel: 'Adjusted Lifetime US Box Office of Debut', options: ['Adjusted Lifetime US Box Office of Debut', 'Imperial Credits Spent on Armor', 'Troopers Under 501st Legion', 'Midichlorian Count in Canon'] }
      ]
    },
    {
      name: 'The Joker (Heath Ledger)',
      series: 'The Dark Knight (2008)',
      puzzles: [
        { number: '2008', correctLabel: 'Release Year of The Dark Knight', options: ['Release Year of The Dark Knight', 'Year Christopher Nolan Began Filming', 'Year Ledger Won Posthumous Academy Award', 'Year of Batman Begins Debut'] },
        { number: '1B', correctLabel: 'Over $1 Billion Worldwide Box Office Benchmark', options: ['Over $1 Billion Worldwide Box Office Benchmark', 'Bounty Placed by Gotham Mob', 'Stolen Bank Cash from Opening Scene', 'Citizens Held Hostage on Ferries'] },
        { number: '2', correctLabel: 'Two Ferries Wired with Explosives in Climax', options: ['Two Ferries Wired with Explosives in Climax', 'Number of Times Caught by Gordon', 'Scars on Face Creating the Smile', 'RPG Rockets Fired at SWAT Convoy'] },
        { number: '1', correctLabel: 'Academy Award for Best Supporting Actor', options: ['Academy Award for Best Supporting Actor', 'Number of Calling Cards Left at Crime Scenes', 'Minutes Pencil Magic Trick Lasts', 'Day of Hostage Video Release'] },
        { number: '81', correctLabel: 'Number of Awards Won by the Performance', options: ['Number of Awards Won by the Performance', 'Number of Henchmen in Joker Crew', 'Minutes of Film Screen Time', 'Hospital Wing Detonation Sequence Code'] }
      ]
    },
    {
      name: 'Tony Stark (Iron Man)',
      series: 'Marvel Cinematic Universe',
      puzzles: [
        { number: '2008', correctLabel: 'Year MCU Launched with Iron Man', options: ['Year MCU Launched with Iron Man', 'Year Robert Downey Jr. Cast', 'Year Stark Industries Founded', 'Year of Avengers Initiative Assembly'] },
        { number: '85', correctLabel: 'Mark LXXXV: Final Nano-Armor in Endgame', options: ['Mark LXXXV: Final Nano-Armor in Endgame', 'Arc Reactor Energy Yield in GigaWatts', 'Percentage of Stark Stock Owned', 'Hulkbuster Defense Units Built'] },
        { number: '3000', correctLabel: '"I Love You 3000" Iconic Line to Morgan', options: ['"I Love You 3000" Iconic Line to Morgan', 'Total Micro-Missiles Fired in Gulmira', 'Stark Industries Tower Height in Feet', 'Watts Output of Paladium Core'] },
        { number: '6', correctLabel: 'All 6 Infinity Stones Wielded in Final Snap', options: ['All 6 Infinity Stones Wielded in Final Snap', 'Number of Solo and Ensemble Appearances', 'Minutes Left on Arc Battery in Cave', 'Original Avengers Founding Member Count'] },
        { number: '2.8B', correctLabel: 'Avengers: Endgame Worldwide Box Office ($)', options: ['Avengers: Endgame Worldwide Box Office ($)', 'Stark Industries Net Worth Valuation', 'Total Armor Fleet Drone Count', 'Nano-Particle Density Count'] }
      ]
    }
  ],
  gaming: [
    {
      name: 'Master Chief (John-117)',
      series: 'Halo (Xbox)',
      puzzles: [
        { number: '117', correctLabel: 'Spartan-II Tag Designation (John-117)', options: ['Spartan-II Tag Designation (John-117)', 'Armor Weight in Kilograms', 'Covenant Ships Vaporized', 'Pillar of Autumn Landing Dock ID'] },
        { number: '2001', correctLabel: 'Release Year of Halo: Combat Evolved', options: ['Release Year of Halo: Combat Evolved', 'Year Bungie Acquired by Microsoft', 'In-Universe Year of Reach Fall', 'Year Master Chief Awoke on Forward Unto Dawn'] },
        { number: '7', correctLabel: 'Sacred Rings in Halo Array Superweapon', options: ['Sacred Rings in Halo Array Superweapon', 'Missions in Combat Evolved Campaign', 'Bungie Studio Lucky Number', 'Covenant Hierarch Prophet Count'] },
        { number: '2552', correctLabel: 'In-Universe Year Human-Covenant War Ended', options: ['In-Universe Year Human-Covenant War Ended', 'Year Spartan Project Initiated', 'Original Slipspace Drive Speed in Lightyears', 'Forward Unto Dawn Hull Class'] },
        { number: '2', correctLabel: 'Two Primary Weapons Carried Simultaneously', options: ['Two Primary Weapons Carried Simultaneously', 'Number of AI Microchips Slotted in Helmet', 'Active Energy Shields Layer Count', 'Arbiter Allies in Co-Op'] }
      ]
    },
    {
      name: 'Kratos',
      series: 'God of War (PlayStation)',
      puzzles: [
        { number: '2005', correctLabel: 'Release Year of First God of War on PS2', options: ['Release Year of First God of War on PS2', 'Year of God of War III PS3 Debut', 'Year Nordic Saga Began in Norway', 'Santa Monica Studio Founding Year'] },
        { number: '2', correctLabel: 'Twin Blades of Chaos Forged by Ares', options: ['Twin Blades of Chaos Forged by Ares', 'Pantheons Systematically Conquered (Greek & Norse)', 'Number of Biological Children', 'Sons Fathered in Midgard'] },
        { number: '1', correctLabel: 'Leviathan Axe Forged by Huldra Brothers', options: ['Leviathan Axe Forged by Huldra Brothers', 'Number of Gods Spared in Greek Pantheon', 'Game of the Year Awards Won in 2018', 'Guardian Shield Armor Rating Tier'] },
        { number: '2018', correctLabel: 'Game of the Year Award Winner (GOTY)', options: ['Game of the Year Award Winner (GOTY)', 'Release Date of God of War Ragnarok', 'Year Norse Lore Direction Finalized', 'PS4 Pro Bundle Console Year'] },
        { number: '9', correctLabel: 'Nine Realms of Norse Mythology Explored', options: ['Nine Realms of Norse Mythology Explored', 'Olympian Gods Slain in God of War III', 'Valkyries Defeated in High-Difficulty Runs', 'Runic Attacks Equippable at Once'] }
      ]
    },
    {
      name: 'Super Mario',
      series: 'Nintendo',
      puzzles: [
        { number: '1981', correctLabel: 'Debut Year as "Jumpman" in Donkey Kong', options: ['Debut Year as "Jumpman" in Donkey Kong', 'Year Super Mario Bros NES Released', 'Famicom Japanese Market Launch Year', 'Year Shigeru Miyamoto Created Character'] },
        { number: '1985', correctLabel: 'Super Mario Bros. Landmark NES Release', options: ['Super Mario Bros. Landmark NES Release', 'Super Mario 64 3D Platformer Release', 'Game Boy Handheld Debut Year', 'Year Princess Peach Kidnapped First Time'] },
        { number: '120', correctLabel: 'Power Stars to Collect in Super Mario 64', options: ['Power Stars to Collect in Super Mario 64', 'Coins Required for Hidden Green Mushroom', 'Levels Across Original NES Worlds', 'Shine Sprites in Isle Delfino'] },
        { number: '8', correctLabel: 'Original Worlds in Super Mario Bros. (1 to 8)', options: ['Original Worlds in Super Mario Bros. (1 to 8)', 'Number of Playable Characters in Mario Kart 64', 'Power-Up Costumes in Super Mario Bros 3', 'Koopalings Under Bowser Command'] },
        { number: '100', correctLabel: 'Coins Required to Earn an Extra Life (1-UP)', options: ['Coins Required to Earn an Extra Life (1-UP)', 'Seconds Given for Fast Timed Underground Stages', 'Yellow Coins in Bob-Omb Battlefield Star', 'Level Cap in Super Mario Odyssey'] }
      ]
    }
  ],
  sports: [
    {
      name: 'Lionel Messi',
      series: 'Football / Argentina',
      puzzles: [
        { number: '8', correctLabel: 'Ballon d\'Or Trophies Won (All-Time Record)', options: ['Ballon d\'Or Trophies Won (All-Time Record)', 'Champions League Medals with Barcelona', 'Goals Scored in 2022 World Cup Tournament', 'Copa America Final Appearances'] },
        { number: '91', correctLabel: 'World Record Goals Scored in Single Calendar Year (2012)', options: ['World Record Goals Scored in Single Calendar Year (2012)', 'Career International Goals for Argentina', 'League Matches Unbeaten at Camp Nou', 'Free Kick Conversion Percentage Record'] },
        { number: '10', correctLabel: 'Iconic Jersey Number for Argentina and Barca', options: ['Iconic Jersey Number for Argentina and Barca', 'La Liga Titles Won with FC Barcelona', 'Hat-Tricks Scored in El Clasico Rivalries', 'Decades at Top Tier Professional Football'] },
        { number: '2022', correctLabel: 'FIFA World Cup Champion in Qatar', options: ['FIFA World Cup Champion in Qatar', 'Year of Barcelona Emotional Farewell', 'Copa America Win at Maracana Stadium', 'Inter Miami MLS Transfer Debut'] },
        { number: '4', correctLabel: 'UEFA Champions League Titles Won with Barcelona', options: ['UEFA Champions League Titles Won with Barcelona', 'World Cups Played in Career', 'Olympic Gold Medals Won for Argentina', 'Golden Boot European Awards in 30s'] }
      ]
    },
    {
      name: 'Cristiano Ronaldo',
      series: 'Football / Portugal',
      puzzles: [
        { number: '7', correctLabel: 'Iconic "CR7" Jersey Number Across Clubs', options: ['Iconic "CR7" Jersey Number Across Clubs', 'Champions Leagues Won in Total Career', 'Ballon d\'Or Awards in Personal Showcase', 'World Cup Tournaments Played In'] },
        { number: '5', correctLabel: 'UEFA Champions League Titles Won (Record Holder)', options: ['UEFA Champions League Titles Won (Record Holder)', 'Number of European Golden Boots Awarded', 'World Cup Goals Scored in Single Campaign', 'Clubs Played for in Professional Career'] },
        { number: '450', correctLabel: 'All-Time Record Goals for Real Madrid in 438 Games', options: ['All-Time Record Goals for Real Madrid in 438 Games', 'International Caps for Portugal Men\'s Team', 'Manchester United Career Appearances', 'Minutes Played Across Five World Cups'] },
        { number: '2016', correctLabel: 'UEFA European Championship Trophy with Portugal', options: ['UEFA European Championship Trophy with Portugal', 'Year of Four-Peat Champions League Final', 'Year Transferred to Juventus Turin', 'Real Madrid Decima Victory in Lisbon'] },
        { number: '900+', correctLabel: 'First Ever Official Professional Player to 900 Goals', options: ['First Ever Official Professional Player to 900 Goals', 'Penalties Converted in All Competitions', 'Club Career Games Won as Captain', 'Career Header Goals Recorded'] }
      ]
    },
    {
      name: 'LeBron James',
      series: 'Basketball / NBA',
      puzzles: [
        { number: '23', correctLabel: 'Iconic Cleveland Cavaliers & Lakers Jersey Number', options: ['Iconic Cleveland Cavaliers & Lakers Jersey Number', 'Years in NBA League History by 2026', 'Consecutive Points Scored in Detroit ECF', 'All-NBA First Team Selection Count'] },
        { number: '4', correctLabel: 'NBA Championships & Finals MVP Awards Won', options: ['NBA Championships & Finals MVP Awards Won', 'Olympic Gold Medals Won with Team USA', 'Franchises Played for in Career', 'Decades as All-Star Starter'] },
        { number: '40,000+', correctLabel: 'First Player in NBA History to 40K Career Points', options: ['First Player in NBA History to 40K Career Points', 'Career Defensive Rebounds Pulled Down', 'Minutes Logged in Regular Season Play', 'Total Field Goals Attempted in Career'] },
        { number: '2016', correctLabel: 'Historic 3-1 Comeback NBA Championship for Cleveland', options: ['Historic 3-1 Comeback NBA Championship for Cleveland', 'Miami Heat Second Title Victory Year', 'Year Drafted #1 Overall from St. Vincent-St. Mary', 'Bubble Championship in Orlando'] },
        { number: '20', correctLabel: 'Record 20 Consecutive NBA All-Star Selections', options: ['Record 20 Consecutive NBA All-Star Selections', 'Points Per Game Career Floor Average', 'Tripe-Doubles Recorded in Finals Play', 'Age at First NBA Regular Season Game'] }
      ]
    }
  ],
  music: [
    {
      name: 'Eminem (Marshall Mathers)',
      series: 'Hip-Hop / Rap',
      puzzles: [
        { number: '8', correctLabel: '8 Mile: Landmark Semi-Autobiographical Film', options: ['8 Mile: Landmark Semi-Autobiographical Film', 'Diamond Certified Studio Albums Count', 'Consecutive Number 1 Albums on Billboard 200', 'Grammy Awards Won for Best Rap Song'] },
        { number: '2000', correctLabel: 'The Marshall Mathers LP Historic Debut Release Year', options: ['The Marshall Mathers LP Historic Debut Release Year', 'Year Slim Shady EP Discovered by Dr. Dre', 'The Eminem Show Worldwide Tour Year', 'Academy Award Win for Lose Yourself'] },
        { number: '15', correctLabel: 'Total Career Grammy Awards Won Across Decades', options: ['Total Career Grammy Awards Won Across Decades', 'Weeks "Lose Yourself" Spent at Billboard #1', 'Platinum Plaques Earned by Curtain Call', 'Syllables Rhymed Per Second in Rap God'] },
        { number: '9.6', correctLabel: 'Words Per Second Reached in "Godzilla" Fast Verse', options: ['Words Per Second Reached in "Godzilla" Fast Verse', 'Minutes in Epic Length Track Stan', 'Million Sales in First Week of MMLP', 'Million YouTube Subscribers Milestone'] },
        { number: '1st', correctLabel: 'First Hip-Hop Artist to Win Academy Award for Best Song', options: ['First Hip-Hop Artist to Win Academy Award for Best Song', 'First Rap Act Inducted into Songwriters Hall', 'First Rapper with Two RIAA Digital Diamonds', 'First Rapper to Headline Super Bowl LVI'] }
      ]
    },
    {
      name: 'Michael Jackson',
      series: 'Pop Music',
      puzzles: [
        { number: '1982', correctLabel: 'Thriller Release Year (Best-Selling Album of All Time)', options: ['Thriller Release Year (Best-Selling Album of All Time)', 'Year Moonwalk First Performed at Motown 25', 'Off The Wall Studio Master Year', 'Year Bad World Tour Kicked Off in Tokyo'] },
        { number: '1', correctLabel: 'One Glove: Iconic White Sequined Right-Hand Glove', options: ['One Glove: Iconic White Sequined Right-Hand Glove', 'Number of Billboard #1 Hits on Bad Album Alone', 'Super Bowl Halftime Show Watershed Year', 'Lifetime Grammy Legend Award Won'] },
        { number: '13', correctLabel: 'Grammy Awards Won in Solo Recording Career', options: ['Grammy Awards Won in Solo Recording Career', 'Weeks Billie Jean Led Billboard Hot 100', 'Top 10 Hits Released from Thriller Tracklist', 'Guinness World Records Held at Peak'] },
        { number: '70M+', correctLabel: 'Thriller Worldwide Estimated Album Sales Benchmark', options: ['Thriller Worldwide Estimated Album Sales Benchmark', 'Viewers Who Watched Motown 25 Moonwalk', 'Tickets Sold on Historic Bad World Tour', 'Dollars Donated to Humanitarian Charities'] },
        { number: '8', correctLabel: 'Grammy Awards Won in Single Night (1984 Record)', options: ['Grammy Awards Won in Single Night (1984 Record)', 'Brothers and Sisters in Jackson Family Band', 'Minutes in Uncut Thriller Music Film', 'Decades as Billboard Hot 100 Chart Topper'] }
      ]
    },
    {
      name: 'Drake (Aubrey Graham)',
      series: 'Hip-Hop / R&B',
      puzzles: [
        { number: '6', correctLabel: 'The 6: Global Trademark Nickname for Hometown Toronto', options: ['The 6: Global Trademark Nickname for Hometown Toronto', 'Grammy Awards Won Across Streaming Era', 'Billboard #1 Singles from Scorpion Album', 'OVO Sound Founding Label Partners'] },
        { number: '300+', correctLabel: 'Most Billboard Hot 100 Entries in Music History', options: ['Most Billboard Hot 100 Entries in Music History', 'Shows Performed on Aubrey & The Three Migos', 'Weeks Spent Inside Top 10 Streaming Charts', 'RIAA Gold and Platinum Certifications'] },
        { number: '2011', correctLabel: 'Take Care Release Year (Grammy for Best Rap Album)', options: ['Take Care Release Year (Grammy for Best Rap Album)', 'So Far Gone Breakthrough Mixtape Year', 'Year OVO Sound Record Label Established', 'Year Views Sold One Million First Week'] },
        { number: '13', correctLabel: 'Number 1 Billboard Hot 100 Singles Achieved', options: ['Number 1 Billboard Hot 100 Singles Achieved', 'Studio Albums and Mixtapes Reaching #1', 'Weeks "One Dance" Ruled Hot 100 Chart', 'Nominations at 2017 Billboard Music Awards'] },
        { number: '50B+', correctLabel: 'First Artist in History to Pass 50 Billion Spotify Streams', options: ['First Artist in History to Pass 50 Billion Spotify Streams', 'Global Equivalent Album Units Distributed', 'Views Count Across Official VEVO Channel', 'Digital Singles Sold in United States'] }
      ]
    }
  ]
};

// 4. CRUCIBLE DATA PACKS ($15 Draft System)
const CRUCIBLE_DATA = {
  anime: {
    scenario: "Zone 44: Forest of Death — Survival against Orochimaru's Curse Mark Apostles",
    sockets: [
      {
        id: 'technique',
        title: 'SOCKET 1: CORE TECHNIQUE',
        options: [
          { cost: 1, name: 'Paper Bomb Wire Detonation', desc: 'Cheap zoning; setup explosive tripwires across branches.' },
          { cost: 2, name: 'Boogie Woogie (Clap Warp)', desc: 'Instant spatial swap with any cursed object or ally.' },
          { cost: 3, name: 'Shadow Possession (Kagemane)', desc: 'Elastic shadow tether; paralyzes and mirrors damage.' },
          { cost: 4, name: 'Kamui / Dimensional Intangibility', desc: 'Phase body through attacks with 0.8s invulnerability.' },
          { cost: 5, name: 'Domain Expansion: Malevolent Shrine', desc: 'Guaranteed-hit spatial barrier with relentless slashing waves.' }
        ]
      },
      {
        id: 'hands',
        title: 'SOCKET 2: MARTIAL ARTS / HANDS',
        options: [
          { cost: 1, name: 'Street Boxing & Brawling', desc: 'Basic kinetic punches; reliable short-range knockback.' },
          { cost: 2, name: 'Gentle Fist (Juken)', desc: 'Injects chakra into tenketsu; drains enemy poise and stamina.' },
          { cost: 3, name: 'Dynamic Entry', desc: 'High-speed flying dropkick with +100% poise breakthrough.' },
          { cost: 4, name: 'Flowing Water Rock Smashing Fist', desc: 'Deflects incoming melee strikes with mirrored counter-force.' },
          { cost: 5, name: 'Eight Gates: Night Guy', desc: 'Sacrificial blood aura; distorts space with supersonic kicks.' }
        ]
      },
      {
        id: 'speed',
        title: 'SOCKET 3: SPEED & MOBILITY',
        options: [
          { cost: 1, name: 'Base Ninja Branch Sprint', desc: 'Standard horizontal ground sprint and branch hopping.' },
          { cost: 2, name: 'Body Flicker (Shunshin)', desc: 'Rapid linear burst dash leaving residual afterimages.' },
          { cost: 3, name: 'Flash Step (Shunpo)', desc: 'Instant elevated air jump across canopy tiers.' },
          { cost: 4, name: 'Gear Second (Blood Pump)', desc: 'Accelerated reflex state; +50% evasion and attack speed.' },
          { cost: 5, name: 'Flying Thunder God (Hiraishin)', desc: 'Instantaneous teleportation between marked formula seals.' }
        ]
      },
      {
        id: 'teammate',
        title: 'SOCKET 4: TEAMMATE / ALLY',
        options: [
          { cost: 1, name: 'Zenitsu Agatsuma', desc: 'God-speed Thunderclap & Flash blitz support.' },
          { cost: 2, name: 'Megumi Fushiguro', desc: 'Summons Divine Dog Totality and Nue electricity.' },
          { cost: 3, name: 'Todoroki Shoto', desc: 'Massive Glacier freeze walls and fire zoning.' },
          { cost: 4, name: 'Kakashi Hatake', desc: 'Sharingan tactical reads, Lightning Blade, and dog summons.' },
          { cost: 5, name: 'Gojo Satoru', desc: 'Untouchable Infinity shield and Hollow Purple nuke.' }
        ]
      }
    ]
  },
  movies: {
    scenario: "Avengers Compound Breach — Defense against Thanos Vanguard & Black Order",
    sockets: [
      {
        id: 'technique',
        title: 'SOCKET 1: SUPER WEAPON / TECH',
        options: [
          { cost: 1, name: 'Batarang Tactical Wire Grid', desc: 'Precision electro-shock cables and smoke screens.' },
          { cost: 2, name: 'Ghostbusters Proton Stream', desc: 'High-energy particle stream to tether and contain titans.' },
          { cost: 3, name: 'Vibranium Kinetic Shield', desc: 'Absorbs heavy kinetic impacts and releases shockwaves.' },
          { cost: 4, name: 'Mjolnir Lightning Channeling', desc: 'Summons thunder arcs and returns to hand on command.' },
          { cost: 5, name: 'Infinity Gauntlet 6-Stone Burst', desc: 'Cosmic beam weapon capable of disintegrating battle cruisers.' }
        ]
      },
      {
        id: 'hands',
        title: 'SOCKET 2: COMBAT DISCIPLINE',
        options: [
          { cost: 1, name: 'Bouncer Street Slugger', desc: 'Heavy haymakers and ground slams.' },
          { cost: 2, name: 'John Wick Gun-Fu', desc: 'Point-blank firearm transitions and close-quarters grapples.' },
          { cost: 3, name: 'Krav Maga Special Ops', desc: 'Disarming techniques and rapid throat strikes.' },
          { cost: 4, name: 'Black Widow Red Room Acrobatics', desc: 'Thigh takedowns and electric widow-bite shocks.' },
          { cost: 5, name: 'Matrix Gun-Kata & Bullet Time', desc: 'Defies gravity; dodge all supersonic ordnance effortlessly.' }
        ]
      },
      {
        id: 'speed',
        title: 'SOCKET 3: MOVEMENT & TRANSPORT',
        options: [
          { cost: 1, name: 'Bat-Grapple Gun', desc: 'Pulls user to rooftops and elevated perches.' },
          { cost: 2, name: 'Mandalorian Beskar Jetpack', desc: 'Sustained vertical flight and hover strafing.' },
          { cost: 3, name: 'Iron Man Repulsor Thrusters', desc: 'Supersonic flight and high-g banking maneuvers.' },
          { cost: 4, name: 'Sling Ring Spark Portal', desc: 'Instant gateway to any global location in 0.5s.' },
          { cost: 5, name: 'Quicksilver Super-Speed Dash', desc: 'Perception slowed to frozen halt; reposition the entire room.' }
        ]
      },
      {
        id: 'teammate',
        title: 'SOCKET 4: ALLY IN ARMS',
        options: [
          { cost: 1, name: 'Hawkeye (Clint Barton)', desc: 'Suppression fire with trick explosive and thermite arrows.' },
          { cost: 2, name: 'Chewbacca', desc: 'Heavy bowcaster artillery and brute Wookiee ragdoll tosses.' },
          { cost: 3, name: 'Wolverine (Logan)', desc: 'Berserker adamantium tank with hyper-regeneration.' },
          { cost: 4, name: 'Doctor Strange', desc: 'Mirror Dimension entrapment and Crimson Bands of Cyttorak.' },
          { cost: 5, name: 'Scarlet Witch (Wanda)', desc: 'Reality warping hex field that unravels titan machinery.' }
        ]
      }
    ]
  },
  gaming: {
    scenario: "The Citadel Core — Holding the Line against Flood Outbreak & Reapers",
    sockets: [
      {
        id: 'technique',
        title: 'SOCKET 1: ARSENAL & WEAPONRY',
        options: [
          { cost: 1, name: 'Plasma Grenade Stick', desc: 'Adheres to alien hide with timed 3-second detonation.' },
          { cost: 2, name: 'Blades of Chaos Flame Arcs', desc: 'Chained swinging slashes that incinerate surrounding swarms.' },
          { cost: 3, name: 'Diamond Sword Sharpness V', desc: 'High-durability enchanted edge with critical knockback.' },
          { cost: 4, name: 'Master Sword Beam Wave', desc: 'Full-health projectile arc that banishes corrupted evil.' },
          { cost: 5, name: 'BFG 9000 Argent Plasma Sphere', desc: 'Green sun projectile that vaporizes every bio-mass on screen.' }
        ]
      },
      {
        id: 'hands',
        title: 'SOCKET 2: COMBAT DOCTRINE',
        options: [
          { cost: 1, name: 'Minecraft Critical Jump Hit', desc: 'Vertical falling strike dealing bonus sweep damage.' },
          { cost: 2, name: 'Spartan Combat Shield Bash', desc: 'Deflects incoming fire and staggers charging heavies.' },
          { cost: 3, name: 'Witcher Pirouette & Parry', desc: 'Fluid dodging swordplay with Quen sign kinetic ward.' },
          { cost: 4, name: 'Doom Glory Kill Finisher', desc: 'Brutal melee execution that causes enemies to drop health.' },
          { cost: 5, name: 'Omnislash Limit Break', desc: 'Blinding aerial teleport sword blitz striking 15 times.' }
        ]
      },
      {
        id: 'speed',
        title: 'SOCKET 3: TRAVERSAL SYSTEM',
        options: [
          { cost: 1, name: 'Standard Sprint & Slide', desc: 'Low-profile floor slide under low obstacles.' },
          { cost: 2, name: 'Double Jump & Air Dash', desc: 'Mid-air momentum redirection and ledge grab.' },
          { cost: 3, name: 'Super Mushroom Dash', desc: 'Surge of speed with temporary brick-shattering poise.' },
          { cost: 4, name: 'Sonic Spin Dash Burst', desc: 'High-velocity ball sprint carving through enemy ranks.' },
          { cost: 5, name: 'Portal Gun Blue & Orange Links', desc: 'Momentum-conserving instantaneous quantum wormholes.' }
        ]
      },
      {
        id: 'teammate',
        title: 'SOCKET 4: CO-OP PARTNER',
        options: [
          { cost: 1, name: 'Luigi (Poltergust G-00)', desc: 'Vacuum suction to strip shields and slam minions.' },
          { cost: 2, name: 'Cortana Tactical AI', desc: 'Hacks enemy ballistic telemetry and predicts flank routes.' },
          { cost: 3, name: 'The Arbiter (Thel \'Vadam)', desc: 'Dual Energy Sword warrior with active camouflage ambush.' },
          { cost: 4, name: 'Geralt of Rivia', desc: 'Signs mastery (Igni fire, Aard shockwave) and silver blade.' },
          { cost: 5, name: 'Kratos (God of War)', desc: 'Spartan Rage juggernaut ripping titan armor with bare hands.' }
        ]
      }
    ]
  },
  sports: {
    scenario: "Wembley 90th Minute — Down 2-1 in UEFA Champions League Final Climax",
    sockets: [
      {
        id: 'technique',
        title: 'SOCKET 1: SIGNATURE WEAPON',
        options: [
          { cost: 1, name: 'Long Range Cross & Inshallah', desc: 'Floated high ball into the penalty box mixer.' },
          { cost: 2, name: 'Rainbow Flick over Defender', desc: 'Flashy samba skill move that beats tight fullback presses.' },
          { cost: 3, name: 'Tomahawk Dunk Power Play', desc: 'Overwhelming aerial verticality and glass-shattering poise.' },
          { cost: 4, name: 'Knuckleball 35-Yard Free Kick', desc: 'Unpredictable aerodynamic dip bypassing 5-man walls.' },
          { cost: 5, name: 'Left Foot Top-Bin Curler', desc: 'Mathematically unstoppable bending shot into upper 90.' }
        ]
      },
      {
        id: 'hands',
        title: 'SOCKET 2: PHYSICALITY & PRESS',
        options: [
          { cost: 1, name: 'Tactical Shirt Pull Foul', desc: 'Stops fast break counters at the cost of a yellow card.' },
          { cost: 2, name: 'Gegenpress Relentless Hunt', desc: 'Suffocates ball-carriers within 3 seconds of possession loss.' },
          { cost: 3, name: 'Post-Up Shoulder Bump', desc: 'Backs down physical markers to carve paint space.' },
          { cost: 4, name: 'Air Jordan 44-Inch Vertical Hangtime', desc: 'Suspends in mid-air above shot blockers to finish clean.' },
          { cost: 5, name: '900-Goal Fox in the Box Poacher', desc: 'Instantaneous penalty box positioning; always first to ball.' }
        ]
      },
      {
        id: 'speed',
        title: 'SOCKET 3: PACE & BURST',
        options: [
          { cost: 1, name: 'Midfield Box-to-Box Jog', desc: 'Consistent 12km match stamina covering ground.' },
          { cost: 2, name: 'First 5-Meter Explosive Acceleration', desc: 'Low center of gravity burst leaving markers in dust.' },
          { cost: 3, name: 'Fast-Break Rim Run', desc: 'End-to-end court transition in under 3.2 seconds.' },
          { cost: 4, name: 'Kylian 38 km/h Channel Sprint', desc: 'Supersonic foot race tearing behind high defensive lines.' },
          { cost: 5, name: 'Usain Bolt 9.58s Olympic Burner', desc: 'World record top-end velocity that makes opponents look still.' }
        ]
      },
      {
        id: 'teammate',
        title: 'SOCKET 4: CRUCIAL TEAMMATE',
        options: [
          { cost: 1, name: 'Neymar Jr (Skills & Flair)', desc: 'Draws fouls and creates chaos in defensive zones.' },
          { cost: 2, name: 'Kylian Mbappé (Counter Threat)', desc: 'Guaranteed outlet pass that pins opposition fullbacks deep.' },
          { cost: 3, name: 'LeBron James (Court General)', desc: 'Vision and pinpoint skip passes to the open shooter.' },
          { cost: 4, name: 'Cristiano Ronaldo (Clutch Header)', desc: 'Elevates above centre-backs for bullet 93rd-minute headers.' },
          { cost: 5, name: 'Lionel Messi (The Playmaker)', desc: 'Triangulates passes through needles and unlocks low blocks.' }
        ]
      }
    ]
  },
  music: {
    scenario: "Live Aid 100,000 Stadium — Headline Set against Rival Festival Giants",
    sockets: [
      {
        id: 'technique',
        title: 'SOCKET 1: LEAD ANTHEM',
        options: [
          { cost: 1, name: 'Catchy 15-Second Viral Hook', desc: 'Instant earworm that rings through smartphone feeds.' },
          { cost: 2, name: 'Chopped Soul Sample 808s', desc: 'Warm pitched-up vinyl vocals anchored by thumping bass.' },
          { cost: 3, name: 'West Coast G-Funk Synthesizer', desc: 'High-pitched sine wave leads that get lowriders bouncing.' },
          { cost: 4, name: 'Pulitzer Storytelling Narrative', desc: 'Conscious conceptual lyricism that moves arenas to silence.' },
          { cost: 5, name: 'Stadium Rock Arena Hook', desc: 'Universal singalong chorus echoing across 90,000 voices.' }
        ]
      },
      {
        id: 'hands',
        title: 'SOCKET 2: VOCAL DELIVERY & FLOW',
        options: [
          { cost: 1, name: 'Melodic Auto-Tune Croon', desc: 'Smooth reverberating emotional vocal layers.' },
          { cost: 2, name: 'Gritty Boom-Bap Punchlines', desc: 'Sharp street metaphors and aggressive drum delivery.' },
          { cost: 3, name: 'Multi-Syllabic Complex Rhyme Schemes', desc: 'Dense internal rhymes bending words across bars.' },
          { cost: 4, name: 'King of Pop High Falsetto & Vocal Hiccup', desc: 'Electrifying rhythmic vocal percussion and shouts.' },
          { cost: 5, name: 'Rap God 9.6 Syllable-per-Second Machine Gun', desc: 'Supersonic breathless lyrical torrent that breaks records.' }
        ]
      },
      {
        id: 'speed',
        title: 'SOCKET 3: STAGE PRESENCE',
        options: [
          { cost: 1, name: 'Microphone Stand Lean', desc: 'Casual rock swagger holding center-stage spotlight.' },
          { cost: 2, name: 'Bandana Hype-Man Huddle', desc: 'High-energy side-to-side stage pacing with crew.' },
          { cost: 3, name: 'Golden OVO Owl Floating Rig', desc: 'Massive elevated stadium lighting rig hovering over crowd.' },
          { cost: 4, name: 'Kanye Floating Stage Platform', desc: 'Suspended stage hovering above general admission mosh pit.' },
          { cost: 5, name: 'Michael Jackson Anti-Gravity Lean & Moonwalk', desc: 'Zero-friction illusion glide across stadium floor.' }
        ]
      },
      {
        id: 'teammate',
        title: 'SOCKET 4: SURPRISE GUEST FEATURE',
        options: [
          { cost: 1, name: 'Drake (Melodic Chorus)', desc: 'Guaranteed streaming anthem hook that charts number one.' },
          { cost: 2, name: 'Tupac Shakur (West Coast Passion)', desc: 'Raw revolutionary charisma and undeniable street grit.' },
          { cost: 3, name: 'Kanye West (Beat Production)', desc: 'Live sampler drum orchestration and maximalist arrangements.' },
          { cost: 4, name: 'Kendrick Lamar (Lyrical Blitz)', desc: 'Show-stopping guest verse dismantling opposing headliners.' },
          { cost: 5, name: 'Eminem (Climax Freestyle)', desc: 'Show-closing verse delivered with white-hot battle ferocity.' }
        ]
      }
    ]
  }
};

// 5. EXPANSIVE WHOLE-SHOW ROSTERS DATABASE
const SHOWS = {
  "naruto": {
    "id": "naruto",
    "name": "Naruto & Shippuden",
    "category": "anime",
    "characters": [
      {
        "id": "naruto",
        "name": "Naruto Uzumaki",
        "series": "Naruto",
        "subGroup": "Team 7",
        "role": "7th Hokage",
        "traits": [
          "Ninja",
          "Jinchuriki",
          "Rasengan",
          "Hokage",
          "Orange",
          "Toad",
          "Wind"
        ],
        "clues": [
          "Nine-Tails",
          "Hokage",
          "Ramen",
          "Orange",
          "Rasengan",
          "Toad",
          "Shadow",
          "Fox"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": true,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "sasuke",
        "name": "Sasuke Uchiha",
        "series": "Naruto",
        "subGroup": "Team 7",
        "role": "Shadow Hokage",
        "traits": [
          "Ninja",
          "Sharingan",
          "Chidori",
          "Uchiha",
          "Rinnegan",
          "Lightning"
        ],
        "clues": [
          "Lightning",
          "Avenger",
          "Eyes",
          "Snake",
          "Sword",
          "Curse",
          "Rival",
          "Rinnegan"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "sakura",
        "name": "Sakura Haruno",
        "series": "Naruto",
        "subGroup": "Team 7",
        "role": "Medical Ninja",
        "traits": [
          "Ninja",
          "Medical",
          "100 Healings",
          "Super Strength",
          "Slug",
          "Pink Hair"
        ],
        "clues": [
          "Medical",
          "Pink",
          "Inner",
          "Slug",
          "Strength",
          "Forehead",
          "Chakra"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "kakashi",
        "name": "Kakashi Hatake",
        "series": "Naruto",
        "subGroup": "Team 7",
        "role": "6th Hokage",
        "traits": [
          "Ninja",
          "Sharingan",
          "Chidori",
          "Sensei",
          "Mask",
          "Copy Ninja"
        ],
        "clues": [
          "Mask",
          "Copy",
          "Book",
          "Lightning",
          "Sharingan",
          "Hokage",
          "Dogs"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "sai",
        "name": "Sai Yamanaka",
        "series": "Naruto",
        "subGroup": "Team 7 / Foundation",
        "role": "Root Agent",
        "traits": [
          "Ninja",
          "Root",
          "Ink Beast",
          "Scroll",
          "Foundation",
          "Pale"
        ],
        "clues": [
          "Ink",
          "Drawing",
          "Brush",
          "Emotionless",
          "Root",
          "Scroll",
          "Smile"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "yamato",
        "name": "Yamato (Tenzo)",
        "series": "Naruto",
        "subGroup": "Team 7 / Anbu",
        "role": "Anbu Captain",
        "traits": [
          "Ninja",
          "Anbu",
          "Wood Style",
          "Hashirama Cells",
          "Cage"
        ],
        "clues": [
          "Wood",
          "Cells",
          "Anbu",
          "Pillar",
          "Leader",
          "Hashirama",
          "Eyes"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "shikamaru",
        "name": "Shikamaru Nara",
        "series": "Naruto",
        "subGroup": "Team 10",
        "role": "Advisor to Hokage",
        "traits": [
          "Ninja",
          "Shadow",
          "Shogi",
          "IQ 200",
          "Strategist",
          "Ponytail"
        ],
        "clues": [
          "Shadow",
          "Shogi",
          "Lazy",
          "Clouds",
          "Genius",
          "Possession",
          "Smoke"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": false
        }
      },
      {
        "id": "ino",
        "name": "Ino Yamanaka",
        "series": "Naruto",
        "subGroup": "Team 10",
        "role": "Sensory Unit Leader",
        "traits": [
          "Ninja",
          "Mind Transfer",
          "Flowers",
          "Sensory",
          "Blonde"
        ],
        "clues": [
          "Flowers",
          "Mind",
          "Transfer",
          "Sensory",
          "Blonde",
          "Telepathy"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": false
        }
      },
      {
        "id": "choji",
        "name": "Choji Akimichi",
        "series": "Naruto",
        "subGroup": "Team 10",
        "role": "Akimichi Clan Head",
        "traits": [
          "Ninja",
          "Expansion",
          "Butterfly",
          "Calorie",
          "Roll"
        ],
        "clues": [
          "Chips",
          "Butterfly",
          "Expansion",
          "Meat",
          "Calorie",
          "Wings"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "asuma",
        "name": "Asuma Sarutobi",
        "series": "Naruto",
        "subGroup": "Team 10",
        "role": "Jonin Sensei",
        "traits": [
          "Ninja",
          "Jonin",
          "Chakra Blades",
          "Cigarette",
          "Wind Style"
        ],
        "clues": [
          "Cigarette",
          "Knives",
          "Trench",
          "Beard",
          "Wind",
          "Monk",
          "Fire"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "kiba",
        "name": "Kiba Inuzuka",
        "series": "Naruto",
        "subGroup": "Team 8",
        "role": "Tracker Ninja",
        "traits": [
          "Ninja",
          "Inuzuka",
          "Akamaru",
          "Fang Over Fang",
          "Beast Mimicry",
          "Dog"
        ],
        "clues": [
          "Dog",
          "Akamaru",
          "Smell",
          "Fang",
          "Fur",
          "Bark",
          "Whirlwind"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "shino",
        "name": "Shino Aburame",
        "series": "Naruto",
        "subGroup": "Team 8",
        "role": "Academy Teacher",
        "traits": [
          "Ninja",
          "Aburame",
          "Parasitic Insects",
          "Coat",
          "Glasses",
          "Silent"
        ],
        "clues": [
          "Insects",
          "Beetles",
          "Coat",
          "Parasite",
          "Glasses",
          "Silent",
          "Hive"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "hinata",
        "name": "Hinata Hyuga",
        "series": "Naruto",
        "subGroup": "Team 8",
        "role": "Hyuga Heiress",
        "traits": [
          "Ninja",
          "Hyuga",
          "Byakugan",
          "Gentle Fist",
          "Twin Lion Fists"
        ],
        "clues": [
          "Byakugan",
          "Gentle",
          "Lavender",
          "Heiress",
          "Lions",
          "Eyes",
          "Shy"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "kurenai",
        "name": "Kurenai Yuhi",
        "series": "Naruto",
        "subGroup": "Team 8",
        "role": "Jonin Sensei",
        "traits": [
          "Ninja",
          "Genjutsu",
          "Tree Bind",
          "Red Eyes",
          "Flower Petals"
        ],
        "clues": [
          "Tree",
          "Petals",
          "Genjutsu",
          "Red Eyes",
          "Lipstick",
          "Teacher"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": false
        }
      },
      {
        "id": "neji",
        "name": "Neji Hyuga",
        "series": "Naruto",
        "subGroup": "Team Guy",
        "role": "Hyuga Branch",
        "traits": [
          "Ninja",
          "Hyuga",
          "Byakugan",
          "Gentle Fist",
          "Rotation",
          "64 Palms"
        ],
        "clues": [
          "Rotation",
          "Destiny",
          "Bird",
          "Caged",
          "Palms",
          "Trigram",
          "Genius"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "rock_lee",
        "name": "Rock Lee",
        "series": "Naruto",
        "subGroup": "Team Guy",
        "role": "Taijutsu Master",
        "traits": [
          "Ninja",
          "Taijutsu",
          "Eight Gates",
          "Green Jumpsuit",
          "Weights"
        ],
        "clues": [
          "Weights",
          "Lotus",
          "Eyebrows",
          "Green",
          "Gates",
          "Taijutsu",
          "Sake"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "tenten",
        "name": "Tenten",
        "series": "Naruto",
        "subGroup": "Team Guy",
        "role": "Weapon Specialist",
        "traits": [
          "Ninja",
          "Scrolls",
          "Iron Weapons",
          "Buns",
          "Bukijutsu"
        ],
        "clues": [
          "Scrolls",
          "Buns",
          "Weapons",
          "Iron",
          "Shuriken",
          "Shop",
          "Targets"
        ],
        "sieve": {
          "powers": false,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "might_guy",
        "name": "Might Guy",
        "series": "Naruto",
        "subGroup": "Team Guy",
        "role": "Noble Blue Beast",
        "traits": [
          "Ninja",
          "Taijutsu",
          "Night Guy",
          "Dynamic Entry",
          "Youth",
          "Green Beast"
        ],
        "clues": [
          "Youth",
          "Dynamic",
          "Beast",
          "Red",
          "Wheelchair",
          "Rival",
          "Guy"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "gaara",
        "name": "Gaara of the Sand",
        "series": "Naruto",
        "subGroup": "Sand Siblings",
        "role": "5th Kazekage",
        "traits": [
          "Ninja",
          "Sand",
          "Gourd",
          "Kazekage",
          "Shukaku",
          "Shield"
        ],
        "clues": [
          "Sand",
          "Gourd",
          "Forehead",
          "Desert",
          "Shield",
          "Mother",
          "Coffin"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "kankuro",
        "name": "Kankuro",
        "series": "Naruto",
        "subGroup": "Sand Siblings",
        "role": "Puppet Master",
        "traits": [
          "Ninja",
          "Puppets",
          "Crow",
          "Black Ant",
          "Poison",
          "Face Paint"
        ],
        "clues": [
          "Puppet",
          "Crow",
          "Face",
          "Paint",
          "Strings",
          "Poison",
          "Bandage"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "temari",
        "name": "Temari",
        "series": "Naruto",
        "subGroup": "Sand Siblings",
        "role": "Wind Ambassador",
        "traits": [
          "Ninja",
          "Wind Style",
          "Giant Iron Fan",
          "Scythe Weasel",
          "Blonde"
        ],
        "clues": [
          "Fan",
          "Wind",
          "Three",
          "Moons",
          "Weasel",
          "Iron",
          "Sand"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "jiraiya",
        "name": "Jiraiya (Toad Sage)",
        "series": "Naruto",
        "subGroup": "Legendary Sannin",
        "role": "Sannin / Master",
        "traits": [
          "Ninja",
          "Sannin",
          "Toad Sage",
          "Rasengan",
          "Oil",
          "Novelist"
        ],
        "clues": [
          "Toad",
          "Sage",
          "Oil",
          "Novelist",
          "Pervy",
          "Spiky",
          "Scroll"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "tsunade",
        "name": "Tsunade Senju",
        "series": "Naruto",
        "subGroup": "Legendary Sannin",
        "role": "5th Hokage",
        "traits": [
          "Ninja",
          "Sannin",
          "100 Healings",
          "Super Strength",
          "Slug",
          "Gambler"
        ],
        "clues": [
          "Slug",
          "Gambler",
          "Necklace",
          "Strength",
          "Healing",
          "Forehead",
          "Diamond"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "orochimaru",
        "name": "Orochimaru",
        "series": "Naruto",
        "subGroup": "Legendary Sannin",
        "role": "Sannin / Rogue",
        "traits": [
          "Ninja",
          "Sannin",
          "Snake",
          "Curse Mark",
          "Edo Tensei",
          "Kusanagi"
        ],
        "clues": [
          "Snake",
          "Curse",
          "Tongue",
          "Reanimation",
          "Grass",
          "White",
          "Immortal"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "itachi",
        "name": "Itachi Uchiha",
        "series": "Naruto",
        "subGroup": "Akatsuki",
        "role": "Rogue Shinobi",
        "traits": [
          "Ninja",
          "Uchiha",
          "Sharingan",
          "Tsukuyomi",
          "Amaterasu",
          "Susanoo",
          "Crows"
        ],
        "clues": [
          "Crows",
          "Genjutsu",
          "Moon",
          "Finger",
          "Forehead",
          "Clan",
          "Illusion",
          "Brother"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "kisame",
        "name": "Kisame Hoshigaki",
        "series": "Naruto",
        "subGroup": "Akatsuki",
        "role": "Monster of the Mist",
        "traits": [
          "Ninja",
          "Akatsuki",
          "Samehada",
          "Shark",
          "Water Prison",
          "Chakra Monster"
        ],
        "clues": [
          "Shark",
          "Samehada",
          "Gills",
          "Water",
          "Chakra",
          "Mist",
          "Scales"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "deidara",
        "name": "Deidara",
        "series": "Naruto",
        "subGroup": "Akatsuki",
        "role": "Clay Bomber",
        "traits": [
          "Ninja",
          "Akatsuki",
          "Explosive Clay",
          "Art is an Explosion",
          "Palms",
          "Birds"
        ],
        "clues": [
          "Clay",
          "Explosion",
          "Art",
          "Mouths",
          "Birds",
          "C4",
          "Blonde"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "sasori",
        "name": "Sasori of the Red Sand",
        "series": "Naruto",
        "subGroup": "Akatsuki",
        "role": "Puppet Master",
        "traits": [
          "Ninja",
          "Akatsuki",
          "Iron Sand",
          "Third Kazekage",
          "100 Puppets",
          "Core"
        ],
        "clues": [
          "Red",
          "Sand",
          "Puppet",
          "Scorpion",
          "Iron",
          "Core",
          "Heart"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "hidan",
        "name": "Hidan",
        "series": "Naruto",
        "subGroup": "Akatsuki",
        "role": "Jashin Cultist",
        "traits": [
          "Ninja",
          "Akatsuki",
          "Jashin",
          "Triple Blade Scythe",
          "Immortality",
          "Ritual"
        ],
        "clues": [
          "Immortal",
          "Scythe",
          "Jashin",
          "Ritual",
          "Blood",
          "Skeleton",
          "Curse"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "kakuzu",
        "name": "Kakuzu",
        "series": "Naruto",
        "subGroup": "Akatsuki",
        "role": "Akatsuki Treasurer",
        "traits": [
          "Ninja",
          "Akatsuki",
          "Earth Grudge",
          "5 Hearts",
          "Threads",
          "Masks"
        ],
        "clues": [
          "Hearts",
          "Threads",
          "Money",
          "Bounty",
          "Masks",
          "Stitches",
          "Greed"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "pain",
        "name": "Pain (Nagato)",
        "series": "Naruto",
        "subGroup": "Akatsuki",
        "role": "Leader of Akatsuki",
        "traits": [
          "Ninja",
          "Akatsuki",
          "Rinnegan",
          "Almighty Push",
          "Six Paths",
          "Chibaku Tensei"
        ],
        "clues": [
          "Push",
          "Piercings",
          "Orange",
          "Deva",
          "God",
          "Rinnegan",
          "Rain"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "konan",
        "name": "Konan",
        "series": "Naruto",
        "subGroup": "Akatsuki",
        "role": "God's Angel",
        "traits": [
          "Ninja",
          "Akatsuki",
          "Paper Ninjutsu",
          "Origami",
          "Angel Wings",
          "Rain"
        ],
        "clues": [
          "Paper",
          "Origami",
          "Angel",
          "Flower",
          "Wings",
          "Lake",
          "Purple"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "obito",
        "name": "Obito Uchiha (Tobi)",
        "series": "Naruto",
        "subGroup": "Akatsuki",
        "role": "Masked Man",
        "traits": [
          "Ninja",
          "Uchiha",
          "Kamui",
          "Spiral Mask",
          "Ten Tails",
          "Rinnegan"
        ],
        "clues": [
          "Kamui",
          "Spiral",
          "Mask",
          "Orange",
          "Space",
          "Goggles",
          "Rock"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "madara",
        "name": "Madara Uchiha",
        "series": "Naruto",
        "subGroup": "Uchiha Clan",
        "role": "Legendary Ghost",
        "traits": [
          "Ninja",
          "Uchiha",
          "Perfect Susanoo",
          "Meteors",
          "Infinite Tsukuyomi",
          "Rinnegan"
        ],
        "clues": [
          "Meteor",
          "Susanoo",
          "Founder",
          "Fan",
          "Reanimation",
          "Armor",
          "Ghost"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "minato",
        "name": "Minato Namikaze",
        "series": "Naruto",
        "subGroup": "Hokage",
        "role": "4th Hokage",
        "traits": [
          "Ninja",
          "Hokage",
          "Yellow Flash",
          "Flying Thunder God",
          "Rasengan Creator"
        ],
        "clues": [
          "Flash",
          "Kunai",
          "Formula",
          "Speed",
          "Yellow",
          "Cloak",
          "Father"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "hashirama",
        "name": "Hashirama Senju",
        "series": "Naruto",
        "subGroup": "Hokage",
        "role": "1st Hokage",
        "traits": [
          "Ninja",
          "Hokage",
          "Wood Style",
          "True Thousand Hands",
          "God of Shinobi",
          "Sage"
        ],
        "clues": [
          "Wood",
          "Founder",
          "Cells",
          "Sage",
          "Statue",
          "Necklace",
          "Senju"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "tobirama",
        "name": "Tobirama Senju",
        "series": "Naruto",
        "subGroup": "Hokage",
        "role": "2nd Hokage",
        "traits": [
          "Ninja",
          "Hokage",
          "Water Style",
          "Flying Raijin Creator",
          "Shadow Clone Creator",
          "Armor"
        ],
        "clues": [
          "Water",
          "Creator",
          "Fur",
          "Armor",
          "Clones",
          "Reanimation",
          "Brother"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "hiruzen",
        "name": "Hiruzen Sarutobi",
        "series": "Naruto",
        "subGroup": "Hokage",
        "role": "3rd Hokage",
        "traits": [
          "Ninja",
          "Hokage",
          "Monkey King Enma",
          "5 Elements",
          "Reaper Death Seal",
          "Professor"
        ],
        "clues": [
          "Professor",
          "Staff",
          "Monkey",
          "Pipe",
          "Roof",
          "Tile",
          "Old"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "killer_bee",
        "name": "Killer Bee",
        "series": "Naruto",
        "subGroup": "Hidden Cloud",
        "role": "Eight-Tails Jinchuriki",
        "traits": [
          "Ninja",
          "Jinchuriki",
          "Gyuki",
          "Seven Swords",
          "Rap",
          "Lariat"
        ],
        "clues": [
          "Eight-Tails",
          "Rap",
          "Swords",
          "Sunglasses",
          "Ink",
          "Rhyme",
          "Lariat"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "zabuza",
        "name": "Zabuza Momochi",
        "series": "Naruto",
        "subGroup": "Seven Swordsmen",
        "role": "Demon of the Mist",
        "traits": [
          "Ninja",
          "Mist",
          "Executioner Blade",
          "Silent Killing",
          "Water Dragon"
        ],
        "clues": [
          "Mist",
          "Blade",
          "Bandages",
          "Demon",
          "Bridge",
          "Sword",
          "Snow"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "haku",
        "name": "Haku",
        "series": "Naruto",
        "subGroup": "Land of Water",
        "role": "Ice Mirror Specialist",
        "traits": [
          "Ninja",
          "Ice Style",
          "Senbon Needles",
          "Demonic Ice Mirrors",
          "Mask"
        ],
        "clues": [
          "Mirrors",
          "Needles",
          "Ice",
          "Mask",
          "Snow",
          "Tool",
          "Kimono"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "kabuto",
        "name": "Kabuto Yakushi",
        "series": "Naruto",
        "subGroup": "Sound Village",
        "role": "Dragon Sage",
        "traits": [
          "Ninja",
          "Snake Sage",
          "Chakra Scalpels",
          "Edo Tensei",
          "Glasses",
          "Spy"
        ],
        "clues": [
          "Glasses",
          "Scalpel",
          "Dragon",
          "Sage",
          "Spy",
          "Horns",
          "Reanimation"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      }
    ]
  },
  "one_piece": {
    "id": "one_piece",
    "name": "One Piece",
    "category": "anime",
    "characters": [
      {
        "id": "luffy",
        "name": "Monkey D. Luffy",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Captain / Yonko",
        "traits": [
          "Pirate",
          "Nika",
          "Gear 5",
          "Rubber",
          "Conqueror Haki",
          "Straw Hat"
        ],
        "clues": [
          "Straw Hat",
          "Rubber",
          "Meat",
          "Pirate",
          "King",
          "Gear",
          "Nika",
          "Anchor"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": true,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "zoro",
        "name": "Roronoa Zoro",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Swordsman / First Mate",
        "traits": [
          "Pirate",
          "Santoryu",
          "Enma",
          "Conqueror Haki",
          "Green Hair",
          "Bandana"
        ],
        "clues": [
          "Swords",
          "Green",
          "Lost",
          "Bandana",
          "Eye",
          "Slash",
          "Sake",
          "Demon"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "nami",
        "name": "Nami",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Navigator",
        "traits": [
          "Pirate",
          "Clima-Tact",
          "Weather",
          "Zeus",
          "Orange Hair",
          "Berries"
        ],
        "clues": [
          "Tangerine",
          "Weather",
          "Staff",
          "Zeus",
          "Map",
          "Orange",
          "Money"
        ],
        "sieve": {
          "powers": false,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "usopp",
        "name": "Usopp (Sogeking)",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Sniper",
        "traits": [
          "Pirate",
          "Slingshot",
          "Pop Greens",
          "Observation Haki",
          "Long Nose"
        ],
        "clues": [
          "Nose",
          "Slingshot",
          "Cape",
          "Sniper",
          "Lies",
          "Kabuto",
          "God"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "sanji",
        "name": "Vinsmoke Sanji",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Cook",
        "traits": [
          "Pirate",
          "Black Leg",
          "Diable Jambe",
          "Ifrit Jambe",
          "Germa",
          "Cigarette"
        ],
        "clues": [
          "Cook",
          "Cigarette",
          "Kick",
          "Flames",
          "Blonde",
          "Eyebrow",
          "Germa"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "chopper",
        "name": "Tony Tony Chopper",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Doctor",
        "traits": [
          "Pirate",
          "Hito Hito no Mi",
          "Monster Point",
          "Rumble Ball",
          "Reindeer",
          "Doctor"
        ],
        "clues": [
          "Reindeer",
          "Cotton",
          "Doctor",
          "Monster",
          "Hat",
          "Antlers",
          "Candy"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "robin",
        "name": "Nico Robin",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Archaeologist",
        "traits": [
          "Pirate",
          "Hana Hana no Mi",
          "Poneglyphs",
          "Demonic Form",
          "Clutch"
        ],
        "clues": [
          "Hands",
          "Poneglyph",
          "Archaeology",
          "Demonio",
          "Fleur",
          "Clutch",
          "History"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "franky",
        "name": "Franky (Cutty Flam)",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Shipwright",
        "traits": [
          "Pirate",
          "Cyborg",
          "Radical Beam",
          "Cola Powered",
          "General Franky",
          "Speedo"
        ],
        "clues": [
          "Cyborg",
          "Cola",
          "Radical",
          "Super",
          "Nose",
          "Iron",
          "Speedo"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "brook",
        "name": "Brook (Soul King)",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Musician / Swordsman",
        "traits": [
          "Pirate",
          "Yomi Yomi no Mi",
          "Soul Solid",
          "Ice Sword",
          "Afro",
          "Skeleton"
        ],
        "clues": [
          "Skeleton",
          "Afro",
          "Violin",
          "Soul",
          "Ice",
          "Cane",
          "Panties"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "jinbe",
        "name": "Jinbe",
        "series": "One Piece",
        "subGroup": "Straw Hats",
        "role": "Helmsman / Knight",
        "traits": [
          "Pirate",
          "Fish-Man Karate",
          "Sun Pirates",
          "Blue Whale Shark",
          "Water Shot"
        ],
        "clues": [
          "Fish-Man",
          "Karate",
          "Whale",
          "Sun",
          "Current",
          "Blue",
          "Helmsman"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "shanks",
        "name": "Red-Haired Shanks",
        "series": "One Piece",
        "subGroup": "Red Hair Pirates",
        "role": "Yonko",
        "traits": [
          "Pirate",
          "Yonko",
          "Gryphon",
          "Conqueror Haki",
          "Red Hair",
          "One Arm"
        ],
        "clues": [
          "Red",
          "Saber",
          "Arm",
          "Yonko",
          "Gryphon",
          "Scar",
          "Haki"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "whitebeard",
        "name": "Edward Newgate (Whitebeard)",
        "series": "One Piece",
        "subGroup": "Whitebeard Pirates",
        "role": "Former Yonko",
        "traits": [
          "Pirate",
          "Gura Gura no Mi",
          "Tremor",
          "Bisento",
          "Mustache",
          "Moby Dick"
        ],
        "clues": [
          "Earthquake",
          "Mustache",
          "Bisento",
          "Family",
          "Crescent",
          "Tremor",
          "Sons"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "blackbeard",
        "name": "Marshall D. Teach",
        "series": "One Piece",
        "subGroup": "Blackbeard Pirates",
        "role": "Yonko",
        "traits": [
          "Pirate",
          "Yami Yami no Mi",
          "Gura Gura no Mi",
          "Darkness",
          "Tremor",
          "Dual Fruit"
        ],
        "clues": [
          "Darkness",
          "Tremor",
          "Teeth",
          "Pie",
          "Double",
          "Vortex",
          "Black"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "kaido",
        "name": "Kaido of the Beasts",
        "series": "One Piece",
        "subGroup": "Beast Pirates",
        "role": "Former Yonko",
        "traits": [
          "Pirate",
          "Uonuma no Mi",
          "Azure Dragon",
          "Thunder Bagua",
          "Kanabo",
          "Horns"
        ],
        "clues": [
          "Dragon",
          "Kanabo",
          "Club",
          "Horns",
          "Thunder",
          "Beast",
          "Scales"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "big_mom",
        "name": "Charlotte Linlin",
        "series": "One Piece",
        "subGroup": "Big Mom Pirates",
        "role": "Former Yonko",
        "traits": [
          "Pirate",
          "Soru Soru no Mi",
          "Homies",
          "Prometheus",
          "Zeus",
          "Napoleon",
          "Soul Pocus"
        ],
        "clues": [
          "Soul",
          "Prometheus",
          "Zeus",
          "Sweets",
          "Sword",
          "Sun",
          "Wedding"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "law",
        "name": "Trafalgar D. Water Law",
        "series": "One Piece",
        "subGroup": "Heart Pirates",
        "role": "Surgeon of Death",
        "traits": [
          "Pirate",
          "Ope Ope no Mi",
          "Room",
          "Kikoku Katana",
          "Submarine",
          "Tattoos"
        ],
        "clues": [
          "Room",
          "Spotted",
          "Surgeon",
          "Heart",
          "Katana",
          "Shambles",
          "Submarine"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "kid",
        "name": "Eustass Captain Kid",
        "series": "One Piece",
        "subGroup": "Kid Pirates",
        "role": "Worst Generation",
        "traits": [
          "Pirate",
          "Jiki Jiki no Mi",
          "Magnetism",
          "Metal Arm",
          "Punk Rotten",
          "Goggles"
        ],
        "clues": [
          "Magnet",
          "Scrap",
          "Metal",
          "Arm",
          "Goggles",
          "Red",
          "Punk"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "ace",
        "name": "Portgas D. Ace",
        "series": "One Piece",
        "subGroup": "Whitebeard Pirates",
        "role": "2nd Division Commander",
        "traits": [
          "Pirate",
          "Mera Mera no Mi",
          "Fire Fist",
          "Beads",
          "Hat",
          "Son of Roger"
        ],
        "clues": [
          "Fire",
          "Fist",
          "Freckles",
          "Hat",
          "Tattoo",
          "Beads",
          "Spades"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "sabo",
        "name": "Sabo",
        "series": "One Piece",
        "subGroup": "Revolutionary Army",
        "role": "Chief of Staff",
        "traits": [
          "Revolutionary",
          "Mera Mera no Mi",
          "Dragon Claw",
          "Top Hat",
          "Pipe",
          "Scar"
        ],
        "clues": [
          "Pipe",
          "Hat",
          "Goggles",
          "Dragon",
          "Claw",
          "Revolution",
          "Blonde"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "mihawk",
        "name": "Dracule Mihawk",
        "series": "One Piece",
        "subGroup": "Cross Guild",
        "role": "World Strongest Swordsman",
        "traits": [
          "Pirate",
          "Cross Guild",
          "Yoru",
          "Hawk Eyes",
          "Black Blade",
          "Crucifix"
        ],
        "clues": [
          "Hawk",
          "Yoru",
          "Crucifix",
          "Raft",
          "Feather",
          "Black",
          "Eyes"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "doflamingo",
        "name": "Donquixote Doflamingo",
        "series": "One Piece",
        "subGroup": "Donquixote Family",
        "role": "Heavenly Yaksha",
        "traits": [
          "Pirate",
          "Ito Ito no Mi",
          "Strings",
          "Birdcage",
          "Pink Feathers",
          "Glasses"
        ],
        "clues": [
          "Strings",
          "Glasses",
          "Feathers",
          "Pink",
          "Puppet",
          "Cage",
          "Heel"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "crocodile",
        "name": "Sir Crocodile",
        "series": "One Piece",
        "subGroup": "Cross Guild",
        "role": "Desert King",
        "traits": [
          "Pirate",
          "Suna Suna no Mi",
          "Desert Spada",
          "Gold Hook",
          "Cigar",
          "Sand"
        ],
        "clues": [
          "Sand",
          "Hook",
          "Cigar",
          "Scar",
          "Dry",
          "Barchan",
          "Coat"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "akainu",
        "name": "Sakazuki (Akainu)",
        "series": "One Piece",
        "subGroup": "Marines",
        "role": "Fleet Admiral",
        "traits": [
          "Marine",
          "Magu Magu no Mi",
          "Magma",
          "Absolute Justice",
          "Cap",
          "Tattoo"
        ],
        "clues": [
          "Magma",
          "Lava",
          "Fist",
          "Fleet",
          "Admiral",
          "Dog",
          "Justice"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "aokiji",
        "name": "Kuzan (Aokiji)",
        "series": "One Piece",
        "subGroup": "Former Marines / Blackbeard",
        "role": "Ice Master",
        "traits": [
          "Pirate",
          "Hie Hie no Mi",
          "Ice Age",
          "Bicycle",
          "Sleep Mask",
          "Pheasant"
        ],
        "clues": [
          "Ice",
          "Bicycle",
          "Sleep",
          "Freeze",
          "Pheasant",
          "Coat",
          "Cold"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "kizaru",
        "name": "Borsalino (Kizaru)",
        "series": "One Piece",
        "subGroup": "Marines",
        "role": "Admiral",
        "traits": [
          "Marine",
          "Pika Pika no Mi",
          "Light Speed",
          "Yasakani Jewels",
          "Laser",
          "Sunglasses"
        ],
        "clues": [
          "Light",
          "Laser",
          "Yellow",
          "Speed",
          "Monkey",
          "Suit",
          "Mirror"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "garp",
        "name": "Monkey D. Garp",
        "series": "One Piece",
        "subGroup": "Marines",
        "role": "Hero of the Marines",
        "traits": [
          "Marine",
          "Fist of Love",
          "Galaxy Impact",
          "Advanced Conqueror",
          "Iron Ball"
        ],
        "clues": [
          "Fist",
          "Galaxy",
          "Cannonball",
          "Grandfather",
          "Dog",
          "Vice",
          "Hero"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "katakuri",
        "name": "Charlotte Katakuri",
        "series": "One Piece",
        "subGroup": "Big Mom Pirates",
        "role": "Sweet Commander",
        "traits": [
          "Pirate",
          "Mochi Mochi no Mi",
          "Future Sight",
          "Mogura Trident",
          "Scarf",
          "Donuts"
        ],
        "clues": [
          "Mochi",
          "Scarf",
          "Teeth",
          "Donuts",
          "Trident",
          "Future",
          "Jellybean"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "yamato_op",
        "name": "Yamato",
        "series": "One Piece",
        "subGroup": "Wano Kingdom",
        "role": "Son of Kaido",
        "traits": [
          "Samurai",
          "Okuchi no Makami",
          "Kanabo",
          "Raimei Hakke",
          "Horns",
          "Oden"
        ],
        "clues": [
          "Kanabo",
          "Horns",
          "Wolf",
          "Oden",
          "Mask",
          "Sideburns",
          "Chains"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "hancock",
        "name": "Boa Hancock",
        "series": "One Piece",
        "subGroup": "Kuja Pirates",
        "role": "Pirate Empress",
        "traits": [
          "Pirate",
          "Mero Mero no Mi",
          "Love Arrow",
          "Snake Salome",
          "Warlord"
        ],
        "clues": [
          "Snake",
          "Stone",
          "Empress",
          "Beauty",
          "Arrow",
          "Heart",
          "High"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "roger",
        "name": "Gol D. Roger",
        "series": "One Piece",
        "subGroup": "Roger Pirates",
        "role": "Pirate King",
        "traits": [
          "Pirate",
          "Ace Saber",
          "Kamusari",
          "Conqueror Haki",
          "Laugh Tale",
          "Mustache"
        ],
        "clues": [
          "King",
          "Laugh",
          "Execution",
          "Mustache",
          "Treasure",
          "Ace",
          "Kamusari"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      }
    ]
  },
  "jujutsu_kaisen": {
    "id": "jujutsu_kaisen",
    "name": "Jujutsu Kaisen",
    "category": "anime",
    "characters": [
      {
        "id": "gojo",
        "name": "Satoru Gojo",
        "series": "Jujutsu Kaisen",
        "subGroup": "Jujutsu High Staff",
        "role": "Strongest Sorcerer",
        "traits": [
          "Sorcerer",
          "Limitless",
          "Six Eyes",
          "Hollow Purple",
          "Blindfold",
          "Infinity"
        ],
        "clues": [
          "Blindfold",
          "Infinity",
          "Blue",
          "Teacher",
          "Limitless",
          "Hollow",
          "Six",
          "Strongest"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "sukuna",
        "name": "Ryomen Sukuna",
        "series": "Jujutsu Kaisen",
        "subGroup": "Heian Era Curses",
        "role": "King of Curses",
        "traits": [
          "Curse",
          "Malevolent Shrine",
          "Cleave",
          "Dismantle",
          "Four Arms",
          "20 Fingers"
        ],
        "clues": [
          "Fingers",
          "Shrine",
          "Tattoos",
          "Cleave",
          "King",
          "Heian",
          "Curse",
          "Slash"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "yuji",
        "name": "Yuji Itadori",
        "series": "Jujutsu Kaisen",
        "subGroup": "Jujutsu High 1st Year",
        "role": "Vessel / Sorcerer",
        "traits": [
          "Sorcerer",
          "Divergent Fist",
          "Black Flash",
          "Blood Manipulation",
          "Vessel",
          "Physical"
        ],
        "clues": [
          "Punch",
          "Fist",
          "Vessel",
          "Pink",
          "Black Flash",
          "Finger",
          "Grandpa"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": true,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "megumi",
        "name": "Megumi Fushiguro",
        "series": "Jujutsu Kaisen",
        "subGroup": "Jujutsu High 1st Year",
        "role": "Zenin Clan Head",
        "traits": [
          "Sorcerer",
          "Ten Shadows",
          "Divine Dog",
          "Nue",
          "Mahoraga",
          "Chimera Shadow"
        ],
        "clues": [
          "Shadow",
          "Dog",
          "Toad",
          "Mahoraga",
          "Wheels",
          "Swords",
          "Spiky"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "nobara",
        "name": "Nobara Kugisaki",
        "series": "Jujutsu Kaisen",
        "subGroup": "Jujutsu High 1st Year",
        "role": "Straw Doll Sorcerer",
        "traits": [
          "Sorcerer",
          "Straw Doll",
          "Resonance",
          "Hairpin",
          "Hammer",
          "Nails"
        ],
        "clues": [
          "Hammer",
          "Nails",
          "Doll",
          "Resonance",
          "Eyepatch",
          "Country",
          "Straw"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "yuta",
        "name": "Yuta Okkotsu",
        "series": "Jujutsu Kaisen",
        "subGroup": "Jujutsu High 2nd Year",
        "role": "Special Grade Prodigy",
        "traits": [
          "Sorcerer",
          "Rika",
          "Copy Technique",
          "Katana",
          "Ring",
          "Boundless Energy"
        ],
        "clues": [
          "Ring",
          "Rika",
          "Katana",
          "Copy",
          "Special",
          "White",
          "Love"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": true,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "maki",
        "name": "Maki Zenin",
        "series": "Jujutsu Kaisen",
        "subGroup": "Jujutsu High 2nd Year",
        "role": "Physical Juggernaut",
        "traits": [
          "Sorcerer",
          "Heavenly Restriction",
          "Dragon Bone",
          "Split Soul Katana",
          "Burn Scars"
        ],
        "clues": [
          "Glasses",
          "Staff",
          "Zenin",
          "Scars",
          "Zero",
          "Sword",
          "Toji"
        ],
        "sieve": {
          "powers": false,
          "male": false,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "toge",
        "name": "Toge Inumaki",
        "series": "Jujutsu Kaisen",
        "subGroup": "Jujutsu High 2nd Year",
        "role": "Cursed Speech User",
        "traits": [
          "Sorcerer",
          "Cursed Speech",
          "Snake and Fangs",
          "Throat Medicine",
          "Rice Balls"
        ],
        "clues": [
          "Salmon",
          "Tuna",
          "Throat",
          "Collar",
          "Speech",
          "Words",
          "Plum"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "panda",
        "name": "Panda",
        "series": "Jujutsu Kaisen",
        "subGroup": "Jujutsu High 2nd Year",
        "role": "Abrupt Mutated Corpse",
        "traits": [
          "Sorcerer",
          "Cursed Corpse",
          "Gorilla Core",
          "Drums of Unstoppable",
          "Furry"
        ],
        "clues": [
          "Panda",
          "Gorilla",
          "Cores",
          "Trident",
          "Fur",
          "Principal",
          "Drums"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "nanami",
        "name": "Kento Nanami",
        "series": "Jujutsu Kaisen",
        "subGroup": "Jujutsu High Staff",
        "role": "Grade 1 Sorcerer",
        "traits": [
          "Sorcerer",
          "7:3 Ratio",
          "Blunt Cleaver",
          "Overtime",
          "Tie",
          "Salaryman"
        ],
        "clues": [
          "Overtime",
          "Cleaver",
          "Ratio",
          "Tie",
          "Glasses",
          "Bakery",
          "Salary"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "todo",
        "name": "Aoi Todo",
        "series": "Jujutsu Kaisen",
        "subGroup": "Kyoto Jujutsu High",
        "role": "Grade 1 Brawler",
        "traits": [
          "Sorcerer",
          "Boogie Woogie",
          "Clap Warp",
          "Takada-chan",
          "530000 IQ",
          "Brotha"
        ],
        "clues": [
          "Clap",
          "Idol",
          "Brotha",
          "Swap",
          "Delusion",
          "Muscle",
          "Takada"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "toji",
        "name": "Toji Fushiguro",
        "series": "Jujutsu Kaisen",
        "subGroup": "Zenin Renegades",
        "role": "Sorcerer Killer",
        "traits": [
          "Assassin",
          "Heavenly Restriction",
          "Inverted Spear of Heaven",
          "Chain",
          "Worm Curse"
        ],
        "clues": [
          "Spear",
          "Chain",
          "Worm",
          "Zen",
          "Money",
          "Gamble",
          "Inverted"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "geto",
        "name": "Suguru Geto",
        "series": "Jujutsu Kaisen",
        "subGroup": "Curse Users",
        "role": "Worst Curse User",
        "traits": [
          "Sorcerer",
          "Cursed Spirit Manipulation",
          "Uzumaki",
          "Playful Cloud",
          "Robes",
          "Monk"
        ],
        "clues": [
          "Monk",
          "Uzumaki",
          "Swallow",
          "Robes",
          "Curses",
          "Monkey",
          "Friend"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "mahito",
        "name": "Mahito",
        "series": "Jujutsu Kaisen",
        "subGroup": "Disaster Curses",
        "role": "Curse of Humans",
        "traits": [
          "Curse",
          "Idle Transfiguration",
          "Self-Embodiment of Perfection",
          "Soul Touching"
        ],
        "clues": [
          "Soul",
          "Patchwork",
          "Hands",
          "Mirror",
          "Human",
          "Morph",
          "Shibuya"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "jogo",
        "name": "Jogo",
        "series": "Jujutsu Kaisen",
        "subGroup": "Disaster Curses",
        "role": "Curse of Volcanoes",
        "traits": [
          "Curse",
          "Disaster Flames",
          "Coffin of Iron Mountain",
          "Volcano Head",
          "One Eye",
          "Meteor"
        ],
        "clues": [
          "Volcano",
          "Pipe",
          "Meteor",
          "Flames",
          "Single",
          "Eye",
          "Mountain"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "choso",
        "name": "Choso",
        "series": "Jujutsu Kaisen",
        "subGroup": "Death Painting Wombs",
        "role": "Eldest Brother",
        "traits": [
          "Curse",
          "Blood Manipulation",
          "Supernova",
          "Piercing Blood",
          "Nose Stripe"
        ],
        "clues": [
          "Blood",
          "Brother",
          "Piercing",
          "Stripe",
          "Family",
          "Supernova",
          "Eldest"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "mechamaru",
        "name": "Kokichi Muta (Mechamaru)",
        "series": "Jujutsu Kaisen",
        "subGroup": "Kyoto Jujutsu High",
        "role": "Puppet Master",
        "traits": [
          "Sorcerer",
          "Puppet Manipulation",
          "Ultimate Mechamaru",
          "Pigeon Viola",
          "Bathtub"
        ],
        "clues": [
          "Puppet",
          "Wires",
          "Tub",
          "Giant",
          "Armor",
          "Radio",
          "Missiles"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "higuruma",
        "name": "Hiromi Higuruma",
        "series": "Jujutsu Kaisen",
        "subGroup": "Culling Game Players",
        "role": "Awakened Genius",
        "traits": [
          "Sorcerer",
          "Deadly Sentencing",
          "Judgeman",
          "Gavel",
          "Executioner Sword",
          "Lawyer"
        ],
        "clues": [
          "Lawyer",
          "Gavel",
          "Court",
          "Judge",
          "Guilty",
          "Suit",
          "Sword"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "kashimo",
        "name": "Hajime Kashimo",
        "series": "Jujutsu Kaisen",
        "subGroup": "Culling Game Players",
        "role": "God of Lightning",
        "traits": [
          "Sorcerer",
          "Mythical Amber Beast",
          "Electric Charges",
          "Staff",
          "400 Years"
        ],
        "clues": [
          "Lightning",
          "Staff",
          "Charges",
          "Amber",
          "Pigtails",
          "Edo",
          "Single"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "kenjaku",
        "name": "Kenjaku",
        "series": "Jujutsu Kaisen",
        "subGroup": "Ancient Sorcerers",
        "role": "Mastermind",
        "traits": [
          "Sorcerer",
          "Brain Swapping",
          "Stitches",
          "Culling Game",
          "Anti-Gravity",
          "Curse Spirit"
        ],
        "clues": [
          "Brain",
          "Stitches",
          "Centuries",
          "Prison",
          "Mother",
          "Plan",
          "Gravity"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      }
    ]
  },
  "dragon_ball": {
    "id": "dragon_ball",
    "name": "Dragon Ball Z & Super",
    "category": "anime",
    "characters": [
      {
        "id": "goku",
        "name": "Son Goku",
        "series": "Dragon Ball Z",
        "subGroup": "Z Fighters",
        "role": "Earth's Protector",
        "traits": [
          "Saiyan",
          "Kamehameha",
          "Ultra Instinct",
          "Super Saiyan",
          "Spirit Bomb",
          "Nimbus"
        ],
        "clues": [
          "Saiyan",
          "Tail",
          "Kamehameha",
          "Orange",
          "Nimbus",
          "Dragon",
          "Hair",
          "Monkey"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": true,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "vegeta",
        "name": "Vegeta",
        "series": "Dragon Ball Z",
        "subGroup": "Z Fighters",
        "role": "Saiyan Prince",
        "traits": [
          "Saiyan",
          "Final Flash",
          "Ultra Ego",
          "Galick Gun",
          "Big Bang",
          "Royal Crest"
        ],
        "clues": [
          "Prince",
          "Forehead",
          "Galick",
          "Pride",
          "Armor",
          "Final",
          "Blue"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "gohan",
        "name": "Son Gohan",
        "series": "Dragon Ball Z",
        "subGroup": "Z Fighters",
        "role": "Scholar / Beast",
        "traits": [
          "Saiyan",
          "Gohan Beast",
          "Masenko",
          "Father-Son Kamehameha",
          "Glasses",
          "Cape"
        ],
        "clues": [
          "Glasses",
          "Beast",
          "Cell",
          "Scholar",
          "Masenko",
          "Great",
          "Cape"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "piccolo",
        "name": "Piccolo",
        "series": "Dragon Ball Z",
        "subGroup": "Z Fighters",
        "role": "Namekian Sage",
        "traits": [
          "Namekian",
          "Special Beam Cannon",
          "Orange Piccolo",
          "Regeneration",
          "Turban",
          "Cape"
        ],
        "clues": [
          "Namek",
          "Green",
          "Turban",
          "Cape",
          "Antenna",
          "Beam",
          "Regeneration"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "future_trunks",
        "name": "Future Trunks",
        "series": "Dragon Ball Z",
        "subGroup": "Z Fighters",
        "role": "Time Traveler",
        "traits": [
          "Saiyan",
          "Sword",
          "Burning Attack",
          "Time Machine",
          "Denim Jacket",
          "Super Saiyan"
        ],
        "clues": [
          "Sword",
          "Jacket",
          "Capsule",
          "Time",
          "Slash",
          "Androids",
          "Lavender"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "krillin",
        "name": "Krillin",
        "series": "Dragon Ball Z",
        "subGroup": "Z Fighters",
        "role": "Strongest Earthling",
        "traits": [
          "Human",
          "Destructo Disc",
          "Solar Flare",
          "Kamehameha",
          "Turtle School",
          "Police"
        ],
        "clues": [
          "Disc",
          "Solar",
          "Dots",
          "Bald",
          "Nose",
          "Turtle",
          "Police"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "frieza",
        "name": "Frieza",
        "series": "Dragon Ball Z",
        "subGroup": "Frieza Force",
        "role": "Galactic Emperor",
        "traits": [
          "Alien",
          "Death Beam",
          "Golden Frieza",
          "Death Ball",
          "Hover Pod",
          "Tail"
        ],
        "clues": [
          "Emperor",
          "Purple",
          "Gold",
          "Tail",
          "Pod",
          "Planet",
          "Beam"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "cell",
        "name": "Cell",
        "series": "Dragon Ball Z",
        "subGroup": "Red Ribbon Bio-Androids",
        "role": "Perfect Warrior",
        "traits": [
          "Bio-Android",
          "Perfect Form",
          "Solar Kamehameha",
          "Tail Sting",
          "Spots",
          "Cell Juniors"
        ],
        "clues": [
          "Wings",
          "Spots",
          "Tail",
          "Perfect",
          "Arena",
          "Android",
          "Crown"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "buu",
        "name": "Majin Buu",
        "series": "Dragon Ball Z",
        "subGroup": "Majin Clan",
        "role": "Ancient Djinn",
        "traits": [
          "Majin",
          "Candy Beam",
          "Regeneration",
          "Pink Body",
          "Steam Vents",
          "Absorption"
        ],
        "clues": [
          "Pink",
          "Candy",
          "Steam",
          "Chocolate",
          "Cape",
          "Blob",
          "Sleep"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "broly",
        "name": "Broly",
        "series": "Dragon Ball Z",
        "subGroup": "Saiyan Exiles",
        "role": "Legendary Super Saiyan",
        "traits": [
          "Saiyan",
          "Legendary Super Saiyan",
          "Green Energy",
          "Gigantic Roar",
          "Pelt",
          "Berserk"
        ],
        "clues": [
          "Green",
          "Collar",
          "Pelt",
          "Rage",
          "Pelt",
          "Gigantic",
          "Vampa"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "beerus",
        "name": "Lord Beerus",
        "series": "Dragon Ball Z",
        "subGroup": "Universe 7 Gods",
        "role": "God of Destruction",
        "traits": [
          "Deity",
          "Hakai",
          "Sphere of Destruction",
          "Sphynx Cat",
          "Egyptian Collar",
          "Pudding"
        ],
        "clues": [
          "Cat",
          "Purple",
          "Hakai",
          "Pudding",
          "Sleep",
          "Destroyer",
          "Temple"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "whis",
        "name": "Whis",
        "series": "Dragon Ball Z",
        "subGroup": "Angels",
        "role": "Angel Attendant",
        "traits": [
          "Angel",
          "Staff",
          "Temporal Do-Over",
          "Ultra Instinct Master",
          "Halo Collar",
          "Foodie"
        ],
        "clues": [
          "Staff",
          "Ring",
          "Blue",
          "Time",
          "Hair",
          "Food",
          "Angel"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "android_17",
        "name": "Android 17 (Lapis)",
        "series": "Dragon Ball Z",
        "subGroup": "Red Ribbon Androids",
        "role": "Park Ranger",
        "traits": [
          "Cyborg",
          "Android Barrier",
          "Infinite Energy",
          "Scarf",
          "Tournament Winner"
        ],
        "clues": [
          "Ranger",
          "Scarf",
          "Barrier",
          "Twin",
          "Infinite",
          "Island",
          "Green"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "android_18",
        "name": "Android 18 (Lazuli)",
        "series": "Dragon Ball Z",
        "subGroup": "Red Ribbon Androids",
        "role": "Z Fighter Spouse",
        "traits": [
          "Cyborg",
          "Destructo Disc",
          "Infinite Energy",
          "Blonde Hair",
          "Denim Vest"
        ],
        "clues": [
          "Blonde",
          "Denim",
          "Twin",
          "Broken",
          "Arm",
          "Krillin",
          "Ring"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": true,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "roshi",
        "name": "Master Roshi (Jackie Chun)",
        "series": "Dragon Ball Z",
        "subGroup": "Turtle School",
        "role": "Martial Arts Master",
        "traits": [
          "Human",
          "Kamehameha",
          "Max Power Mode",
          "Evil Containment Wave",
          "Sunglasses"
        ],
        "clues": [
          "Turtle",
          "Shell",
          "Cane",
          "Glasses",
          "Beard",
          "Magazine",
          "Island"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      }
    ]
  },
  "attack_on_titan": {
    "id": "attack_on_titan",
    "name": "Attack on Titan",
    "category": "anime",
    "characters": [
      {
        "id": "eren",
        "name": "Eren Yeager",
        "series": "Attack on Titan",
        "subGroup": "Scouts / Yeagerists",
        "role": "Founding Titan",
        "traits": [
          "Titan",
          "Attack Titan",
          "Founding Titan",
          "War Hammer",
          "Rumbling",
          "Scout"
        ],
        "clues": [
          "Basement",
          "Attack",
          "Colossal",
          "Rumble",
          "Bird",
          "Freedom",
          "Key",
          "Founding"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": true,
          "protagonist": true,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "mikasa",
        "name": "Mikasa Ackerman",
        "series": "Attack on Titan",
        "subGroup": "Scouts",
        "role": "Ackerman Elite",
        "traits": [
          "Ackerman",
          "Dual Blades",
          "Thunder Spears",
          "ODM Gear",
          "Scarf",
          "Scout"
        ],
        "clues": [
          "Scarf",
          "Blades",
          "Ackerman",
          "Thunder",
          "Red",
          "Eren",
          "Family"
        ],
        "sieve": {
          "powers": false,
          "male": false,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": true,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "armin",
        "name": "Armin Arlert",
        "series": "Attack on Titan",
        "subGroup": "Scouts",
        "role": "15th Commander",
        "traits": [
          "Titan",
          "Colossal Titan",
          "Strategist",
          "Commander",
          "Ocean",
          "Scout"
        ],
        "clues": [
          "Colossal",
          "Ocean",
          "Blonde",
          "Commander",
          "Book",
          "Sea",
          "Shell"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": true,
          "villain": false,
          "frontline": false
        }
      },
      {
        "id": "levi",
        "name": "Levi Ackerman",
        "series": "Attack on Titan",
        "subGroup": "Scouts",
        "role": "Humanity Strongest",
        "traits": [
          "Ackerman",
          "Captain",
          "Spinning Slash",
          "Thunder Spears",
          "Tea",
          "Scout"
        ],
        "clues": [
          "Clean",
          "Captain",
          "Ackerman",
          "Spin",
          "Tea",
          "Cravat",
          "Blades"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "erwin",
        "name": "Erwin Smith",
        "series": "Attack on Titan",
        "subGroup": "Scouts",
        "role": "13th Commander",
        "traits": [
          "Commander",
          "Strategist",
          "Dedicate Your Heart",
          "White Horse",
          "ODM Gear"
        ],
        "clues": [
          "Commander",
          "Eyebrows",
          "Basement",
          "Charge",
          "Arm",
          "Speech",
          "Heart"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "hange",
        "name": "Hange Zoe",
        "series": "Attack on Titan",
        "subGroup": "Scouts",
        "role": "14th Commander",
        "traits": [
          "Commander",
          "Researcher",
          "Glasses",
          "Eyepatch",
          "ODM Gear",
          "Science"
        ],
        "clues": [
          "Eyepatch",
          "Glasses",
          "Titan",
          "Research",
          "Colossal",
          "Fire",
          "Mad"
        ],
        "sieve": {
          "powers": false,
          "male": false,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "jean",
        "name": "Jean Kirstein",
        "series": "Attack on Titan",
        "subGroup": "Scouts",
        "role": "Field Leader",
        "traits": [
          "Scout",
          "ODM Gear",
          "Leader",
          "Thunder Spears",
          "Dual Blades"
        ],
        "clues": [
          "Horse",
          "Leader",
          "Military",
          "Blonde",
          "Rifle",
          "Sasha",
          "Cape"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "sasha",
        "name": "Sasha Blouse",
        "series": "Attack on Titan",
        "subGroup": "Scouts",
        "role": "Scout Sniper",
        "traits": [
          "Scout",
          "Hunter",
          "Bow and Arrow",
          "Meat Lover",
          "Sniper"
        ],
        "clues": [
          "Potato",
          "Meat",
          "Bow",
          "Arrow",
          "Hungry",
          "Steal",
          "Bullet"
        ],
        "sieve": {
          "powers": false,
          "male": false,
          "deceased": true,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": false,
          "frontline": true
        }
      },
      {
        "id": "reiner",
        "name": "Reiner Braun",
        "series": "Attack on Titan",
        "subGroup": "Marley Warriors",
        "role": "Armored Titan",
        "traits": [
          "Titan",
          "Armored Titan",
          "Shield",
          "Marley Warrior",
          "Hardening"
        ],
        "clues": [
          "Armor",
          "Shield",
          "Warrior",
          "Marley",
          "Guilt",
          "Wall",
          "Blonde"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "bertholdt",
        "name": "Bertholdt Hoover",
        "series": "Attack on Titan",
        "subGroup": "Marley Warriors",
        "role": "Former Colossal Titan",
        "traits": [
          "Titan",
          "Colossal Titan",
          "Steam Blast",
          "Nuke Explosion",
          "Marley Warrior"
        ],
        "clues": [
          "Steam",
          "Colossal",
          "Wall",
          "Tall",
          "Sweat",
          "Warrior",
          "Nuke"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "annie",
        "name": "Annie Leonhart",
        "series": "Attack on Titan",
        "subGroup": "Marley Warriors",
        "role": "Female Titan",
        "traits": [
          "Titan",
          "Female Titan",
          "Hardening",
          "Crystalline Cocoon",
          "Muay Thai"
        ],
        "clues": [
          "Crystal",
          "Ring",
          "Female",
          "Kick",
          "Martial",
          "Donut",
          "Warrior"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": false,
          "student": true,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      },
      {
        "id": "zeke",
        "name": "Zeke Yeager",
        "series": "Attack on Titan",
        "subGroup": "Marley Warriors",
        "role": "Beast Titan",
        "traits": [
          "Titan",
          "Beast Titan",
          "Pitcher",
          "Spinal Fluid",
          "Royal Blood",
          "Glasses"
        ],
        "clues": [
          "Beast",
          "Baseball",
          "Pitch",
          "Glasses",
          "Beard",
          "Royal",
          "Spinal"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "student": false,
          "protagonist": false,
          "villain": true,
          "frontline": true
        }
      }
    ]
  },
  "star_wars": {
    "id": "star_wars",
    "name": "Star Wars (Full Saga)",
    "category": "movies",
    "characters": [
      {
        "id": "vader",
        "name": "Darth Vader",
        "series": "Star Wars",
        "subGroup": "Galactic Empire",
        "role": "Sith Lord",
        "traits": [
          "Sith",
          "Lightsaber",
          "Respirator",
          "Force Choke",
          "Armor",
          "Death Star"
        ],
        "clues": [
          "Breathing",
          "Mask",
          "Sith",
          "Black",
          "Father",
          "Lightsaber",
          "Empire",
          "Force"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "mask": true,
          "protagonist": false,
          "superhero": false,
          "gunplay": false
        }
      },
      {
        "id": "luke",
        "name": "Luke Skywalker",
        "series": "Star Wars",
        "subGroup": "Jedi Order / Rebels",
        "role": "Jedi Master",
        "traits": [
          "Jedi",
          "Green Saber",
          "Prosthetic Hand",
          "Force Push",
          "X-Wing",
          "Tatooine"
        ],
        "clues": [
          "Farmboy",
          "Green",
          "Tatooine",
          "Hand",
          "X-Wing",
          "Jedi",
          "Twin",
          "Sunset"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "mask": false,
          "protagonist": true,
          "superhero": false,
          "gunplay": false
        }
      },
      {
        "id": "leia",
        "name": "Princess Leia Organa",
        "series": "Star Wars",
        "subGroup": "Rebel Alliance",
        "role": "General / Princess",
        "traits": [
          "Rebel",
          "Blaster",
          "Alderaan",
          "Hair Buns",
          "Diplomat",
          "Force Sensitive"
        ],
        "clues": [
          "Buns",
          "Princess",
          "Blaster",
          "Alderaan",
          "General",
          "Hologram",
          "Senator"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": true,
          "oldGen": true,
          "mask": false,
          "protagonist": true,
          "superhero": false,
          "gunplay": true
        }
      },
      {
        "id": "han_solo",
        "name": "Han Solo",
        "series": "Star Wars",
        "subGroup": "Smugglers / Rebels",
        "role": "Captain of Falcon",
        "traits": [
          "Smuggler",
          "DL-44 Blaster",
          "Millennium Falcon",
          "Vest",
          "Corellian",
          "Carbonite"
        ],
        "clues": [
          "Smuggler",
          "Falcon",
          "Vest",
          "Chewie",
          "Dice",
          "Shot",
          "Carbonite"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "mask": false,
          "protagonist": true,
          "superhero": false,
          "gunplay": true
        }
      },
      {
        "id": "chewbacca",
        "name": "Chewbacca",
        "series": "Star Wars",
        "subGroup": "Wookiees",
        "role": "Co-Pilot",
        "traits": [
          "Wookiee",
          "Bowcaster",
          "Bandolier",
          "Kashyyyk",
          "Co-Pilot",
          "Fur"
        ],
        "clues": [
          "Wookiee",
          "Fur",
          "Bowcaster",
          "Bandolier",
          "Roar",
          "Falcon",
          "Kashyyyk"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "mask": false,
          "protagonist": false,
          "superhero": false,
          "gunplay": true
        }
      },
      {
        "id": "obi_wan",
        "name": "Obi-Wan Kenobi",
        "series": "Star Wars",
        "subGroup": "Jedi Order",
        "role": "Jedi Council Master",
        "traits": [
          "Jedi",
          "Blue Saber",
          "High Ground",
          "Soresu",
          "Robes",
          "Desert Exile"
        ],
        "clues": [
          "High Ground",
          "Beard",
          "Blue",
          "Robes",
          "Hello There",
          "Exile",
          "Ghost"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "mask": false,
          "protagonist": false,
          "superhero": false,
          "gunplay": false
        }
      },
      {
        "id": "yoda",
        "name": "Master Yoda",
        "series": "Star Wars",
        "subGroup": "Jedi Order",
        "role": "Grand Master",
        "traits": [
          "Jedi",
          "Green Saber",
          "Dagobah",
          "Cane",
          "900 Years",
          "Ataru"
        ],
        "clues": [
          "Swamp",
          "Green",
          "Ears",
          "Cane",
          "Hut",
          "Grammar",
          "Grand Master"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "mask": false,
          "protagonist": false,
          "superhero": false,
          "gunplay": false
        }
      },
      {
        "id": "palpatine",
        "name": "Emperor Palpatine (Darth Sidious)",
        "series": "Star Wars",
        "subGroup": "Sith / Empire",
        "role": "Galactic Emperor",
        "traits": [
          "Sith",
          "Force Lightning",
          "Red Saber",
          "Hood",
          "Unlimited Power",
          "Throne"
        ],
        "clues": [
          "Lightning",
          "Throne",
          "Hood",
          "Senate",
          "Emperor",
          "Clones",
          "Unlimited"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "mask": true,
          "protagonist": false,
          "superhero": false,
          "gunplay": false
        }
      },
      {
        "id": "maul",
        "name": "Darth Maul",
        "series": "Star Wars",
        "subGroup": "Shadow Collective",
        "role": "Sith Assassin",
        "traits": [
          "Sith",
          "Double-Bladed Saber",
          "Zabrak Horns",
          "Tattoos",
          "Cybernetic Legs"
        ],
        "clues": [
          "Double",
          "Horns",
          "Tattoos",
          "Red",
          "Cut",
          "Halves",
          "Crimson"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "mask": true,
          "protagonist": false,
          "superhero": false,
          "gunplay": false
        }
      },
      {
        "id": "ahsoka",
        "name": "Ahsoka Tano",
        "series": "Star Wars",
        "subGroup": "Fulcrum Network",
        "role": "Former Jedi Padawan",
        "traits": [
          "Jedi",
          "Dual White Sabers",
          "Togruta",
          "Montrals",
          "Snips",
          "Fulcrum"
        ],
        "clues": [
          "White",
          "Lekku",
          "Padawan",
          "Dual",
          "Reverse",
          "Snips",
          "Fulcrum"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": false,
          "oldGen": false,
          "mask": false,
          "protagonist": true,
          "superhero": false,
          "gunplay": false
        }
      },
      {
        "id": "mando",
        "name": "Din Djarin (The Mandalorian)",
        "series": "Star Wars",
        "subGroup": "Mandalorians",
        "role": "Bounty Hunter",
        "traits": [
          "Mandalorian",
          "Beskar Armor",
          "Whistling Birds",
          "Dark Saber",
          "Mudhorn",
          "Helmet"
        ],
        "clues": [
          "Beskar",
          "Helmet",
          "Way",
          "Child",
          "Spear",
          "Rifle",
          "Mudhorn"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "mask": true,
          "protagonist": true,
          "superhero": false,
          "gunplay": true
        }
      },
      {
        "id": "boba_fett",
        "name": "Boba Fett",
        "series": "Star Wars",
        "subGroup": "Bounty Hunters",
        "role": "Daimyo of Mos Espa",
        "traits": [
          "Bounty Hunter",
          "Slave I",
          "Jetpack",
          "Mandalorian Armor",
          "Sarlacc Pit",
          "Blaster"
        ],
        "clues": [
          "Sarlacc",
          "Jetpack",
          "Dent",
          "Clone",
          "Palace",
          "Bounty",
          "Armor"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "mask": true,
          "protagonist": false,
          "superhero": false,
          "gunplay": true
        }
      }
    ]
  },
  "marvel_mcu": {
    "id": "marvel_mcu",
    "name": "Marvel Cinematic Universe",
    "category": "movies",
    "characters": [
      {
        "id": "tony_stark",
        "name": "Tony Stark (Iron Man)",
        "series": "Marvel MCU",
        "subGroup": "Avengers",
        "role": "Armored Avenger",
        "traits": [
          "Avenger",
          "Mark 85",
          "Arc Reactor",
          "Nanotech",
          "Repulsor",
          "Genius"
        ],
        "clues": [
          "Reactor",
          "Armor",
          "Genius",
          "Billionaire",
          "Snap",
          "Nanotech",
          "Suit",
          "Jarvis"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "mask": true,
          "protagonist": true,
          "superhero": true,
          "gunplay": true
        }
      },
      {
        "id": "steve_rogers",
        "name": "Steve Rogers (Captain America)",
        "series": "Marvel MCU",
        "subGroup": "Avengers",
        "role": "First Avenger",
        "traits": [
          "Avenger",
          "Vibranium Shield",
          "Super Soldier",
          "Mjolnir Wielder",
          "Leather",
          "Stars"
        ],
        "clues": [
          "Shield",
          "Stars",
          "Serum",
          "Ice",
          "WWII",
          "Compass",
          "Elevator"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "mask": true,
          "protagonist": true,
          "superhero": true,
          "gunplay": false
        }
      },
      {
        "id": "thor",
        "name": "Thor Odinson",
        "series": "Marvel MCU",
        "subGroup": "Asgard / Avengers",
        "role": "God of Thunder",
        "traits": [
          "Asgardian",
          "Mjolnir",
          "Stormbreaker",
          "Lightning",
          "Cape",
          "Thunder"
        ],
        "clues": [
          "Hammer",
          "Lightning",
          "Asgard",
          "Axe",
          "Eye",
          "Cape",
          "Thunder"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "mask": false,
          "protagonist": true,
          "superhero": true,
          "gunplay": false
        }
      },
      {
        "id": "hulk",
        "name": "Bruce Banner (Hulk)",
        "series": "Marvel MCU",
        "subGroup": "Avengers",
        "role": "Green Goliath",
        "traits": [
          "Avenger",
          "Gamma Radiation",
          "Hulk Smash",
          "Super Strength",
          "Green Skin",
          "Scientist"
        ],
        "clues": [
          "Gamma",
          "Green",
          "Smash",
          "Rage",
          "Pants",
          "Lab",
          "Glasses"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "mask": false,
          "protagonist": true,
          "superhero": true,
          "gunplay": false
        }
      },
      {
        "id": "natasha",
        "name": "Natasha Romanoff (Black Widow)",
        "series": "Marvel MCU",
        "subGroup": "Avengers / S.H.I.E.L.D.",
        "role": "Super Spy",
        "traits": [
          "Avenger",
          "Widow Bite",
          "Red Room",
          "Batons",
          "Acrobatic",
          "Ledger"
        ],
        "clues": [
          "Red Room",
          "Bite",
          "Batons",
          "Widow",
          "Cliff",
          "Ledger",
          "Spy"
        ],
        "sieve": {
          "powers": false,
          "male": false,
          "deceased": true,
          "oldGen": false,
          "mask": false,
          "protagonist": false,
          "superhero": true,
          "gunplay": true
        }
      },
      {
        "id": "peter_parker",
        "name": "Peter Parker (Spider-Man)",
        "series": "Marvel MCU",
        "subGroup": "Avengers / Queens",
        "role": "Web-Slinger",
        "traits": [
          "Hero",
          "Web Shooters",
          "Spider-Sense",
          "Wall Crawling",
          "Iron Spider Legs",
          "Mask"
        ],
        "clues": [
          "Web",
          "Spider",
          "Queens",
          "Camera",
          "Wall",
          "Mask",
          "Iron"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "mask": true,
          "protagonist": true,
          "superhero": true,
          "gunplay": false
        }
      },
      {
        "id": "thanos",
        "name": "Thanos",
        "series": "Marvel MCU",
        "subGroup": "Titan",
        "role": "Mad Titan",
        "traits": [
          "Titan",
          "Infinity Gauntlet",
          "Infinity Stones",
          "Double-Edged Sword",
          "Snap",
          "Armor"
        ],
        "clues": [
          "Gauntlet",
          "Snap",
          "Stones",
          "Purple",
          "Balance",
          "Titan",
          "Inevitable",
          "Dust"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "mask": false,
          "protagonist": false,
          "superhero": true,
          "gunplay": false
        }
      },
      {
        "id": "loki",
        "name": "Loki Laufeyson",
        "series": "Marvel MCU",
        "subGroup": "TVA / Asgard",
        "role": "God of Stories",
        "traits": [
          "Frost Giant",
          "Scepter",
          "Daggers",
          "Illusions",
          "Green Cloak",
          "Horns"
        ],
        "clues": [
          "Daggers",
          "Horns",
          "Mischief",
          "Tesseract",
          "TVA",
          "Green",
          "Glorious"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "mask": false,
          "protagonist": false,
          "superhero": true,
          "gunplay": false
        }
      },
      {
        "id": "doctor_strange",
        "name": "Stephen Strange",
        "series": "Marvel MCU",
        "subGroup": "Masters of the Mystic Arts",
        "role": "Sorcerer",
        "traits": [
          "Sorcerer",
          "Eye of Agamotto",
          "Cloak of Levitation",
          "Mirror Dimension",
          "Mandala"
        ],
        "clues": [
          "Cloak",
          "Eye",
          "Mirror",
          "Portal",
          "Sling",
          "Doctor",
          "Hands"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "mask": false,
          "protagonist": true,
          "superhero": true,
          "gunplay": false
        }
      },
      {
        "id": "wanda",
        "name": "Wanda Maximoff (Scarlet Witch)",
        "series": "Marvel MCU",
        "subGroup": "Avengers",
        "role": "Chaos Witch",
        "traits": [
          "Avenger",
          "Chaos Magic",
          "Darkhold",
          "Tiara",
          "Telekinesis",
          "Hex"
        ],
        "clues": [
          "Chaos",
          "Hex",
          "Red",
          "Crown",
          "Darkhold",
          "Twins",
          "Witch"
        ],
        "sieve": {
          "powers": true,
          "male": false,
          "deceased": true,
          "oldGen": false,
          "mask": false,
          "protagonist": true,
          "superhero": true,
          "gunplay": false
        }
      },
      {
        "id": "black_panther",
        "name": "T'Challa (Black Panther)",
        "series": "Marvel MCU",
        "subGroup": "Wakanda",
        "role": "King of Wakanda",
        "traits": [
          "Avenger",
          "Vibranium Habit",
          "Kinetic Absorption",
          "Heart-Shaped Herb",
          "Claws"
        ],
        "clues": [
          "Vibranium",
          "Wakanda",
          "Claws",
          "Herb",
          "King",
          "Cat",
          "Purple"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": false,
          "mask": true,
          "protagonist": true,
          "superhero": true,
          "gunplay": false
        }
      }
    ]
  },
  "cinema_icons": {
    "id": "cinema_icons",
    "name": "Cinema & Cult Legends",
    "category": "movies",
    "characters": [
      {
        "id": "joker",
        "name": "The Joker (Heath Ledger)",
        "series": "The Dark Knight / DC",
        "subGroup": "Gotham Rogues",
        "role": "Agent of Chaos",
        "traits": [
          "Villain",
          "Clown",
          "Makeup",
          "Purple Suit",
          "Chaos",
          "Razor"
        ],
        "clues": [
          "Makeup",
          "Pencil",
          "Anarchy",
          "Smile",
          "Cards",
          "Chaos",
          "Scars"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "mask": true,
          "protagonist": false,
          "superhero": true,
          "gunplay": true
        }
      },
      {
        "id": "batman",
        "name": "Batman (Bruce Wayne)",
        "series": "Batman / DC",
        "subGroup": "Justice League",
        "role": "Dark Knight",
        "traits": [
          "Hero",
          "Cape",
          "Billionaire",
          "Detective",
          "Gadgets",
          "Batarang"
        ],
        "clues": [
          "Batmobile",
          "Cave",
          "Billionaire",
          "Cape",
          "Gotham",
          "Detective",
          "Parents"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "mask": true,
          "protagonist": true,
          "superhero": true,
          "gunplay": false
        }
      },
      {
        "id": "neo",
        "name": "Neo (Thomas Anderson)",
        "series": "The Matrix",
        "subGroup": "Zion Rebels",
        "role": "The One",
        "traits": [
          "Hero",
          "Chosen One",
          "Coat",
          "Guns",
          "Kung Fu",
          "Bullet Time"
        ],
        "clues": [
          "Red Pill",
          "Matrix",
          "Trenchcoat",
          "Bullet",
          "Sunglasses",
          "Zion",
          "Chosen"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": true,
          "oldGen": true,
          "mask": false,
          "protagonist": true,
          "superhero": false,
          "gunplay": true
        }
      },
      {
        "id": "wick",
        "name": "John Wick",
        "series": "John Wick",
        "subGroup": "High Table / Continental",
        "role": "Baba Yaga",
        "traits": [
          "Assassin",
          "Suit",
          "Pencil",
          "Dogs",
          "Continental",
          "Gun Fu"
        ],
        "clues": [
          "Pencil",
          "Dog",
          "Mustang",
          "Baba Yaga",
          "Suit",
          "Gold Coins",
          "Continental"
        ],
        "sieve": {
          "powers": false,
          "male": true,
          "deceased": false,
          "oldGen": false,
          "mask": false,
          "protagonist": true,
          "superhero": false,
          "gunplay": true
        }
      },
      {
        "id": "harry_potter",
        "name": "Harry Potter",
        "series": "Wizarding World",
        "subGroup": "Hogwarts Gryffindor",
        "role": "The Boy Who Lived",
        "traits": [
          "Wizard",
          "Gryffindor",
          "Wand",
          "Glasses",
          "Lightning Scar",
          "Snitch"
        ],
        "clues": [
          "Scar",
          "Glasses",
          "Wand",
          "Nimbus",
          "Hogwarts",
          "Lightning",
          "Snitch"
        ],
        "sieve": {
          "powers": true,
          "male": true,
          "deceased": false,
          "oldGen": true,
          "mask": false,
          "protagonist": true,
          "superhero": false,
          "gunplay": false
        }
      }
    ]
  },
  "video_games": {
    "id": "video_games",
    "name": "Video Game Legends",
    "category": "gaming",
    "characters": [
      {
        "id": "master_chief",
        "name": "Master Chief (John-117)",
        "series": "Halo",
        "subGroup": "Halo / UNSC",
        "role": "Spartan-II",
        "traits": [
          "Spartan",
          "MJOLNIR Armor",
          "Assault Rifle",
          "Energy Shield",
          "Cortana",
          "117"
        ],
        "clues": [
          "Armor",
          "Green",
          "Cortana",
          "Ring",
          "Spartan",
          "Shield",
          "Helmet",
          "117"
        ],
        "sieve": {
          "firearms": true,
          "male": true,
          "pre2010": true,
          "nintendo": false,
          "armor": true,
          "protagonist": true,
          "fantasy": false,
          "platformer": false
        }
      },
      {
        "id": "kratos",
        "name": "Kratos",
        "series": "God of War",
        "subGroup": "God of War / Sparta",
        "role": "God of War",
        "traits": [
          "God",
          "Blades of Chaos",
          "Leviathan Axe",
          "Spartan Rage",
          "Guardian Shield",
          "Ash Skin"
        ],
        "clues": [
          "Axe",
          "Blades",
          "Ash",
          "Boy",
          "Sparta",
          "God",
          "Rage",
          "Beard"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": true,
          "nintendo": false,
          "armor": false,
          "protagonist": true,
          "fantasy": true,
          "platformer": false
        }
      },
      {
        "id": "mario",
        "name": "Super Mario",
        "series": "Super Mario",
        "subGroup": "Super Mario / Nintendo",
        "role": "Hero of Mushroom Kingdom",
        "traits": [
          "Plumber",
          "Fire Flower",
          "Super Mushroom",
          "Red Cap",
          "Overalls",
          "Mustache"
        ],
        "clues": [
          "Mushroom",
          "Mustache",
          "Pipe",
          "Princess",
          "Red",
          "Jump",
          "Plumber",
          "Star"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": true,
          "nintendo": true,
          "armor": false,
          "protagonist": true,
          "fantasy": true,
          "platformer": true
        }
      },
      {
        "id": "luigi",
        "name": "Luigi",
        "series": "Super Mario",
        "subGroup": "Super Mario / Nintendo",
        "role": "Ghost Hunter",
        "traits": [
          "Plumber",
          "Poltergust 5000",
          "Green Cap",
          "Overalls",
          "High Jump",
          "Brother"
        ],
        "clues": [
          "Mansion",
          "Vacuum",
          "Green",
          "Ghost",
          "Brother",
          "Mustache",
          "Flashlight"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": true,
          "nintendo": true,
          "armor": false,
          "protagonist": false,
          "fantasy": true,
          "platformer": true
        }
      },
      {
        "id": "bowser",
        "name": "Bowser (King Koopa)",
        "series": "Super Mario",
        "subGroup": "Super Mario / Nintendo",
        "role": "Koopa King",
        "traits": [
          "Koopa",
          "Fire Breath",
          "Spiked Shell",
          "Horns",
          "Clown Copter",
          "Castle"
        ],
        "clues": [
          "Shell",
          "Spikes",
          "Lava",
          "Castle",
          "Fire",
          "Koopa",
          "Horns"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": true,
          "nintendo": true,
          "armor": false,
          "protagonist": false,
          "fantasy": true,
          "platformer": true
        }
      },
      {
        "id": "link",
        "name": "Link (Hero of Time)",
        "series": "The Legend of Zelda",
        "subGroup": "The Legend of Zelda",
        "role": "Chosen Hero",
        "traits": [
          "Hylian",
          "Master Sword",
          "Hylian Shield",
          "Triforce of Courage",
          "Green Tunic",
          "Bow"
        ],
        "clues": [
          "Sword",
          "Shield",
          "Tunic",
          "Triforce",
          "Ocarina",
          "Pot",
          "Fairy"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": true,
          "nintendo": true,
          "armor": false,
          "protagonist": true,
          "fantasy": true,
          "platformer": false
        }
      },
      {
        "id": "zelda",
        "name": "Princess Zelda",
        "series": "The Legend of Zelda",
        "subGroup": "The Legend of Zelda",
        "role": "Princess of Hyrule",
        "traits": [
          "Hylian",
          "Triforce of Wisdom",
          "Bow of Light",
          "Sheik Form",
          "Magic",
          "Royal Crown"
        ],
        "clues": [
          "Princess",
          "Wisdom",
          "Light",
          "Castle",
          "Sheik",
          "Magic",
          "Lullaby"
        ],
        "sieve": {
          "firearms": false,
          "male": false,
          "pre2010": true,
          "nintendo": true,
          "armor": false,
          "protagonist": false,
          "fantasy": true,
          "platformer": false
        }
      },
      {
        "id": "geralt",
        "name": "Geralt of Rivia",
        "series": "The Witcher",
        "subGroup": "The Witcher",
        "role": "Witcher",
        "traits": [
          "Witcher",
          "Silver Sword",
          "Steel Sword",
          "Signs",
          "Mutant",
          "White Hair",
          "Medallion"
        ],
        "clues": [
          "Silver",
          "Mutant",
          "Swords",
          "Wolf",
          "Potion",
          "White Hair",
          "Medallion",
          "Monster"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": true,
          "nintendo": false,
          "armor": true,
          "protagonist": true,
          "fantasy": true,
          "platformer": false
        }
      },
      {
        "id": "steve",
        "name": "Steve",
        "series": "Minecraft",
        "subGroup": "Minecraft",
        "role": "Builder",
        "traits": [
          "Blocky",
          "Diamond Pickaxe",
          "Crafting Table",
          "Netherite Armor",
          "Elytra",
          "Blue Shirt"
        ],
        "clues": [
          "Pickaxe",
          "Creeper",
          "Diamond",
          "Craft",
          "Square",
          "Block",
          "Mine",
          "Torches"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": false,
          "nintendo": false,
          "armor": false,
          "protagonist": true,
          "fantasy": false,
          "platformer": false
        }
      },
      {
        "id": "doom_slayer",
        "name": "Doom Slayer",
        "series": "DOOM",
        "subGroup": "DOOM",
        "role": "Hell Walker",
        "traits": [
          "Night Sentinel",
          "Praetor Suit",
          "Super Shotgun",
          "Crucible Blade",
          "BFG 9000",
          "Blood Punch"
        ],
        "clues": [
          "Shotgun",
          "Rip",
          "Tear",
          "Hell",
          "Armor",
          "Demons",
          "Chainsaw",
          "Praetor"
        ],
        "sieve": {
          "firearms": true,
          "male": true,
          "pre2010": true,
          "nintendo": false,
          "armor": true,
          "protagonist": true,
          "fantasy": true,
          "platformer": false
        }
      },
      {
        "id": "sonic",
        "name": "Sonic the Hedgehog",
        "series": "Sonic the Hedgehog",
        "subGroup": "SEGA",
        "role": "Blue Blur",
        "traits": [
          "Hedgehog",
          "Spin Dash",
          "Chaos Emeralds",
          "Red Shoes",
          "Super Sonic",
          "Speed"
        ],
        "clues": [
          "Rings",
          "Blue",
          "Fast",
          "Chili Dog",
          "Spikes",
          "Loop",
          "Emerald",
          "Shoes"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": true,
          "nintendo": false,
          "armor": false,
          "protagonist": true,
          "fantasy": false,
          "platformer": true
        }
      },
      {
        "id": "cloud_strife",
        "name": "Cloud Strife",
        "series": "Final Fantasy VII",
        "subGroup": "Final Fantasy VII",
        "role": "Ex-SOLDIER",
        "traits": [
          "Mercenary",
          "Buster Sword",
          "Materia",
          "Omnislash",
          "Mako Eyes",
          "Hardy Daytona"
        ],
        "clues": [
          "Buster",
          "Sword",
          "Spiky",
          "Blonde",
          "Materia",
          "Train",
          "Chocobo"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": true,
          "nintendo": false,
          "armor": false,
          "protagonist": true,
          "fantasy": true,
          "platformer": false
        }
      },
      {
        "id": "sephiroth",
        "name": "Sephiroth",
        "series": "Final Fantasy VII",
        "subGroup": "Final Fantasy VII",
        "role": "One-Winged Angel",
        "traits": [
          "SOLDIER",
          "Masamune Katana",
          "Supernova",
          "Black Wing",
          "Jenova Cells",
          "Silver Hair"
        ],
        "clues": [
          "Masamune",
          "One Wing",
          "Silver",
          "Fire",
          "Supernova",
          "Meteor",
          "Angel"
        ],
        "sieve": {
          "firearms": false,
          "male": true,
          "pre2010": true,
          "nintendo": false,
          "armor": true,
          "protagonist": false,
          "fantasy": true,
          "platformer": false
        }
      }
    ]
  },
  "sports": {
    "id": "sports",
    "name": "World Sports Legends",
    "category": "sports",
    "characters": [
      {
        "id": "messi",
        "name": "Lionel Messi",
        "series": "Football / Soccer",
        "subGroup": "FC Barcelona / Inter Miami",
        "role": "Playmaker / Goat",
        "traits": [
          "Football",
          "Left Foot",
          "8 Ballons d'Or",
          "2022 World Cup",
          "Dribbler",
          "Free Kicks"
        ],
        "clues": [
          "Barcelona",
          "Left Foot",
          "Dribble",
          "Argentina",
          "Qatar",
          "Ballon d'Or",
          "Miami",
          "Short"
        ],
        "sieve": {
          "football": true,
          "worldChamp": true,
          "active2024": true,
          "spClubs": true,
          "mvp": true,
          "teamSport": true,
          "speedster": false,
          "jersey10": true
        }
      },
      {
        "id": "cr7",
        "name": "Cristiano Ronaldo",
        "series": "Football / Soccer",
        "subGroup": "Real Madrid / Al Nassr",
        "role": "All-Time Scorer",
        "traits": [
          "Football",
          "Number 7",
          "5 Champions Leagues",
          "Siu",
          "Headers",
          "900 Goals"
        ],
        "clues": [
          "Siu",
          "Madrid",
          "Jump",
          "Portugal",
          "7",
          "Header",
          "Champions",
          "Fitness"
        ],
        "sieve": {
          "football": true,
          "worldChamp": false,
          "active2024": true,
          "spClubs": true,
          "mvp": true,
          "teamSport": true,
          "speedster": true,
          "jersey10": false
        }
      },
      {
        "id": "neymar",
        "name": "Neymar Jr",
        "series": "Football / Soccer",
        "subGroup": "Santos / Barcelona / Al Hilal",
        "role": "Samba Magician",
        "traits": [
          "Football",
          "Elastico",
          "Rainbow Flick",
          "Brazil Top Scorer",
          "Skills",
          "Puskas"
        ],
        "clues": [
          "Samba",
          "Santos",
          "Brazil",
          "Dribble",
          "Rainbow",
          "Skills",
          "Paris"
        ],
        "sieve": {
          "football": true,
          "worldChamp": false,
          "active2024": true,
          "spClubs": true,
          "mvp": false,
          "teamSport": true,
          "speedster": true,
          "jersey10": true
        }
      },
      {
        "id": "mbappe",
        "name": "Kylian Mbapp\u00e9",
        "series": "Football / Soccer",
        "subGroup": "France / Real Madrid",
        "role": "Speed Striker",
        "traits": [
          "Football",
          "World Cup Final Hat-Trick",
          "Sprint Speed",
          "PSG Top Scorer",
          "Mask"
        ],
        "clues": [
          "Speed",
          "France",
          "Hat-Trick",
          "PSG",
          "Monaco",
          "Arms",
          "Crossed"
        ],
        "sieve": {
          "football": true,
          "worldChamp": true,
          "active2024": true,
          "spClubs": true,
          "mvp": false,
          "teamSport": true,
          "speedster": true,
          "jersey10": true
        }
      },
      {
        "id": "lebron",
        "name": "LeBron James",
        "series": "Basketball / NBA",
        "subGroup": "Cleveland / Miami / Lakers",
        "role": "The King",
        "traits": [
          "Basketball",
          "All-Time Scorer",
          "4 NBA Championships",
          "Chalk Toss",
          "Tomahawk Dunk",
          "Crown"
        ],
        "clues": [
          "King",
          "Dunk",
          "Lakers",
          "Chalk",
          "Crown",
          "Cleveland",
          "Akron",
          "Championship"
        ],
        "sieve": {
          "football": false,
          "worldChamp": true,
          "active2024": true,
          "spClubs": false,
          "mvp": true,
          "teamSport": true,
          "speedster": false,
          "jersey10": false
        }
      },
      {
        "id": "jordan",
        "name": "Michael Jordan",
        "series": "Basketball / NBA",
        "subGroup": "Chicago Bulls",
        "role": "Air Jordan",
        "traits": [
          "Basketball",
          "6 Rings",
          "Jumpman",
          "Fadeaway",
          "Flu Game",
          "Number 23"
        ],
        "clues": [
          "Bulls",
          "23",
          "Air",
          "Tongue",
          "Shoes",
          "6 Rings",
          "Flu Game",
          "Jumpman"
        ],
        "sieve": {
          "football": false,
          "worldChamp": true,
          "active2024": false,
          "spClubs": false,
          "mvp": true,
          "teamSport": true,
          "speedster": false,
          "jersey10": false
        }
      },
      {
        "id": "bolt",
        "name": "Usain Bolt",
        "series": "Athletics / Track",
        "subGroup": "Jamaica Sprint Team",
        "role": "Fastest Human",
        "traits": [
          "Athletics",
          "100m 9.58s",
          "200m 19.19s",
          "Lightning Pose",
          "8 Olympic Golds",
          "Puma"
        ],
        "clues": [
          "Lightning",
          "Pose",
          "Jamaica",
          "100m",
          "Fastest",
          "Gold",
          "Puma",
          "Sprint"
        ],
        "sieve": {
          "football": false,
          "worldChamp": true,
          "active2024": false,
          "spClubs": false,
          "mvp": true,
          "teamSport": false,
          "speedster": true,
          "jersey10": false
        }
      },
      {
        "id": "hamilton",
        "name": "Lewis Hamilton",
        "series": "Formula 1",
        "subGroup": "Mercedes / Ferrari F1",
        "role": "7x F1 Champion",
        "traits": [
          "Motorsport",
          "7 World Titles",
          "100+ Pole Positions",
          "Silverstone",
          "Helmet",
          "Hammer Time"
        ],
        "clues": [
          "Mercedes",
          "7 Titles",
          "Silverstone",
          "Helmet",
          "Pole",
          "Steering",
          "Podium",
          "Driver"
        ],
        "sieve": {
          "football": false,
          "worldChamp": true,
          "active2024": true,
          "spClubs": false,
          "mvp": true,
          "teamSport": false,
          "speedster": true,
          "jersey10": false
        }
      }
    ]
  },
  "music": {
    "id": "music",
    "name": "Music & Hip-Hop Legends",
    "category": "music",
    "characters": [
      {
        "id": "eminem",
        "name": "Eminem (Marshall Mathers)",
        "series": "Hip-Hop / Rap",
        "subGroup": "Shady / Aftermath",
        "role": "Rap God",
        "traits": [
          "Hip-Hop",
          "8 Mile",
          "Fast Flow",
          "Slim Shady",
          "Oscar Winner",
          "Detroit"
        ],
        "clues": [
          "Detroit",
          "Blonde",
          "Fast",
          "8 Mile",
          "Spaghetti",
          "Shady",
          "Sweater",
          "Grammy"
        ],
        "sieve": {
          "hiphop": true,
          "oscarPulitzer": true,
          "pre2000": true,
          "deceased": false,
          "hot100": true,
          "solo": true,
          "coastUS": false,
          "diamond": true
        }
      },
      {
        "id": "mj",
        "name": "Michael Jackson",
        "series": "Pop Music",
        "subGroup": "Pop Music",
        "role": "King of Pop",
        "traits": [
          "Pop",
          "Moonwalk",
          "Thriller",
          "Sequined Glove",
          "Fedora Hat",
          "Grammy Record"
        ],
        "clues": [
          "Moonwalk",
          "Glove",
          "Thriller",
          "Hat",
          "Jacket",
          "Pop",
          "Zombies",
          "Spin"
        ],
        "sieve": {
          "hiphop": false,
          "oscarPulitzer": false,
          "pre2000": true,
          "deceased": true,
          "hot100": true,
          "solo": true,
          "coastUS": false,
          "diamond": true
        }
      },
      {
        "id": "drake",
        "name": "Drake (Aubrey Graham)",
        "series": "Hip-Hop / R&B",
        "subGroup": "OVO Sound",
        "role": "6 God",
        "traits": [
          "Hip-Hop",
          "Hotline Bling",
          "Toronto",
          "Billboard Record",
          "OVO Owl",
          "Certified"
        ],
        "clues": [
          "Toronto",
          "Owl",
          "OVO",
          "Hotline",
          "Certified",
          "6 God",
          "Drizzle",
          "Champagne"
        ],
        "sieve": {
          "hiphop": true,
          "oscarPulitzer": false,
          "pre2000": false,
          "deceased": false,
          "hot100": true,
          "solo": true,
          "coastUS": false,
          "diamond": true
        }
      },
      {
        "id": "kendrick",
        "name": "Kendrick Lamar",
        "series": "Hip-Hop / Rap",
        "subGroup": "pgLang / TDE",
        "role": "King of Compton",
        "traits": [
          "Hip-Hop",
          "Pulitzer Prize",
          "DAMN",
          "Good Kid Maad City",
          "Crown of Thorns",
          "Compton"
        ],
        "clues": [
          "Compton",
          "Pulitzer",
          "Crown",
          "DNA",
          "Kung Fu",
          "Humble",
          "Poetic",
          "Good Kid"
        ],
        "sieve": {
          "hiphop": true,
          "oscarPulitzer": true,
          "pre2000": false,
          "deceased": false,
          "hot100": true,
          "solo": true,
          "coastUS": true,
          "diamond": false
        }
      },
      {
        "id": "tupac",
        "name": "Tupac Shakur (Makaveli)",
        "series": "Hip-Hop / Rap",
        "subGroup": "Death Row Records",
        "role": "West Coast Legend",
        "traits": [
          "Hip-Hop",
          "All Eyez On Me",
          "Bandana",
          "Thug Life",
          "Poetry",
          "California Love"
        ],
        "clues": [
          "Bandana",
          "Makaveli",
          "California",
          "Thug Life",
          "West Coast",
          "Poetry",
          "Roses",
          "Death Row"
        ],
        "sieve": {
          "hiphop": true,
          "oscarPulitzer": false,
          "pre2000": true,
          "deceased": true,
          "hot100": true,
          "solo": true,
          "coastUS": true,
          "diamond": true
        }
      },
      {
        "id": "kanye",
        "name": "Kanye West (Ye)",
        "series": "Hip-Hop / Rap",
        "subGroup": "GOOD Music",
        "role": "Producer / MC",
        "traits": [
          "Hip-Hop",
          "Graduation",
          "808s",
          "Chopped Soul",
          "Yeezy",
          "Sunday Service"
        ],
        "clues": [
          "Graduation",
          "Bear",
          "808s",
          "Autotune",
          "Producer",
          "Yeezy",
          "Chicago",
          "Chavez"
        ],
        "sieve": {
          "hiphop": true,
          "oscarPulitzer": false,
          "pre2000": false,
          "deceased": false,
          "hot100": true,
          "solo": true,
          "coastUS": false,
          "diamond": true
        }
      }
    ]
  }
};

const SHOWS_BY_CATEGORY = {
  "anime": [
    "naruto",
    "one_piece",
    "jujutsu_kaisen",
    "dragon_ball",
    "attack_on_titan"
  ],
  "movies": [
    "star_wars",
    "marvel_mcu",
    "cinema_icons"
  ],
  "gaming": [
    "video_games"
  ],
  "sports": [
    "sports"
  ],
  "music": [
    "music"
  ]
};


/**
 * Roster Accessors and Filter Helpers
 */
function getShowsForCategory(category) {
  const showIds = SHOWS_BY_CATEGORY[category] || [];
  return [
    { id: 'all', name: 'All ' + (CATEGORY_NAMES[category] || category) },
    ...showIds.map(id => ({ id, name: `${SHOWS[id].name} (${SHOWS[id].characters.length})` }))
  ];
}

function getCharacters(category, showId = 'all') {
  if (showId && showId !== 'all' && SHOWS[showId]) {
    return SHOWS[showId].characters;
  }
  const showIds = SHOWS_BY_CATEGORY[category] || [];
  let chars = [];
  showIds.forEach(id => {
    if (SHOWS[id]) chars = chars.concat(SHOWS[id].characters);
  });
  return chars;
}

// 2. IMPOSTER DATA PACKS (Expanded whole-show rosters)
const IMPOSTER_DATA = {
  anime: getCharacters('anime', 'all'),
  movies: getCharacters('movies', 'all'),
  gaming: getCharacters('gaming', 'all'),
  sports: getCharacters('sports', 'all'),
  music: getCharacters('music', 'all')
};

// 3. SCALE VERSUS DATA PACKS (Expanded whole-show rosters with domain & group)
const SCALE_DATA = {
  anime: getCharacters('anime', 'all').map(c => ({
    id: c.id,
    name: c.name,
    domain: c.series,
    group: c.subGroup,
    traits: c.traits
  })),
  movies: getCharacters('movies', 'all').map(c => ({
    id: c.id,
    name: c.name,
    domain: c.series,
    group: c.subGroup,
    traits: c.traits
  })),
  gaming: getCharacters('gaming', 'all').map(c => ({
    id: c.id,
    name: c.name,
    domain: c.series,
    group: c.subGroup,
    traits: c.traits
  })),
  sports: getCharacters('sports', 'all').map(c => ({
    id: c.id,
    name: c.name,
    domain: c.series,
    group: c.subGroup,
    traits: c.traits
  })),
  music: getCharacters('music', 'all').map(c => ({
    id: c.id,
    name: c.name,
    domain: c.series,
    group: c.subGroup,
    traits: c.traits
  }))
};

// 5. SIEVE DATA PACKS (Expanded whole-show rosters with boolean flags)
const SIEVE_DATA = {
  anime: {
    characters: getCharacters('anime', 'all').map(c => ({
      id: c.id,
      name: c.name,
      series: c.series,
      subGroup: c.subGroup,
      ...c.sieve
    })),
    questions: [
      { id: 'powers', label: 'Wields Supernatural / Cursed Powers?' },
      { id: 'male', label: 'Gender: Identified as Male?' },
      { id: 'deceased', label: 'Status: Canonically Deceased / Terminated?' },
      { id: 'oldGen', label: 'Era: Old-Gen Debut (Pre-2005)?' },
      { id: 'student', label: 'Affiliation: Student or Teacher at an Academy?' },
      { id: 'protagonist', label: 'Role: Central Series Protagonist?' },
      { id: 'villain', label: 'Allegiance: Primary Antagonist / Rogue / Villain?' },
      { id: 'frontline', label: 'Combat: Front-Line Martial Fighter or Swordsman?' }
    ]
  },
  movies: {
    characters: getCharacters('movies', 'all').map(c => ({
      id: c.id,
      name: c.name,
      series: c.series,
      subGroup: c.subGroup,
      ...c.sieve
    })),
    questions: [
      { id: 'powers', label: 'Wields Supernatural or Superhuman Powers?' },
      { id: 'male', label: 'Gender: Identified as Male?' },
      { id: 'deceased', label: 'Status: Canonically Deceased in Main Canon?' },
      { id: 'oldGen', label: 'Era: Debut Release Pre-2000?' },
      { id: 'mask', label: 'Costume: Wears Mask, Cowl, Helmet or Heavy Makeup?' },
      { id: 'protagonist', label: 'Role: Central Protagonist / Hero?' },
      { id: 'superhero', label: 'Universe: Marvel or DC Comics Universe?' },
      { id: 'gunplay', label: 'Weaponry: Primary Arsenal Uses Firearms or Explosives?' }
    ]
  },
  gaming: {
    characters: getCharacters('gaming', 'all').map(c => ({
      id: c.id,
      name: c.name,
      series: c.series,
      subGroup: c.subGroup,
      ...c.sieve
    })),
    questions: [
      { id: 'firearms', label: 'Arsenal: Utilizes Firearms, Guns, or Plasma Ballistics?' },
      { id: 'male', label: 'Gender: Identified as Male?' },
      { id: 'pre2010', label: 'Era: Franchise Debut Prior to 2010?' },
      { id: 'nintendo', label: 'Publisher: Flagship Nintendo Franchise?' },
      { id: 'armor', label: 'Appearance: Wears Full-Body Armor or Combat Gear?' },
      { id: 'protagonist', label: 'Role: Central Playable Protagonist?' },
      { id: 'fantasy', label: 'Setting: Mythological, Medieval, or Magic-Infused Lore?' },
      { id: 'platformer', label: 'Genre: Classic Platformer or Side-Scroller?' }
    ]
  },
  sports: {
    characters: getCharacters('sports', 'all').map(c => ({
      id: c.id,
      name: c.name,
      series: c.series,
      subGroup: c.subGroup,
      ...c.sieve
    })),
    questions: [
      { id: 'football', label: 'Sport: Association Football (Soccer)?' },
      { id: 'worldChamp', label: 'Trophy: Has Won an Official World Championship or World Cup?' },
      { id: 'active2024', label: 'Status: Actively Competing in 2024?' },
      { id: 'spClubs', label: 'Club: Played for Real Madrid or FC Barcelona?' },
      { id: 'mvp', label: 'Accolade: Won League MVP or Ballon d\'Or?' },
      { id: 'teamSport', label: 'Discipline: Competes in a Team Sport (vs Individual)?' },
      { id: 'speedster', label: 'Attribute: Internationally Famed for Raw Sprint Speed?' },
      { id: 'jersey10', label: 'Iconography: Famously Associated with #10 Jersey?' }
    ]
  },
  music: {
    characters: getCharacters('music', 'all').map(c => ({
      id: c.id,
      name: c.name,
      series: c.series,
      subGroup: c.subGroup,
      ...c.sieve
    })),
    questions: [
      { id: 'hiphop', label: 'Genre: Primary Heritage in Hip-Hop / Rap?' },
      { id: 'oscarPulitzer', label: 'Accolade: Won an Academy Award (Oscar) or Pulitzer Prize?' },
      { id: 'pre2000', label: 'Era: First Major Studio Release Prior to 2000?' },
      { id: 'deceased', label: 'Status: Deceased Legend?' },
      { id: 'hot100', label: 'Charts: Has Charted #1 on Billboard Hot 100?' },
      { id: 'solo', label: 'Career: Primarily Famed as a Solo Headline Act?' },
      { id: 'coastUS', label: 'Origin: Direct West Coast or East Coast US Roots?' },
      { id: 'diamond', label: 'Commercial: Earned Multiple RIAA Diamond Certified Records?' }
    ]
  }
};

// Global Exports
if (typeof window !== 'undefined') {
  window.CATEGORIES = CATEGORIES;
  window.CATEGORY_NAMES = CATEGORY_NAMES;
  window.SHOWS = SHOWS;
  window.SHOWS_BY_CATEGORY = SHOWS_BY_CATEGORY;
  window.getShowsForCategory = getShowsForCategory;
  window.getCharacters = getCharacters;
  window.CONNECT5_DATA = CONNECT5_DATA;
  window.IMPOSTER_DATA = IMPOSTER_DATA;
  window.SCALE_DATA = SCALE_DATA;
  window.CRUCIBLE_DATA = CRUCIBLE_DATA;
  window.SIEVE_DATA = SIEVE_DATA;
}
