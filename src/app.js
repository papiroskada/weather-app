function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function getForecast(coordinates) {
  let APIkey = `24ff68a2822aceb5a863e8fd5e6c4e42`;

  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIkey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function displayTemp(response) {
  let currentTemp = document.querySelector("#currentTemp");
  let humidity = document.querySelector("#humidity");
  let city = document.querySelector("#city");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(celciusTemp);
  description.innerHTML = response.data.weather[0].description;
  city.innerHTML = response.data.name;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "24ff68a2822aceb5a863e8fd5e6c4e42";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  search(cityInput.value);
}

function changeUnits(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  let farenheiTemp = (celciusTemp * 9) / 5 + 32;
  celciusTempElement.classList.remove("active");
  farenheitchanging.classList.add("active");
  tempElement.innerHTML = Math.round(farenheiTemp);
}
function defaultUnit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(celciusTemp);
  celciusTempElement.classList.add("active");
  farenheitchanging.classList.remove("active");
}

function displayForecast(response) {
  let forecastData = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        ` 
          <div class="col-2 weather-forecast-day" >
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="clear"
              class="forecast-icon"
            />
            <div class="forecast-temp">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}??</span>
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}??</span>
            </div> </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";

  let apiKey = `24ff68a2822aceb5a863e8fd5e6c4e42`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayTemp);
}

let celciusTemp = null;
let form = document.querySelector("#searching-form");
form.addEventListener("submit", handleSubmit);

let farenheitchanging = document.querySelector("#convert-to-F");
farenheitchanging.addEventListener("click", changeUnits);

let celciusTempElement = document.querySelector("#celsiusTemp");
celciusTempElement.addEventListener("click", defaultUnit);
search("Kyiv");

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", findLocation);
