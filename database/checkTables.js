const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function checkTables() {

    const db = await open({

        filename: "./database/narrative.db",

        driver: sqlite3.Database

    });


    const tables = [

        "media_themes",

        "media_emotions",

        "media_mechanics",

        "media_structures",

        "media_archetypes"

    ];


    for (const table of tables) {

        console.log("\n==============================");

        console.log(`TABLE: ${table}`);

        console.log("==============================");


        const columns = await db.all(

            `PRAGMA table_info(${table})`

        );


        columns.forEach(column => {

            console.log(

                `${column.name} | ${column.type}`

            );

        });

    }


    await db.close();

}


checkTables()

    .catch(error => {

        console.error(

            "Database check failed:",

            error

        );

        process.exit(1);

    });