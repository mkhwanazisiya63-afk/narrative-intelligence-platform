const fs = require("fs");
const path = require("path");

const connectDB = require("./database");

async function initializeDatabase() {

    const db = await connectDB();

    const schema = fs.readFileSync(
        path.join(__dirname, "schema.sql"),
        "utf8"
    );

    await db.exec(schema);

    // -----------------------------
    // Themes
    // -----------------------------

    const themes = [
        "Identity",
        "Hope",
        "Love",
        "Loss",
        "Memory",
        "Freedom",
        "Power",
        "Justice",
        "Family",
        "Friendship",
        "Sacrifice",
        "Survival",
        "Revenge",
        "Corruption",
        "Faith",
        "Humanity",
        "Isolation",
        "Destiny",
        "War",
        "Redemption"
    ];

    // -----------------------------
    // Emotions
    // -----------------------------

    const emotions = [
        "Joy",
        "Fear",
        "Hope",
        "Wonder",
        "Curiosity",
        "Sadness",
        "Anger",
        "Trust",
        "Disgust",
        "Surprise",
        "Anxiety",
        "Empathy"
    ];

    // -----------------------------
    // Narrative Structures
    // -----------------------------

    const structures = [
        "Hero's Journey",
        "Three Act Structure",
        "Tragedy",
        "Comedy",
        "Mystery",
        "Quest",
        "Time Loop",
        "Non-linear",
        "Coming of Age",
        "Circular Narrative",
        "Redemption Arc",
        "Parallel Narrative"
    ];

    // -----------------------------
    // Archetypes
    // -----------------------------

    const archetypes = [
        "Hero",
        "Mentor",
        "Shadow",
        "Trickster",
        "Guardian",
        "Explorer",
        "Creator",
        "Outlaw",
        "Ruler",
        "Caregiver",
        "Innocent",
        "Fallen Hero"
    ];

    // -----------------------------
    // Mechanics
    // -----------------------------

    const mechanics = [
        "Exploration",
        "Combat",
        "Dialogue",
        "Investigation",
        "Puzzle Solving",
        "Crafting",
        "Player Choice",
        "Stealth",
        "Platforming",
        "Resource Management"
    ];

    async function seed(table, values) {

        for (const value of values) {

            await db.run(

                `INSERT OR IGNORE INTO ${table}(name)
                 VALUES (?)`,

                value

            );

        }

    }

    await seed("themes", themes);

    await seed("emotions", emotions);

    await seed("narrative_structures", structures);

    await seed("archetypes", archetypes);

    await seed("mechanics", mechanics);

    console.log("✅ Database initialized.");

}

module.exports = initializeDatabase;