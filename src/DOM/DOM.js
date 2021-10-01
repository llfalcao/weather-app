const DOM = (() => {
  const root = () => document.getElementById('root');
  const form = () => document.getElementById('search-bar');
  const input = () => document.getElementById('location');

  return { root, form, input };
})();

export default DOM;
