const pageName = window.location.pathname.split("/").pop().replace(".html", "");

let allLocations = [];

const listContainer = document.getElementById("list-content");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const backBtn = document.getElementById("backToMap");

backBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
});

fetch("../data/locations.json")
    .then(response => response.json())
    .then(data => {

        allLocations = data.filter(location => location.type === pageName);
        renderList(allLocations);

    });

function renderList(locations) {

    listContainer.innerHTML = "";

    locations.forEach(location => {

        const item = document.createElement("div");
        item.className = "list-item";

        item.innerHTML = `
            <div class="list-info">
                <h3>${location.name}</h3>
                <div class="rating-stars">${generateStars(location.rating)}</div>
                <p>${location.description}</p>
            </div>

            <div class="list-image">
                <img src="../${location.image}" alt="${location.name}">
            </div>
        `;

        item.style.cursor = "pointer";

        item.addEventListener("click", function() {
            window.location.href = `../index.html?location=${encodeURIComponent(location.name)}`;
        });

        listContainer.appendChild(item);
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;

    let stars = "";

    for (let i = 0; i < fullStars; i++) {
        stars += "★";
    }

    if (halfStar) stars += "½";

    return stars + ` (${rating})`;
}

searchInput.addEventListener("input", function() {

    const query = this.value.toLowerCase();

    const filtered = allLocations.filter(location =>
        location.name.toLowerCase().includes(query)
    );

    renderList(filtered);
});

sortSelect.addEventListener("change", function() {

    let sorted = [...allLocations];

    if (this.value === "rating-high") {
        sorted.sort((a, b) => b.rating - a.rating);
    } else if (this.value === "rating-low") {
        sorted.sort((a, b) => a.rating - b.rating);
    }

    renderList(sorted);
});