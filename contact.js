
// ===============================
// CONTACT FORM
// ===============================
const sendBtn = document.getElementById("send-btn");
const contactStatus = document.getElementById("contact-status");

sendBtn.addEventListener("click", () => {

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  // Validation
  if (!name || !email || !message) {
    contactStatus.textContent = "❌ Please fill all fields!";
    contactStatus.style.color = "red";
    return;
  }

  // Success message
  contactStatus.textContent = `✅ Thank you ${name}, message sent successfully!`;
  contactStatus.style.color = "green";

  // Reset form
  document.getElementById("contact-name").value = "";
  document.getElementById("contact-email").value = "";
  document.getElementById("contact-message").value = "";
});