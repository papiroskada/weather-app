function displayTemp(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#currentTemp");
  let humidity = document.querySelector("#humidity");
  let city = document.querySelector("#city");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  city.innerHTML = response.data.name;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "24ff68a2822aceb5a863e8fd5e6c4e42";
let url = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
console.log(url);
axios.get(url).then(displayTemp);
