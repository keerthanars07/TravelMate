function searchDestination() {
  let searchValue = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  let cards = document.querySelectorAll(".card");

  let found = false;

  cards.forEach(function (card) {
    let destination = card.querySelector("h3").textContent.toLowerCase();

    if (destination.includes(searchValue) && searchValue !== "") {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  let message = document.getElementById("searchMessage");

  if (found) {
    message.textContent = "Destination found!";
  } else {
    message.textContent = "No destination found!";
  }
}
