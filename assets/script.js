$(document).ready(function() { 
    // disp;ay date and time
    const monthsOfYear = ["January", "February","MArch","April","May","June","July","August","September","October","November","December"];
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        
    function search(city) {
        $("#enter-weather").html("");
        $("#city-name").html("");
        $("#insert-iconID").html("");
        $("#forecast-section").html("");
    
        setInterval(function(){
            let time = new Date();
            let date = time.getDate();
            let day = time.getDay();
            let month = time.getMonth();
            let hour = time.getHours();
            let minutes = time.getMinutes();
            console.log("date",date);
            document.getElementById("day").innerHTML = daysOfWeek[day] + ", " + monthsOfYear[month] + " " + date;
            document.getElementById("time").innerHTML = hour + ":" + minutes;
        }, 1000);
        
        // Store city
        localStorage.setItem("cityInput", city);
        let cityInput = localStorage.getItem("cityInput",city);
        console.log("getCityInput",cityInput);
        let cityTitle = "";
        cityTitle.textContent = cityInput;
        document.getElementById("city-name").append(cityInput);
    
        lat = ""; // set latitude to empty string
        lon= ""; // set longitude to empty string
    
        // Get latitude and longitude from city using open weather maps API
        let weatherApiKey = "78785b54a90c1a313e4af8f23972a484"; // key
        geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${weatherApiKey}`;
        
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
    
            fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let allData = data.list[0].main;
                console.log('City weather data \n-------------',allData);
    
                let weather = document.createElement("ul");
                let weatherContent = data.list[0].weather[0].main;
                weather.textContent = "Weather: " + weatherContent;
                document.getElementById("enter-weather").appendChild(weather);
               // get weather icon and append to current weather 
                let weatherIcon = document.createElement("img");
                let iconID = data.list[0].weather[0].icon;
                console.log("Icon ID",iconID);
                weatherIcon.src = `http://openweathermap.org/img/wn/${iconID}.png`;
                $("#insert-iconID").append(weatherIcon);
    
                // temp
                let temp = document.createElement("ul");
                temp.textContent = "Temperature: " + allData.temp + " degrees F";
                document.getElementById("enter-weather").appendChild(temp);
                
                // humidity
                let humidity = document.createElement("ul");
                humidity.textContent = "Humidity: " + allData.humidity + "%";
                document.getElementById("enter-weather").appendChild(humidity);
                // wind speed
                let wind = document.createElement("ul");
                wind.textContent = "Wind speed: " + data.list[0].wind.speed + "mph";
                document.getElementById("enter-weather").appendChild(wind);
                
                // create btn
                let newBtn = document.createElement("btn");
                newBtn.textContent = cityInput;
                $(newBtn).attr("style","background-color: #700fdb; color:white;border-radius: 12px; padding: 10px; margin:5px;");
                $(newBtn).addClass("new-search-btn");
                document.getElementById("search-append").appendChild(newBtn);
                $(newBtn).click((event) => {
                    let city = event.target.textContent;
                    console.log("new city",city);
                    search(city);
                }); // must be within scope so it does not load into page BEFORE btn exists
            });
    
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
            .then(function (response) {
                return response.json();
            })
            .then(function (forecastData) {
                console.log("forecastData",forecastData);
                let forecast = forecastData.list;
                console.log('Forecast \n-------------',forecast);
    
                $("#city-text").html(""); // empty "forecast loading" text
    
                for (let i = 0; i < forecast.length; i+=8) { // loop through every day and return 
                    let fCard = document.createElement("card"); // create a new card
                    let fTitle = document.createElement("h5");
                    let forecastTitle = forecast[i].dt_txt;
                    fTitle.textContent = forecastTitle.slice(0,10);
    
                    let forecastIcon = document.createElement("img");
                    let id = forecast[i].weather[0].icon;
                    console.log("Icon ID",id);
                    forecastIcon.src = `http://openweathermap.org/img/wn/${id}.png`;
            
                    
                    fData =  forecast[i].main; // variable for fetched data
                    console.log('forecast data',fData);
                    // temp
                    let fTemp = document.createElement("p");
                    fTemp.textContent = "Temperature: " + fData.temp + " degrees F";
                    // humidity
                    let fHumidity = document.createElement("p");
                    fHumidity.textContent = "Humidity: " + fData.humidity + "%";
                    // weather
                    let fWeather = document.createElement("p");
                    fWeather.textContent = "Weather: " + forecast[i].weather[0].main;
                    // wind
                    let fWind = document.createElement("p");
                    fWind.textContent = "Wind speed: " + forecast[i].wind.speed + "mph";
                    
                    document.getElementById("forecast-section").appendChild(fCard);
                    fCard.appendChild(fTitle);
                    fCard.appendChild(forecastIcon);
                    fCard.append(fTemp, fHumidity, fWeather, fWind);
                    fCard.style.backgroundColor = "#99a3ad";
                    fCard.style.border = "white";
                    fTitle.style.color = "#700fdb";
                    fCard.style.borderRadius = "15px";
                    fCard.style.margin = "3px";
                    fCard.style.padding = "5px";
                };
            });
         });
        return;
    };

    $("#search-btn").click(()=> {
        let city= $("#floatingInput").val();
        console.log("City",city);
        search(city);
    });

});