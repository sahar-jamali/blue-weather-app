// display the last updated (current) date and time
function showTime(date) {
  let min = date.getMinutes();
  let hour = date.getHours();
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
  city.innerHTML = response.data.name;
  let country = document.querySelector("#countryName");
  country.innerHTML = response.data.sys.country;
  let temprature = Math.round(response.data.main.temp);
  let elementTemp = document.querySelector("#show-temp");
  elementTemp.innerHTML = `${temprature}`;
  let description = response.data.weather[0].main;
  let elementdescription = document.querySelector("#description");
  elementdescription.innerHTML = `${description}`;
  let feels = Math.round(response.data.main.feels_like);
  let elementFeels = document.querySelector("#feels");
  elementFeels.innerHTML = `${feels}`;
  let wind = Math.round(response.data.wind.speed);
  let elementWind = document.querySelector("#windSpeed");
  elementWind.innerHTML = `${wind}`;
  let humidity = response.data.main.humidity;
  let elementHumidity = document.querySelector("#humidity");
  elementHumidity.innerHTML = `${humidity}`;
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
function handleSomthing(event) {
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
let inputCity = document.querySelector("#searchBtn");
inputCity.addEventListener("submit", handleSomthing);
let current = document.querySelector("#currentBtn");
current.addEventListener("click", showCurrent);
searchCity("New york");
