let currLat = null
let currLng = null
let circleRange = null
let circle = null
let btnFindAddress = null
let address = null
let coords = null

function init() {
    console.log('Inside init')
    currLat = document.getElementById('currLat')
    currLng = document.getElementById('currLng')
    circleRange = document.getElementById('circleRange')
    btnFindAddress = document.getElementById('btnFindAddress')
    btnFindAddress.addEventListener('click', findAddressByCoords)
    address = document.getElementById('address')

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
        draggable: false,
        circle: {
            color: 'green',
            fillColor: '#42f5B0',
            fillOpacity: 0.5,
            radius: 500
        }
    }

    const lilleIcone = {
        lat: 50.63062636473414,
        lng: 3.054455834909882,
        title: 'Icone Lille',
        draggable: false
    }

    const zoomLevel = 15

    const map = L.map('mapid').setView([lille.lat, lille.lng], zoomLevel)

    addMarker(lille, map)
    addMarker(citadelleLille, map)
    addCustomMarker(lilleIcone, map)

    addCircle(citadelleLille, map)

    circleRange.addEventListener('change', (event) => {
        console.log(event.target.value)
        circle.setRadius(event.target.value * 10)
    })

    const mainLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })

    mainLayer.addTo(map)
}

function addMarker(options, map) {
    const marker = L.marker([options.lat, options.lng], { title: options.title, draggable: options.draggable })
    marker.addTo(map)

    marker.on('dragend', function (event) {
        coords = event.target._latlng
        console.log('New coords: ', event.target._latlng)
        showNewCoords(event.target._latlng, event.target)
    })
}

function addCustomMarker(options, map) {
    const smileyIcon = L.icon({
        iconUrl: './icons/oil-and-gas-well.png',
        iconSize: [32, 37],
        iconAnchor: [16, 18],
        popupAnchor: [0, -30]
    })
    const marker = L.marker([options.lat, options.lng], { title: options.title, icon: smileyIcon })
    marker.addTo(map).bindPopup('en voiture SVP')
}

function showNewCoords(coords, marker) {
    currLat.innerText = `lat: ${coords.lat}`
    currLng.innerText = `lng: ${coords.lng}`
    marker
        .bindPopup(`<h3>Nouvelles coordonnées:</h3> <div>lat: ${coords.lat} | lng: ${coords.lng}</div>`)
        .openPopup()
}

function addCircle(options, map) {
    const { color, fillColor, radius } = options.circle
    circle = L.circle([options.lat, options.lng], {
        color,
        fillColor,
        radius
    })
    circle.addTo(map)
}

function findAddressByCoords() {
    const geocodeService = L.esri.Geocoding.geocodeService()
    geocodeService.reverse().latlng(coords).run(function (error, result) {
        if (error) {
            return
        }
        console.log(result)
    })
}