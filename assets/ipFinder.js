const userInput = document.querySelector(".searchBar");
const searchForm = document.querySelector(".searchForm");
const geoInfo = document.querySelectorAll(".geoInfo");
const apiKey = "at_UJcdWQ9smhLZlNXbus09tdS9Hxlvz";
let geoEndPoint = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&`;

let lat;
let lng;
const myIcon = L.icon({
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='56'%3E%3Cpath fill-rule='evenodd' d='M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z'/%3E%3C/svg%3E"
})
let mapContainer = L.DomUtil.get('mapid');
let mymap;

searchForm.addEventListener('submit', findLocation);

function findLocation(evt) {
    evt.preventDefault();
    let data = userInput.value;

    if(data.split(".").includes("www") == false) {
        geoEndPoint += `ipAddress=${data}`;
        if (data.split(".").length < 4) {
            alert("Error: you put wrong data format");
            return;
        }
    } else {
        geoEndPoint += `domain=${data}`;
        if ( data.split(".").length < 3) {
            alert("Error: you put wrong data format");
            return;
        }
    }

    const result = fetch(geoEndPoint)
    .then((response) => response.json())
    .then((result) => {
        return result
    });

    const makeLocation = async () => {
        const a = await result;
        lat = a.location.lat;
        lng = a.location.lng;
    
        
        mymap = L.map('mapid').setView([lat, lng], 13);
        var marker = L.marker([lat, lng], {icon: myIcon}).addTo(mymap);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoid2pzZHBjcyIsImEiOiJja3R6cDd6ZWowOXQ4MnZudGN6b3p4ODYyIn0.xBK_y_Ky3jrfhlefBPJZxQ'
        }).addTo(mymap);

        geoInfo[0].innerText = a.ip;
        geoInfo[1].innerText = `${a.location.region}, ${a.location.city}, ${a.location.postalCode}`;
        geoInfo[2].innerText = 'UTC '+ a.location.timezone;
        geoInfo[3].innerText = a.isp;

    };

    makeLocation();

    geoEndPoint = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&`;

}

function buildMap(lat, lng) {
    
}