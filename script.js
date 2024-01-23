// script.js

var map = L.map('map').setView([0, 0], 10);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Leaflet &copy; OpenStreetMap contributors'
}).addTo(map);

var marker;

function updateMarkerLocation(lat, lng) {
    if (marker) {
        marker.setLatLng([lat, lng]);
        map.panTo([lat, lng]);
    } else {
        marker = L.marker([lat, lng]).addTo(map);
    }
}

function watchLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                updateMarkerLocation(lat, lng);
            },
            function (error) {
                console.error('Error getting location:', error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

watchLocation();
