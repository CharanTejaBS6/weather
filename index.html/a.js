const apiKey = "e948a304ddb85ceefa84ad1c6a86a45f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Use the image directly in the project folder
const defaultImageUrl = "./BingBack.jpeg";

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
  try {
    const resp = await fetch(url(city), { origin: "cros" });
    const respData = await resp.json();
    addWeatherToPage(respData);
  } catch (error) {
    console.error(error);
  }
}

function addWeatherToPage(data) {
  const temp = Ktoc(data.main.temp);

  // Use the BingBlack image for all weather conditions
  const weather = document.createElement("div");
  weather.classList.add("weather", "weather-box");
  weather.style.backgroundImage = `url(${defaultImageUrl})`;

  weather.innerHTML = `
      <h2>${temp}°C</h2>
      <small>${data.weather[0].description}</small>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    `;

  main.innerHTML = "";
  main.appendChild(weather);
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }
});
