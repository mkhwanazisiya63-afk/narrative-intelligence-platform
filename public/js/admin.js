document.addEventListener("DOMContentLoaded", () => {

    loadAdminMedia();

    setupMediaForm();

});


// ==========================================
// FORM SETUP
// ==========================================

function setupMediaForm() {

    const form =
        document.getElementById("mediaForm");

    if (!form) {

        return;

    }

    form.addEventListener(

        "submit",

        async function (event) {

            event.preventDefault();

            await saveMedia(form);

        }

    );

}


// ==========================================
// LOAD MEDIA
// ==========================================

async function loadAdminMedia() {

    const container =
        document.getElementById("mediaList");

    if (!container) {

        return;

    }

    try {

        const media =
            await getAllMedia();

        renderAdminMedia(

            media,

            container

        );

    }

    catch (error) {

        console.error(

            "Admin media error:",

            error

        );

        container.innerHTML = `

            <div class="empty-state">

                <h3>Unable to load media</h3>

                <p>

                    Check that the server is running.

                </p>

            </div>

        `;

    }

}

// ==========================================
// MEDIA ICON
// ==========================================

function getMediaIcon(type) {

    switch (type) {

        case "Game":
            return "🎮";

        case "Movie":
            return "🎬";

        case "TV Series":
            return "📺";

        case "Anime":
            return "🎌";

        case "Book":
            return "📖";

        default:
            return "🎭";

    }

}


// ==========================================
// RENDER MEDIA
// ==========================================

