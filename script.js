const apiKey = '6d055e39ee237af35ca066f35474e9df';


window.addEventListener("load", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;

      fetchWeatherByCoords(lat, lon);
    });
  }
});

async function fetchWeatherByCoords(lat, lon) {
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  const weatherData = await weatherResponse.json();

  displayWeather(weatherData.name, weatherData.sys.country, weatherData.main.temp, weatherData.weather[0].description, weatherData.weather[0].icon);
}


async function getWeather() {
  const location = document.getElementById('locationInput').value;

  
  const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
  const geoData = await geoResponse.json();

  if (geoData.length === 0) {
    document.getElementById('weatherDisplay').innerHTML = 'Location not found.';
    return;
  }

  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  const weatherData = await weatherResponse.json();

  displayWeather(geoData[0].name, weatherData.sys.country, weatherData.main.temp, weatherData.main.humidity, weatherData.weather[0].description, weatherData.weather[0].icon);
}

function displayWeather(cityName, country, temp, humidity, description, iconCode) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  weatherDisplay.innerHTML = `
    <h3>Weather in ${cityName}, ${country}</h3>
    <p>Temperature: ${Math.floor(temp)} °C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Weather: ${description}</p>
    <img src="https://openweathermap.org/img/wn/${iconCode}.png" style="height:10rem" />
  `;
}

async function getTouristWeather() {
  const location = document.getElementById('locationInput').value;

  const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
  const geoData = await geoResponse.json();

  if (geoData.length === 0) {
    document.getElementById('weatherDisplay').innerHTML = 'Location not found.';
    return;
  }

  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  const nearbyResponse = await fetch(`http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=metric`);
  const nearbyData = await nearbyResponse.json();

  localStorage.setItem('nearbyCities', JSON.stringify(nearbyData.list));
  window.location.href = 'tourist.html';
}
