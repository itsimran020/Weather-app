let input = document.querySelector("#input");
let img = document.querySelector("#img");
let temp = document.querySelector(".temp h1");
let cityName = document.querySelector(".temp p");
let speed = document.querySelector("#speed");
let humi = document.querySelector("#humidity");
let searchBtn = document.querySelector("#search");
let key = "cf4de94ec4f37c898068ed4fcae849aa";
let lat_lon = "https://api.openweathermap.org/geo/1.0/direct?q=";
let mainApi = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

document.addEventListener("DOMContentLoaded", async function () {
  mainFun();

  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      mainFun();
    }
  });

  searchBtn.addEventListener("click", async () => {
    mainFun();
  });
});

const mainFun = async () => {
  let api1 = await fetch(`${lat_lon}${input.value}&appid=${key}`);
  let api1Response = await api1.json();
  let lat = api1Response[0].lat;
  let lon = api1Response[0].lon;

  let api2 = await fetch(`${mainApi}&lat=${lat}&lon=${lon}&appid=${key}`);
  let response = await api2.json();

  let temperature = Math.round(response.main.temp);
  let humidity = Math.round(response.main.humidity);
  let wind = Math.round(response.wind.speed);
  let name = response.name;
  let weather = response.weather[0].main;
  console.log(temperature, humidity, wind, name, weather);
  updateElements(temperature, humidity, wind, name, weather);
};

const updateElements = (temperature, humidity, wind, name, weather) => {
  temp.innerHTML = `${temperature} ℃`;
  cityName.innerHTML = name;
  speed.innerHTML = `${wind} km/h`;
  humi.innerHTML = `${humidity} %`;
  if (weather == "Clear") {
    img.src = "/images/clear.png";
  } else if (weather == "Clouds") {
    img.src = "/images/clouds.png";
  } else if (weather == "Drizzle") {
    img.src = "/images/drizzle.png";
  } else if (weather == "Mist") {
    img.src = "/images/mist.png";
  } else if (weather == "Rain") {
    img.src = "/images/rain.png";
  } else if (weather == "Snow") {
    img.src = "/images/snow.png";
  }
};
