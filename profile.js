
// ===============================
// NAVBAR
// ===============================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}


// ===============================
// GET STUDENT FROM LOCALSTORAGE
// ===============================
const students = JSON.parse(localStorage.getItem("students")) || [];
const currentStudent = students[students.length - 1];


// ===============================
// PROFILE ELEMENTS
// ===============================
const nameEl = document.getElementById("profile-name");
const ageEl = document.getElementById("profile-age");
const gradeEl = document.getElementById("profile-grade");
const scoreEl = document.getElementById("profile-score");
const rankEl = document.getElementById("profile-rank");
const statusEl = document.getElementById("profile-status");


// ===============================
// DISPLAY STUDENT DATA
// ===============================
if (currentStudent) {
  nameEl.textContent = `Name: ${currentStudent.name}`;
  ageEl.textContent = `Age: ${currentStudent.age}`;
  gradeEl.textContent = `Grade: ${currentStudent.grade}`;
  scoreEl.textContent = `Score: ${currentStudent.score.toFixed(2)}`;
  rankEl.textContent = `Rank: ${currentStudent.rank}`;
} else {
  nameEl.textContent = "No student found!";
}


// ===============================
// HIDE / SHOW INFO
// ===============================
const toggleInfoBtn = document.getElementById("toggle-info");
const profileCard = document.getElementById("profile-card");

let isVisible = true;

toggleInfoBtn.addEventListener("click", () => {
  isVisible = !isVisible;

  profileCard.style.display = isVisible ? "block" : "none";

  toggleInfoBtn.textContent = isVisible ? "Hide Info" : "Show Info";
});


// ===============================
// STATUS TOGGLE
// ===============================
const toggleStatusBtn = document.getElementById("toggle-status");

let isActive = true;

toggleStatusBtn.addEventListener("click", () => {
  isActive = !isActive;

  if (isActive) {
    statusEl.textContent = "Status: Active";
    statusEl.style.color = "green";
  } else {
    statusEl.textContent = "Status: Suspended";
    statusEl.style.color = "red";
  }
});