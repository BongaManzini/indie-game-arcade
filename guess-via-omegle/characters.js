/**
 * Anime Character Database with Wikipedia imagery, traits, Number Matrix mappings, and 5 Fact Numbers per character.
 */

const ANIME_CHARACTERS = [
    {
        id: "goku",
        name: "Son Goku",
        series: "Dragon Ball Z",
        aliases: ["goku", "son goku", "kakarot", "kakarotto", "super saiyan goku"],
        image: "https://upload.wikimedia.org/wikipedia/en/a/af/Son_Goku_Dragon_Ball.png",
        fallbackAvatar: { bg: "#0078d4", hair: "#111111", eyes: "#60cdff", symbol: "悟" },
        clues: {
            demographics: "Male • Shonen • Martial Artist • Alien Race",
            appearance: "Spiky black hair that turns golden when powered up. Wears an orange Gi with blue undershirt.",
            abilities: "Master of Kamehameha, Kaioken, Spirit Bomb, and Super Saiyan transformations.",
            quote: "I am the hope of the universe. I am the answer to all living things that cry out for peace!"
        },
        numberMatrix: {
            1: { category: "Power System / Energy", clue: "Ki & Kaioken / Super Saiyan Form" },
            2: { category: "Homeworld / Species", clue: "Planet Vegeta / Saiyan Race" },
            3: { category: "Iconic Fighting Technique", clue: "Kamehameha Wave & Spirit Bomb" },
            4: { category: "Weakness / Habit", clue: "Enormous Appetite & Tail (formerly)" }
        },
        factNumbers: [
            { num: "7", label: "Dragon Balls", fact: "Number of Dragon Balls needed to summon Shenron" },
            { num: "100", label: "Gravity Multiplier", fact: "Gravity level Goku trained in on his way to Namek" },
            { num: "4", label: "Grandpa's Ball", fact: "Star count on Grandpa Gohan's sacred Dragon Ball" },
            { num: "9000", label: "Over 9000", fact: "Famous power level meme reading by Vegeta in English dub" },
            { num: "59", label: "Goku Day", fact: "May 9th (5/9) officially recognized as Goku Day in Japan" }
        ],
        tags: { male: true, saiyan: true, hero: true, magic_ki: true, alien: true, hair_black: true }
    },
    {
        id: "naruto",
        name: "Naruto Uzumaki",
        series: "Naruto",
        aliases: ["naruto", "naruto uzumaki", "seventh hokage", "nine tails", "kurama"],
        image: "https://upload.wikimedia.org/wikipedia/en/9/90/Naruto_Uzumaki.png",
        fallbackAvatar: { bg: "#d13438", hair: "#ffea00", eyes: "#0078d4", symbol: "忍" },
        clues: {
            demographics: "Male • Shonen • Ninja • Leaf Village",
            appearance: "Spiky blonde hair, blue eyes, whisker markings on cheeks, and an orange jumpsuit with headband.",
            abilities: "Shadow Clone Technique (Kage Bunshin), Rasengan, Sage Mode, and Nine-Tails Chakra.",
            quote: "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!"
        },
        numberMatrix: {
            1: { category: "Sealed Creature Inside", clue: "Nine-Tails Fox (Kurama)" },
            2: { category: "Signature Jutsu", clue: "Multi-Shadow Clone & Rasengan" },
            3: { category: "Ninja Village Rank", clue: "Genin $\rightarrow$ Seventh Hokage" },
            4: { category: "Favorite Food", clue: "Ichiraku Miso Tonkotsu Ramen" }
        },
        factNumbers: [
            { num: "9", label: "Tails Count", fact: "Number of tails on Kurama the Tailed Beast" },
            { num: "7", label: "Hokage Rank", fact: "7th Hokage of the Hidden Leaf Village" },
            { num: "1000", label: "Shadow Clones", fact: "Number of clones created in Episode 1 using Forbidden Scroll" },
            { num: "3", label: "Whiskers", fact: "Number of whisker marks on each cheek" },
            { num: "10", label: "Team Number", fact: "Team 7 member under Kakashi Hatake" }
        ],
        tags: { male: true, ninja: true, hero: true, magic_ki: true, hair_yellow: true }
    },
    {
        id: "luffy",
        name: "Monkey D. Luffy",
        series: "One Piece",
        aliases: ["luffy", "monkey d luffy", "straw hat", "strawhat", "straw hat luffy", "joyboy"],
        image: "https://upload.wikimedia.org/wikipedia/en/c/cb/Monkey_D_Luffy.png",
        fallbackAvatar: { bg: "#107c41", hair: "#111111", eyes: "#ffffff", symbol: "☠" },
        clues: {
            demographics: "Male • Shonen • Pirate Captain • Straw Hat Pirates",
            appearance: "Black shaggy hair, scar under left eye, iconic straw hat, red vest, and denim shorts.",
            abilities: "Gomu Gomu no Mi (Rubber body stretch), Gear transformations, Haki master.",
            quote: "If you don't take risks, you can't create a future! I'm gonna be King of the Pirates!"
        },
        numberMatrix: {
            1: { category: "Devil Fruit Ability", clue: "Gum-Gum / Nika Rubber Body" },
            2: { category: "Treasured Item", clue: "Shanks' Straw Hat" },
            3: { category: "Pirate Crew Role", clue: "Captain of Straw Hat Pirates" },
            4: { category: "Ultimate Goal", clue: "Finding the One Piece & Pirate King" }
        },
        factNumbers: [
            { num: "30", label: "First Bounty", fact: "30 Million Berries first bounty after Arlong Park" },
            { num: "5", label: "Gear Level", fact: "Gear 5 Sun God Nika awakening form" },
            { num: "10", label: "Crew Members", fact: "Target number of Straw Hat pirate crew members" },
            { num: "3", label: "Haki Types", fact: "Mastery of all 3 types of Haki (Conqueror, Armament, Observation)" },
            { num: "3000", label: "Current Bounty", fact: "3 Billion Berries current Emperor bounty" }
        ],
        tags: { male: true, pirate: true, hero: true, rubber: true, hair_black: true }
    },
    {
        id: "eren",
        name: "Eren Yeager",
        series: "Attack on Titan",
        aliases: ["eren", "eren yeager", "eren jaeger", "attack titan", "founding titan"],
        image: "https://upload.wikimedia.org/wikipedia/en/4/4f/Eren_Yeager_season_4.png",
        fallbackAvatar: { bg: "#5c2d91", hair: "#3a2518", eyes: "#107c41", symbol: "自由" },
        clues: {
            demographics: "Male • Seinen/Shonen • Soldier / Titan Shifter • Scout Regiment",
            appearance: "Dark brown hair, teal/green eyes, wears military Scout uniform or dark long coat.",
            abilities: "Attack Titan transformation, ODM gear combat, Founding Titan memory manipulation.",
            quote: "If you win, you live. If you lose, you die. If you don't fight, you can't win! Fight! Fight!"
        },
        numberMatrix: {
            1: { category: "Titan Shifter Form", clue: "The Attack Titan & Founding Titan" },
            2: { category: "Military Branch", clue: "Scout Regiment (Survey Corps)" },
            3: { category: "Core Motivation", clue: "Eradicating Titans & Total Freedom" },
            4: { category: "Hometown", clue: "Shiganshina District (Wall Maria)" }
        },
        factNumbers: [
            { num: "15", label: "Titan Height", fact: "15 meters height of Attack Titan form" },
            { num: "104", label: "Cadet Corps", fact: "104th Training Corps squad class" },
            { num: "13", label: "Ymir Curse", fact: "13 years max lifespan for Titan Shifters" },
            { num: "3", label: "Walls Count", fact: "3 concentric defensive walls (Maria, Rose, Sina)" },
            { num: "9", label: "Nine Titans", fact: "One of the 9 Intelligent Shifting Titans" }
        ],
        tags: { male: true, titan: true, hero: true, dark: true, hair_brown: true }
    },
    {
        id: "spike",
        name: "Spike Spiegel",
        series: "Cowboy Bebop",
        aliases: ["spike", "spike spiegel", "bounty hunter", "space cowboy"],
        image: "https://upload.wikimedia.org/wikipedia/en/a/a9/Spike_Spiegel.png",
        fallbackAvatar: { bg: "#0078d4", hair: "#1b3323", eyes: "#ffb900", symbol: "🎷" },
        clues: {
            demographics: "Male • Sci-Fi / Noir • Bounty Hunter (Cowboy) • Bebop Crew",
            appearance: "Fluffy dark green/brown hair, wearing a blue leisure suit, yellow shirt, and dark tie.",
            abilities: "Jeet Kune Do martial artist, expert marksman, skilled spaceship pilot (Swordfish II).",
            quote: "Whatever happens, happens. See ya, Space Cowboy."
        },
        numberMatrix: {
            1: { category: "Martial Arts Style", clue: "Jeet Kune Do (Bruce Lee style)" },
            2: { category: "Personal Spaceship", clue: "Swordfish II Monoracer" },
            3: { category: "Former Syndicate", clue: "Red Dragon Crime Syndicate" },
            4: { category: "Eye Characteristic", clue: "Cybernetic Right Eye" }
        },
        factNumbers: [
            { num: "2071", label: "Year Set", fact: "Year 2071 in the futuristic Cowboy Bebop universe" },
            { num: "27", label: "Age", fact: "27 years old during the events of Bebop" },
            { num: "9", label: "Handgun Model", fact: "Jericho 941 R 9mm semi-automatic pistol" },
            { num: "26", label: "Episodes Count", fact: "26 total sessions/episodes in anime series" },
            { num: "2", label: "Bebop Pilots", fact: "Main duo piloting with Jet Black" }
        ],
        tags: { male: true, adult: true, gun: true, martial_arts: true, hair_dark: true }
    }
];

if (typeof module !== 'undefined') {
    module.exports = { ANIME_CHARACTERS };
}
