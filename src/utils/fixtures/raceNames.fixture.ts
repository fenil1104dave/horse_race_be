function generateRandomDatetime() {
    var startDate = new Date("2024-01-01");
    var endDate = new Date("2024-12-31");
    var randomTime =
        startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime());
    var randomDate = new Date(randomTime);
    var isoString = randomDate.toISOString();
    return isoString;
}

function generateUniqueHorseRaceNames(count: number) {
    var horseRaceNames = new Set();
    var races = [];

    var adjectives = [
        "Fast",
        "Swift",
        "Brave",
        "Majestic",
        "Galloping",
        "Elegant",
        "Spirited",
        "Daring",
        "Noble",
        "Thundering",
    ];
    var nouns = [
        "Steed",
        "Horse",
        "Equine",
        "Racer",
        "Charger",
        "Gelding",
        "Mare",
        "Colt",
        "Filly",
        "Pony",
    ];

    while (horseRaceNames.size < count) {
        var adjective =
            adjectives[Math.floor(Math.random() * adjectives.length)];
        var noun = nouns[Math.floor(Math.random() * nouns.length)];
        var name = adjective + " " + noun + " Race";

        if (!horseRaceNames.has(name)) {
            horseRaceNames.add(name);
            var startedAt = generateRandomDatetime();
            races.push({ name: name, started_at: startedAt });
        }
    }

    return races;
}

export const FIXETURE_RACES = generateUniqueHorseRaceNames(100);

export const addPlayersToRaces = (horses: any[]) => {
    // Define a function to get a random horse from the horses array
    function getRandomHorse() {
        return horses[Math.floor(Math.random() * horses.length)];
    }

    // Iterate over each race
    return FIXETURE_RACES.map((race) => {
        // Initialize an empty array to store players for this race
        const players = [];

        // Add 6 players to the race
        for (let i = 0; i < 6; i++) {
            const randomHorse = getRandomHorse();
            players.push({
                horse: randomHorse._id,
                lane_number: i + 1, // Lane number ranges from 1 to 6
            });
        }

        // Add the 'players' key to the race object
        return { ...race, players };
    });
};
