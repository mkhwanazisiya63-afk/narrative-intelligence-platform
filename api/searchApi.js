const express = require("express");

const searchEngine =
    require("../engine/searchEngine");

const router = express.Router();

router.get("/search", (req, res) => {

    const query = req.query.q || "";

    const results = searchEngine(query);

    res.json({
        query,
        count: results.length,
        results
    });

});

module.exports = router;