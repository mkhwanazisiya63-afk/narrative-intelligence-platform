// ==========================================
// MEDIA ANALYSIS PAGE
// ==========================================

let currentMediaId = null;
let currentMedia = null;


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeMediaPage();

});


// ==========================================
// LOAD MEDIA
// ==========================================

async function initializeMediaPage() {

    try {

        const params = new URLSearchParams(
            window.location.search
        );

        const mediaId = params.get("id");

        if (!mediaId) {

            showMediaError(
                "No media item was selected."
            );

            return;

        }

        currentMediaId = mediaId;

        const media = await getMedia(mediaId);

        if (!media) {

            showMediaError(
                "Unable to load this media item."
            );

            return;

        }

        currentMedia = media;

        renderMediaHeader(media);

        await loadTaxonomy();

        await loadAnnotations();

        await loadResearchNotes();

        await loadRelatedMedia();

    }

    catch (error) {

        console.error(
            "Media loading error:",
            error
        );

        showMediaError(
            "Unable to load this media item."
        );

    }

}


// ==========================================
// MEDIA HEADER
// ==========================================

function renderMediaHeader(media) {

    const header =
        document.getElementById(
            "mediaHeader"
        );

    if (!header) {

        return;

    }

    header.innerHTML = `

        <div class="page-header-content">

            <span class="hero-badge">

                ${escapeHTML(
                    media.mediaType || "Media"
                )}

            </span>

            <h1>

                ${escapeHTML(
                    media.title
                )}

            </h1>

            <p>

                ${escapeHTML(
                    media.creator ||
                    "Unknown creator"
                )}

                ${
                    media.year
                        ? ` · ${escapeHTML(
                            String(media.year)
                        )}`
                        : ""
                }

            </p>

            ${
                media.description
                    ? `
                        <p class="media-description">

                            ${escapeHTML(
                                media.description
                            )}

                        </p>
                    `
                    : ""
            }

        </div>

    `;

}


// ==========================================
// LOAD TAXONOMY
// ==========================================

async function loadTaxonomy() {

    try {

        const taxonomy =
            await getTaxonomy();

        renderTaxonomyOptions(
            "themesContainer",
            taxonomy.themes || [],
            "themes"
        );

        renderTaxonomyOptions(
            "emotionsContainer",
            taxonomy.emotions || [],
            "emotions"
        );

        renderTaxonomyOptions(
            "mechanicsContainer",
            taxonomy.mechanics || [],
            "mechanics"
        );

        renderTaxonomyOptions(
            "structuresContainer",
            taxonomy.structures || [],
            "structures"
        );

        renderTaxonomyOptions(
            "archetypesContainer",
            taxonomy.archetypes || [],
            "archetypes"
        );

    }

    catch (error) {

        console.error(
            "Taxonomy loading error:",
            error
        );

    }

}


// ==========================================
// TAXONOMY OPTIONS
// ==========================================

