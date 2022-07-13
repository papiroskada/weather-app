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
function displayTemp(response) {
  let currentTemp = document.querySelector("#currentTemp");
  let humidity = document.querySelector("#humidity");
  let city = document.querySelector("#city");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  currentTemp.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = "24ff68a2822aceb5a863e8fd5e6c4e42";
let city = "Kyiv";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(url);
axios.get(url).then(displayTemp);
