// Navbar
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Enrollment Form Elements
const enrollmentForm = document.getElementById("enrollment-form");
const studentName = document.getElementById("student-name");
const studentAge = document.getElementById("student-age");
const studentGrade = document.getElementById("student-grade");

const message = document.getElementById("message");
const studentSummary = document.getElementById("student-summary");

// ===============================
// LOAD FROM LOCALSTORAGE
// ===============================
let students = JSON.parse(localStorage.getItem("students")) || [];

// ===============================
// FUNCTIONS (LOGIC)
// ===============================

// Completion Rate
function calculateCompletionRate(pagesRead, totalPages) {
  return (pagesRead / totalPages) * 100;
}

// Score System
function awardPoints(totalPages, completionRate) {
  return totalPages + completionRate * 2;
}

// Ranking System
function getRank(pagesRead) {
  if (pagesRead >= 400) {
    return "⭐ Reading Star";
  } else if (pagesRead >= 250) {
    return "📚 Dedicated Reader";
  } else {
    return "🌱 Rising Reader";
  }
}

// Find Winner
function findWinner() {
  if (students.length === 0) return null;

  let winner = students[0];

  for (let i = 1; i < students.length; i++) {
    if (students[i].score > winner.score) {
      winner = students[i];
    }
  }

  return winner;
}

// Top 3 Students
function getTopStudents() {
  return [...students].sort((a, b) => b.score - a.score).slice(0, 3);
}

// ===============================
// DISPLAY TOP 3
// ===============================
function displayStudents() {
  const topStudents = getTopStudents();

  studentSummary.innerHTML = `
    <h2>🏆 Leaderboard (Top 3)</h2>
  `;

  topStudents.forEach((student, index) => {
    studentSummary.innerHTML += `
      <div class="student-card">
        <h3>#${index + 1} ${student.name}</h3>
        <p>👤 Age: ${student.age}</p>
        <p>🎓 Grade: ${student.grade}</p>
        <p>📖 Pages: ${student.pagesRead}</p>
        <p>🏆 Score: ${student.score.toFixed(2)}</p>
        <p>🎖 Rank: ${student.rank}</p>
      </div>
    `;
  });
}

// ===============================
// SAVE TO LOCALSTORAGE
// ===============================
function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

// ===============================
// SUBMIT EVENT
// ===============================
enrollmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = studentName.value.trim();
  const age = studentAge.value.trim();
  const grade = studentGrade.value.trim();

  // Validation
  if (!name || !age || !grade) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  // Duplicate Check
  const exists = students.some((s) => s.name === name);

  if (exists) {
    message.textContent = "Student already exists!";
    message.style.color = "red";
    return;
  }

  message.textContent = "";
  message.style.color = "";

  // Fake reading data
  const pagesRead = Number(age) * 20;
  const totalPages = Number(age) * 30;

  // Create student object
  const student = {
    name,
    age,
    grade,
    pagesRead,
    totalPages,
  };

  // Calculations
  const completionRate = calculateCompletionRate(pagesRead, totalPages);
  const score = awardPoints(totalPages, completionRate);

  student.completionRate = completionRate;
  student.score = score;
  student.rank = getRank(pagesRead);

  // Add to array
  students.push(student);

  // Save permanently
  saveToLocalStorage();

  // Success message
  message.textContent = `Welcome ${student.name} to Bright Future School!`;
  message.style.color = "green";

  // Reset form
  enrollmentForm.reset();

  // Update UI
  displayStudents();

  // Show Winner
  const winner = findWinner();

  if (winner) {
    setTimeout(() => {
      message.innerHTML = `🏆 Champion: <b>${
        winner.name
      }</b> with ${winner.score.toFixed(2)} points!`;
      message.style.color = "gold";
    }, 500);
  }
});
