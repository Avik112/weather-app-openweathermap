const API_KEY = ''; 

function displayWeather(data) {
  const weatherDiv = document.getElementById('weatherDisplay');

  if (data.cod !== 200) {
    weatherDiv.innerHTML = `<p>❌ ${data.message}</p>`;
    return;
  }

  weatherDiv.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ Temp: ${Math.round(data.main.temp)}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
  `;
}

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(err => {
      console.error(err);
      alert('Error fetching weather data for city.');
    });
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => displayWeather(data))
      .catch(err => {
        console.error(err);
        alert('Error fetching weather data based on your location.');
      });
  });
}
