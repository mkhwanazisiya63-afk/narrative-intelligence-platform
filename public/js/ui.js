/* ==================================================
   Narrative Intelligence Platform
   UI Library
================================================== */

// ================================================
// Toast Notification
// ================================================

function showToast(message, type = "success") {

    const existing = document.querySelector(".toast");

    if (existing) {

        existing.remove();

    }

    const toast = document.createElement("div");

    toast.className = "toast";

    if (type === "error") {

        toast.style.borderLeftColor = "#EF4444";

    }

    if (type === "warning") {

        toast.style.borderLeftColor = "#F59E0B";

    }

    toast.innerHTML = `

        <strong>${message}</strong>

    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

// ================================================
// Loading
// ================================================

function showLoader(container) {

    container.innerHTML = `

        <div class="loader"></div>

    `;

}

// ================================================
// Empty State
// ================================================

function showEmpty(container, message) {

    container.innerHTML = `

        <div class="empty-state">

            <h3>No Results</h3>

            <p>${message}</p>

        </div>

    `;

}

// ================================================
// Counter Animation
// ================================================

function animateCounter(element, endValue) {

    let current = 0;

    const increment = Math.max(1, Math.ceil(endValue / 40));

    const interval = setInterval(() => {

        current += increment;

        if (current >= endValue) {

            current = endValue;

            clearInterval(interval);

        }

        element.textContent = current;

    }, 20);

}