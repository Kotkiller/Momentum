
import playList from "./playList.js";

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
  let hours = date.getHours();
}

function getTimeOfDay() {
  let hours = date.getHours();
  if (24 <= hours && hours < 6) {
    return "night";
  } else if (6 <= hours && hours < 12) {
    return "morning";
  } else if (12 <= hours && hours < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

let timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;
greeting.textContent = greetingText;
// greeting.textContent = greetingTranslation[timeOfDay][english];
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
  let randomNum = getRandomNum(1, 20);
  const bgNum = randomNum.toString().padStart(2, "0");
  const image = new Image();
  const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  image.onload = () => {
    document.body.style.backgroundImage = `url(${url})`;
  };
  image.src = url;
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
}
getSlidePrev();

// Виджет погоды
const humiweatherError = document.querySelector('.weather-error');
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const weatherError = document.querySelector("weather-error");
city.value = "Minsk";
getLocalStorage();

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=2001c4338d66373f5209323d8c79905a&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (city.value == '') {
    humiweatherError.textContent = `Error! ${data.message}!`;
    weatherIcon.classList.remove(`owf`)
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
} else if (data.cod == '404') {
    humiweatherError.textContent = `Error! ${data.message}! for ${city.value}`;
    weatherIcon.classList.remove(`owf`)
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
} else {
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity.toFixed(0)}%`;
  wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)}m/s`;
  weatherDescription.textContent = data.weather[0].description;
}
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
let playNum = 0;
const playNext = document.querySelector(".play-next");
const playPrev = document.querySelector(".play-prev");
const play = document.querySelector(".play");
const playListItems = document.querySelector(".play-list");
const audio = new Audio();
// const progressBar = document.querySelector('#progress-bar');
const playItem = document.querySelector(".play-item");
const playItem1 = document.querySelector(".track1");
const playItem2 = document.querySelector(".track2");
const playItem3 = document.querySelector(".track3");
const playItem4 = document.querySelector(".track4");

playItem1.addEventListener("click", () => {
  audio.src = playList[0].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
  } else {
    audio.pause();
  }
  isPlay = !isPlay;
  play.classList.toggle("pause");
});

playItem2.addEventListener("click", () => {
  audio.src = playList[1].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
  } else {
    audio.pause();
  }
  isPlay = !isPlay;
  play.classList.toggle("pause");
});

playItem3.addEventListener("click", () => {
  audio.src = playList[2].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
  } else {
    audio.pause();
  }
  isPlay = !isPlay;
  play.classList.toggle("pause");
});

playItem4.addEventListener("click", () => {
  audio.src = playList[3].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
  } else {
    audio.pause();
  }
  isPlay = !isPlay;
  play.classList.toggle("pause");
});


play.addEventListener("click", playAudio);
playNext.addEventListener("click", playNextTrack);
playPrev.addEventListener("click", playPrevTrack);
audio.addEventListener("ended", () => playNextTrack());

audio.onended = function () {
  playNum == playList.length - 1 ? (playNum = 0) : (playNum += 1);
  this.src = playList[playNum].src;
  this.play();
  activeList();
};

// Играть/пауза

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (!isPlay) {
    isPlay = true;
    play.classList.add("pause");
    audio.play();
  } else {
    isPlay = false;
    play.classList.remove("pause");
    audio.pause();
  }
}
// Следующий трек

function playNextTrack() {
  playNum == playList.length - 1 ? (playNum = 0) : (playNum += 1);
  isPlay = false;
  playAudio();
 }

// Предыдущий трек

function playPrevTrack() {
  playNum == 0 ? (playNum = playList.length - 1) : (playNum -= 1);
  isPlay = false;
  playAudio();
}

// Фоновое АРI
async function getLink() {
  const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=9UYCh0FQCschjUmU4awSP2VCVoAJQvvb-K5q5ZRBNQI';
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  console.log(data.urls.regular)
  img.onload=()=>{
    document.body.style.backgroundImage = `url(${url})`;
  };
  img.src=url;
 }
 getLink();





