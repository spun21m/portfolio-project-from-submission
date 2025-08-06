const form = document.getElementById("contact-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  try {
    const res = await fetch("/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    const messageDiv = document.getElementById("form-message");
    messageDiv.textContent =
      "💗 Thank you for your message! I will get back to you soon.💗";
    messageDiv.classList.remove("error");
    messageDiv.classList.add("success");
    form.reset();

    setTimeout(() => {
      messageDiv.textContent = "";
      messageDiv.classList.remove("success");
    }, 5000);
  } catch (err) {
    const messageDiv = document.getElementById("form-message");
    messageDiv.textContent = "❌ Failed to send message. Please try again.";
    messageDiv.classList.add("error");
    messageDiv.classList.remove("success");
    console.error(err);
  }
});
