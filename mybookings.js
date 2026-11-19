const bookingList = document.getElementById("bookingList");

// Load bookings from backend
async function displayBookings() {
  try {
    const response = await fetch("http://localhost:5000/api/bookings");

    if (!response.ok) {
      throw new Error("Unable to fetch bookings");
    }

    const bookings = await response.json();

    bookingList.innerHTML = "";

    if (bookings.length === 0) {
      bookingList.textContent = "No bookings available.";
      return;
    }

    bookings.forEach((booking) => {
      const card = document.createElement("div");
      card.className = "booking-card";

      const name = document.createElement("h3");
      name.textContent = booking.destination;

      const traveller = document.createElement("p");
      traveller.textContent = "Traveller: " + booking.travellerName;

      const email = document.createElement("p");
      email.textContent = "Email: " + booking.travellerEmail;

      const date = document.createElement("p");
      date.textContent = "Travel Date: " + booking.travelDate;

      const count = document.createElement("p");
      count.textContent = "Number of Travellers: " + booking.travellers;

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel Booking";

      cancelButton.addEventListener("click", () => {
        cancelBooking(booking.id);
      });

      card.append(name, traveller, email, date, count, cancelButton);
      bookingList.appendChild(card);
    });
  } catch (error) {
    bookingList.textContent = "Unable to load bookings. Please try again.";
  }
}

// Cancel booking
async function cancelBooking(id) {
  if (!confirm("Are you sure you want to cancel this booking?")) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      displayBookings();
    }
  } catch (error) {
    alert("Unable to connect to the server.");
  }
}

// Display bookings when page loads
displayBookings();
