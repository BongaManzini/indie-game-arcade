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
      name: 'Katsuki Bakugo',
      series: 'My Hero Academia',
      puzzles: [
        { number: '1st', correctLabel: 'First-Year UA Sports Festival Champion', options: ['First-Year UA Sports Festival Champion', 'Class 1-A Academic Exam Rank', 'Hero Billboard JP Debut Rank', 'First Student to Manifest Quirk in Musutafu'] },
        { number: '5th', correctLabel: 'Quirk Apprehension Test Overall Rank', options: ['Quirk Apprehension Test Overall Rank', 'Explosions Fired Per Second', 'Hero Work Studies Agency Choice', 'Pro Hero License Finish Order'] },
        { number: '17th', correctLabel: 'Class 1-A Student Seating Order Number', options: ['Class 1-A Student Seating Order Number', 'Age in Final War Arc', 'Episode of First Villain Attack', 'Grenade Bracers Carried'] },
        { number: '25', correctLabel: 'Volume Number of First Solo Cover Feature', options: ['Volume Number of First Solo Cover Feature', 'Power Percentage Threshold', 'Combat Training Score Points', 'Middle School Room ID'] },
        { number: '705.2m', correctLabel: 'Softball Pitch Ball Throw Distance', options: ['Softball Pitch Ball Throw Distance', 'Explosion Stun Grenade Blast Radius', 'Altitude via Howitzer Impact', 'Ground Zero Rescue Zone Radius'] }
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
        { number: '2552', correctLabel: 'Year of the Battle of Installation 04 and Reach', options: ['Year of the Battle of Installation 04 and Reach', 'Year Spartan Program Commenced', 'Year Cortana was Synthesized', 'UNSC Forward Unto Dawn Launch Year'] },
        { number: '2.18m', correctLabel: 'Full Height While Wearing MJOLNIR Armor', options: ['Full Height While Wearing MJOLNIR Armor', 'Rocket Launcher Blast Radius', 'Warthog Wheelbase Distance', 'Energy Sword Plasma Arc Length'] },
        { number: '2001', correctLabel: 'Year Halo: Combat Evolved Launched on Xbox', options: ['Year Halo: Combat Evolved Launched on Xbox', 'Year Bungie Acquired by Microsoft', 'Year of First Halo 2 Gameplay Teaser', 'Original Halo Novel Release Year'] },
        { number: '7', correctLabel: 'Iconic Bungie Studio Lore & 7 Halo Rings', options: ['Iconic Bungie Studio Lore & 7 Halo Rings', 'Number of Campaign Missions in Halo 3', 'Gravemind Tentacle Node Count', 'Arbiter Duel Rounds Fought'] }
      ]
    },
    {
      name: 'Kratos',
      series: 'God of War',
      puzzles: [
        { number: '2005', correctLabel: 'Original God of War Debut Year on PS2', options: ['Original God of War Debut Year on PS2', 'Year of God of War II Release', 'Year of First Golden Fleece Cutscene', 'Norse Saga Pre-Production Year'] },
        { number: '2018', correctLabel: 'Game of the Year Reboot Launch in Norse Realm', options: ['Game of the Year Reboot Launch in Norse Realm', 'Ragnarok Announcement Year', 'Year Atreus Born in Canon', 'Valkyrie Queen Defeat Year'] },
        { number: '9', correctLabel: 'Nine Realms of Norse Mythology Explored', options: ['Nine Realms of Norse Mythology Explored', 'Olympian Gods Slain in God of War III', 'Number of Leviathan Axe Runic Slots', 'Spartan Army Divisions Commanded'] },
        { number: '2', correctLabel: 'Two Primary Signature Weapons (Blades & Axe)', options: ['Two Primary Signature Weapons (Blades & Axe)', 'Number of Greek Pantheon Trilogies', 'Eyes Lost in Combat Against Zeus', 'Brothers in the Spartan Royal Bloodline'] },
        { number: '23M', correctLabel: 'Total Copies Sold of God of War (2018)', options: ['Total Copies Sold of God of War (2018)', 'Total Spartan Rage Kills Worldwide', 'Souls Trapped Inside the Claws of Hades', 'Budget Cost of Original 2005 Game'] }
      ]
    }
  ],
  sports: [
    {
      name: 'Lionel Messi',
      series: 'Football / Soccer',
      puzzles: [
        { number: '10', correctLabel: 'Iconic Jersey Number for Barcelona & Argentina', options: ['Iconic Jersey Number for Barcelona & Argentina', 'Number of Champions League Trophies', 'Number of Copa America Trophies', 'World Cup Goals Scored in 2022'] },
        { number: '8', correctLabel: 'Record 8 Ballon d\'Or Trophies Won', options: ['Record 8 Ballon d\'Or Trophies Won', 'La Liga Top Scorer Pichichi Awards', 'Free Kick Goals in a Single Season', 'Years Spent at Inter Miami'] },
        { number: '91', correctLabel: 'World Record 91 Goals Scored in Calendar Year 2012', options: ['World Record 91 Goals Scored in Calendar Year 2012', 'Career Hat-Tricks Scored', 'World Cup Minutes Played Against France', 'Passing Accuracy Percentage'] },
        { number: '2022', correctLabel: 'Year FIFA World Cup Champion in Qatar', options: ['Year FIFA World Cup Champion in Qatar', 'Year of Barcelona Departure', 'Year of First Ballon d\'Or Win', 'Year of Copa America Victory in Maracana'] },
        { number: '672', correctLabel: 'All-Time Record Goals Scored for FC Barcelona', options: ['All-Time Record Goals Scored for FC Barcelona', 'Total Career League Appearances', 'Minutes Between Goals Across 15 Seasons', 'Official Career Assists Across All Clubs'] }
      ]
    },
    {
      name: 'Cristiano Ronaldo',
      series: 'Football / Soccer',
      puzzles: [
        { number: '7', correctLabel: 'Iconic CR7 Jersey Number', options: ['Iconic CR7 Jersey Number', 'Ballon d\'Or Awards Won', 'Premier League Titles with Man United', 'Goals Scored in 2008 Champions League'] },
        { number: '5', correctLabel: 'Number of UEFA Champions League Trophies Won', options: ['Number of UEFA Champions League Trophies Won', 'World Cup Tournaments Played In', 'Golden Boots Won in European Leagues', 'Club World Cup Victories'] },
        { number: '450', correctLabel: 'All-Time Record 450 Goals Scored for Real Madrid', options: ['All-Time Record 450 Goals Scored for Real Madrid', 'Matches Played in La Liga for Madrid', 'Free Kick Goals in European Competitions', 'Header Goals Across Entire Career'] },
        { number: '140', correctLabel: 'All-Time Champions League Top Scorer Record', options: ['All-Time Champions League Top Scorer Record', 'Caps for Portugal National Team', 'Speed in KM/H of Fastest Recorded Shot', 'Penalty Kicks Converted in Top 5 Leagues'] },
        { number: '900+', correctLabel: 'First Player to Surpass 900 Official Career Goals', options: ['First Player to Surpass 900 Official Career Goals', 'Million Followers on Social Media', 'Career Professional Club Appearances', 'Minutes Played Across 5 World Cups'] }
      ]
    }
  ],
  music: [
    {
      name: 'Eminem (Marshall Mathers)',
      series: 'Hip-Hop & Rap',
      puzzles: [
        { number: '8', correctLabel: '8 Mile: Semi-Autobiographical Film Release', options: ['8 Mile: Semi-Autobiographical Film Release', 'Number of Diamond Certified Singles', 'Albums Debuting at #1 Consecutively', 'Grammy Awards Won for Marshall Mathers LP'] },
        { number: '2000', correctLabel: 'Year The Marshall Mathers LP Released', options: ['Year The Marshall Mathers LP Released', 'Year The Slim Shady LP Won Grammy', 'Year of Oscar Win for Lose Yourself', 'Year Shady Records Founded'] },
        { number: '15', correctLabel: 'Total Grammy Awards Won Throughout Career', options: ['Total Grammy Awards Won Throughout Career', 'Number of Solo Studio Albums Released', 'Weeks Lose Yourself Spent at #1 on Billboard', 'Tracks on The Slim Shady LP'] },
        { number: '1', correctLabel: 'First Rap Artist to Win an Academy Award (Oscar)', options: ['First Rap Artist to Win an Academy Award (Oscar)', 'Albums Certified Quadruple Platinum', 'Fastest Rapper Guinness World Record Position', 'Number of Diamond Certified Albums'] },
        { number: '9.6', correctLabel: 'Syllables Per Second in Rap God Fast Verse', options: ['Syllables Per Second in Rap God Fast Verse', 'Million First-Week Sales Worldwide', 'Minutes in Godzilla Track', 'Total Decibels of Recorded Mic Input'] }
      ]
    },
    {
      name: 'Michael Jackson',
      series: 'Pop Music',
      puzzles: [
        { number: '1982', correctLabel: 'Year Thriller Released (Best-Selling Album of All Time)', options: ['Year Thriller Released (Best-Selling Album of All Time)', 'Year Bad World Tour Commenced', 'Year Moonwalk Debuted on Motown 25', 'Year Off the Wall Won First Grammy'] },
        { number: '70M', correctLabel: 'Over 70 Million Certified Sales of Thriller', options: ['Over 70 Million Certified Sales of Thriller', 'Views on First MTV Broadcast', 'Dollars Donated to Heal the World Charity', 'Tickets Sold on HIStory World Tour'] },
        { number: '8', correctLabel: 'Record 8 Grammy Awards Won in a Single Night (1984)', options: ['Record 8 Grammy Awards Won in a Single Night (1984)', 'Number of Siblings in The Jackson 5', 'Consecutive #1 Singles on Bad Album', 'Weeks Billie Jean Held #1 on Billboard Hot 100'] },
        { number: '13', correctLabel: 'Number of Billboard Hot 100 #1 Singles', options: ['Number of Billboard Hot 100 #1 Singles', 'Cost in Millions of Scream Music Video', 'Age of First Jackson 5 Chart Topper', 'Tracks on Dangerous Album'] },
        { number: '1983', correctLabel: 'Year the Moonwalk was First Unveiled on Motown 25', options: ['Year the Moonwalk was First Unveiled on Motown 25', 'Year Thriller Music Video Premiered', 'Year Pepsi Commercial Filmed', 'Year We Are the World was Written'] }
      ]
    }
  ]
};

