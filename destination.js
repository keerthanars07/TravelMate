const destinationContainer = document.getElementById("destinationContainer");

async function loadDestinations() {
  try {
    const response = await fetch("http://localhost:5000/api/destinations");

    if (!response.ok) {
      throw new Error("Unable to load destinations");
    }

    const destinations = await response.json();

    destinationContainer.innerHTML = "";

    const images = {
      "New York":
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600",
      Paris:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
      Bali: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600",
    };

    const descriptions = {
      "New York": "Discover amazing city attractions.",
      Paris: "Experience romantic Paris.",
      Bali: "Enjoy beautiful tropical beaches.",
    };

    destinations.forEach((destination) => {
      const card = document.createElement("div");
      card.className = "card";

      const image = document.createElement("img");
      image.src = images[destination.name] || "";
      image.alt = destination.name;

      const heading = document.createElement("h3");
      heading.textContent = destination.name;

      const description = document.createElement("p");
      description.textContent =
        descriptions[destination.name] || "Explore this destination.";

      const price = document.createElement("p");
      price.textContent =
        "Starting from ₹" + destination.price.toLocaleString("en-IN");

      const link = document.createElement("a");
      link.className = "btn";
      link.href = "booking.html?place=" + encodeURIComponent(destination.name);
      link.textContent = "Book Now";

      card.append(image, heading, description, price, link);
      destinationContainer.appendChild(card);
    });
  } catch (error) {
    destinationContainer.textContent =
      "Unable to load destinations. Please try again later.";
  }
}

loadDestinations();
