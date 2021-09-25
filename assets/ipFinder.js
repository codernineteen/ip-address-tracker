// const ip = document.querySelector(".searchBar");
const searchForm = document.querySelector(".searchForm");
const ip = "8.8.8.8";
const apiKey = "at_UJcdWQ9smhLZlNXbus09tdS9Hxlvz";
const geoEndPoint = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`;

searchForm.addEventListener('submit', findLocation);

function findLocation(evt) {
    evt.preventDefault();
    console.log("worked");
    const location = fetch(geoEndPoint)
    .then((response) => response.json())
    .then((data) => {
        return data.location
    });
    console.log(location);
    const printLocation = async () => {
        const a = await location;
        console.log(a);
    };

    printLocation();
}
