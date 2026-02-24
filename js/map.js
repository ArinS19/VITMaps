// Initialize map
let allMarkers = [];
const map = L.map('map-container').setView([12.8406, 80.1532], 16);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// DOM references
const popup = document.getElementById("map-popup");
const closeBtn = document.getElementById("closePopupBtn");
// Create colored icon function

function getMarkerIcon(type) {
    let iconUrl;

    switch(type) {
        case "food":
            iconUrl = "assets/icons/marker-icon-red.png";
            break;
        case "academic":
            iconUrl = "assets/icons/marker-icon-blue.png";
            break;
        case "hostel":
            iconUrl = "assets/icons/marker-icon-green.png";
            break;
        case "near-campus":
            iconUrl = "assets/icons/marker-icon-orange.png";
            break;
        default:
            iconUrl = "assets/icons/marker-icon-blue.png";
    }

    return L.icon({
        iconUrl: iconUrl,
        shadowUrl: "assets/icons/marker-shadow.png",

        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}
// Add ONE test marker


fetch("data/locations.json")
    .then(response => response.json())
    .then(data => {

        data.forEach(location => {

            const marker = L.marker(location.coordinates, {
                icon: getMarkerIcon(location.type)
            }).addTo(map);

            marker.locationType = location.type; // store type
            marker.locationData = location;      // store full data

            marker.on("click", function () {
                showPopup(location);
            });

            allMarkers.push(marker);
        });

    })
    .catch(error => console.error("Fetch error:", error));

function showPopup(data) {
    document.getElementById("popup-name").innerText = data.name;
    document.getElementById("popup-type").innerText = "Type: " + data.type;
    document.getElementById("popup-rating").innerText = "Rating: " + data.rating;
    document.getElementById("popup-desc").innerText = data.desc;

    const menuDiv = document.getElementById("popup-menu");
    menuDiv.innerHTML = "";

    if (data.menu && data.menu.length > 0) {
        let list = "<strong>Menu:</strong><ul>";
        data.menu.forEach(item => {
            list += `<li>${item}</li>`;
        });
        list += "</ul>";
        menuDiv.innerHTML = list;
    }

    document.getElementById("popup-image").src = data.image;

    popup.classList.add("active");
}

closeBtn.addEventListener("click", function () {
    popup.classList.remove("active");
});