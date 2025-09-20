const apiKey = "YOUR_API_KEY_HERE"; // 🔑 Replace with your OpenWeatherMap API key

// Function: Get weather by city name
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetchWeather(url);
}

// Function: Get weather by user's location
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation not supported in this browser.");
  }
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function error() {
  alert("Unable to retrieve location.");
}

// Function: Fetch data from API
async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML = "❌ City not found!";
      return;
    }

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>☁ Condition: ${data.weather[0].description}</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      <p>📈 Humidity: ${data.main.humidity}%</p>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;

  } catch (error) {
    document.getElementById("weatherResult").innerHTML = "⚠ Error fetching data";
  }
}