function renderAdminMedia(

    media,

    container

) {

    container.innerHTML = "";

    const count =
        document.getElementById("mediaCount");

    if (count) {

        count.textContent =

            `${media.length} ${
                media.length === 1
                    ? "item"
                    : "items"
            }`;

    }

    if (!media || media.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>Your library is empty</h3>

                <p>

                    Add your first piece of media
                    using the form above.

                </p>

            </div>

        `;

        return;

    }

    media.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "card admin-media-card";

        card.innerHTML = `

            <div class="admin-media-info">

                <div class="media-icon">

                    ${getMediaIcon(
                        item.mediaType
                    )}

                </div>

                <div>

                    <h3>

                        ${escapeHTML(
                            item.title
                        )}

                    </h3>

                    <p>

                        ${escapeHTML(
                            item.creator ||
                            "Unknown creator"
                        )}

                    </p>

                    <span class="badge">

                        ${escapeHTML(
                            item.mediaType ||
                            "Media"
                        )}

                    </span>

                    ${
                        item.year
                            ? `
                                <small>
                                    ${escapeHTML(
                                        String(item.year)
                                    )}
                                </small>
                              `
                            : ""
                    }

                </div>

            </div>

            <div class="admin-actions">

                <button
                    class="btn btn-secondary"
                    type="button"
                    data-id="${escapeAttribute(item.id)}"
                    data-action="edit"
                >

                    Edit

                </button>

                <button
                    class="btn btn-secondary"
                    type="button"
                    data-id="${escapeAttribute(item.id)}"
                    data-action="view"
                >

                    View

                </button>

                <button
                    class="btn btn-danger"
                    type="button"
                    data-id="${escapeAttribute(item.id)}"
                    data-action="delete"
                >

                    Delete

                </button>

            </div>

        `;

        const buttons =
            card.querySelectorAll("button");

        buttons.forEach(button => {

            button.addEventListener(

                "click",

                () => {

                    const id =
                        button.dataset.id;

                    const action =
                        button.dataset.action;

                    if (action === "edit") {

                        editMedia(id);

                    }

                    else if (action === "view") {

                        openMediaProfile(id);

                    }

                    else if (action === "delete") {

                        removeMedia(id);

                    }

                }

            );

        });

        container.appendChild(card);

    });

}


// ==========================================
// SAVE MEDIA
// ==========================================

async function saveMedia(form) {

    const editingId =
        form.dataset.editingId;

    const media = {

        title:
            document
                .getElementById("title")
                .value
                .trim(),

        mediaType:
            document
                .getElementById("mediaType")
                .value,

        creator:
            document
                .getElementById("creator")
                .value
                .trim(),

        year:
            document
                .getElementById("year")
                .value,

        description:
            document
                .getElementById("description")
                .value
                .trim()

    };

    if (!media.title) {

        showAdminMessage(

            "Please enter a title.",

            "error"

        );

        return;

    }

    try {

        if (editingId) {

            await updateMedia(

                editingId,

                media

            );

            showAdminMessage(

                "Media updated successfully.",

                "success"

            );

            delete form.dataset.editingId;

            resetForm();

            updateFormButton(false);

        }

        else {

            media.id = generateId();

            await createMedia(media);

            showAdminMessage(

                "Media added successfully.",

                "success"

            );

            resetForm();

        }

        await loadAdminMedia();

    }

    catch (error) {

        console.error(

            "Save media error:",

            error

        );

        showAdminMessage(

            "Unable to save media.",

            "error"

        );

    }

}


// ==========================================
// EDIT MEDIA
// ==========================================

async function editMedia(id) {

    try {

        const media =
            await getMedia(id);

        if (!media) {

            showAdminMessage(

                "Media could not be found.",

                "error"

            );

            return;

        }

        document.getElementById("title").value =
            media.title || "";

        document.getElementById("mediaType").value =
            media.mediaType || "Game";

        document.getElementById("creator").value =
            media.creator || "";

        document.getElementById("year").value =
            media.year || "";

        document.getElementById("description").value =
            media.description || "";

        const form =
            document.getElementById("mediaForm");

        form.dataset.editingId =
            media.id;

        updateFormButton(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(

            "Edit media error:",

            error

        );

        showAdminMessage(

            "Unable to load media.",

            "error"

        );

    }

}


// ==========================================
// CANCEL EDIT
// ==========================================

function cancelEdit() {

    const form =
        document.getElementById("mediaForm");

    delete form.dataset.editingId;

    resetForm();

    updateFormButton(false);

}


// ==========================================
// FORM BUTTON
// ==========================================

function updateFormButton(editing) {

    const form =
        document.getElementById("mediaForm");

    const button =
        form.querySelector(

            'button[type="submit"]'

        );

    if (!button) {

        return;

    }

    if (editing) {

        button.textContent =
            "Update Media";

        if (!document.getElementById("cancelEdit")) {

            const cancel =
                document.createElement("button");

            cancel.type = "button";

            cancel.id = "cancelEdit";

            cancel.className =
                "btn btn-secondary";

            cancel.textContent =
                "Cancel";

            cancel.addEventListener(

                "click",

                cancelEdit

            );

            button.parentNode.appendChild(

                cancel

            );

        }

    }

    else {

        button.textContent =
            "Save Media";

        const cancel =
            document.getElementById("cancelEdit");

        if (cancel) {

            cancel.remove();

        }

    }

}


// ==========================================
// RESET FORM
// ==========================================

function resetForm() {

    const form =
        document.getElementById("mediaForm");

    if (form) {

        form.reset();

    }

}


// ==========================================
// DELETE MEDIA
// ==========================================

async function removeMedia(id) {

    const confirmed =
        window.confirm(

            "Are you sure you want to delete this media item?"

        );

    if (!confirmed) {

        return;

    }

    try {

        await deleteMedia(id);

        showAdminMessage(

            "Media deleted successfully.",

            "success"

        );

        await loadAdminMedia();

    }

    catch (error) {

        console.error(

            "Delete error:",

            error

        );

        showAdminMessage(

            "Unable to delete media.",

            "error"

        );

    }

}


// ==========================================
// OPEN PROFILE
// ==========================================

function openMediaProfile(id) {

    window.location.href =

        `/media.html?id=${encodeURIComponent(id)}`;

}


// ==========================================
// GENERATE ID
// ==========================================

function generateId() {

    if (

        typeof crypto !== "undefined" &&

        crypto.randomUUID

    ) {

        return crypto.randomUUID();

    }

    return (

        Date.now().toString(36) +

        Math.random()

            .toString(36)

            .substring(2, 10)

    );

}


// ==========================================
// MESSAGE
// ==========================================

function showAdminMessage(

    message,

    type

) {

    const messageBox =
        document.getElementById(

            "adminMessage"

        );

    if (!messageBox) {

        return;

    }

    messageBox.className =

        `admin-message ${type}`;

    messageBox.textContent =

        message;

    setTimeout(() => {

        messageBox.textContent = "";

        messageBox.className =

            "admin-message";

    }, 3500);

}


// ==========================================
// SAFE HTML
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


// ==========================================
// SAFE ATTRIBUTE
// ==========================================

function escapeAttribute(value) {

    return String(value ?? "")

        .replace(/&/g, "&amp;")

        .replace(/'/g, "&#39;")

        .replace(/"/g, "&quot;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;");

}