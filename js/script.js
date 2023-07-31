// Динамические часы с датой
const time = document.querySelector(".time");
const actualDate = document.querySelector(".date");
const date = new Date();
const options = { weekday: "long", month: "long", day: "numeric" };
let randomNum;

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-Gb");
  const currentDate = date.toLocaleDateString("en-Gb", options);
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  actualDate.textContent = currentDate;
  getTimeOfDay();
}
showTime();

// Приветствие
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

greeting.textContent = getTimeOfDay();

function showGreeting() {
  const date = new Date();
  const hours = date.getHours();
}

function getTimeOfDay() {
  const hours = date.getHours();
  if (18 <= hours && hours < 24) {
    return "evening";
  } else if (00 <= hours && hours < 6) {
    return "night";
  } else if (6 <= hours && hours < 12) {
    return "morning";
  } else if (12 <= hours && hours < 18) {
    return "afternoon";
  }
}

timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;
greeting.textContent = greetingText;
showGreeting();
showTime();

let currentCity = "";

function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
    } else {
    city.value = "Minsk";
  }
  getWeather(city.value);
}
window.addEventListener("load", getLocalStorage);

// 3.Слайдер

const body = document.querySelector("body");
// body.style.backgroundImage =
//   'url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/05.jpg")';

// 3.1 Функция вызова рандомного числа

function getRandomNum(min = 1, max = 21) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
getRandomNum();

// 3.2 Функция смены фона

function setBg() {
  const timeOfDay = getTimeOfDay();
  randomNum = getRandomNum(1, 20).toString().padStart(2, "0");
  const bgUrl =
    (body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg)`);
}
setBg();

// 3.3 Кнопки переключения слайдера
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

// Кнопка вперед
function getSlideNext() {
  timeOfDay = getTimeOfDay;
  if (randomNum < 20) {
    randomNum++;
  } else if (randomNum === 20) {
    return (randomNum = 1);
  }
  setBg(timeOfDay, randomNum);
  // console.log(randomNum, typeof randomNum);
}
getSlideNext();

// Кнопка  назад
function getSlidePrev() {
  timeOfDay = getTimeOfDay;
  if (randomNum > 1) {
    randomNum--;
  } else if (randomNum == 1) {
    return (randomNum = 20);
  }
  setBg(timeOfDay, randomNum);
  // console.log(randomNum, typeof randomNum);
}
getSlidePrev();

// Виджет погоды

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");

getLocalStorage() 

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=2001c4338d66373f5209323d8c79905a&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind speed: ${data.wind.speed}m/s`;
  weatherDescription.textContent = data.weather[0].description;
  
}
getWeather();

city.addEventListener("change", () => {
  getWeather(city.value);
});

// Цитаты дня
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const random = data[Math.floor(Math.random() * data.length)];
  quote.textContent = random.text;
  author.textContent = random.author;
}
getQuotes();

changeQuote.addEventListener("click", getQuotes);

// Аудиоплеер
let isPlay = false;
let track = document.querySelectorAll(".track");
const playNext = document.querySelector(".play-next");
const playPrev = document.querySelector(".play-prev");
const play = document.querySelector(".play");
const audio = document.querySelector("audio");

play.addEventListener("click", playAudio);

function playAudio() {
  audio.currentTime = 0;
  if (isPlay === false) {
    audio.play();
    isPlay = true;
    play.classList.toggle("pause");
  } else {
    audio.pause();
    isPlay = false;
    play.classList.toggle("pause");
  }
}

playNext.addEventListener("click", () => {
  track ++;
  play.classList.remove("pause");
  playAudio();
});

playPrev.addEventListener("click", () => {
  track --;
  play.classList.remove("pause");
  playAudio();
});
