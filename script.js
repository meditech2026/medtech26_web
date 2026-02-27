/* =========================
   SUPABASE INITIALIZATION
========================= */

const supabaseUrl = "https://rijjahgepttiywcttrnu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpamphaGdlcHR0aXl3Y3R0cm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzgwMTUsImV4cCI6MjA4NjkxNDAxNX0.9eYFh7FumMs86l57sHh5I1E-3D1C3AuwHeGYxaDnfXs";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

/* =========================
   COUNTDOWN TIMER
========================= */

const targetDate = new Date("March 12, 2026 10:00:00").getTime();

function updateCountdown() {
  const countdownEl = document.getElementById("countdown");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!countdownEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdownEl.innerHTML = "<h2 class='countdown-ended'>Time's Up</h2>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = days.toString().padStart(2, "0");
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* =========================
   REGISTRATION FORM
========================= */

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
  registrationForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const numberOfMembers = parseInt(
      document.getElementById("number_of_members").value,
      10
    );

    if (isNaN(numberOfMembers) || numberOfMembers < 1) {
      alert("Invalid number of members.");
      return;
    }

const data = {
  full_name: document.getElementById("full_name").value.trim(),
  email: document.getElementById("email").value.trim(),
  phone_number: document.getElementById("phone_number").value.trim(), // exact match
  college_name: document.getElementById("college_name").value.trim(),
  course_name: document.getElementById("course_name").value.trim(),
  number_of_members: numberOfMembers,
  competition: document.getElementById("competition").value.trim(),
  abstract: document.getElementById("abstract").value.trim()
};
    try {
      const { error } = await supabaseClient
        .from("registrations_1")
        .insert([data]);

      if (error) {
        console.error("Insert Error:", error);
        alert(error.message);   // show real DB error
        return;
      }

      alert("Registration successful.");
      registrationForm.reset();

    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("Unexpected error occurred.");
    }
  });
}



