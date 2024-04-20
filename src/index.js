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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="row">
            <div class="col-2">
        <div class="weather-forecast-day">${day}</div> 
        <div class="weather-forecast-icon">
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" > 
        </div>
        <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">18° | </span><span class="weather-forecast-temperature-min">10°</span> 
            </div>
        </div>
        </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Stockholm");
displayForecast();