// 2. IMPOSTER DATA PACKS (Characters + 1-Word Clues)
const IMPOSTER_DATA = {
  anime: [
    { name: 'Naruto Uzumaki', series: 'Naruto', clues: ['Nine-Tails', 'Hokage', 'Ramen', 'Orange', 'Rasengan', 'Toad', 'Shadow', 'Fox'] },
    { name: 'Monkey D. Luffy', series: 'One Piece', clues: ['Straw Hat', 'Rubber', 'Meat', 'Pirate', 'King', 'Gear', 'Nika', 'Anchor'] },
    { name: 'Son Goku', series: 'Dragon Ball Z', clues: ['Saiyan', 'Tail', 'Kamehameha', 'Orange', 'Nimbus', 'Dragon', 'Hair', 'Monkey'] },
    { name: 'Satoru Gojo', series: 'Jujutsu Kaisen', clues: ['Blindfold', 'Infinity', 'Blue', 'Teacher', 'Limitless', 'Hollow', 'Six', 'Strongest'] },
    { name: 'Ryomen Sukuna', series: 'Jujutsu Kaisen', clues: ['Fingers', 'Shrine', 'Tattoos', 'Cleave', 'King', 'Heian', 'Curse', 'Slash'] },
    { name: 'Levi Ackerman', series: 'Attack on Titan', clues: ['Blades', 'Clean', 'Captain', 'Short', 'Spin', 'Tea', 'Survey', 'Ackerman'] },
    { name: 'Saitama', series: 'One Punch Man', clues: ['Bald', 'Punch', 'Cape', 'Grocery', 'Bored', 'Hero', 'Yellow', 'Gloves'] },
    { name: 'Tanjiro Kamado', series: 'Demon Slayer', clues: ['Water', 'Sun', 'Earrings', 'Box', 'Sister', 'Smell', 'Scar', 'Breathing'] }
  ],
  movies: [
    { name: 'Darth Vader', series: 'Star Wars', clues: ['Breathing', 'Mask', 'Sith', 'Black', 'Father', 'Lightsaber', 'Empire', 'Force'] },
    { name: 'The Joker', series: 'Batman / DC', clues: ['Smile', 'Purple', 'Card', 'Clown', 'Gotham', 'Chaos', 'Laugh', 'Makeup'] },
    { name: 'Tony Stark (Iron Man)', series: 'Marvel MCU', clues: ['Reactor', 'Armor', 'Genius', 'Billionaire', 'Snap', 'Nanotech', 'Suit', 'Jarvis'] },
    { name: 'Harry Potter', series: 'Wizarding World', clues: ['Scar', 'Glasses', 'Wand', 'Owl', 'Lightning', 'Gryffindor', 'Broom', 'Cloak'] },
    { name: 'Neo (Thomas Anderson)', series: 'The Matrix', clues: ['Pill', 'Code', 'Bullets', 'Trenchcoat', 'One', 'Sunglasses', 'Lobby', 'Dodge'] },
    { name: 'John Wick', series: 'John Wick', clues: ['Dog', 'Pencil', 'Suit', 'Continental', 'Mustang', 'Coins', 'Boogeyman', 'Assassin'] },
    { name: 'Thanos', series: 'Marvel MCU', clues: ['Gauntlet', 'Snap', 'Stones', 'Purple', 'Balance', 'Titan', 'Inevitable', 'Dust'] }
  ],
  gaming: [
    { name: 'Master Chief', series: 'Halo', clues: ['Armor', 'Green', 'Cortana', 'Ring', 'Spartan', 'Shield', 'Helmet', '117'] },
    { name: 'Kratos', series: 'God of War', clues: ['Axe', 'Blades', 'Ash', 'Boy', 'Sparta', 'God', 'Rage', 'Beard'] },
    { name: 'Super Mario', series: 'Nintendo', clues: ['Mushroom', 'Mustache', 'Pipe', 'Princess', 'Red', 'Jump', 'Plumber', 'Star'] },
    { name: 'Geralt of Rivia', series: 'The Witcher', clues: ['Silver', 'Mutant', 'Swords', 'Wolf', 'Potion', 'White Hair', 'Medallion', 'Monster'] },
    { name: 'Steve', series: 'Minecraft', clues: ['Pickaxe', 'Creeper', 'Diamond', 'Craft', 'Square', 'Block', 'Mine', 'Torches'] },
    { name: 'Doom Slayer', series: 'DOOM', clues: ['Shotgun', 'Rip', 'Tear', 'Hell', 'Armor', 'Demons', 'Chainsaw', 'Praetor'] },
    { name: 'Sonic the Hedgehog', series: 'SEGA', clues: ['Rings', 'Blue', 'Fast', 'Chili Dog', 'Spikes', 'Loop', 'Emerald', 'Shoes'] }
  ],
  sports: [
    { name: 'Lionel Messi', series: 'Football / Soccer', clues: ['Barcelona', 'Left Foot', 'Dribble', 'Argentina', 'Qatar', 'Ballon d\'Or', 'Miami', 'Short'] },
    { name: 'Cristiano Ronaldo', series: 'Football / Soccer', clues: ['Siu', 'Madrid', 'Jump', 'Portugal', '7', 'Header', 'Champions', 'Fitness'] },
    { name: 'LeBron James', series: 'Basketball / NBA', clues: ['King', 'Dunk', 'Lakers', 'Chalk', 'Crown', 'Cleveland', 'Akron', 'Championship'] },
    { name: 'Michael Jordan', series: 'Basketball / NBA', clues: ['Bulls', '23', 'Air', 'Tongue', 'Shoes', '6 Rings', 'Flu Game', 'Jumpman'] },
    { name: 'Usain Bolt', series: 'Track & Athletics', clues: ['Lightning', 'Pose', 'Jamaica', '100m', 'Fastest', 'Gold', 'Puma', 'Sprint'] },
    { name: 'Lewis Hamilton', series: 'Formula 1', clues: ['Mercedes', '7 Titles', 'Silverstone', 'Helmet', 'Pole', 'Steering', 'Podium', 'Driver'] }
  ],
  music: [
    { name: 'Eminem', series: 'Hip-Hop / Rap', clues: ['Detroit', 'Blonde', 'Fast', '8 Mile', 'Spaghetti', 'Shady', 'Sweater', 'Grammy'] },
    { name: 'Michael Jackson', series: 'Pop Music', clues: ['Moonwalk', 'Glove', 'Thriller', 'Hat', 'Jacket', 'Pop', 'Zombies', 'Spin'] },
    { name: 'Drake', series: 'Hip-Hop / R&B', clues: ['Toronto', 'Owl', 'OVO', 'Hotline', 'Certified', '6 God', 'Drizzle', 'Champagne'] },
    { name: 'Kendrick Lamar', series: 'Hip-Hop / Rap', clues: ['Compton', 'Pulitzer', 'Crown', 'DNA', 'Kung Fu', 'Humble', 'Poetic', 'Good Kid'] },
    { name: 'Tupac Shakur', series: 'Hip-Hop / Rap', clues: ['Bandana', 'Makaveli', 'California', 'Thug Life', 'West Coast', 'Poetry', 'Roses', 'Death Row'] }
  ]
};

