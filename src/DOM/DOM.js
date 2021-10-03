const DOM = (() => {
  const root = () => document.getElementById('root');
  const form = () => document.getElementById('search-bar');
  const searchErrorMsg = () => document.getElementById('search-error');
  const input = () => document.getElementById('location');
  const results = () => document.getElementById('results');
  const info = () => document.querySelector('.info__project');
  const infoBtn = () => document.getElementById('info__btn');
  const infoCredits = () => document.querySelector('.info__credits');

  return {
    info,
    infoBtn,
    form,
    infoCredits,
    input,
    results,
    root,
    searchErrorMsg,
  };
})();

export default DOM;
