// =====================================
// Narrative Intelligence Platform
// Admin Studio
// =====================================

const titleInput = document.getElementById("title");
const creatorInput = document.getElementById("creator");
const yearInput = document.getElementById("year");
const mediaTypeInput = document.getElementById("mediaType");
const descriptionInput = document.getElementById("description");

const totalMedia = document.getElementById("totalMedia");

const themesContainer = document.getElementById("themesContainer");
const emotionsContainer = document.getElementById("emotionsContainer");
const structuresContainer = document.getElementById("structuresContainer");
const mechanicsContainer = document.getElementById("mechanicsContainer");

const preview = document.getElementById("preview");

// =====================================
// Startup
// =====================================

document.addEventListener("DOMContentLoaded", async () => {

    await loadDashboard();

    await loadTaxonomy();

});

// =====================================
// Dashboard
// =====================================

async function loadDashboard() {

    try {

        const response = await fetch("/api/media");

        const media = await response.json();

        totalMedia.textContent = media.length;

    }

    catch (error) {

        console.error(error);

    }

}

// =====================================
// Taxonomy
// =====================================

async function loadTaxonomy() {

    try {

        const response = await fetch("/api/taxonomy");

        const taxonomy = await response.json();

        populateCheckboxes(
            themesContainer,
            taxonomy.themes || [],
            "theme"
        );

        populateCheckboxes(
            emotionsContainer,
            taxonomy.emotions || [],
            "emotion"
        );

        populateCheckboxes(
            structuresContainer,
            taxonomy.structures || [],
            "structure"
        );

        populateCheckboxes(
            mechanicsContainer,
            taxonomy.mechanics || [],
            "mechanic"
        );

    }

    catch (error) {

        console.error(error);

    }

}

// =====================================
// Checkbox Builder
// =====================================

function populateCheckboxes(container, items, group) {

    container.innerHTML = "";

    items.forEach(item => {

        const label = document.createElement("label");

        label.className = "checkbox-item";

        label.innerHTML = `
            <input
                type="checkbox"
                value="${item.name}"
                data-group="${group}"
                onchange="updatePreview()">

            ${item.name}
        `;

        container.appendChild(label);

    });

}

// =====================================
// Preview
// =====================================

function getSelected(group) {

    return [...document.querySelectorAll(

        `input[data-group="${group}"]:checked`

    )].map(box => box.value);

}

function updatePreview() {

    const themes = getSelected("theme");

    const emotions = getSelected("emotion");

    const structures = getSelected("structure");

    const mechanics = getSelected("mechanic");

    preview.innerHTML = `

        <strong>Themes</strong><br>

        ${themes.join(", ") || "None"}

        <br><br>

        <strong>Emotions</strong><br>

        ${emotions.join(", ") || "None"}

        <br><br>

        <strong>Narrative Structure</strong><br>

        ${structures.join(", ") || "None"}

        <br><br>

        <strong>Mechanics</strong><br>

        ${mechanics.join(", ") || "None"}

    `;

}

// =====================================
// Save
// =====================================

async function saveMedia() {

    const body = {

        title: titleInput.value,

        creator: creatorInput.value,

        year: yearInput.value,

        mediaType: mediaTypeInput.value,

        description: descriptionInput.value

    };

    try {

        const response = await fetch("/api/media", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(body)

        });

        const result = await response.json();

        if (!response.ok) {

            alert(result.message);

            return;

        }

        alert("Media saved successfully.");

        clearForm();

        loadDashboard();

    }

    catch (error) {

        console.error(error);

    }

}

// =====================================
// Reset
// =====================================

function clearForm() {

    titleInput.value = "";

    creatorInput.value = "";

    yearInput.value = "";

    descriptionInput.value = "";

    document.querySelectorAll("input[type='checkbox']")
        .forEach(box => box.checked = false);

    updatePreview();

}