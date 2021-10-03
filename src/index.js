import './styles/styles.scss';
import DOM from './DOM';
import Header from './components/Header';
import Home from './components/Home';
import WeatherInfo from './components/WeatherInfo';

const useFarenheit = false;

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

// Load photo relevant to the current weather as background
async function loadBackground(code) {
  const query = handleWeatherCode(code);
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=1&collections="893395, 1445644, 10458672, 1738043"&client_id=TInbzLsY_YEcrMggPbvEUpiY8lmXlQvAdlc__BUEi1Y`;
  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  const imageURL = await data.results[0].urls.regular;
  DOM.results().style.background = `url('${imageURL}') center / cover no-repeat`;
}

// Display weather API related errors
function displayError() {
  const msg = document.createElement('span');
  msg.id = 'search-error';
  msg.textContent = 'Something went wrong. Please try again.';
  DOM.form().appendChild(msg);
}

// Load search results
function displayNew(content) {
  DOM.root().insertAdjacentHTML('beforeend', content);
}

// Remove old results before displaying the new ones
function clearOld() {
  if (DOM.searchErrorMsg()) DOM.searchErrorMsg().remove();
  if (DOM.results()) DOM.results().remove();
}

function convertTemps(K) {
  if (!useFarenheit) return Math.round(K - 273.15); // Celsius
  return Math.round((K - 273.15) * 1.8 + 32); // Farenheit
}

// Filter relevant fields
function processJSON(data) {
  const temperature = convertTemps(data.main.temp);
  const feelsLike = convertTemps(data.main.feels_like);
  const tempMin = convertTemps(data.main.temp_min);
  const tempMax = convertTemps(data.main.temp_max);

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
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    const weather = processJSON(data);
    const content = WeatherInfo(weather, useFarenheit);
    clearOld();
    displayNew(content);
    await loadBackground(weather.weather.id);
    window.scrollTo({
      top: DOM.results().offsetTop,
      behavior: 'smooth',
    });
  } catch (e) {
    console.log(e);
    displayError();
  }
}

const root = DOM.root();
root.insertAdjacentHTML('beforeend', Header);
root.insertAdjacentHTML('beforeend', Home);

const form = DOM.form();
const input = DOM.input();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = input.value;

  if (location === '' || location === ' ') {
    return;
  }

  getWeather(location);
});