// 3. SCALE VERSUS DATA PACKS (Relational Attributes & Targets)
const SCALE_DATA = {
  anime: [
    { id: 'naruto', name: 'Naruto Uzumaki', domain: 'Naruto', group: 'Team 7', traits: ['Ninja', 'Jinchuriki', 'Rasengan', 'Hokage', 'Orange'] },
    { id: 'sasuke', name: 'Sasuke Uchiha', domain: 'Naruto', group: 'Team 7', traits: ['Ninja', 'Sharingan', 'Chidori', 'Uchiha', 'Rinnegan'] },
    { id: 'kakashi', name: 'Kakashi Hatake', domain: 'Naruto', group: 'Team 7', traits: ['Ninja', 'Sharingan', 'Sensei', 'Mask', 'Lightning'] },
    { id: 'itachi', name: 'Itachi Uchiha', domain: 'Naruto', group: 'Akatsuki', traits: ['Ninja', 'Akatsuki', 'Sharingan', 'Genjutsu', 'Uchiha'] },
    { id: 'luffy', name: 'Monkey D. Luffy', domain: 'One Piece', group: 'Straw Hats', traits: ['Pirate', 'Nika', 'Captain', 'Rubber', 'Yonko'] },
    { id: 'zoro', name: 'Roronoa Zoro', domain: 'One Piece', group: 'Straw Hats', traits: ['Swordsman', 'Haki', 'Santoryu', 'Green Hair'] },
    { id: 'gojo', name: 'Gojo Satoru', domain: 'Jujutsu Kaisen', group: 'Jujutsu High', traits: ['Sorcerer', 'Limitless', 'Six Eyes', 'Teacher', 'Strongest'] },
    { id: 'sukuna', name: 'Ryomen Sukuna', domain: 'Jujutsu Kaisen', group: 'Curses', traits: ['Curse', 'Cleave', 'Dismantle', 'King', 'Four Arms'] },
    { id: 'goku', name: 'Son Goku', domain: 'Dragon Ball Z', group: 'Z Fighters', traits: ['Saiyan', 'Kamehameha', 'Super Saiyan', 'Ultra Instinct'] },
    { id: 'levi', name: 'Levi Ackerman', domain: 'Attack on Titan', group: 'Scouts', traits: ['Soldier', 'Captain', 'Ackerman', 'Humanity Strongest'] },
    { id: 'saitama', name: 'Saitama', domain: 'One Punch Man', group: 'Heroes', traits: ['Hero', 'One Punch', 'Bald', 'Caped Baldy'] }
  ],
  movies: [
    { id: 'vader', name: 'Darth Vader', domain: 'Star Wars', group: 'Sith Empire', traits: ['Sith', 'Mask', 'Lightsaber', 'Dark Side', 'Father'] },
    { id: 'luke', name: 'Luke Skywalker', domain: 'Star Wars', group: 'Jedi Order', traits: ['Jedi', 'Lightsaber', 'Farmboy', 'Master', 'Force'] },
    { id: 'yoda', name: 'Master Yoda', domain: 'Star Wars', group: 'Jedi Order', traits: ['Jedi', 'Grand Master', 'Green', 'Ears', 'Force'] },
    { id: 'joker', name: 'The Joker', domain: 'DC Comics', group: 'Gotham Rogues', traits: ['Villain', 'Clown', 'Makeup', 'Purple', 'Chaos'] },
    { id: 'batman', name: 'Batman (Bruce Wayne)', domain: 'DC Comics', group: 'Justice League', traits: ['Hero', 'Cape', 'Billionaire', 'Detective', 'Gadgets'] },
    { id: 'tony', name: 'Tony Stark (Iron Man)', domain: 'Marvel MCU', group: 'Avengers', traits: ['Hero', 'Armor', 'Genius', 'Arc Reactor', 'Billionaire'] },
    { id: 'cap', name: 'Captain America (Steve Rogers)', domain: 'Marvel MCU', group: 'Avengers', traits: ['Hero', 'Shield', 'Super Soldier', 'Leader', 'Stars'] },
    { id: 'thanos', name: 'Thanos', domain: 'Marvel MCU', group: 'Titan', traits: ['Villain', 'Gauntlet', 'Stones', 'Balance', 'Purple'] },
    { id: 'neo', name: 'Neo (The Matrix)', domain: 'The Matrix', group: 'Zion', traits: ['Hero', 'Chosen One', 'Coat', 'Guns', 'Kung Fu'] },
    { id: 'wick', name: 'John Wick', domain: 'John Wick', group: 'High Table', traits: ['Assassin', 'Suit', 'Pencil', 'Dogs', 'Continental'] }
  ],
  gaming: [
    { id: 'chief', name: 'Master Chief', domain: 'Halo', group: 'UNSC Spartans', traits: ['Super Soldier', 'Green Armor', 'Cortana', 'Assault Rifle', '117'] },
    { id: 'arbiter', name: 'The Arbiter', domain: 'Halo', group: 'Sangheili', traits: ['Alien', 'Energy Sword', 'Honor', 'Covenant', 'Warrior'] },
    { id: 'kratos', name: 'Kratos', domain: 'God of War', group: 'Spartan Demigod', traits: ['God', 'Axe', 'Blades of Chaos', 'Spartan', 'Father'] },
    { id: 'atreus', name: 'Atreus (Loki)', domain: 'God of War', group: 'Spartan Demigod', traits: ['Demigod', 'Bow', 'Arrows', 'Son', 'Giant'] },
    { id: 'mario', name: 'Super Mario', domain: 'Super Mario', group: 'Mushroom Kingdom', traits: ['Plumber', 'Red Cap', 'Mustache', 'Jump', 'Fire Flower'] },
    { id: 'luigi', name: 'Luigi', domain: 'Super Mario', group: 'Mushroom Kingdom', traits: ['Plumber', 'Green Cap', 'Mustache', 'Ghosts', 'Brother'] },
    { id: 'geralt', name: 'Geralt of Rivia', domain: 'The Witcher', group: 'School of the Wolf', traits: ['Witcher', 'Two Swords', 'Mutant', 'Signs', 'White Hair'] },
    { id: 'steve', name: 'Steve (Minecraft)', domain: 'Minecraft', group: 'Overworld', traits: ['Builder', 'Pickaxe', 'Blocks', 'Crafting', 'Blue Shirt'] },
    { id: 'doom', name: 'Doom Slayer', domain: 'DOOM', group: 'Night Sentinels', traits: ['Marine', 'Green Armor', 'Shotgun', 'Demon Slayer', 'Heavy Metal'] }
  ],
  sports: [
    { id: 'messi', name: 'Lionel Messi', domain: 'Football / Soccer', group: 'Argentina / Barcelona', traits: ['Left Foot', 'Dribbler', 'Playmaker', '8 Ballons d\'Or', 'World Champion'] },
    { id: 'cr7', name: 'Cristiano Ronaldo', domain: 'Football / Soccer', group: 'Portugal / Real Madrid', traits: ['Striker', 'Header', 'CR7', '5 Champions Leagues', 'Goalscorer'] },
    { id: 'neymar', name: 'Neymar Jr', domain: 'Football / Soccer', group: 'Brazil / PSG', traits: ['Winger', 'Skills', 'Brazil', 'Santos', 'Dribbler'] },
    { id: 'mbappe', name: 'Kylian Mbappé', domain: 'Football / Soccer', group: 'France / Real Madrid', traits: ['Speed', 'World Cup Hat-Trick', 'Winger', 'Forward', 'PSG'] },
    { id: 'lebron', name: 'LeBron James', domain: 'Basketball / NBA', group: 'LA Lakers / Miami Heat', traits: ['Forward', 'King', 'All-Time Scorer', '4 Rings', 'Dunks'] },
    { id: 'jordan', name: 'Michael Jordan', domain: 'Basketball / NBA', group: 'Chicago Bulls', traits: ['Shooting Guard', 'Air Jordan', '6-0 Finals', 'Clutch', 'Defense'] },
    { id: 'bolt', name: 'Usain Bolt', domain: 'Athletics / Track', group: 'Jamaica Sprint Team', traits: ['100m Record', '200m Record', 'Lightning Pose', '8 Gold Medals', 'Fastest Human'] }
  ],
  music: [
    { id: 'eminem', name: 'Eminem', domain: 'Hip-Hop', group: 'Shady / Aftermath', traits: ['Rap God', 'Detroit', 'Fast Flow', 'Slim Shady', 'Oscars'] },
    { id: 'drake', name: 'Drake', domain: 'Hip-Hop / R&B', group: 'OVO Sound', traits: ['Toronto', 'Melodic Rap', 'Billboard Records', 'Owl', '6 God'] },
    { id: 'kendrick', name: 'Kendrick Lamar', domain: 'Hip-Hop', group: 'pgLang / TDE', traits: ['Pulitzer', 'Compton', 'Lyrical', 'Humble', 'Storyteller'] },
    { id: 'mj', name: 'Michael Jackson', domain: 'Pop / R&B', group: 'King of Pop', traits: ['Moonwalk', 'Thriller', 'Grammy Record', 'Glove', 'Dancer'] },
    { id: 'tupac', name: 'Tupac Shakur', domain: 'Hip-Hop', group: 'Death Row / Outlawz', traits: ['West Coast', 'Thug Life', 'Poet', 'Bandana', 'All Eyez On Me'] },
    { id: 'kanye', name: 'Kanye West (Ye)', domain: 'Hip-Hop / Production', group: 'GOOD Music', traits: ['Producer', 'Autotune', 'Chicago', 'Fashion', 'Graduation'] }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.CATEGORIES = CATEGORIES;
  window.CATEGORY_NAMES = CATEGORY_NAMES;
  window.CONNECT5_DATA = CONNECT5_DATA;
  window.IMPOSTER_DATA = IMPOSTER_DATA;
  window.SCALE_DATA = SCALE_DATA;
}

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
          { cost: 1, name: 'Batarang Tactical Wire Grid', desc: 'Precision electro-shock cables and smoke smoke-screens.' },
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
          { cost: 1, name: 'Bare-Knuckle Street Boxing', desc: 'Heavy brawling style with chin-checking right hooks.' },
          { cost: 2, name: 'Wing Chun Wooden Dummy Trapping', desc: 'Rapid close-range deflections and centerline strikes.' },
          { cost: 3, name: 'John Wick Gun-Fu CQB', desc: 'Seamless pistol reloads, point-blank judo throws and disarms.' },
          { cost: 4, name: 'Lightsaber Form V (Djem So)', desc: 'Heavy counter-slashes and blaster bolt deflections.' },
          { cost: 5, name: 'Matrix Bullet-Time Kung Fu', desc: 'Zero-latency neural reaction speed dodging incoming ballistics.' }
        ]
      },
      {
        id: 'speed',
        title: 'SOCKET 3: MOBILITY & TRANSIT',
        options: [
          { cost: 1, name: 'High-Tensile Grapple Gun', desc: 'Rapid vertical ascent onto rooftops and crane gantry arms.' },
          { cost: 2, name: 'DeLorean Flux Boost (88 MPH)', desc: 'Instantaneous ground speed burst avoiding missile locks.' },
          { cost: 3, name: 'Iron Man Mark 85 Repulsor Flight', desc: 'Supersonic three-axis aerial agility with hovering stabilization.' },
          { cost: 4, name: 'Millennium Falcon Sub-Light Drive', desc: 'Emergency atmospheric evasive barrel roll.' },
          { cost: 5, name: 'Doctor Strange Sling Ring Portal', desc: 'Immediate interdimensional gateway bypassing all walls.' }
        ]
      },
      {
        id: 'teammate',
        title: 'SOCKET 4: SQUAD COMPANION',
        options: [
          { cost: 1, name: 'Robin (Tim Drake)', desc: 'Acrobatic distraction and reconnaissance smoke.' },
          { cost: 2, name: 'Han Solo & Chewbacca', desc: 'Heavy blaster cover fire and mechanical repairs.' },
          { cost: 3, name: 'Legolas Greenleaf', desc: 'Pinpoint longbow headshots across 300 meters.' },
          { cost: 4, name: 'Optimus Prime', desc: 'Giant Cybertronian vanguard with ion blaster cannon.' },
          { cost: 5, name: 'Tony Stark (Nano-Suit)', desc: 'Autonomous combat drones and orbital energy beam support.' }
        ]
      }
    ]
  },
  gaming: {
    scenario: "Black Mesa Core Meltdown — Extraction under fire from Covenant Zealots & Cyberdemons",
    sockets: [
      {
        id: 'technique',
        title: 'SOCKET 1: ULTIMATE ARSENAL',
        options: [
          { cost: 1, name: 'Tactical Molotov & Smoke', desc: 'Denies doorway corridors with persistent flame tick damage.' },
          { cost: 2, name: 'Aperture Science Portal Gun', desc: 'Fires blue/orange spatial portals linking distant surfaces.' },
          { cost: 3, name: 'Master Sword Skyward Beam', desc: 'Piercing sacred energy blade slash at full HP.' },
          { cost: 4, name: 'Spartan MJOLNIR Overshield', desc: 'Absorbs 500HP of plasma fire before dynamic recharge.' },
          { cost: 5, name: 'BFG 9000 Plasma Core', desc: 'Fires colossal green plasma orb emitting lethal tendrils.' }
        ]
      },
      {
        id: 'hands',
        title: 'SOCKET 2: COMBAT STANCE',
        options: [
          { cost: 1, name: 'Diamond Sword Crits', desc: 'Timed overhead sweeping strikes with jumping bonus damage.' },
          { cost: 2, name: 'Hidden Blade Counter-Kill', desc: 'Insta-parry assassination on human-sized enemy infantry.' },
          { cost: 3, name: 'Blades of Chaos Raging Cyclone', desc: 'Dual chained blade swings with broad 360-degree sweep.' },
          { cost: 4, name: 'Doom Slayer Blood Punch', desc: 'Explosive kinetic fist strike shattering heavy demonic armor.' },
          { cost: 5, name: 'DMC Smokin\' Sexy Style Stinger', desc: 'Rapid thrust combo leaving enemies suspended in air juggle.' }
        ]
      },
      {
        id: 'speed',
        title: 'SOCKET 3: MOVEMENT PERK',
        options: [
          { cost: 1, name: 'Platformer Double Jump', desc: 'Standard secondary mid-air leap overcoming chasms.' },
          { cost: 2, name: 'Titanfall Wall Run & Power Slide', desc: 'Horizontal momentum preservation along vertical surfaces.' },
          { cost: 3, name: 'Dishonored Blink Teleport', desc: 'Short-range silent forward displacement onto ledges.' },
          { cost: 4, name: 'Sonic Super Spin Dash', desc: 'Instant spherical velocity shredding ground armor.' },
          { cost: 5, name: 'Unreal Tournament Translocator', desc: 'Beacon toss and instant spatial materialization.' }
        ]
      },
      {
        id: 'teammate',
        title: 'SOCKET 4: CO-OP ALLY',
        options: [
          { cost: 1, name: 'Claptrap', desc: 'Erratic shield recharge buffs and comedic distractions.' },
          { cost: 2, name: 'Miles "Tails" Prower', desc: 'Aerial lift transport and gadget EMP disruption.' },
          { cost: 3, name: 'Atreus (God of War)', desc: 'Stun arrow volleys and wolf spectral summons.' },
          { cost: 4, name: 'Cortana (AI Tactical HUD)', desc: 'Hacks enemy shields, overrides doors, and reads ambush paths.' },
          { cost: 5, name: 'The Doom Slayer', desc: 'Relentless heavy juggernaut drawing 100% aggro with super shotgun.' }
        ]
      }
    ]
  },
  sports: {
    scenario: "World Championship Final: 90th Minute — 1 Goal Down against Prime Pressing Dynasty",
    sockets: [
      {
        id: 'technique',
        title: 'SOCKET 1: PLAYMAKING WEAPON',
        options: [
          { cost: 1, name: 'Tactical Long-Throw In', desc: 'Catapult throw into the penalty box creating second-ball chaos.' },
          { cost: 2, name: 'Tiki-Taka 1-2 Triangle Pass', desc: 'Rapid pass and move sequence breaking past midfield pivot.' },
          { cost: 3, name: 'Step-Back Clutch 3-Pointer', desc: 'High-arc perimeter shot with 45% contest-resistance.' },
          { cost: 4, name: 'Curled Trivela Cross (Outside Boot)', desc: 'Whipping trajectory swerving behind center-backs into the box.' },
          { cost: 5, name: 'Pinpoint Laser Through-Ball', desc: 'Slices through 3 defensive lines directly into striker stride.' }
        ]
      },
      {
        id: 'hands',
        title: 'SOCKET 2: PHYSICALITY & WORK-RATE',
        options: [
          { cost: 1, name: 'Baseline Rebound Box-Out', desc: 'Low-center stance securing defensive possession.' },
          { cost: 2, name: 'Gegenpress Sprint Pressure', desc: 'Immediate 5-second sprint recovery after losing ball.' },
          { cost: 3, name: 'Box-to-Box 90-Minute Engine', desc: 'Never tires; covers 13km distance with persistent tackling.' },
          { cost: 4, name: 'Post-Up Power Slam Dunk', desc: 'Dominates the paint with contact finish and foul drawn.' },
          { cost: 5, name: 'CR7 2.9m Aerial Leap Header', desc: 'Hangs in the air over center backs with bullet header power.' }
        ]
      },
      {
        id: 'speed',
        title: 'SOCKET 3: PACE & AGILITY',
        options: [
          { cost: 1, name: 'Slalom Shuttle Sprint', desc: 'Reliable switch of play and tracking back down the flank.' },
          { cost: 2, name: 'Crossover Ankle-Breaker', desc: 'Sharp change of direction shedding perimeter defender.' },
          { cost: 3, name: 'Elastic Nutmeg Trick', desc: 'Ronaldo Chop or Elastico sliding ball through defender legs.' },
          { cost: 4, name: 'Usain Bolt 100m Explosive Sprint', desc: '38 km/h top-end sprint outpacing the offside trap.' },
          { cost: 5, name: 'Messi Low-Gravity Dribble Burst', desc: 'Micro-touches with left foot turning 3 defenders inside out.' }
        ]
      },
      {
        id: 'teammate',
        title: 'SOCKET 4: CAPTAIN / PARTNER',
        options: [
          { cost: 1, name: 'Sergio Busquets', desc: 'Calm pivot recycling possession and intercepting counter-attacks.' },
          { cost: 2, name: 'Scottie Pippen', desc: 'Lockdown perimeter defense and secondary transition facilitator.' },
          { cost: 3, name: 'Andres Iniesta', desc: 'Magical clutch balance; slips through tight spaces under pressure.' },
          { cost: 4, name: 'Michael Jordan', desc: 'Unstoppable clutch scoring mentality; demands final shot.' },
          { cost: 5, name: 'Lionel Messi', desc: 'Draws 4 defenders, delivers miracle assist, or scores solo free-kick.' }
        ]
      }
    ]
  },
  music: {
    scenario: "Sold-Out 80,000 Stadium Festival: Head-to-Head Soundclash Battle",
    sockets: [
      {
        id: 'technique',
        title: 'SOCKET 1: LYRICAL WEAPONRY',
        options: [
          { cost: 1, name: '16-Bar Boom Bap Verse', desc: 'Solid punchlines and classic multi-syllable rhyme schemes.' },
          { cost: 2, name: 'Melodic Auto-Tune Anthem Hook', desc: 'Viral stadium chorus that gets 80,000 fans chanting along.' },
          { cost: 3, name: 'Rapid Double-Time Chopper Flow', desc: 'Machine-gun 10 syllables/sec cadence hyping up the pit.' },
          { cost: 4, name: 'Concept Storytelling Multi-Verse', desc: 'Riveting narrative holding the audience in complete silence.' },
          { cost: 5, name: 'Rap God Acapella Cypher Blitz', desc: 'Peerless technical breath control leaving rival MCs speechless.' }
        ]
      },
      {
        id: 'hands',
        title: 'SOCKET 2: BEAT & PRODUCTION',
        options: [
          { cost: 1, name: 'SP-1200 Vinyl Drum Chops', desc: 'Gritty vintage drum break with dust and authentic bounce.' },
          { cost: 2, name: 'Sub-Heavy 808 Sliding Bassline', desc: 'Chest-rattling low end that vibrates the stadium bleachers.' },
          { cost: 3, name: 'Sample Chop & Pitch Shift', desc: 'Soul vocal loop chopped into hypnotic earworm chord progression.' },
          { cost: 4, name: 'Live 40-Piece Orchestral Strings', desc: 'Cinematic orchestral crescendo amplifying stadium drama.' },
          { cost: 5, name: 'Mike Dean Moog Synth Solo', desc: 'Ascending analog synth wall that sends stadium into euphoria.' }
        ]
      },
      {
        id: 'speed',
        title: 'SOCKET 3: STAGE CADENCE & ENERGY',
        options: [
          { cost: 1, name: 'Classic Mic Pass & Hype Call', desc: 'Keeps crowd hands up and monitors stage acoustics.' },
          { cost: 2, name: 'Stage Dive & Circle Pit Call', desc: 'Ignites adrenaline rush across front festival rows.' },
          { cost: 3, name: 'Sync Pyro Flames & Laser Rig', desc: 'Timed 30-foot fire bursts on every heavy 808 drop.' },
          { cost: 4, name: 'Moonwalk & Kinetic Stage Glide', desc: 'Unreal dance footwork captivating whole arena cameras.' },
          { cost: 5, name: 'Super Bowl Half-Time Level Spectacle', desc: 'Drones, floating stages, and seamless 15-minute medley.' }
        ]
      },
      {
        id: 'teammate',
        title: 'SOCKET 4: SURPRISE GUEST FEATURE',
        options: [
          { cost: 1, name: '21 Savage', desc: 'Cold ad-libs and monotone street realism verse.' },
          { cost: 2, name: 'J. Cole', desc: 'Thoughtful middle-child verse with intense crowd respect.' },
          { cost: 3, name: 'Drake', desc: 'Instant Billboard #1 hit potential with radio-ready bridge.' },
          { cost: 4, name: 'Kendrick Lamar', desc: 'Fierce battle rap precision; dismantles rival discographies.' },
          { cost: 5, name: 'Eminem', desc: 'Surprise entrance blowing the stadium roof off with verse of the night.' }
        ]
      }
    ]
  }
};

