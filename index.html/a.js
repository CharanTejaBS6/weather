const apiKey = "e948a304ddb85ceefa84ad1c6a86a45f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const iconMap = {
    "01d":
      "https://th.bing.com/th/id/OIG.Y7hTveYbM8CgTgRVLO1c?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "01n":
      "https://th.bing.com/th/id/OIG.Fcjg.230ycMBTGJygkQs?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "02d":
      "https://th.bing.com/th/id/OIG.tE.BPgAzdojUgCX14htW?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "02n":
      "https://th.bing.com/th/id/OIG.dpC27ptwC7fvER1rc2MD?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "03d":
      "https://th.bing.com/th/id/OIG.u5T70.bc5VW7bWacTZmL?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "03n":
      "https://th.bing.com/th/id/OIG.qWhrrhi4PqWnSJOPi6r2?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "04d": "https://th.bing.com/th/id/OIG.UtrjcNvngHbaANLI762Z?pid=ImgGn",
    "04n":
      "https://th.bing.com/th/id/OIG.FUb9P8E5xi01sxZNazoB?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "09d":
      "https://th.bing.com/th/id/OIG.TzgfIziXZPS0bqMUHJbm?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "09n":
      "https://th.bing.com/th/id/OIG.htZKPziPBOnPTSrTkXUb?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "10d":
      "https://th.bing.com/th/id/OIG.4KhCeQ8SAyP2TPQ3zq4_?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "10n":
      "https://th.bing.com/th/id/OIG.2N8_thYcGYwBojrsnSdy?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "11d":
      "https://th.bing.com/th/id/OIG.d8H65BQt3YCjC1137fgt?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "11n":
      "https://th.bing.com/th/id/OIG.Fk2ngbQzINxG.HFZ6xWR?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "13d":
      "https://th.bing.com/th/id/OIG.GxiSEaNq3Yu.YolhTNja?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "13n":
      "https://th.bing.com/th/id/OIG.cpFpqx5HayQNSc.Uru96?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "50d":
      "https://th.bing.com/th/id/OIG.D6UAJiW2PRlA49rw9VdE?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    "50n":
      "https://th.bing.com/th/id/OIG.iHb3bXgvfls8CNfsgu.0?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
    default:
      "https://th.bing.com/th/id/OIG.BoPSqlmoUExcgIHQUSIh?w=270&h=270&c=6&r=0&o=5&dpr=3&pid=ImgGn",
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
  weather.classList.add("weather", "weather-box"); // Add "weather-box" class
  weather.style.backgroundImage = `url(${iconUrl})`; // Set the background image

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



