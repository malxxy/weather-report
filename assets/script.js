// Variable to wrap everything in jQuery

// // Store city
// $("#city").setItem.
// // Get latitude and longitude from city using open maps API

var weatherApiKey = "78785b54a90c1a313e4af8f23972a484"; // key #1
var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={${weatherApiKey}}`;
var weatherUrl2 = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={073286d3d6d5eda4c8c7cb9e0c3c94d5}"; // manually typed in key #2
// fetch open Weather API
fetch(weatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
  });