$(document).ready(function() { 
    $("#search-btn").click(function(){
         // Store city
        let city= $(this).siblings(".city").val();
        console.log("City",city);
        localStorage.setItem("cityInput", city);
        let cityInput = localStorage.getItem("cityInput",city);
        console.log("getCityInput",cityInput);

        lat = ""; // set latitude to empty string
        lon=""; // set longitude to empty string

        // Get latitude and longitude from city using open weather maps API
        let weatherApiKey = "78785b54a90c1a313e4af8f23972a484"; // key
        geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${weatherApiKey}`;
        fetch(geocodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (geoData) {
            console.log('Fetch response ');
            console.log(geoData);
            lat = geoData[0].lat;
            lon = geoData[0].lon;
            console.log("latitude",lat);
            console.log("longitude",lon);
            let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

            // fetch open Weather API
            fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('City weather data \n-------------');
                console.log(data);
                // append weather information to dashboard
                // append forecast information to forecast area
            });
         });
    });
});