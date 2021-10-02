import './styles/styles.scss';
import DOM from './DOM';
import Header from './components/Header';
import Home from './components/Home';
import WeatherInfo from './components/WeatherInfo';

const useFarenheit = false;

function convertTemps(K) {
  if (!useFarenheit) return Math.round(K - 273.15); // Celsius
  return Math.round((K - 273.15) * 1.8 + 32); // Farenheit
}

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
      status: data.weather[0].main,
      description,
      icon: data.weather[0].icon,
    },
    humidity: data.main.humidity,
    wind: data.wind,
  };

  return weather;
}

function clearOld() {
  if (DOM.searchErrorMsg()) DOM.searchErrorMsg().remove();
  if (DOM.results()) DOM.results().remove();
}

function displayNew(content) {
  DOM.root().insertAdjacentHTML('beforeend', content);
  DOM.results().style.display = 'flex';

  window.scrollTo({
    top: DOM.results().offsetTop,
    behavior: 'smooth',
  });
}

function displayError() {
  const msg = document.createElement('span');
  msg.id = 'search-error';
  msg.textContent = 'Something went wrong. Please try again.';
  DOM.form().appendChild(msg);
}

async function getWeather(location) {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d13e276e40e6955fbc29f1ef1bcd9857`;
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    const weather = processJSON(data);
    const content = WeatherInfo(weather, useFarenheit);
    clearOld();
    displayNew(content);
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
