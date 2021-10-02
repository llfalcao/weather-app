const DOM = (() => {
  const root = () => document.getElementById('root');
  const form = () => document.getElementById('search-bar');
  const searchErrorMsg = () => document.getElementById('search-error');
  const input = () => document.getElementById('location');
  const results = () => document.getElementById('results');

  return {
    form,
    input,
    results,
    root,
    searchErrorMsg,
  };
})();

export default DOM;
