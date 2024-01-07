const apiKey = "e948a304ddb85ceefa84ad1c6a86a45f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const iconBaseUrl = "http://openweathermap.org/img/wn/";
const iconExtension = "@2x.png";

const iconMap = {
  "01d": iconBaseUrl + "01d" + iconExtension,
  "01n": iconBaseUrl + "01n" + iconExtension,
  "02d": iconBaseUrl + "02d" + iconExtension,
  "02n": iconBaseUrl + "02n" + iconExtension,
  "03d": iconBaseUrl + "03d" + iconExtension,
  "03n": iconBaseUrl + "03n" + iconExtension,
  "04d": iconBaseUrl + "04d" + iconExtension,
  "04n": iconBaseUrl + "04n" + iconExtension,
  "09d": iconBaseUrl + "09d" + iconExtension,
  "09n": iconBaseUrl + "09n" + iconExtension,
  "10d": iconBaseUrl + "10d" + iconExtension,
  "10n": iconBaseUrl + "10n" + iconExtension,
  "11d": iconBaseUrl + "11d" + iconExtension,
  "11n": iconBaseUrl + "11n" + iconExtension,
  "13d": iconBaseUrl + "13d" + iconExtension,
  "13n": iconBaseUrl + "13n" + iconExtension,
  "50d": iconBaseUrl + "50d" + iconExtension,
  "50n": iconBaseUrl + "50n" + iconExtension,
  default: iconBaseUrl + "01d" + iconExtension, // Default to a specific icon
};

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

  const iconCode = data.weather[0].icon;
  const iconUrl = iconMap[iconCode] || iconMap.default;

  const weather = document.createElement("div");
  weather.classList.add("weather", "weather-box");
  weather.style.backgroundImage = `url(${iconUrl})`;

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
