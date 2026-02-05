// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));

// FORM INTERACTION
const form = document.getElementById("regForm");
const status = document.getElementById("statusMessage");

form.addEventListener("submit", e => {
    e.preventDefault();

    status.textContent = "Submitting...";
    status.style.color = "#4da3ff";

    setTimeout(() => {
        status.textContent = "Registration successful ✔";
        status.style.color = "#00ff9c";
        form.reset();
    }, 1200);
});
