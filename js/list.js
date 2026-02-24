// Detect page type from URL
const pageName = window.location.pathname.split("/").pop().replace(".html", "");

fetch("../data/locations.json")
    .then(response => response.json())
    .then(data => {

        const filtered = data.filter(location => location.type === pageName);

        const container = document.getElementById("list-content");

        filtered.forEach(location => {

            const item = document.createElement("div");
            item.className = "list-item";

            item.innerHTML = `
                <div class="list-info">
                    <h3>${location.name}</h3>
                    <p><strong>Rating:</strong> ⭐ ${location.rating}</p>
                    <p>${location.description}</p>
                </div>

                <div class="list-image">
                    <img src="../${location.image}" alt="${location.name}">
                </div>
            `;

            container.appendChild(item);

        });

    });