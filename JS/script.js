// Hamburger Menu Toggle
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("primary-navigation");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Close menu when a nav link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.textContent = "☰";
    });
});

// Set Current Year in Footer
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

// Form Validation
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formMessage = document.getElementById("form-message");
const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");

// Validation Functions
function validateName(name) {
    const trimmed = name.trim();
    if (trimmed.length === 0) {
        return { valid: false, message: "Name is required" };
    }
    if (trimmed.length < 2) {
        return { valid: false, message: "Name must be at least 2 characters" };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
        return { valid: false, message: "Name can only contain letters, spaces, hyphens, and apostrophes" };
    }
    return { valid: true, message: "" };
}

function validateEmail(email) {
    const trimmed = email.trim();
    if (trimmed.length === 0) {
        return { valid: false, message: "Email is required" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        return { valid: false, message: "Please enter a valid email address" };
    }
    return { valid: true, message: "" };
}

function validateMessage(message) {
    const trimmed = message.trim();
    if (trimmed.length > 0 && trimmed.length < 10) {
        return { valid: false, message: "Message must be at least 10 characters if provided" };
    }
    if (trimmed.length > 1000) {
        return { valid: false, message: "Message cannot exceed 1000 characters" };
    }
    return { valid: true, message: "" };
}

function clearError(errorElement) {
    errorElement.textContent = "";
    errorElement.style.display = "none";
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

// Real-time validation
nameInput.addEventListener("blur", () => {
    const result = validateName(nameInput.value);
    if (!result.valid) {
        showError(errorName, result.message);
    } else {
        clearError(errorName);
    }
});

emailInput.addEventListener("blur", () => {
    const result = validateEmail(emailInput.value);
    if (!result.valid) {
        showError(errorEmail, result.message);
    } else {
        clearError(errorEmail);
    }
});

messageInput.addEventListener("blur", () => {
    const result = validateMessage(messageInput.value);
    if (!result.valid) {
        showError(document.getElementById("error-message") || createErrorElement(), result.message);
    } else {
        clearError(document.getElementById("error-message") || document.createElement("div"));
    }
});

// Form submission
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate all fields
    const nameResult = validateName(nameInput.value);
    const emailResult = validateEmail(emailInput.value);
    const messageResult = validateMessage(messageInput.value);

    // Display errors
    if (!nameResult.valid) {
        showError(errorName, nameResult.message);
    } else {
        clearError(errorName);
    }

    if (!emailResult.valid) {
        showError(errorEmail, emailResult.message);
    } else {
        clearError(errorEmail);
    }

    // If all validations pass
    if (nameResult.valid && emailResult.valid && messageResult.valid) {
        // Show success message
        formMessage.className = "form-message success";
        formMessage.textContent = "Message sent successfully! Thank you for reaching out.";
        formMessage.style.display = "block";

        // Clear form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = "none";
            formMessage.className = "form-message";
        }, 5000);
    } else {
        // Show error message
        formMessage.className = "form-message error";
        formMessage.textContent = "Please fix the errors above and try again.";
        formMessage.style.display = "block";
    }
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById("scroll-progress").style.width = scrollPercent + "%";
});
