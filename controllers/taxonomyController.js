const connectDB =
    require("../database/database");


// ==========================================
// TABLE CONFIGURATION
// ==========================================

const tables = {

    themes: "themes",

    emotions: "emotions",

    mechanics: "mechanics",

    structures: "narrative_structures",

    archetypes: "archetypes"

};


// ==========================================
// VALIDATE TYPE
// ==========================================

function getTable(type) {

    const table =
        tables[type];

    if (!table) {

        throw new Error(
            "Invalid taxonomy type."
        );

    }

    return table;

}


// ==========================================
// CREATE
// ==========================================

exports.create = async (req, res) => {

    try {

        const table =
            getTable(req.params.type);

        const db =
            await connectDB();

        const name =
            String(
                req.body.name || ""
            ).trim();

        const description =
            String(
                req.body.description || ""
            ).trim();


        if (!name) {

            return res.status(400).json({

                message:
                    "Name is required."

            });

        }


        let result;


        if (
            req.params.type ===
            "archetypes"
        ) {

            result =
                await db.run(

                    `
                    INSERT INTO ${table}
                    (name)

                    VALUES (?)

                    `,

                    [name]

                );

        }

        else {

            result =
                await db.run(

                    `
                    INSERT INTO ${table}
                    (
                        name,
                        description
                    )

                    VALUES (?, ?)

                    `,

                    [
                        name,
                        description
                    ]

                );

        }


        res.status(201).json({

            id: result.lastID,

            name,

            description

        });

    }

    catch (error) {

        console.error(
            "Taxonomy create error:",
            error
        );


        if (
            error.message &&
            error.message.includes(
                "UNIQUE constraint failed"
            )
        ) {

            return res.status(409).json({

                message:
                    "That taxonomy item already exists."

            });

        }


        res.status(500).json({

            message:
                "Unable to create taxonomy item."

        });

    }

};


// ==========================================
// DELETE
// ==========================================

exports.remove = async (req, res) => {

    try {

        const type =
            req.params.type;

        const table =
            getTable(type);

        const db =
            await connectDB();

        const id =
            Number(
                req.params.id
            );

        if (!Number.isInteger(id)) {

            return res.status(400).json({

                message:
                    "Invalid taxonomy ID."

            });

        }


        // ==========================================
        // REMOVE MEDIA RELATIONSHIPS FIRST
        // ==========================================

        const relationshipTables = {

            themes: {
                table: "media_themes",
                column: "themeId"
            },

            emotions: {
                table: "media_emotions",
                column: "emotionId"
            },

            mechanics: {
                table: "media_mechanics",
                column: "mechanicId"
            },

            structures: {
                table: "media_structures",
                column: "structureId"
            },

            archetypes: {
                table: "media_archetypes",
                column: "archetypeId"
            }

        };


        const relationship =
            relationshipTables[type];


        if (relationship) {

            await db.run(

                `
                DELETE FROM ${relationship.table}
                WHERE ${relationship.column} = ?
                `,

                [id]

            );

        }


        // ==========================================
        // DELETE TAXONOMY ITEM
        // ==========================================

        await db.run(

            `
            DELETE FROM ${table}
            WHERE id = ?
            `,

            [id]

        );


        res.json({

            success: true

        });

    }

    catch (error) {

        console.error(

            "Taxonomy deletion error:",

            error

        );

        res.status(500).json({

            message:
                "Unable to delete taxonomy item."

        });

    }

};