function renderTaxonomyOptions(
    containerId,
    items,
    group
) {

    const container =
        document.getElementById(
            containerId
        );

    if (!container) {

        return;

    }

    container.innerHTML = "";

    if (!items || items.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                No ${group} available yet.

            </div>

        `;

        return;

    }

    items.forEach(item => {

        const label =
            document.createElement(
                "label"
            );

        label.className =
            "taxonomy-option";

        const input =
            document.createElement(
                "input"
            );

        input.type = "checkbox";

        input.value = item.id;

        input.dataset.group = group;

        const text =
            document.createElement(
                "span"
            );

        text.textContent =
            item.name;

        label.appendChild(input);

        label.appendChild(text);

        container.appendChild(label);

    });

}


// ==========================================
// LOAD EXISTING ANNOTATIONS
// ==========================================

async function loadAnnotations() {

    if (!currentMediaId) {

        return;

    }

    try {

        const annotations =
            await getMediaAnnotations(
                currentMediaId
            );


        checkAnnotations(
            "themesContainer",
            annotations.themes || []
        );


        checkAnnotations(
            "emotionsContainer",
            annotations.emotions || []
        );


        checkAnnotations(
            "mechanicsContainer",
            annotations.mechanics || []
        );


        checkAnnotations(
            "structuresContainer",
            annotations.structures || []
        );


        checkAnnotations(
            "archetypesContainer",
            annotations.archetypes || []
        );

    }

    catch (error) {

        console.error(
            "Annotation loading error:",
            error
        );

    }

}


// ==========================================
// CHECK ANNOTATIONS
// ==========================================

function checkAnnotations(
    containerId,
    annotations
) {

    if (!annotations) {

        return;

    }

    const container =
        document.getElementById(
            containerId
        );

    if (!container) {

        return;

    }

    const selectedIds =
        annotations.map(
            item => String(
                item.id ??
                item.themeId ??
                item.emotionId ??
                item.mechanicId ??
                item.structureId
            )
        );

    const inputs =
        container.querySelectorAll(
            "input[type='checkbox']"
        );

    inputs.forEach(input => {

        if (
            selectedIds.includes(
                String(input.value)
            )
        ) {

            input.checked = true;

        }

    });

}


// ==========================================
// RESEARCH NOTES
// ==========================================

async function loadResearchNotes() {

    if (!currentMediaId) {

        return;

    }

    const container =
        document.getElementById(
            "researchNotes"
        );

    if (!container) {

        return;

    }

    try {

        const notes =
            await getResearchNotes(
                currentMediaId
            );

        container.innerHTML = "";

        if (
            !notes ||
            notes.length === 0
        ) {

            container.innerHTML = `

                <div class="empty-state">

                    No research notes yet.

                </div>

            `;

            return;

        }

        notes.forEach(note => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "card research-note";

            card.innerHTML = `

                <h3>

                    ${escapeHTML(
                        note.title ||
                        "Research Note"
                    )}

                </h3>

                <p>

                    ${escapeHTML(
                        note.note ||
                        ""
                    )}

                </p>

                <button
                    type="button"
                    class="btn btn-danger research-note-delete"
                >

                    Delete Note

                </button>

            `;

            const deleteButton =
                card.querySelector(
                    ".research-note-delete"
                );

            deleteButton.addEventListener(
    "click",
    async () => {

        await handleDeleteResearchNote(
            Number(note.id)
        );

    }
);

            container.appendChild(card);

        });

    }

    catch (error) {

        console.error(
            "Research notes error:",
            error
        );

    }

}

// ==========================================
// DELETE RESEARCH NOTE
// ==========================================

async function handleDeleteResearchNote(noteId) {

    console.log("🔥 DELETE BUTTON CLICKED:", noteId);

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this research note?"
        );

    if (!confirmed) {

        return;

    }

    try {

        await deleteResearchNote(noteId);

        await loadResearchNotes();

    }

    catch (error) {

        console.error(
            "Research note deletion error:",
            error
        );

    }

}

// ==========================================
// RELATED MEDIA
// ==========================================

async function loadRelatedMedia() {

    if (!currentMediaId) {

        return;

    }

    const container =
        document.getElementById(
            "relatedMedia"
        );

    if (!container) {

        return;

    }

    try {

        const related =
            await getRelatedMedia(
                currentMediaId
            );

        container.innerHTML = "";

        if (
            !related ||
            related.length === 0
        ) {

            container.innerHTML = `

                <div class="loading-state">

                    Save some annotations to
                    discover related works.

                </div>

            `;

            return;

        }

        related.forEach(item => {

            container.appendChild(
                createRelatedCard(item)
            );

        });

    }

    catch (error) {

        console.error(
            "Related media error:",
            error
        );

    }

}

// ==========================================
// RESEARCH NOTE FORM
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "researchNoteForm"
            );

        if (!form) {

            return;

        }

        form.addEventListener(
            "submit",
            saveResearchNote
        );

    }
);


// ==========================================
// SAVE RESEARCH NOTE
// ==========================================

async function saveResearchNote(event) {

    event.preventDefault();

    if (!currentMediaId) {

        return;

    }

    const titleInput =
        document.getElementById(
            "noteTitle"
        );

    const contentInput =
        document.getElementById(
            "noteContent"
        );

    const title =
        titleInput.value.trim();

    const note =
        contentInput.value.trim();

    if (!note) {

        return;

    }

    const button =
        event.target.querySelector(
            'button[type="submit"]'
        );

    try {

        if (button) {

            button.disabled = true;

            button.textContent =
                "Saving...";

        }

        await createResearchNote(
            currentMediaId,
            {
                title,
                note
            }
        );

        titleInput.value = "";

        contentInput.value = "";

        await loadResearchNotes();

    }

    catch (error) {

        console.error(
            "Research note saving error:",
            error
        );

    }

    finally {

        if (button) {

            button.disabled = false;

            button.textContent =
                "Save Research Note";

        }

    }

}

// ==========================================
// RELATED CARD
// ==========================================

function createRelatedCard(media) {

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "card media-card";

    card.innerHTML = `

        <div class="media-icon">

            🎬

        </div>

        <h3>

            ${escapeHTML(
                media.title
            )}

        </h3>

        <p>

            ${escapeHTML(
                media.creator ||
                "Unknown creator"
            )}

        </p>

        <span class="badge">

            ${escapeHTML(
                media.mediaType ||
                "Media"
            )}

        </span>

    `;

    card.addEventListener(
        "click",
        () => {

            window.location.href =
                `/media.html?id=${encodeURIComponent(
                    media.id
                )}`;

        }
    );

    return card;

}


// ==========================================
// ERROR
// ==========================================

function showMediaError(message) {

    const header =
        document.getElementById(
            "mediaHeader"
        );

    if (!header) {

        return;

    }

    header.innerHTML = `

        <div class="empty-state">

            <h2>

                ${escapeHTML(message)}

            </h2>

            <p>

                Return to the research library
                and select a media item.

            </p>

            <a
                href="/"
                class="btn btn-primary"
            >

                Return to Library

            </a>

        </div>

    `;

}


// ==========================================
// SAFE TEXT
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value ?? "";

    return div.innerHTML;

}

// ==========================================
// SAVE ANNOTATIONS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const button =
            document.getElementById(
                "saveAnnotations"
            );

        if (!button) {

            return;

        }

        button.addEventListener(
            "click",
            saveAnnotations
        );

    }
);


// ==========================================
// SAVE
// ==========================================

async function saveAnnotations() {

    if (!currentMediaId) {

        showAnnotationMessage(
            "No media item is currently selected.",
            "error"
        );

        return;

    }


    const annotations = {

        themes:
            getSelectedIds(
                "themesContainer"
            ),

        emotions:
            getSelectedIds(
                "emotionsContainer"
            ),

        mechanics:
            getSelectedIds(
                "mechanicsContainer"
            ),

        structures:
            getSelectedIds(
                "structuresContainer"
            ),

        archetypes:
            getSelectedIds(
                "archetypesContainer"
            )

    };


    const button =
        document.getElementById(
            "saveAnnotations"
        );


    try {

        if (button) {

            button.disabled = true;

            button.textContent =
                "Saving...";

        }


        await saveMediaAnnotations(
            currentMediaId,
            annotations
        );


        if (button) {

            button.textContent =
                "Saved ✓";

        }


        showAnnotationMessage(
            "Analysis saved successfully.",
            "success"
        );


        await loadRelatedMedia();


        setTimeout(() => {

            if (button) {

                button.disabled = false;

                button.textContent =
                    "Save Analysis";

            }

        }, 1500);

    }


    catch (error) {

        console.error(
            "Annotation saving error:",
            error
        );


        if (button) {

            button.disabled = false;

            button.textContent =
                "Save Analysis";

        }


        showAnnotationMessage(
            error.message ||
            "Unable to save analysis.",
            "error"
        );

    }

}

function showAnnotationMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "annotationMessage"
        );


    if (!element) {

        return;

    }


    element.textContent =
        message;

    element.className =
        `admin-message ${type}`;


    setTimeout(() => {

        element.textContent =
            "";

        element.className =
            "admin-message";

    }, 4000);

}

// ==========================================
// GET SELECTED IDS
// ==========================================

function getSelectedIds(containerId) {

    const container =
        document.getElementById(
            containerId
        );

    if (!container) {

        return [];

    }


    const inputs =
        container.querySelectorAll(
            "input[type='checkbox']:checked"
        );


    return Array.from(inputs).map(
        input => Number(input.value)
    );

}