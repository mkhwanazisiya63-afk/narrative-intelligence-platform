const media = require("../data/mediaData");

function recommend(title) {

    const source =
        media.find(
            m =>
                m.title.toLowerCase() ===
                title.toLowerCase()
        );

    if(!source) return [];

    return media
        .filter(m => m.title !== source.title)
        .map(m => {

            let score = 0;

            source.themes.forEach(t => {
                if(m.themes.includes(t))
                    score++;
            });

            source.emotions.forEach(e => {
                if(m.emotions.includes(e))
                    score++;
            });

            source.narrativeStructures.forEach(n => {
                if(m.narrativeStructures.includes(n))
                    score++;
            });

            return {
                ...m,
                similarity: score
            };

        })
        .sort(
            (a,b) =>
                b.similarity - a.similarity
        );

}

module.exports = recommend;