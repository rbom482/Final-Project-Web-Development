// Debugging Navigation Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu"); // Updated selector to ".nav-menu"

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
            navMenu.classList.toggle("show");
            console.log("Hamburger menu clicked"); // Debug log
        });
    } else {
        console.error("Hamburger menu or navigation menu not found.");
    }
});

// Debugging Smooth Scrolling
document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        console.log("Scrolling to:", targetId); // Debug log
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth", // Smooth scrolling
                block: "start", // Scroll to the top of the section
            });
        }

        // Close the menu after clicking a link (for mobile)
        const navMenu = document.querySelector(".nav-menu");
        if (navMenu && navMenu.classList.contains("show")) {
            navMenu.classList.remove("show");
        }
    });
});

// Form Validation with Real-Time Feedback
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

// Function to show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    let error = formGroup.querySelector(".error-message");
    if (!error) {
        error = document.createElement("span");
        error.classList.add("error-message");
        formGroup.appendChild(error);
    }
    error.textContent = message;
    input.classList.add("error");
}

// Function to clear error message
function clearError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error-message");
    if (error) {
        error.textContent = "";
    }
    input.classList.remove("error");
}

// Real-time validation for name
nameInput.addEventListener("input", () => {
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required.");
    } else {
        clearError(nameInput);
    }
});

// Real-time validation for email
emailInput.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required.");
    } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
    } else {
        clearError(emailInput);
    }
});

// Real-time validation for message
messageInput.addEventListener("input", () => {
    if (messageInput.value.trim() === "") {
        showError(messageInput, "Message is required.");
    } else {
        clearError(messageInput);
    }
});

// Debugging Form Validation
form.addEventListener("submit", (e) => {
    console.log("Form submitted"); // Debug log
    let isValid = true;

    if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required.");
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required.");
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
    }

    if (messageInput.value.trim() === "") {
        showError(messageInput, "Message is required.");
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault(); // Prevent form submission if validation fails
        console.log("Form validation failed"); // Debug log
    }
});

// Debugging Filter Projects
function filterProjects(category) {
    console.log("Filtering projects by category:", category); // Debug log
    const projects = document.querySelectorAll("#projects article");
    projects.forEach((project) => {
        if (category === "all" || project.dataset.category === category) {
            project.style.display = "block"; // Show matching projects
        } else {
            project.style.display = "none"; // Hide non-matching projects
        }
    });
}

// Attach event listeners to filter buttons (example buttons need to be added in HTML)
document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.category; // Get category from button
        filterProjects(category);
    });
});

// Debugging Lightbox
function openLightbox(imageSrc) {
    console.log("Opening lightbox for image:", imageSrc); // Debug log
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Project Image">
            <button class="lightbox-close" aria-label="Close">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Close lightbox when clicking the close button or outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
            lightbox.remove();
        }
    });
}

// Attach event listeners to project images
document.querySelectorAll("#projects img").forEach((image) => {
    image.addEventListener("click", () => {
        openLightbox(image.src);
    });
});