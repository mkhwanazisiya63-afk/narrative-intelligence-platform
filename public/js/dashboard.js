let analyticsData = null;


document.addEventListener(

    "DOMContentLoaded",

    loadDashboard

);


// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(

            "/api/analytics/overview"

        );


        if (!response.ok) {

            throw new Error(
                "Analytics request failed."
            );

        }


        analyticsData =
            await response.json();


        renderDashboard();

    }

    catch (error) {

        console.error(

            "Dashboard loading error:",

            error

        );

        showDashboardError();

    }

}


// ==========================================
// RENDER DASHBOARD
// ==========================================

function renderDashboard() {

    document
        .getElementById(
            "dashboardLoading"
        )
        .style.display = "none";


    document
        .getElementById(
            "dashboardContent"
        )
        .style.display = "block";


    renderStatistics();
    renderResearchSnapshot();

    renderBars(

        "mediaTypeChart",

        analyticsData.mediaByType,

        "type"

    );


    renderBars(

        "themesChart",

        analyticsData.themes,

        "name"

    );


    renderBars(

        "emotionsChart",

        analyticsData.emotions,

        "name"

    );


    renderBars(

        "mechanicsChart",

        analyticsData.mechanics,

        "name"

    );


    renderBars(

        "structuresChart",

        analyticsData.structures,

        "name"

    );


    renderBars(

        "archetypesChart",

        analyticsData.archetypes,

        "name"

    );

}


// ==========================================
// STATISTICS
// ==========================================

function renderStatistics() {

    document
        .getElementById(
            "totalMedia"
        )
        .textContent =
            analyticsData.mediaCount;


    document
        .getElementById(
            "annotatedMedia"
        )
        .textContent =
            analyticsData.annotatedMedia;


    document
        .getElementById(
            "researchNotes"
        )
        .textContent =
            analyticsData.researchNotes;


    const taxonomyCount =

        analyticsData.themes.length +

        analyticsData.emotions.length +

        analyticsData.mechanics.length +

        analyticsData.structures.length +

        analyticsData.archetypes.length;


    document
        .getElementById(
            "taxonomyCount"
        )
        .textContent =
            taxonomyCount;

}


// ==========================================
// BAR CHARTS
// ==========================================

function renderBars(

    elementId,

    data,

    labelProperty

) {

    const container =
        document.getElementById(
            elementId
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (!data || data.length === 0) {

        container.innerHTML = `

            <div class="analytics-empty">

                No data available yet.

            </div>

        `;

        return;

    }


    const visibleData =
        data.slice(0, 8);


    const maximum =
        Math.max(

            ...visibleData.map(
                item =>
                    Number(item.count)
            ),

            1

        );


    visibleData.forEach(item => {

        const row =
            document.createElement(
                "div"
            );


        row.className =
            "analytics-bar-row";


        const label =
            document.createElement(
                "div"
            );


        label.className =
            "analytics-bar-label";


        label.textContent =
            item[labelProperty];


        const track =
            document.createElement(
                "div"
            );


        track.className =
            "analytics-bar-track";


        const fill =
            document.createElement(
                "div"
            );


        fill.className =
            "analytics-bar-fill";


        const percentage =

            (
                Number(item.count) /
                maximum
            ) * 100;


        fill.style.width =
            `${percentage}%`;


        const count =
            document.createElement(
                "span"
            );


        count.className =
            "analytics-bar-count";


        count.textContent =
            item.count;


        track.appendChild(fill);


        row.appendChild(label);

        row.appendChild(track);

        row.appendChild(count);


        container.appendChild(row);

    });

}


// ==========================================
// ERROR
// ==========================================

function showDashboardError() {

    document
        .getElementById(
            "dashboardLoading"
        )
        .style.display = "none";


    document
        .getElementById(
            "dashboardError"
        )
        .style.display = "block";

}

// ==========================================
// RESEARCH SNAPSHOT
// ==========================================

function renderResearchSnapshot() {

    setTopItem(
        "topTheme",
        analyticsData.themes
    );

    setTopItem(
        "topEmotion",
        analyticsData.emotions
    );

    setTopItem(
        "topMechanic",
        analyticsData.mechanics
    );

    setTopItem(
        "topStructure",
        analyticsData.structures
    );

    setTopItem(
        "topArchetype",
        analyticsData.archetypes
    );

}


// ==========================================
// GET TOP ITEM
// ==========================================

function setTopItem(

    elementId,

    data

) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    if (!data || data.length === 0) {

        element.textContent =
            "No data yet";

        return;

    }


    const topItem =
        data[0];


    element.textContent =
        `${topItem.name} (${topItem.count})`;

}