function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector(
    "#weather-current-description"
  );
  let humidityElement = document.querySelector("#weather-app-humidity");
  let windElement = document.querySelector("#weather-app-wind");
  let dateElement = document.querySelector("#current-date-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-app-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"</img>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "8eatdeae3d0b8e63a64512c0d2f3a54o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
  searchInput.value = "";
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "8eatdeae3d0b8e63a64512c0d2f3a54o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="row">
            <div class="col-2">
        <div class="weather-forecast-day">${formatDay(day.time)}</div> 
        <div>
            <img  class="weather-forecast-icon" src="${
              day.condition.icon_url
            }" > 
        </div>
        <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${Math.round(
              day.temperature.maximum
            )}° | </span><span class="weather-forecast-temperature-min">${Math.round(
          day.temperature.minimum
        )}°</span> 
            </div>
        </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Stockholm");
