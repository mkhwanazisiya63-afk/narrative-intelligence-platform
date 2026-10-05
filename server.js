const express = require("express");
const path = require("path");

const initializeDatabase = require("./database/initDatabase");

const mediaRoutes = require("./routes/mediaRoutes");

const taxonomyRoutes = require("./routes/taxonomyRoutes");

const annotationRoutes =
require("./routes/annotationRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const researchNoteRoutes =
    require("./routes/researchNoteRoutes");

const analyticsRoutes =
    require("./routes/analyticsRoutes");    

const app = express();

const PORT = process.env.PORT || 3000;

// ----------------------------
// Middleware
// ----------------------------

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));

// ----------------------------
// API
// ----------------------------

app.use("/api/media", mediaRoutes);

app.use(

    "/api/research-notes",

    researchNoteRoutes

);

app.use("/api", taxonomyRoutes);

app.use(

    "/api/annotations",

    annotationRoutes

);

app.use(

    "/api/dashboard",

    dashboardRoutes

);



app.use(

    "/api/analytics",

    analyticsRoutes

);

// ----------------------------
// Pages
// ----------------------------

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});

app.get("/admin", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "admin.html"));

});

app.get("/media", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "media.html"));

});

app.get("/taxonomy", (req, res) => {

    res.sendFile(__dirname + "/public/taxonomy.html");

});

app.get("/dashboard",(req,res)=>{

    res.sendFile(

        __dirname +

        "/public/dashboard.html"

    );

});
// ----------------------------
// Start Server
// ----------------------------

async function startServer() {

    try {

        await initializeDatabase();

        app.listen(PORT, () => {

            console.log("");
            console.log("=================================");
            console.log("Narrative Intelligence Platform");
            console.log("Version 1.0");
            console.log("=================================");
            console.log(`Server: http://localhost:${PORT}`);
            console.log("Database initialized.");
            console.log("");

        });

    }

    catch (error) {

        console.error("Failed to start server.");

        console.error(error);

    }

}

startServer();