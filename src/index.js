// display the last updated (current) date and time
function showTime(date) {
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${hour}:${min}`;
}
function showDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}
function showDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "september",
    "October",
    "November",
    "December",
  ];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
//showForcast
function formatDay(timestemp) {
  let date = new Date(timestemp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forcastElement = document.querySelector("#forcast");
  let forecast = response.data.daily;
  let forcastHTML = `<div class=row>`;
  forecast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col-3 forcastSection">
            <div class="weatherForcastDate">${formatDay(forcastDay.time)}</div>
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forcastDay.condition.icon
              }.png"
              alt=""
              width="40"
            />
            <div class="weatherForcastTemparture">
              <span class="max">${Math.round(
                forcastDay.temperature.maximum
              )}°</span> <span class="min">${Math.round(
          forcastDay.temperature.minimum
        )}°</span>
              <div class="weatherForcastDescription">${
                forcastDay.condition.description
              }</div>
            </div>
          </div>`;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function getForcast(city) {
  let apiKey = "20de7f3t60db8ob5dfafff8e7d436b82";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
//show temprature of city
function showTempature(response) {
  let city = document.querySelector("#cityName");
  let country = document.querySelector("#countryName");
  let elementTemp = document.querySelector("#show-temp");
  let elementdescription = document.querySelector("#description");
  let elementFeels = document.querySelector("#feels");
  let elementWind = document.querySelector("#windSpeed");
  let elementHumidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#weatherIcon");
  celTemp = response.data.temperature.current;
  city.innerHTML = response.data.city;
  country.innerHTML = response.data.country;
  elementTemp.innerHTML = Math.round(celTemp);
  elementdescription.innerHTML = response.data.condition.description;
  elementFeels.innerHTML = Math.round(response.data.temperature.feels_like);
  elementWind.innerHTML = Math.round(response.data.wind.speed);
  elementHumidity.innerHTML = response.data.temperature.humidity;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", "response.data.condition.icon");

  let currentTime = new Date();
  let timeElement = document.querySelector("#currentTime");
  timeElement.innerHTML = showTime(currentTime);
  let dayElement = document.querySelector("#currentDay");
  dayElement.innerHTML = showDay(currentTime);
  let dateElement = document.querySelector("#currentDate");
  dateElement.innerHTML = showDate(currentTime);

  getForcast(response.data.city);
}
//Add a search engine, when searching for a city,
function searchCity(city) {
  let apiKey = "20de7f3t60db8ob5dfafff8e7d436b82";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempature);
}
function handleSubmit(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-box").value;
  searchCity(newCity);
}
///current location
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempature);
}
function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
//cel to far and far to cel
function convertForecastToFar(city) {
  let apiKey = "20de7f3t60db8ob5dfafff8e7d436b82";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function changeCelToFar(event) {
  event.preventDefault();
  celDegree.classList.remove("active");
  farDegree.classList.add("active");
  farDegree.classList.remove("notActive");
  celDegree.classList.add("notActive");
  let elementTemp = document.querySelector("#show-temp");
  let farTemp = (celTemp * 9) / 5 + 32;
  elementTemp.innerHTML = Math.round(farTemp);
  let currentCity = document.getElementById("cityName").innerHTML;
  convertForecastToFar(currentCity);
}
function changeFarToCel(event) {
  event.preventDefault();
  celDegree.classList.add("active");
  farDegree.classList.remove("active");
  farDegree.classList.add("notActive");
  celDegree.classList.remove("notActive");
  let elementTemp = document.querySelector("#show-temp");
  elementTemp.innerHTML = Math.round(celTemp);
  let currentCity = document.getElementById("cityName").innerHTML;
  getForcast(currentCity);
}

let celTemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let current = document.querySelector("#currentBtn");
current.addEventListener("click", showCurrent);
searchCity("paris");
let farDegree = document.querySelector("#farenheit");
farDegree.addEventListener("click", changeCelToFar);
let celDegree = document.querySelector("#celsius");
celDegree.addEventListener("click", changeFarToCel);
