const media = require("../data/mediaData");

function includesIgnoreCase(arr, value) {
    return arr.some(x =>
        x.toLowerCase() === value.toLowerCase()
    );
}

function search(filters) {

    return media
        .map(item => {

            let score = 0;

            if (
                filters.theme &&
                includesIgnoreCase(item.themes, filters.theme)
            ) {
                score += 10;
            }

            if (
                filters.emotion &&
                includesIgnoreCase(item.emotions, filters.emotion)
            ) {
                score += 10;
            }

            if (
                filters.narrative &&
                includesIgnoreCase(
                    item.narrativeStructures,
                    filters.narrative
                )
            ) {
                score += 10;
            }

            if (
                filters.archetype &&
                includesIgnoreCase(
                    item.characterArchetypes,
                    filters.archetype
                )
            ) {
                score += 10;
            }

            if (
                filters.mechanic &&
                includesIgnoreCase(
                    item.mechanics,
                    filters.mechanic
                )
            ) {
                score += 10;
            }

            return {
                ...item,
                score
            };

        })
        .filter(item => item.score > 0)
        .sort((a,b) => b.score - a.score);
}

module.exports = search;