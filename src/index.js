import './styles/styles.scss';
import DOM from './DOM';
import Header from './components/Header';
import Home from './components/Home';
import WeatherInfo from './components/WeatherInfo';

let useFarenheit = false;

// Convert weather codes into search terms for the Unsplash API
function handleWeatherCode(code) {
  switch (true) {
    case code >= 200 && code <= 232:
      return 'thunderstorm';
    case code >= 300 && code <= 321:
      return 'drizzle';
    case code >= 500 && code <= 531:
      return 'rain';
    case code >= 600 && code <= 622:
      return 'snow';
    case code >= 701 && code <= 781:
      return 'mist';
    case code === 800:
      return 'clear sky';
    case code >= 801 && code <= 802:
      return 'cloudy day';
    case code >= 803 && code <= 804:
      return 'cloudy night';
    default:
      return 'weather';
  }
}

// Display photo credits
function loadCredits(data) {
  const author = data.results[0].user.name;
  const link = data.results[0].links.html;
  let description = data.results[0].alt_description;
  description = description.substring(0, 1).toUpperCase() + description.substring(1);
  const content = `
    <p>
      "${description}" by
      <a href="${link}" target="_blank">${author}</a>
      on <a href="https://unsplash.com" target="_blank">Unsplash</a>
    </p>
  `;
  DOM.infoCredits().insertAdjacentHTML('beforeend', content);
}

// Consume Unsplash's API for relevant weather photos
async function loadBackground(code) {
  const query = handleWeatherCode(code);
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=1&collections="893395, 1445644, 10458672, 1738043"&client_id=TInbzLsY_YEcrMggPbvEUpiY8lmXlQvAdlc__BUEi1Y`;
  const response = await fetch(url);
  const data = await response.json();
  const imageURL = data.results[0].urls.regular;
  DOM.results().style.background = `url('${imageURL}') center / cover no-repeat`;
  loadCredits(data);
}

// Display errors related to the OpenWeatherMap API
function displayError() {
  const msg = document.createElement('span');
  msg.id = 'search-error';
  msg.textContent = 'Something went wrong. Please try again.';
  DOM.form().appendChild(msg);
}

// Remove old results before displaying the new ones
function clearOld() {
  if (DOM.searchErrorMsg()) DOM.searchErrorMsg().remove();
  if (DOM.results()) DOM.results().remove();
}

// Converts temperature from the desired unit
function convertTemps(value, unit) {
  if (unit === 'K') {
    // Celsius
    if (!useFarenheit) return Math.round(value - 273.15);
    // Farenheit
    return Math.round((value - 273.15) * 1.8 + 32);
  }
  if (unit === 'F') return Math.round(((value - 32) * 5) / 9);
  return Math.round(value * 1.8 + 32);
}

// Filter relevant fields
function processJSON(data) {
  const temperature = convertTemps(data.main.temp, 'K');
  const feelsLike = convertTemps(data.main.feels_like, 'K');
  const tempMin = convertTemps(data.main.temp_min, 'K');
  const tempMax = convertTemps(data.main.temp_max, 'K');

  let { description } = data.weather[0];
  description = description.substring(0, 1).toUpperCase() + description.substring(1);

  const weather = {
    city: data.name,
    country: data.sys.country,
    main: {
      temperature,
      feels_like: feelsLike,
      temp_min: tempMin,
      temp_max: tempMax,
    },
    weather: {
      id: data.weather[0].id,
      status: data.weather[0].main,
      description,
      icon: data.weather[0].icon,
    },
    humidity: data.main.humidity,
    wind: data.wind,
  };

  return weather;
}

// Consume OpenWeatherMap's API
async function getWeather(location) {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d13e276e40e6955fbc29f1ef1bcd9857`;
    const response = await fetch(url);
    const data = await response.json();
    const weather = processJSON(data);
    const content = WeatherInfo(weather, useFarenheit);
    clearOld();
    DOM.root().insertAdjacentHTML('beforeend', content);
    loadBackground(weather.weather.id);
    window.scrollTo({
      top: DOM.results().offsetTop,
      behavior: 'smooth',
    });
  } catch (e) {
    displayError();
  }
}

let unitName;
if (typeof localStorage.weatherwiz !== 'undefined') {
  const settings = JSON.parse(localStorage.weatherwiz);
  useFarenheit = settings.farenheit;
  if (useFarenheit) unitName = 'F';
  else unitName = 'C';
}

function toggleUnitName() {
  if (unitName === 'F') unitName = 'C';
  else unitName = 'F';
}

// Switch temperature units
function addUnitSwitchListener() {
  const btn = DOM.unitSwitchBtn();
  if (btn === null) return;

  btn.addEventListener('click', () => {
    useFarenheit = !useFarenheit;
    localStorage.weatherwiz = JSON.stringify({ farenheit: useFarenheit });
    const temperatures = DOM.temperatures();
    const converted = [];
    for (let i = 0; i < temperatures.length; i += 1) {
      converted.push(convertTemps(temperatures[i].textContent, unitName));
    }
    toggleUnitName();
    DOM.updateTemperatures(converted);
    DOM.switchUnitText(useFarenheit);
  });
}

const root = DOM.root();
root.insertAdjacentHTML('beforeend', Header);
root.insertAdjacentHTML('beforeend', Home);

const form = DOM.form();
const input = DOM.input();
// Handle Search
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = input.value;
  if (location === '' || location === ' ') {
    return;
  }
  getWeather(location).then(() => addUnitSwitchListener());
});

const infoBtn = DOM.infoBtn();
// Display photo credits
infoBtn.addEventListener('click', () => {
  const info = DOM.info();
  if (info.classList.contains('info__project--visible')) {
    info.classList.remove('info__project--visible');
    return;
  }
  info.classList.add('info__project--visible');
});
