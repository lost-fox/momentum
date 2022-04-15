//**************Local Storage ********************/
function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
  localStorage.setItem("hide", hide);
  localStorage.setItem("show", show);
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
    getWeather();
  }
  if (localStorage.getItem("hide")) {
    hide = localStorage.getItem("hide");
    getWidgetLocal();
  }
  if (localStorage.getItem("show")) {
    show = localStorage.getItem("show");
    getWidgetLocal();
  }
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

//******************** Language **********/

const greetingTranslation = {
  en: {
    gret: ["Good morning", "Good afternoon", "Good evening", "Good night"],
    langDate: "en-En",
    lang: "en",
    wind: "Wind speed",
    humidity: "Humidity",
    units: "m/s",
    placeholder: "[Enter name]",
    widget: ["Player", "ToDo", "Weather", "Time", "Date", "Greeting", "Quote"],
    sourse: "Sourse",
    search: "Tag",
  },
  ru: {
    gret: ["Доброе утро", "Добрый день", "Добрый вечер", "Спокойной ночи"],
    langDate: "ru-Ru",
    lang: "ru",
    wind: "Скорость ветра",
    humidity: "Влажность",
    units: "м/с",
    placeholder: "[Введите имя]",
    widget: [
      "Плеер",
      "Задачи",
      "Погода",
      "Время",
      "Дата",
      "Приветствие",
      "Цитата",
    ],
    sourse: "Источник",
    search: "Тег",
  },
};
const languageSwitch = document.querySelector(".switch");
const checkLanguage = document.querySelector(".check-language");

let language = greetingTranslation.en;
let isChecked = true;

function getLanguage() {
  checkLanguage.checked = isChecked;
  if (!isChecked) {
    language = greetingTranslation.en;
    isChecked = true;
  } else {
    language = greetingTranslation.ru;
    isChecked = false;
  }

  getGreetind();
  getWeather();
  getQuotes();
  getItemWindow();

  console.log(language);
}
checkLanguage.addEventListener("click", getLanguage);

//**************Time ********************/

const time = document.querySelector(".time");
const date = document.querySelector(".date");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
}

function showDate() {
  const dateNew = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = dateNew.toLocaleDateString(language.langDate, options);
  date.textContent = currentDate;
}

showTime();
showDate();

//************** Greetings ********************/
const greetingContainer = document.querySelector(".greeting-container");
const greetind = document.querySelector(".greeting");
const timeOfDay = getTimeofDay();
const name = document.querySelector(".name");

function getGreetind() {
  greetind.textContent = `${language.gret[getNumberofDay()]}`;
  name.placeholder = `${language.placeholder}`;
}

getGreetind();

function getTimeofDay() {
  const dateNow = new Date();
  const hours = dateNow.getHours();

  if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours <= 17) {
    return "afternoon";
  } else if (hours >= 18 && hours <= 23) {
    return "evening";
  } else {
    return "night";
  }
}

function getNumberofDay() {
  const dateNow = new Date();
  const hours = dateNow.getHours();

  if (hours >= 6 && hours < 12) {
    return 0;
  } else if (hours >= 12 && hours <= 17) {
    return 1;
  } else if (hours >= 18 && hours <= 23) {
    return 2;
  } else {
    return 3;
  }
}

//************** Background Image ********************/
const body = document.querySelector("body");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const bgNum = getRandomNum().toString().padStart(2, "0");

let numberImade;

function getRandomNum() {
  return Math.floor(Math.random() * (1 - 20) + 20);
}

function changeBg() {
  switch (select.value) {
    case "1":
      setBg();
      break;
    case "2":
      getLinkUnsplash();
      break;
    case "3":
      getLinkFlickr();
      break;
  }
}

console.log(localStorage.getItem("selectValue"));

function setBg(number) {
  const img = new Image();
  if (number === undefined) {
    numberImade = bgNum;
  } else {
    numberImade = number.toString().padStart(2, "0");
  }
  img.src = `https://raw.githubusercontent.com/lost-fox/stage1-tasks/assets/images/${timeOfDay}/${numberImade}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/lost-fox/stage1-tasks/assets/images/${timeOfDay}/${numberImade}.jpg')`;
  };

  console.log(
    `url('https://raw.githubusercontent.com/lost-fox/stage1-tasks/assets/images/${timeOfDay}/${numberImade}.jpg')`
  );
}

const tag = document.querySelector(".tag-search");
tag.addEventListener('change',changeBg)

function getTeg() {
  if (tag.value) {
    return tag.value;
  } else {
    getTimeofDay();
  }
}

