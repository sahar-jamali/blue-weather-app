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

  celTemp = response.data.main.temp;
  city.innerHTML = response.data.name;
  country.innerHTML = response.data.sys.country;
  elementTemp.innerHTML = Math.round(celTemp);
  elementdescription.innerHTML = response.data.weather[0].main;
  elementFeels.innerHTML = Math.round(response.data.main.feels_like);
  elementWind.innerHTML = Math.round(response.data.wind.speed);
  elementHumidity.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", "response.data.weather[0].main");

  let currentTime = new Date();
  let timeElement = document.querySelector("#currentTime");
  timeElement.innerHTML = showTime(currentTime);
  let dayElement = document.querySelector("#currentDay");
  dayElement.innerHTML = showDay(currentTime);
  let dateElement = document.querySelector("#currentDate");
  dateElement.innerHTML = showDate(currentTime);
}
//Add a search engine, when searching for a city,
function searchCity(city) {
  let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
function changeCelToFar(event) {
  event.preventDefault();
  celDegree.classList.remove("active");
  farDegree.classList.add("active");
  farDegree.classList.remove("notActive");
  celDegree.classList.add("notActive");
  let elementTemp = document.querySelector("#show-temp");
  let farTemp = (celTemp * 9) / 5 + 32;
  elementTemp.innerHTML = Math.round(farTemp);
}
function changeFarToCel(event) {
  event.preventDefault();
  celDegree.classList.add("active");
  farDegree.classList.remove("active");
  farDegree.classList.add("notActive");
  celDegree.classList.remove("notActive");
  let elementTemp = document.querySelector("#show-temp");
  elementTemp.innerHTML = Math.round(celTemp);
}
let celTemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let current = document.querySelector("#currentBtn");
current.addEventListener("click", showCurrent);
let farDegree = document.querySelector("#farenheit");
farDegree.addEventListener("click", changeCelToFar);
let celDegree = document.querySelector("#celsius");
celDegree.addEventListener("click", changeFarToCel);
searchCity("Tehran");
