$(document).ready(function() { 
    // let modeBtn = $(".mode-btn");
    // modeBtn.click(function (){
    //     var light = true;
    //     if (light) => dark()
    //         change light = false;
    //         switch all dark colors to light colors
    //         switch all light colors to dark colors
    // })
    
    $("#search-btn").click(function(){
        // Empty appended text
        if ($("#enter-weather") === string) {
            $("#enter-weather") = "";
        } 
        
         // Store city
        let city= $(this).siblings(".city").val();
        console.log("City",city);
        localStorage.setItem("cityInput", city);
        let cityInput = localStorage.getItem("cityInput",city);
        console.log("getCityInput",cityInput);
        document.getElementById("city-title").append(cityInput); // not working

        lat = ""; // set latitude to empty string
        lon= ""; // set longitude to empty string

        // Get latitude and longitude from city using open weather maps API
        let weatherApiKey = "78785b54a90c1a313e4af8f23972a484"; // key
        geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${weatherApiKey}`;
        fetch(geocodeUrl)
        .then(function (response) {
            return response.json(); // return geo data
        })
        .then(function (geoData) {
            console.log('Fetch response '); //fetch data
            console.log(geoData); 
            lat = geoData[0].lat; // grab latitude from city and assign variable
            lon = geoData[0].lon; // grab longitude from variable and assign variable
            // console.log("latitude",lat);
            // console.log("longitude",lon);
            let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;

            // fetch open Weather API
            fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let allData = data.list[0].main;
                console.log('City weather data \n-------------',allData);
                // temp
                let temp = document.createElement("ul");
                temp.textContent = "Temperature: " + allData.temp + " degrees Fahrenheit";
                document.getElementById("enter-weather").appendChild(temp);
                // feels like
                let feelsLike = document.createElement("ul");
                feelsLike.textContent = "Fees like: " + allData.feels_like + " degrees Fahrenheit";
                document.getElementById("enter-weather").appendChild(feelsLike);
                // humidity
                let humidity = document.createElement("ul");
                humidity.textContent = "Humidity: " + allData.humidity + "%";
                document.getElementById("enter-weather").appendChild(humidity);
                
                let newBtn = document.createElement("btn");
                newBtn.textContent = cityInput;
                document.getElementById("search-append");
                newBtn.setAttribute("style","background-color:#700fdb; color:white;");
            });
         });
    });
});