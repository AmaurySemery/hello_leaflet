function init() {
    const parcThabor = {
        lat: 50.6329700,
        lng: 3.0585800
    }

    const zoomLevel = 7

    const map = L.map('mapid').setView([parcThabor.lat, parcThabor.lng], zoomLevel)

    const mainLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })

    mainLayer.addTo(map)

}

document.addEventListener('DOMContentLoaded', function() {
    init();
});