const WeatherInfo = (data, unit) => {
  const icon = `http://openweathermap.org/img/wn/${data.weather.icon}@4x.png`;

  const tempUnit = unit ? 'F' : 'C';

  return `
    <section id="results" class="row center">
      <div class="results__main">
        <div class="results__info col center">
          <p>${data.city}, ${data.country}</p>
          <div class="row">
            <span class="results__icon results__icon--weather row center">
              <img src="${icon}" />
            </span>
            <span>${data.main.temperature}</span>
            <span class="degree">º</span>
            <span>${tempUnit}</span>
          </div>
          <span class="results__description">${data.weather.description}</span>
        </div>

        <div class="results__small-block results__small-block--minmax row center">
          <div class="col center">
            <div class="row center">
              <span>${data.main.temp_min}</span>
              <span class="degree">º</span>
              <span>${tempUnit}</span>
            </div>
            <span>Min</span>
          </div>
          <span class="separator">-</span>
          <div class="col center">
            <div class="row center">
              <span>${data.main.temp_max}</span>
              <span class="degree">º</span>
              <span>${tempUnit}</span>
            </div>
            <span>Max</span>
          </div>
        </div>

        <span class=" results__small-block results__small-block--feelslike row center"
          >Feels like ${data.main.feels_like}<span class="degree">º</span>${tempUnit}</span
        >

        <div class="results__small-block results__small-block--humidity col center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-droplet"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            ${data.humidity}%</span
          >
          <span>Humidity</span>
        </div>

        <div class="results__small-block results__small-block--wind col center">
          <span>
            <svg
              class="wind-icon"
              transform="rotate(${(data.wind.deg - 90) * -1})"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 100 100"
              version="1.1"
              x="0px"
              y="0px"
              enable-background="new 0 0 100 100"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M80.628,94.921L50,66.378L19.372,94.921L50,5.03L80.628,94.921z M50,58.637l18,16.779l-18-52.83l-18.001,52.83L50,58.637z"
                />
                <polygon points="25.686,85.169 50,13.807 50,62.508  " />
              </g>
            </svg>
            ${data.wind.speed} m/s</span
          >
          <span>Wind</span>
        </div>
      </div>
    </section>
  `;
};

export default WeatherInfo;
