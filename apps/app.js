console.log("Hello")
API_KEY = "at_2C9O2zv8ipWYOz2EB7XbybO0OMNfl";
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGF2dnkiLCJhIjoiY2tqcmRyYmY1MHI0ZDJzanhnM2cxZmt6bCJ9.VvrcdNrUcR5M8uuufxg_rg'
}).addTo(mymap);

var myIcon = L.icon({
    iconUrl: '../images/icon-location.svg',
    iconSize: [38, 55],
    iconAnchor: [22, 94],
});

var mymarker = L.marker([51.505, -0.09], {icon: myIcon}).addTo(mymap);

const userInput = document.getElementById("userInput");
const submitButton = document.getElementById("submitButton");
const ipAddress = document.getElementById("ipAddress");
const ipLocation = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    const inputIP = userInput.value;
    userInput.value = "";
    $(function () {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {apiKey: API_KEY, ipAddress: inputIP},
            success: function(data) {
                ipAddress.textContent = data["ip"];
                ipLocation.textContent = data["location"]["city"] + ", " + data["location"]["region"] + ", " + data["location"]["country"];
                timezone.textContent = "UST " + data["location"]["timezone"];
                isp.textContent = data["isp"];
                mymap.setView([data["location"]["lat"], data["location"]["lng"]], 13);
                mymarker.setLatLng([data["location"]["lat"], data["location"]["lng"]]);
            }
        });
     });
});
