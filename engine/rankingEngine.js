function rank(results) {

    return results.sort((a, b) => {

        return b.score - a.score;

    });

}

module.exports = rank;