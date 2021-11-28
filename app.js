//

//console.log("checking");
// (developer.accuweather.com) this is the api from which i am fetched my data
const heading = document.querySelector(".main-head");
const temperature = document.querySelector(".temperature");
const iconImg = document.querySelector(".icon");
const des = document.querySelector(".discription");
const hum = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const form = document.querySelector("form");
const bg = document.querySelector(".background");
const p = document.querySelector("p");
const line = document.querySelector(".line");
let city;

const apiKey = "E99zmmmutPiFo5mWbyOMxtGa7XKvdQFW"; //this is my api key which accuweather gave in a reult of creating my app
const getCity = async (city) => {
  const base = `https://dataservice.accuweather.com/locations/v1/cities/search`;
  const query = `?apikey=${apiKey}&q=${city}`;
  const response = await fetch(base + query);
  const cityData = await response.json();

  return cityData[0];
  // 0 th index wali key ko ham prefer krengy hamesha
};
const getWeather = async (cityKey) => {
  const base = `https://dataservice.accuweather.com/currentconditions/v1/`;
  const query = `${cityKey}?apikey=${apiKey}&details=true`;
  const response = await fetch(base + query);
  const weatherDetails = await response.json();

  return weatherDetails;
  //console.log(weatherDetails);
};

const displayWeather = (weatherDetails) => {
  const {
    WeatherText,
    WeatherIcon,
    IsDayTime,
    Temperature,
    RelativeHumidity,
    Wind,
  } = weatherDetails[0];

  console.log(
    city,
    WeatherText,
    WeatherIcon,
    IsDayTime,
    Temperature.Metric.Value,
    RelativeHumidity,
    Wind.Speed.Metric.Value
  );

  // --------------------- send this data in our dom
  heading.innerHTML = city;
  temperature.innerHTML = `${Temperature.Metric.Value}&deg;C`;
  iconImg.innerHTML = `<img src="./weather icons/${WeatherIcon}.png" alt="icon">`;
  // day/night condition
  let display;
  if (IsDayTime == true) {
    display = "Day";
    bg.style.background =
      "url(./images/day1.jpeg) no-repeat right bottom/cover";
    p.style.color = "goldenrod";
    line.style.backgroundColor = "goldenrod";
  } else {
    display = "Night";
    bg.style.background =
      "url(./images/night.jpeg) no-repeat center center/cover";
    p.style.color = "black";
    line.style.backgroundColor = "black";
  }

  des.innerHTML = `<span>${WeatherText}</span> <span>${display}</span>`;
  hum.innerHTML = `Humidity :  ${RelativeHumidity} %`;
  wind.innerHTML = `Wind : ${Wind.Speed.Metric.Value} km/h`;
  const weather = document.querySelector(".weather");
  weather.style.display = "block";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  city = e.target.search.value;
  form.reset();
  getCity(city)
    .then((data) => {
      return getWeather(data.Key);
    })
    .then((weatherDetails) => {
      return displayWeather(weatherDetails);
    })
    .catch((err) => {
      console.log(err);
    });
});
