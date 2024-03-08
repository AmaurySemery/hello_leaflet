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

    const lilleIcone = {
        lat: 50.63062636473414,
        lng: 3.054455834909882,
        title: 'Icone Lille',
        draggable: false
    }

    const zoomLevel = 12

    const map = L.map('mapid').setView([lille.lat, lille.lng], zoomLevel)

    addMarker(lille, map)
    addMarker(citadelleLille, map)
    addCustomMarker(lilleIcone, map)

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
        showNewCoords(event.target._latlng, event.target)
    })
}

function addCustomMarker(options, map)  {
    const smileyIcon = L.icon({
        iconUrl: './icons/oil-and-gas-well.png',
        iconSize: [32, 37],
        iconAnchor: [16, 18]
    })
    const marker = L.marker([options.lat, options.lng], { title: options.title, icon: smileyIcon })
    marker.addTo(map)
}

function showNewCoords(coords, marker) {
    currLat.innerText = `lat: ${coords.lat}`
    currLng.innerText = `lng: ${coords.lng}`
    marker
        .bindPopup(`<h3>Nouvelles coordonnées:</h3> <div>lat: ${coords.lat} | lng: ${coords.lng}</div>`)
        .openPopup()
}

document.addEventListener('DOMContentLoaded', function() {
    init();
});