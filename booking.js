const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

// Automatically select destination from URL
const urlParams = new URLSearchParams(window.location.search);
const selectedPlace = urlParams.get("place");

if (selectedPlace) {
  document.getElementById("destinationSelect").value = selectedPlace;
}

// Booking form submission
bookingForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const travellerName = document.getElementById("travellerName").value.trim();
  const travellerEmail = document.getElementById("travellerEmail").value.trim();
  const destination = document.getElementById("destinationSelect").value;
  const travelDate = document.getElementById("travelDate").value;
  const travellers = Number(document.getElementById("travellers").value);

  if (
    !travellerName ||
    !travellerEmail ||
    !destination ||
    !travelDate ||
    !travellers
  ) {
    bookingMessage.textContent = "Please fill all fields.";
    return;
  }

  if (travellers < 1 || !Number.isInteger(travellers)) {
    bookingMessage.textContent = "Enter a valid number of travellers.";
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  if (travelDate < today) {
    bookingMessage.textContent = "Please select a future travel date.";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        travellerName,
        travellerEmail,
        destination,
        travelDate,
        travellers,
      }),
    });

    const data = await response.json();

    bookingMessage.textContent = data.message;

    if (response.ok) {
      bookingForm.reset();
    }
  } catch (error) {
    bookingMessage.textContent = "Unable to connect to the server.";
  }
});
