const searchBox = document.getElementById("searchBox");
const resultsDiv = document.getElementById("results");
const mediaCount = document.getElementById("mediaCount");

// ===============================
// Load statistics
// ===============================

async function loadStatistics() {

    try {

        const response = await fetch("/api/media");

        const media = await response.json();

        mediaCount.textContent = media.length;

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Search
// ===============================

async function doSearch() {

    const query = searchBox.value.trim();

    if (query === "") {

        resultsDiv.innerHTML =
            `<p class="empty">Please enter a search term.</p>`;

        return;

    }

    try {

        const response = await fetch(

            `/api/media/search?q=${encodeURIComponent(query)}`

        );

        const results = await response.json();

        displayResults(results);

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Enter key
// ===============================

searchBox.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        doSearch();

    }

});

// ===============================
// Media icon
// ===============================

function mediaIcon(type){

    switch(type){

        case "Movie":
            return "🎬";

        case "TV Series":
            return "📺";

        case "Anime":
            return "🎌";

        case "Book":
            return "📖";

        case "Video Game":
            return "🎮";

        default:
            return "🎭";

    }

}

// ===============================
// Results
// ===============================

function displayResults(results){

    if(results.length===0){

        resultsDiv.innerHTML=

        `<p class="empty">

            No matching media found.

        </p>`;

        return;

    }

    resultsDiv.innerHTML="";

    results.forEach(media=>{

        const card=document.createElement("div");

        card.className="result";

        card.innerHTML=`

            <h2>

                ${mediaIcon(media.mediaType)}

                ${media.title}

            </h2>

            <p><strong>Type:</strong> ${media.mediaType}</p>

            <p><strong>Creator:</strong> ${media.creator || "Unknown"}</p>

            <p><strong>Year:</strong> ${media.year || "Unknown"}</p>

            <p>${media.description || ""}</p>

        `;

        resultsDiv.appendChild(card);

    });

}

loadStatistics();