// 5. SIEVE SPEEDRUN DATA PACKS (60s 20-Questions)
const SIEVE_DATA = {
  anime: {
    characters: [
      { name: 'Naruto Uzumaki', series: 'Naruto', powers: true, male: true, deceased: false, oldGen: true, student: true, protagonist: true, big3: true, combat: true },
      { name: 'Sasuke Uchiha', series: 'Naruto', powers: true, male: true, deceased: false, oldGen: true, student: true, protagonist: false, big3: true, combat: true },
      { name: 'Kakashi Hatake', series: 'Naruto', powers: true, male: true, deceased: false, oldGen: true, student: true, protagonist: false, big3: true, combat: true },
      { name: 'Itachi Uchiha', series: 'Naruto', powers: true, male: true, deceased: true, oldGen: true, student: false, protagonist: false, big3: true, combat: true },
      { name: 'Gojo Satoru', series: 'Jujutsu Kaisen', powers: true, male: true, deceased: true, oldGen: false, student: true, protagonist: false, big3: false, combat: true },
      { name: 'Ryomen Sukuna', series: 'Jujutsu Kaisen', powers: true, male: true, deceased: true, oldGen: true, student: false, protagonist: false, big3: false, combat: true },
      { name: 'Monkey D. Luffy', series: 'One Piece', powers: true, male: true, deceased: false, oldGen: true, student: false, protagonist: true, big3: true, combat: true },
      { name: 'Roronoa Zoro', series: 'One Piece', powers: false, male: true, deceased: false, oldGen: true, student: false, protagonist: false, big3: true, combat: true },
      { name: 'Son Goku', series: 'Dragon Ball Z', powers: true, male: true, deceased: false, oldGen: true, student: false, protagonist: true, big3: false, combat: true },
      { name: 'Eren Yeager', series: 'Attack on Titan', powers: true, male: true, deceased: true, oldGen: false, student: true, protagonist: true, big3: false, combat: true },
      { name: 'Levi Ackerman', series: 'Attack on Titan', powers: false, male: true, deceased: false, oldGen: false, student: false, protagonist: false, big3: false, combat: true },
      { name: 'Tanjiro Kamado', series: 'Demon Slayer', powers: true, male: true, deceased: false, oldGen: false, student: false, protagonist: true, big3: false, combat: true },
      { name: 'Saitama', series: 'One Punch Man', powers: true, male: true, deceased: false, oldGen: false, student: false, protagonist: true, big3: false, combat: true },
      { name: 'Light Yagami', series: 'Death Note', powers: true, male: true, deceased: true, oldGen: true, student: true, protagonist: true, big3: false, combat: false }
    ],
    questions: [
      { id: 'powers', label: 'Wields Supernatural / Cursed Powers?' },
      { id: 'male', label: 'Gender: Identified as Male?' },
      { id: 'deceased', label: 'Status: Canonically Deceased / Terminated?' },
      { id: 'oldGen', label: 'Era: Old-Gen Debut (Pre-2005)?' },
      { id: 'student', label: 'Affiliation: Student or Teacher at an Academy?' },
      { id: 'protagonist', label: 'Role: Central Series Protagonist?' },
      { id: 'big3', label: 'Franchise: From the Big 3 (Naruto / Bleach / One Piece)?' },
      { id: 'combat', label: 'Combat: Front-Line Martial Fighter or Swordsman?' }
    ]
  },
  movies: {
    characters: [
      { name: 'Darth Vader', series: 'Star Wars', powers: true, male: true, deceased: true, oldGen: true, mask: true, protagonist: false, superhero: false, gunplay: false },
      { name: 'Luke Skywalker', series: 'Star Wars', powers: true, male: true, deceased: true, oldGen: true, mask: false, protagonist: true, superhero: false, gunplay: false },
      { name: 'The Joker', series: 'Batman / DC', powers: false, male: true, deceased: false, oldGen: true, mask: true, protagonist: false, superhero: true, gunplay: true },
      { name: 'Batman (Bruce Wayne)', series: 'Batman / DC', powers: false, male: true, deceased: false, oldGen: true, mask: true, protagonist: true, superhero: true, gunplay: false },
      { name: 'Tony Stark (Iron Man)', series: 'Marvel MCU', powers: false, male: true, deceased: true, oldGen: false, mask: true, protagonist: true, superhero: true, gunplay: true },
      { name: 'Captain America', series: 'Marvel MCU', powers: true, male: true, deceased: false, oldGen: false, mask: true, protagonist: true, superhero: true, gunplay: false },
      { name: 'Thanos', series: 'Marvel MCU', powers: true, male: true, deceased: true, oldGen: false, mask: false, protagonist: false, superhero: true, gunplay: false },
      { name: 'Neo', series: 'The Matrix', powers: true, male: true, deceased: true, oldGen: true, mask: false, protagonist: true, superhero: false, gunplay: true },
      { name: 'John Wick', series: 'John Wick', powers: false, male: true, deceased: false, oldGen: false, mask: false, protagonist: true, superhero: false, gunplay: true },
      { name: 'Harry Potter', series: 'Wizarding World', powers: true, male: true, deceased: false, oldGen: true, mask: false, protagonist: true, superhero: false, gunplay: false }
    ],
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
    characters: [
      { name: 'Master Chief', series: 'Halo', firearms: true, male: true, pre2010: true, nintendo: false, armor: true, protagonist: true, fantasy: false, platformer: false },
      { name: 'Kratos', series: 'God of War', firearms: false, male: true, pre2010: true, nintendo: false, armor: false, protagonist: true, fantasy: true, platformer: false },
      { name: 'Super Mario', series: 'Nintendo', firearms: false, male: true, pre2010: true, nintendo: true, armor: false, protagonist: true, fantasy: true, platformer: true },
      { name: 'Luigi', series: 'Nintendo', firearms: false, male: true, pre2010: true, nintendo: true, armor: false, protagonist: false, fantasy: true, platformer: true },
      { name: 'Geralt of Rivia', series: 'The Witcher', firearms: false, male: true, pre2010: true, nintendo: false, armor: true, protagonist: true, fantasy: true, platformer: false },
      { name: 'Steve', series: 'Minecraft', firearms: false, male: true, pre2010: false, nintendo: false, armor: false, protagonist: true, fantasy: false, platformer: false },
      { name: 'Doom Slayer', series: 'DOOM', firearms: true, male: true, pre2010: true, nintendo: false, armor: true, protagonist: true, fantasy: true, platformer: false },
      { name: 'Sonic the Hedgehog', series: 'SEGA', firearms: false, male: true, pre2010: true, nintendo: false, armor: false, protagonist: true, fantasy: false, platformer: true }
    ],
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
    characters: [
      { name: 'Lionel Messi', series: 'Football', football: true, worldChamp: true, active2024: true, spClubs: true, mvp: true, teamSport: true, speedster: false, jersey10: true },
      { name: 'Cristiano Ronaldo', series: 'Football', football: true, worldChamp: false, active2024: true, spClubs: true, mvp: true, teamSport: true, speedster: true, jersey10: false },
      { name: 'Kylian Mbappé', series: 'Football', football: true, worldChamp: true, active2024: true, spClubs: true, mvp: false, teamSport: true, speedster: true, jersey10: true },
      { name: 'Neymar Jr', series: 'Football', football: true, worldChamp: false, active2024: true, spClubs: true, mvp: false, teamSport: true, speedster: true, jersey10: true },
      { name: 'LeBron James', series: 'Basketball', football: false, worldChamp: true, active2024: true, spClubs: false, mvp: true, teamSport: true, speedster: false, jersey10: false },
      { name: 'Michael Jordan', series: 'Basketball', football: false, worldChamp: true, active2024: false, spClubs: false, mvp: true, teamSport: true, speedster: false, jersey10: false },
      { name: 'Usain Bolt', series: 'Athletics', football: false, worldChamp: true, active2024: false, spClubs: false, mvp: true, teamSport: false, speedster: true, jersey10: false },
      { name: 'Lewis Hamilton', series: 'Formula 1', football: false, worldChamp: true, active2024: true, spClubs: false, mvp: true, teamSport: false, speedster: true, jersey10: false }
    ],
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
    characters: [
      { name: 'Eminem', series: 'Hip-Hop', hiphop: true, oscarPulitzer: true, pre2000: true, deceased: false, hot100: true, solo: true, coastUS: false, diamond: true },
      { name: 'Michael Jackson', series: 'Pop', hiphop: false, oscarPulitzer: false, pre2000: true, deceased: true, hot100: true, solo: true, coastUS: false, diamond: true },
      { name: 'Drake', series: 'Hip-Hop / R&B', hiphop: true, oscarPulitzer: false, pre2000: false, deceased: false, hot100: true, solo: true, coastUS: false, diamond: true },
      { name: 'Kendrick Lamar', series: 'Hip-Hop', hiphop: true, oscarPulitzer: true, pre2000: false, deceased: false, hot100: true, solo: true, coastUS: true, diamond: false },
      { name: 'Tupac Shakur', series: 'Hip-Hop', hiphop: true, oscarPulitzer: false, pre2000: true, deceased: true, hot100: true, solo: true, coastUS: true, diamond: true },
      { name: 'Kanye West', series: 'Hip-Hop', hiphop: true, oscarPulitzer: false, pre2000: false, deceased: false, hot100: true, solo: true, coastUS: false, diamond: true }
    ],
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

// Update window exports
if (typeof window !== 'undefined') {
  window.CRUCIBLE_DATA = CRUCIBLE_DATA;
  window.SIEVE_DATA = SIEVE_DATA;
}
