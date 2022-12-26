$(document).ready(function() { 
    $("#search-btn").click(function(){
         
        // Store city
        let city= $(this).siblings(".city").val();
        console.log("City",city);
        localStorage.setItem("cityInput", city);
        let cityInput = localStorage.getItem("cityInput",city);
        console.log("getCityInput",cityInput);
        document.getElementById("city-title").append(cityInput); // not working

        lat = ""; // set latitude to empty string
        lon= ""; // set longitude to empty string

        let newBtn = document.createElement("btn");
        newBtn.textContent = cityInput;
        document.getElementById("search-append").appendChild(newBtn);
        newBtn.setAttribute(style,"background-color:#700fdb; color:white;");

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
            let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;
            
            // display day of week, date and time using day js or open weather api
            // fetch open Weather API
            fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("DATA",data);
                let allData = data.list[0].main;
                console.log('City weather data \n-------------',allData);

                // weather & icon to match weather
                let weather = document.createElement("ul");
                weather.textContent = "Weather: " + data.list[0].weather[0].main;
                document.getElementById("enter-weather").appendChild(weather);
                 if (weather === "Clouds") {
                        icon = document.createElement("i");
                        icon.textContent = "Temporary icon place holder";
                        document.getElementById("insert-icon").appendChild(icon);
                } else if (weather === "Sun") {
                    icon = document.createElement("i");
                    icon.textContent = "Temporary icon place holder";
                    document.getElementById("insert-icon").appendChild(icon);
                } else if (weather === "Rain") {
                    icon = document.createElement("i");
                    icon.textContent = "Temporary icon place holder";
                    document.getElementById("insert-icon").appendChild(icon);
                } else if (weather === "Snow") {
                    icon = document.createElement("i");
                    icon.textContent = "Temporary icon place holder"
                    document.getElementById("insert-icon").appendChild(icon);
                }

                // temp
                let temp = document.createElement("ul");
                temp.textContent = "Temperature: " + allData.temp + " degrees F";
                document.getElementById("enter-weather").appendChild(temp);
                // feels like
                let feelsLike = document.createElement("ul");
                feelsLike.textContent = "Fees like: " + allData.feels_like + " degrees F";
                document.getElementById("enter-weather").appendChild(feelsLike);
                // humidity
                let humidity = document.createElement("ul");
                humidity.textContent = "Humidity: " + allData.humidity + "%";
                document.getElementById("enter-weather").appendChild(humidity);
                // wind speed
                let wind = document.createElement("ul");
                wind.textContent = "Wind speed: " + data.list[0].wind.speed + "mph";
                document.getElementById("enter-weather").appendChild(wind);
            });

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
            .then(function (response) {
                return response.json();
            })
            .then(function (forecastData) {
                let forecast = forecastData.list;
                console.log('Forecast \n-------------',forecast);
            
                for (let i = 1; i < forecastData.length; i++) { // loop through every day and return 
                    let fCard = document.createElement("card") // create a new card
                    let fTitle = document.createElement("h5")
                    fTitle.textContent = "PLACE HOLDER - FIND DAY ON OPEN WEATHER OR DAY JS"
                    fCard.appendChild(fTitle)

                    fData =  forecastData.list[i].main; // variable for fetched data

                    // temp
                    let fTemp = document.createElement("p");
                    fTemp.textContent = "Temperature: " + fData.fTemp + " degrees Fahrenheit";
                    fCard.appendChild(fTemp);
                    // humidity
                    let fHumidity = document.createElement("p");
                    fHumidity.textContent = "Humidity: " + fData.fHumidity + "%";
                    fCard.appendChild(fHumidity);
                    // weather
                    let fWeather = document.createElement("p");
                    fWeather.textContent = "Weather: " + forecast.list[i].weather[0].main;
                    fCard.appendChild(fWeather);
                    // weather
                    let wind = document.createElement("p");
                    wind.textContent = "Wind speed: " + forecast.list[i].wind.speed + "mph";
                    fCard.appendChild(wind);
                    }
            });
         });
    });
}); 