async function getLinkUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTeg()}&client_id=v7IhgDwgZA3PvzYY1Zk5LqhUJRhtCGV_vpu2QV-PtMg`;
  const res = await fetch(url);
  const data = await res.json();
  body.style.backgroundImage = `url(${data.urls.regular})`;
  console.log(data.urls.regular);
}

async function getLinkFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=239ca7461f872c18f03c5c5f72c41cfe&tags=${getTeg()}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  body.style.backgroundImage = `url(${
    data.photos.photo[getRandomNum()].url_l
  })`;
  console.log(data.photos.photo[0].url_l);
}

let randomNum = bgNum;
function getSlideNext() {
  if (select.value == "1") {
    if (randomNum < 20) {
      randomNum++;
    } else {
      randomNum = 1;
    }
    setBg(randomNum);
  } else if (select.value == "2") {
    getLinkUnsplash();
  } else {
    getLinkFlickr();
  }
}

function getSlidePrev() {
  if (select.value == "1") {
    if (randomNum > 1) {
      randomNum--;
    } else {
      randomNum = 20;
    }
    setBg(randomNum);
  } else if (select.value == "2") {
    getLinkUnsplash();
  } else {
    getLinkFlickr();
  }
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

//************** Weather ********************/
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language.lang}&appid=09ed4fb92ca263ac6de5789b15a4d63b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (city.value === "" || data.cod == "404") {
    alert("Error! Enter the correct city! ");
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = `Error`;
    weatherDescription.textContent = `Error`;
    wind.textContent = `${language.wind}: Error ${language.units}`;
    humidity.textContent = `${language.humidity}: Error %`;
  } else {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${language.wind}: ${Math.round(data.wind.speed)} ${
      language.units
    }`;
    humidity.textContent = `${language.humidity}: ${Math.round(
      data.main.humidity
    )} %`;
  }
}

function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
    setLocalStorage();
  }
}
document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
getWeather();

//************** Quotes ********************/
const quoteContainer = document.querySelector(".quote-container");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  let randomQuote = getRamdomQuotes();
  const quotes = `js/data-${language.lang}.json`;
  const res = await fetch(quotes);
  const data = await res.json();

  quote.textContent = data[randomQuote].text;
  author.textContent = data[randomQuote].author;
}

function getRamdomQuotes() {
  return Math.floor(Math.random() * (0 - 15) + 15);
}

getQuotes();
changeQuote.addEventListener("click", getQuotes);

//************** Audio ********************/
import playList from "./playList.js";
const playButton = document.querySelector(".play");
const playNextButton = document.querySelector(".play-next");
const playPrevButton = document.querySelector(".play-prev");
const playlist = document.querySelector(".play-list");

let isPlay = false;
let playNum = 0;

const audio = new Audio();
function playAudio() {
  playlist.childNodes[playNum].classList.add("item-active");
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    playButton.classList.add("pause");
  } else {
    audio.pause();
    isPlay = false;
    playButton.classList.remove("pause");
  }
  getLengthSong();
  getNameSong();
  audio.onended = function () {
    getPlayNext();
  };
}

function getPlayNext() {
  playlist.childNodes[playNum].classList.remove("item-active");
  isPlay = false;
  if (playNum < playList.length - 1) {
    playNum++;
  } else {
    playNum = 0;
  }
  playAudio(playNum);
  getLengthSong(playNum);
}

function getPlayPrev() {
  playlist.childNodes[playNum].classList.remove("item-active");
  isPlay = false;
  if (playNum > 0) {
    playNum--;
  } else {
    playNum = playList.length - 1;
  }
  playAudio(playNum);
  getLengthSong(playNum);
}

for (let i = 0; i < playList.length; i++) {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = playList[i].title;
  playlist.append(li);
}

playButton.addEventListener("click", playAudio);
playNextButton.addEventListener("click", getPlayNext);
playPrevButton.addEventListener("click", getPlayPrev);

//**************** Player ********************/
const player = document.querySelector(".player");
const audioPlayer = document.querySelector(".audioplayer");
const lengthSong = document.querySelector(".length");
const nameSong = document.querySelector(".name-play");
const timeline = document.querySelector(".timeline");
const playBtn = audioPlayer.querySelector(".toggle-play");
const volumeEl = audioPlayer.querySelector(".volume-button");
const volume = audioPlayer.querySelector(".vol");
const volumeSlider = audioPlayer.querySelector(".volume-slider");

let isVolume = false;

function getLengthSong() {
  lengthSong.textContent = playList[playNum].duration;
}

function getNameSong() {
  nameSong.textContent = playList[playNum].title;
}

timeline.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

function playerPlay() {
  if (!isPlay) {
    playBtn.classList.remove("play-player");
    playBtn.classList.add("pause-player");
    playAudio();
  } else {
    playBtn.classList.remove("pause-player");
    playBtn.classList.add("play-player");
    playAudio();
  }
}

setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  audioPlayer.querySelector(".current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

function volumeSong() {
  if (!isVolume) {
    volume.classList.remove("volume");
    volume.classList.add("mute");
    isVolume = true;
    audio.muted = true;
  } else {
    volume.classList.add("volume");
    volume.classList.remove("mute");
    isVolume = false;
    audio.muted = false;
  }
}

volumeSlider.addEventListener(
  "click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".volume-percentage").style.width =
      newVolume * 100 + "%";
  },
  false
);

playBtn.addEventListener("click", playerPlay);
volumeEl.addEventListener("click", volumeSong);

