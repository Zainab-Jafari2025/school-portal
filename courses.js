
// ===============================
// COURSES DATA
// ===============================
let courses = [
  {
    name: "Mathematics",
    teacher: "Mr. Ali",
    grade: 10,
    desc: "Basic algebra and equations"
  },
  {
    name: "Science",
    teacher: "Mrs. Sara",
    grade: 11,
    desc: "Physics and chemistry basics"
  },
  {
    name: "English",
    teacher: "Mr. John",
    grade: 10,
    desc: "Grammar and writing skills"
  }
];

const coursesContainer = document.getElementById("courses-container");


// ===============================
// RENDER COURSES
// ===============================
function renderCourses(list) {
  coursesContainer.innerHTML = "";

  list.forEach((course) => {
    coursesContainer.innerHTML += `
      <div class="course-card">
        <h3>${course.name}</h3>
        <p>👨‍🏫 Teacher: ${course.teacher}</p>
        <p>🎓 Grade: ${course.grade}</p>
        <p>${course.desc}</p>
      </div>
    `;
  });
}

// initial render
renderCourses(courses);


// ===============================
// ADD COURSE
// ===============================
const addBtn = document.getElementById("add-course-btn");

addBtn.addEventListener("click", () => {
  const name = document.getElementById("course-name").value;
  const teacher = document.getElementById("course-teacher").value;
  const grade = document.getElementById("course-grade").value;
  const desc = document.getElementById("course-desc").value;

  if (!name || !teacher || !grade || !desc) {
    alert("Please fill all fields!");
    return;
  }

  const newCourse = {
    name,
    teacher,
    grade,
    desc
  };

  courses.push(newCourse);
  renderCourses(courses);
});


// ===============================
// FILTER COURSES
// ===============================
const filterBtns = document.querySelectorAll(".filters button");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const grade = btn.dataset.grade;

    if (grade === "all") {
      renderCourses(courses);
    } else {
      const filtered = courses.filter(c => c.grade == grade);
      renderCourses(filtered);
    }
  });
});