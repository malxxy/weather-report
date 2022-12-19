$(document).ready(function() { 
    var searchBtn = document.getElementById("search-btn");

    // Store city
    let city = $("#city").val()
    console.log("CITY",city);
    localStorage.setItem("cityInput", city);
    console.log("cityInput",cityInput);
    
    // Get latitude and longitude from city using open maps API
    let lat = 12.890
    let lon = -135.20

    var weatherApiKey = "78785b54a90c1a313e4af8f23972a484"; // key #1
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
    
    // fetch open Weather API
    function getWeather() {
        fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Fetch Response \n-------------');
            console.log(data);
        });
    };

    searchBtn.on("click",getWeather())
});
