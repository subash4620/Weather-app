window.addEventListener("load", function () {
  const nearbyCities = JSON.parse(localStorage.getItem('nearbyCities'));

  if (!nearbyCities || nearbyCities.length === 0) {
      document.getElementById('touristWeatherDisplay').innerHTML = 'No nearby tourist spots found.';
      return;
  }

  displayNearbyWeather(nearbyCities);
});

function displayNearbyWeather(nearbyCities) {
  const touristWeatherDisplay = document.getElementById('touristWeatherDisplay');
  touristWeatherDisplay.innerHTML = ''; 

  nearbyCities.forEach(city => {
      const suggestion = getWeatherSuggestion(city.weather[0].description);

      touristWeatherDisplay.innerHTML += `
          <div class="tourist-spot">
              <h3>${city.name}, ${city.sys.country}</h3>
              <p>Current Weather: ${city.weather[0].description}</p>
              <p>Temperature: ${Math.floor(city.main.temp)} °C</p>
              <p>Humidity: ${city.main.humidity}%</p>
              <p>${suggestion}</p>
          </div>
      `;
  });
}

function getWeatherSuggestion(weatherDescription) {
  if (weatherDescription.includes('clear')) {
      return "It's a great day to visit this tourist spot!";
  } else if (weatherDescription.includes('rain')) {
      return "It's rainy! You might want to carry an umbrella.";
  } else {
      return "Check the weather forecast before planning your visit.";
  }
}
