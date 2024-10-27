function displayTemperature(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let weatherEmoji = document.querySelector("#weather-emoji");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let condition = response.data.condition.description.toLowerCase();
  if (condition.includes("cloud")) {
    weatherEmoji.innerHTML = "☁";
  } else if (condition.includes("rain")) {
    weatherEmoji.innerHTML = "🌧";
  } else if (condition.includes("snow")) {
    weatherEmoji.innerHTML = "❄";
  } else if (condition.includes("sunny")) {
    weatherEmoji.innerHTML = "☀";
  } else {
    weatherEmoji.innerHTML = "🌤";
  }
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function formatDate() {
  let now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

document.querySelector("#current-date").innerHTML = formatDate();
document.querySelector("#search-form").addEventListener("submit", search);
