const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const subject = document.getElementById("contactSubject").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  const responseMessage = document.getElementById("contactResponse");

  if (!name || !email || !subject || !message) {
    responseMessage.textContent = "Please fill all fields.";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    const data = await response.json();

    responseMessage.textContent = data.message;

    if (response.ok) {
      contactForm.reset();
    }
  } catch (error) {
    responseMessage.textContent = "Unable to connect to the server.";
  }
});
