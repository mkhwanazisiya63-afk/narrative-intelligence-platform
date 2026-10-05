const ResearchNote =
    require("../models/researchNoteModel");


// ==========================================
// GET NOTES
// ==========================================

exports.getNotes = async (req, res) => {

    try {

        const notes =
            await ResearchNote.getNotesByMedia(

                req.params.mediaId

            );

        res.json(notes);

    }

    catch (error) {

        console.error(

            "Get research notes error:",

            error

        );

        res.status(500).json({

            message:
                "Unable to load research notes."

        });

    }

};


// ==========================================
// CREATE NOTE
// ==========================================

exports.createNote = async (req, res) => {

    try {

        const mediaId =
            req.params.mediaId;

        const title =
            String(
                req.body.title || ""
            ).trim();

        const note =
            String(
                req.body.note || ""
            ).trim();


        if (!note) {

            return res.status(400).json({

                message:
                    "Note cannot be empty."

            });

        }


        const newNote =
            await ResearchNote.createNote({

                media_id: mediaId,

                title,

                note

            });


        res.status(201).json(

            newNote

        );

    }

    catch (error) {

        console.error(

            "Create research note error:",

            error

        );

        res.status(500).json({

            message:
                "Unable to create research note."

        });

    }

};


// ==========================================
// DELETE NOTE
// ==========================================

exports.deleteNote = async (req, res) => {

    console.log("🔥 RESEARCH NOTE DELETE ROUTE REACHED");

    try {

        console.log(
            "DELETE RESEARCH NOTE REQUEST:",
            req.params.id
        );

        await ResearchNote.deleteNote(
            req.params.id
        );

        console.log(
            "RESEARCH NOTE DELETED:",
            req.params.id
        );

        res.json({
            success: true
        });

    }

    catch (error) {

        console.error(
            "DELETE RESEARCH NOTE ERROR:",
            error
        );

        res.status(500).json({
            message:
                error.message ||
                "Unable to delete research note."
        });

    }

};