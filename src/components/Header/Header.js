import Form from '../Form';

const Header = () => `
  <header id="header">
    ${Form()}
    <ul>
      <li><a href="/places">Places</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="https://github.com/llfalcao" target="blank">GitHub</a></li>
    </ul>
  </header>
`;

export default Header;
