const media = require("../data/mediaData");

function search(query) {

    if (!query) return [];

    query = query.toLowerCase();

    return media
        .map(item => {

            let score = 0;

            const fields = [

                ...item.themes,
                ...item.emotions,
                ...item.narrativeStructures,
                ...item.characterArchetypes,
                ...item.mechanics

            ];

            fields.forEach(f => {

                if (f.toLowerCase().includes(query)) {
                    score += 10;
                }

            });

            // small boost for title match
            if (item.title.toLowerCase().includes(query)) {
                score += 5;
            }

            return {
                ...item,
                score
            };

        })
        .filter(i => i.score > 0)
        .sort((a, b) => b.score - a.score);

}

module.exports = search;