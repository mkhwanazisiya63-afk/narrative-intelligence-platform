// ==========================================
// Base API Request
// ==========================================

async function request(url, options = {}) {

    const response = await fetch(url, options);

    if (!response.ok) {

        throw new Error(`HTTP ${response.status}`);

    }

    return response.json();

}

// ==========================================
// Dashboard
// ==========================================

async function getDashboardStats() {

    return request("/api/dashboard");

}

// ==========================================
// Media
// ==========================================

async function getAllMedia() {

    return request("/api/media");

}

async function getMedia(id) {

    return request(`/api/media/${id}`);

}

async function searchMedia(query) {

    return request(

        `/api/media/search?q=${encodeURIComponent(query)}`

    );

}

async function createMedia(media) {

    return request(

        "/api/media",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(media)

        }

    );

}

async function updateMedia(id, media) {

    return request(

        `/api/media/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(media)

        }

    );

}

async function deleteMedia(id) {

    return request(

        `/api/media/${id}`,

        {

            method: "DELETE"

        }

    );

}

// ==========================================
// Taxonomy
// ==========================================

async function getTaxonomy() {
    return request("/api/annotations/taxonomy");
}

// ==========================================
// MEDIA ANNOTATIONS
// ==========================================

async function getMediaAnnotations(mediaId) {

    return request(
        `/api/annotations/media/${mediaId}`
    );

}

async function saveMediaAnnotations(
    mediaId,
    annotations
) {

    return request(

        `/api/annotations/media/${mediaId}`,

        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify(
                annotations
            )

        }

    );

}

// Research Notes

async function getResearchNotes(mediaId) {

    return request(
        `/api/research-notes/media/${mediaId}`
    );

}

async function createResearchNote(
    mediaId,
    note
) {

    return request(
        `/api/research-notes/media/${mediaId}`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(note)

        }
    );

}

async function deleteResearchNote(
    noteId
) {

    return request(
        `/api/research-notes/${noteId}`,
        {
            method: "DELETE"
        }
    );

}

// ==========================================
// Related Media
// ==========================================

async function getRelatedMedia(mediaId) {

    return request(
        `/api/annotations/media/${mediaId}/related`
    );

}