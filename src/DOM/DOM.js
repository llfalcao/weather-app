const DOM = (() => {
  const root = () => document.getElementById('root');
  const form = () => document.getElementById('search-bar');
  const input = () => document.getElementById('location');
  const home = () => document.getElementById('home');

  return {
    form,
    home,
    input,
    root,
  };
})();

export default DOM;
