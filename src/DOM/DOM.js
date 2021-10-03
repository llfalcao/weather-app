const DOM = (() => {
  const root = () => document.getElementById('root');
  const form = () => document.getElementById('search-bar');
  const searchErrorMsg = () => document.getElementById('search-error');
  const input = () => document.getElementById('location');
  const results = () => document.getElementById('results');
  const temperatures = () => document.getElementsByClassName('temperature');

  const updateTemperatures = (data) => {
    const elements = temperatures();
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].textContent = data[i];
    }
  };

  const tempUnits = () => document.getElementsByClassName('unit');
  const info = () => document.querySelector('.info__project');
  const infoBtn = () => document.getElementById('info__btn');
  const infoCredits = () => document.querySelector('.info__credits');
  const unitSwitchBtn = () => document.getElementById('results__switch-unit');
  const unitBtnTemp = () => document.querySelector('#results__switch-unit span');

  const switchUnitText = (useFarenheit) => {
    const mainUnit = useFarenheit ? 'F' : 'C';
    const elements = tempUnits();
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].textContent = mainUnit;
    }
    unitBtnTemp().textContent = useFarenheit ? 'C' : 'F';
  };

  return {
    info,
    infoBtn,
    form,
    infoCredits,
    input,
    results,
    root,
    searchErrorMsg,
    switchUnitText,
    unitSwitchBtn,
    unitBtnTemp,
    temperatures,
    updateTemperatures,
  };
})();

export default DOM;
