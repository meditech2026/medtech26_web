  // Set target date: March 12, 10:00 AM
  const targetDate = new Date("March 12, 2026 10:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML = "<h2 style='color: rgb(103,232,249);'>Time's Up</h2>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
/* =====================
   SCROLL REVEAL
===================== */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =====================
   BUTTON MICRO-INTERACTION
===================== */
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("mousemove", event => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        button.style.setProperty("--x", `${x}px`);
    });
});
