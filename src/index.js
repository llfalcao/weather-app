import './styles/styles.scss';
import Form from './components/Form';

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
    processJSON(data);
  } catch (e) {
    console.log(e);
  }
}

const root = document.getElementById('root');
root.insertAdjacentHTML('beforeend', Form());

const form = document.getElementById('search-bar');
const input = document.getElementById('location');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = input.value;

  if (location === '' || location === ' ') {
    return;
  }

  getWeather(location);
});
