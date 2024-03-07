let currLat = null
let currLng = null

function init() {
    console.log('Inside init')
    currLat = document.getElementById('currLat')
    currLng = document.getElementById('currLng')


    const lille = {
        lat: 50.6329700,
        lng: 3.0585800,
        title: 'Ville de Lille',
        draggable: true
    }

    const citadelleLille = {
        lat: 50.6413572,
        lng: 3.0443862,
        title: 'Citadelle de Lille',
        draggable: false
    }

    const zoomLevel = 12

    const map = L.map('mapid').setView([lille.lat, lille.lng], zoomLevel)

    addMarker(lille, map)
    addMarker(citadelleLille, map)

    const mainLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })

    mainLayer.addTo(map)

    // L.esri.basemapLayer('Topographic').addTo(map);
    // L.esri.basemapLayer('ImageryFirefly').addTo(map);
    

}

function addMarker(options, map) {
    const marker = L.marker([options.lat, options.lng], { title: options.title, draggable: options.draggable })
    marker.addTo(map)

    marker.on('dragend', function(event) {
        console.log('New coords: ', event.target._latlng)
        currLat.innerText = `lat: ${event.target._latlng.lat}`
        currLng.innerText = `lng: ${event.target._latlng.lng}`
    })
}

document.addEventListener('DOMContentLoaded', function() {
    init();
});