let taxonomyData = {};

document.addEventListener(
    "DOMContentLoaded",
    initializeTaxonomy
);


// ==========================================
// INITIALIZE
// ==========================================

async function initializeTaxonomy() {

    setupForms();

    await loadTaxonomy();

}


// ==========================================
// LOAD TAXONOMY
// ==========================================

async function loadTaxonomy() {

    try {

        const response = await fetch(
            "/api/annotations/taxonomy"
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load taxonomy."
            );

        }

        taxonomyData =
            await response.json();

        renderCategory(
            "themes",
            taxonomyData.themes || []
        );

        renderCategory(
            "emotions",
            taxonomyData.emotions || []
        );

        renderCategory(
            "mechanics",
            taxonomyData.mechanics || []
        );

        renderCategory(
            "structures",
            taxonomyData.structures || []
        );

        renderCategory(
            "archetypes",
            taxonomyData.archetypes || []
        );

    }

    catch (error) {

        console.error(
            "Taxonomy loading error:",
            error
        );

        showMessage(
            "Unable to load taxonomy.",
            "error"
        );

    }

}


// ==========================================
// SETUP FORMS
// ==========================================

function setupForms() {

    document
        .querySelectorAll(".taxonomy-form")
        .forEach(form => {

            form.addEventListener(
                "submit",
                async event => {

                    event.preventDefault();

                    await addTaxonomyItem(
                        form
                    );

                }
            );

        });

}


// ==========================================
// ADD ITEM
// ==========================================

async function addTaxonomyItem(form) {

    const type =
        form.dataset.type;

    const name =
        form
            .querySelector('[name="name"]')
            .value
            .trim();

    const descriptionInput =
        form.querySelector(
            '[name="description"]'
        );

    const description =
        descriptionInput
            ? descriptionInput.value.trim()
            : "";


    if (!name) {

        showMessage(
            "Please enter a name.",
            "error"
        );

        return;

    }


    try {

        const response = await fetch(
            `/api/${type}`,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    name,

                    description

                })

            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to add item."
            );

        }


        form.reset();


        showMessage(
            "Taxonomy item added.",
            "success"
        );


        await loadTaxonomy();

    }

    catch (error) {

        console.error(
            "Taxonomy creation error:",
            error
        );

        showMessage(
            error.message ||
            "Unable to add taxonomy item.",
            "error"
        );

    }

}


// ==========================================
// RENDER CATEGORY
// ==========================================

function renderCategory(

    type,

    items

) {

    const list =
        document.getElementById(
            `${type}List`
        );

    const count =
        document.getElementById(
            `${type}Count`
        );


    if (!list) {

        return;

    }


    list.innerHTML = "";


    if (count) {

        count.textContent =
            items.length;

    }


    if (!items.length) {

        list.innerHTML = `

            <p class="taxonomy-empty">

                No entries yet.

            </p>

        `;

        return;

    }


    items.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "taxonomy-admin-item";


        element.innerHTML = `

            <div>

                <strong>

                    ${escapeHTML(
                        item.name
                    )}

                </strong>

                ${
                    item.description
                        ? `
                            <p>

                                ${escapeHTML(
                                    item.description
                                )}

                            </p>
                          `
                        : ""
                }

            </div>

            <button

                type="button"

                class="taxonomy-delete"

                data-type="${escapeAttribute(
                    type
                )}"

                data-id="${escapeAttribute(
                    item.id
                )}"

            >

                Delete

            </button>

        `;


        element
            .querySelector(".taxonomy-delete")
            .addEventListener(
                "click",
                () =>
                    deleteTaxonomyItem(
                        type,
                        item.id
                    )
            );


        list.appendChild(element);

    });

}


// ==========================================
// DELETE
// ==========================================

async function deleteTaxonomyItem(

    type,

    id

) {

    const confirmed =
        window.confirm(

            "Delete this taxonomy item?"

        );


    if (!confirmed) {

        return;

    }


    try {

        const response = await fetch(

            `/api/${type}/${id}`,

            {

                method: "DELETE"

            }

        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(

                data.message ||
                "Unable to delete item."

            );

        }


        showMessage(

            "Taxonomy item deleted.",

            "success"

        );


        await loadTaxonomy();

    }

    catch (error) {

        console.error(

            "Taxonomy deletion error:",

            error

        );


        showMessage(

            error.message ||

            "Unable to delete item.",

            "error"

        );

    }

}

// ==========================================
// MESSAGE
// ==========================================

function showMessage(

    message,

    type

) {

    const element =
        document.getElementById(
            "taxonomyMessage"
        );


    if (!element) {

        return;

    }


    element.textContent =
        message;

    element.className =
        `admin-message ${type}`;


    setTimeout(() => {

        element.textContent = "";

        element.className =
            "admin-message";

    }, 3500);

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


// ==========================================
// ESCAPE ATTRIBUTE
// ==========================================

function escapeAttribute(value) {

    return String(value ?? "")

        .replace(/&/g, "&amp;")

        .replace(/'/g, "&#39;")

        .replace(/"/g, "&quot;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;");

}