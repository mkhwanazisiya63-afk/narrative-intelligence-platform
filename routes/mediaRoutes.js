const express = require("express");

const router = express.Router();

const mediaController =
    require("../controllers/mediaController");

// ==========================================
// GET ALL MEDIA
// ==========================================

router.get(

    "/",

    mediaController.getAllMedia

);

// ==========================================
// SEARCH MEDIA
// ==========================================

router.get(

    "/search",

    mediaController.searchMedia

);

// ==========================================
// GET MEDIA BY ID
// ==========================================

router.get(

    "/:id",

    mediaController.getMedia

);

// ==========================================
// CREATE MEDIA
// ==========================================

router.post(

    "/",

    mediaController.createMedia

);

// ==========================================
// UPDATE MEDIA
// ==========================================

router.put(

    "/:id",

    mediaController.updateMedia

);

// ==========================================
// DELETE MEDIA
// ==========================================

router.delete(

    "/:id",

    mediaController.deleteMedia

);

module.exports = router;