//************** Setting ********************/
const setting = document.querySelector(".setting");
const todo = document.querySelector(".todo");
const modal = document.querySelector(".modal");
const widgetItemName = document.querySelectorAll(".widget-item__name");
const widgetItemCheck = document.querySelectorAll(".widget-item__check");
const bgItemText = document.querySelector(".text__bgitem");
const searchText = document.querySelector(".search-bgitem__text");
const searchImage = document.querySelector(".search-bgitem");
const select = document.querySelector("select");

if (localStorage.getItem("selectValue") != 1) {
  select.value = localStorage.getItem("selectValue");
} else {
  select.value = 1;
}

function getSelect() {
  if (select.value == 1) {
    searchImage.style.opacity = 0;
  } else {
    searchImage.style.opacity = 1;
  }
  localStorage.setItem("selectValue", select.value);
  changeBg();
}

getSelect();

let widget = [
  "player",
  "language",
  "weather",
  "time",
  "date",
  "greeting",
  "quote",
];
let isOpen = false;
function modalWindow() {
  if (!isOpen) {
    modal.style.display = "flex";
    isOpen = true;
  } else {
    modal.style.display = "none";
    isOpen = false;
  }
}

function getItemWindow() {
  for (let i = 0; i < widget.length; i++) {
    widgetItemName[i].textContent = language.widget[i];
  }
  bgItemText.textContent = language.sourse;
  searchText.textContent = language.search;
}
getItemWindow();

let hide;
let show;

if (localStorage.getItem("show") == []) {
  widgetItemCheck.forEach((e) => (e.checked = true));
}

function getWidgetLocal() {
  if (!localStorage.getItem("show") || !localStorage.getItem("hide")) {
    hide = [];
    show = [];
    isShow();
  } else {
    hide = localStorage.getItem("hide");
    hide = hide.split(",");
    show = localStorage.getItem("show");
    show = show.split(",");
    for (let i = 0; i < show.length; i++) {
      widgetItemCheck[show[i]].checked = true;
    }
    showHide();
  }
}

function showHide() {
  for (let i = 0; i < hide.length; i++) {
    switch (hide[i].toString()) {
      case "0":
        player.style.opacity = 0;
        player.style.transition = `opacity 0.5s ease-out`;
        break;
      case "1":
        todo.style.opacity = 0;
        todo.style.transition = `opacity 0.5s ease-out`;
        break;
      case "2":
        weather.style.opacity = 0;
        weather.style.transition = `opacity 0.5s ease-out`;
        break;
      case "3":
        time.style.opacity = 0;
        time.style.transition = `opacity 0.5s ease-out`;
        break;
      case "4":
        date.style.opacity = 0;
        date.style.transition = `opacity 0.5s ease-out`;
        break;
      case "5":
        greetingContainer.style.opacity = 0;
        greetingContainer.style.transition = `opacity 0.5s ease-out`;
        break;
      case "6":
        quoteContainer.style.opacity = 0;
        quoteContainer.style.transition = `opacity 0.5s ease-out`;
        break;
    }
  }

  for (let i = 0; i < show.length; i++) {
    switch (show[i].toString()) {
      case "0":
        player.style.opacity = 1;
        break;
      case "1":
        todo.style.opacity = 1;
        break;
      case "2":
        weather.style.opacity = 1;
        break;
      case "3":
        time.style.opacity = 1;
        break;
      case "4":
        date.style.opacity = 1;
        break;
      case "5":
        greetingContainer.style.opacity = 1;
        break;
      case "6":
        quoteContainer.style.opacity = 1;
        break;
    }
  }
}

function isShow() {
  hide = [];
  show = [];
  for (let i = 0; i < widget.length; i++) {
    if (!widgetItemCheck[i].checked) {
      hide.push(i);
      widgetItemCheck[i].checked = false;
    } else {
      show.push(i);
      widgetItemCheck[i].checked = true;
    }
  }

  showHide();
  setLocalStorage();
}

//isShow();
getWidgetLocal();
setting.addEventListener("click", modalWindow);
widgetItemCheck.forEach((check) => check.addEventListener("change", isShow));
widgetItemCheck.forEach((check) =>
  check.addEventListener("change", setLocalStorage)
);
select.addEventListener("change", getSelect);

//************************Todo**************/

const modalTodo = document.querySelector(".modal-todo");
const buttonTodo = document.querySelector(".task__button");
const listTodo = document.querySelector("#list__todo");
const valueTextarea = document.querySelector(".form__todo");

function Task(description) {
  this.description = description;
  this.completed = false;
  this.important = false;
}

let isOpenTodo = false;

function showTodo() {
  if (!isOpenTodo) {
    modalTodo.style.display = "flex";
    isOpenTodo = true;
  } else {
    modalTodo.style.display = "none";
    isOpenTodo = false;
  }
}

function getTask() {
  listTodo.innerHTML += `<div class="task-item">
  <input type = "checkbox" class="task-item__check">
  <div class="tast-item__name">${valueTextarea.value}</div>
  </div>`;

  valueTextarea.value = "";
}

valueTextarea.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    getTask();
  }
});

todo.addEventListener("click", showTodo);
buttonTodo.addEventListener("click", getTask);


console.log('При первом запуске все виджеты скртыты. Перейди в настройки чтобы выбрать что отобразить или перезагрузи страницу! Спасибо!')