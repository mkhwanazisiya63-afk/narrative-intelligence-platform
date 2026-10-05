// ===========================================
// HOMEPAGE
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

    loadHomepage();

    const searchButton =
        document.getElementById("searchButton");

    const searchBox =
        document.getElementById("searchBox");

    if (searchButton) {

        searchButton.addEventListener(

            "click",

            doSearch

        );

    }

    if (searchBox) {

        searchBox.addEventListener(

            "keypress",

            function (event) {

                if (event.key === "Enter") {

                    doSearch();

                }

            }

        );

    }

});

// ===========================================
// Load Homepage
// ===========================================

async function loadHomepage() {

    try {

        await loadStatistics();

        await loadFeaturedMedia();

        await loadRecentMedia();

    }

    catch (error) {

        console.error(

            "Homepage error:",

            error

        );

    }

}

// ===========================================
// Statistics
// ===========================================

async function loadStatistics() {

    try {

        const data =
            await getDashboardStats();

        setText(

            "totalMedia",

            data.totalMedia

        );

        setText(

            "totalThemes",

            data.totalThemes

        );

        setText(

            "totalEmotions",

            data.totalEmotions

        );

        setText(

            "totalNotes",

            data.totalNotes

        );

    }

    catch (error) {

        console.error(

            "Statistics error:",

            error

        );

    }

}

// ===========================================
// Featured Media
// ===========================================

async function loadFeaturedMedia() {

    try {

        const media =
            await getAllMedia();

        const container =
            document.getElementById(

                "featuredMedia"

            );

        if (!container) {

            return;

        }

        container.innerHTML = "";

        if (!media || media.length === 0) {

            container.innerHTML = `

                <div class="empty-state">

                    <h3>No media yet</h3>

                    <p>

                        Add your first media item
                        through the Annotation Studio.

                    </p>

                </div>

            `;

            return;

        }

        media

            .slice(0, 6)

            .forEach(item => {

                container.appendChild(

                    createMediaCard(item)

                );

            });

    }

    catch (error) {

        console.error(

            "Featured media error:",

            error

        );

    }

}

// ===========================================
// Recent Media
// ===========================================

async function loadRecentMedia() {

    try {

        const media =
            await getAllMedia();

        const container =
            document.getElementById(

                "recentMedia"

            );

        if (!container) {

            return;

        }

        container.innerHTML = "";

        if (!media || media.length === 0) {

            return;

        }

        media

            .slice(-6)

            .reverse()

            .forEach(item => {

                container.appendChild(

                    createMediaCard(item)

                );

            });

    }

    catch (error) {

        console.error(

            "Recent media error:",

            error

        );

    }

}

// ===========================================
// Search
// ===========================================

async function doSearch() {

    const searchBox =
        document.getElementById(

            "searchBox"

        );

    const query =
        searchBox.value.trim();

    const resultsContainer =
        document.getElementById(

            "searchResults"

        );

    if (!query) {

        resultsContainer.innerHTML = `

            <div class="empty-state">

                <p>

                    Enter a title, creator or keyword
                    to search your research library.

                </p>

            </div>

        `;

        return;

    }

    try {

        resultsContainer.innerHTML = `

            <div class="loading-state">

                Searching...

            </div>

        `;

        const results =
            await searchMedia(query);

        resultsContainer.innerHTML = "";

        if (!results || results.length === 0) {

            resultsContainer.innerHTML = `

                <div class="empty-state">

                    <h3>No results found</h3>

                    <p>

                        Try another title, creator
                        or keyword.

                    </p>

                </div>

            `;

            return;

        }

        results.forEach(item => {

            resultsContainer.appendChild(

                createMediaCard(item)

            );

        });

        resultsContainer.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

    catch (error) {

        console.error(

            "Search error:",

            error

        );

        resultsContainer.innerHTML = `

            <div class="empty-state">

                <h3>Search unavailable</h3>

                <p>

                    Something went wrong while
                    searching the library.

                </p>

            </div>

        `;

    }

}

// ===========================================
// Media Card
// ===========================================

function createMediaCard(media) {

    const card = document.createElement("div");

    card.className = "card media-card";

    card.innerHTML = `
        <div class="media-icon">
            🎬
        </div>

        <h3>
            ${escapeHTML(media.title)}
        </h3>

        <p>
            ${escapeHTML(media.creator || "Unknown creator")}
        </p>

        <span class="badge">
            ${escapeHTML(media.mediaType || "Media")}
        </span>

        ${
            media.year
                ? `<small>${escapeHTML(String(media.year))}</small>`
                : ""
        }
    `;

    card.addEventListener("click", function () {

        openMedia(media.id);

    });

    return card;
}

// ===========================================
// Open Media
// ===========================================

function openMedia(id) {

    window.location.href =

        `/media.html?id=${encodeURIComponent(id)}`;

}

// ===========================================
// Safe Text
// ===========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}

// ===========================================
// Set Text
// ===========================================

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =

            value ?? 0;

    }

}