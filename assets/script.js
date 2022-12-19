$(document).ready(function() { 
    $("#search-btn").click(getWeather());

    // fetch open Weather API
    function getWeather() {
         // Store city
        let city= $(this).siblings(".city").val();
        console.log($(this));
        console.log("CITY",city);
        localStorage.setItem("cityInput", city);
        console.log("cityInput",cityInput);

           // Get latitude and longitude from city using open maps API
        let lat = 12.890
        let lon = -135.20

        var weatherApiKey = "78785b54a90c1a313e4af8f23972a484"; // key #1
        var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
    
        fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Fetch Response \n-------------');
            console.log(data);
        });
    };
});
