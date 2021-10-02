import './styles/styles.scss';
import DOM from './DOM';
import Header from './components/Header';
import Home from './components/Home';

function displayError() {
  const msg = document.createElement('span');
  msg.id = 'search-error';
  msg.textContent = 'Something went wrong. Please try again.';

  DOM.form().appendChild(msg);
}

function processJSON(data) {
  const description = data.weather[0].description.substring(0, 1).toUpperCase()
    + data.weather[0].description.substring(1);

  const weather = {
    city: data.name,
    main: data.weather[0].main,
    description,
    wind: data.wind,
  };

  return weather;
}

async function getWeather(location) {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d13e276e40e6955fbc29f1ef1bcd9857`;
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    const weather = processJSON(data);
    console.log(weather);
  } catch (e) {
    displayError();
  }
}

const root = DOM.root();
root.insertAdjacentHTML('beforeend', Header());
root.insertAdjacentHTML('beforeend', Home());

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
