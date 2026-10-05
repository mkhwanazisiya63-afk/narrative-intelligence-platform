const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function migrate() {

    const db = await open({

        filename: "./database/narrative.db",

        driver: sqlite3.Database

    });


    console.log("Starting database migration...");


    // ==========================================
    // THEMES
    // ==========================================

    const themesColumns = await db.all(
        `PRAGMA table_info(themes)`
    );

    const themesHasDescription =
        themesColumns.some(
            column =>
                column.name === "description"
        );

    if (!themesHasDescription) {

        await db.exec(
            `
            ALTER TABLE themes
            ADD COLUMN description TEXT
            `
        );

        console.log(
            "Added description to themes."
        );

    }


    // ==========================================
    // EMOTIONS
    // ==========================================

    const emotionsColumns = await db.all(
        `PRAGMA table_info(emotions)`
    );

    const emotionsHasDescription =
        emotionsColumns.some(
            column =>
                column.name === "description"
        );

    if (!emotionsHasDescription) {

        await db.exec(
            `
            ALTER TABLE emotions
            ADD COLUMN description TEXT
            `
        );

        console.log(
            "Added description to emotions."
        );

    }


    // ==========================================
    // MECHANICS
    // ==========================================

    const mechanicsColumns = await db.all(
        `PRAGMA table_info(mechanics)`
    );

    const mechanicsHasDescription =
        mechanicsColumns.some(
            column =>
                column.name === "description"
        );

    if (!mechanicsHasDescription) {

        await db.exec(
            `
            ALTER TABLE mechanics
            ADD COLUMN description TEXT
            `
        );

        console.log(
            "Added description to mechanics."
        );

    }


    // ==========================================
    // NARRATIVE STRUCTURES
    // ==========================================

    const structuresColumns = await db.all(
        `PRAGMA table_info(narrative_structures)`
    );

    const structuresHasDescription =
        structuresColumns.some(
            column =>
                column.name === "description"
        );

    if (!structuresHasDescription) {

        await db.exec(
            `
            ALTER TABLE narrative_structures
            ADD COLUMN description TEXT
            `
        );

        console.log(
            "Added description to narrative structures."
        );

    }


    // ==========================================
    // RESEARCH NOTES
    // ==========================================

    const notesTable = await db.get(
        `
        SELECT name

        FROM sqlite_master

        WHERE type = 'table'

        AND name = 'research_notes'
        `
    );

    if (!notesTable) {

        await db.exec(
            `
            CREATE TABLE research_notes (

                id INTEGER PRIMARY KEY AUTOINCREMENT,

                media_id TEXT,

                title TEXT,

                note TEXT,

                created_at
                    DATETIME
                    DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY(media_id)
                    REFERENCES media(id)

            )
            `
        );

        console.log(
            "Created research_notes table."
        );

    }


    console.log(
        "Database migration completed."
    );


    await db.close();

}


migrate()

    .catch(error => {

        console.error(
            "Migration failed:",
            error
        );

        process.exit(1);

    });