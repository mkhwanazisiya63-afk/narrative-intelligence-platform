const express =
    require("express");

const router =
    express.Router();

const controller =
    require("../controllers/researchNoteController");


// ==========================================
// GET NOTES FOR MEDIA
// ==========================================

router.get(

    "/media/:mediaId",

    controller.getNotes

);


// ==========================================
// CREATE NOTE
// ==========================================

router.post(

    "/media/:mediaId",

    controller.createNote

);


// ==========================================
// DELETE NOTE
// ==========================================

router.delete(

    "/:id",

    controller.deleteNote

);


module.exports = router;