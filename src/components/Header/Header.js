import Form from '../Form';

const Header = () => `
  <header id="header" class="row center">
    <div id="brand" class="col center">
      <svg class="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        x="0px"
        y="0px"
      >
        <title>WeatherApp</title>
        <g data-name="Layer 3">
          <path d="M13,38.5a2,2,0,0,0,4,0,15,15,0,0,1,30,0,2,2,0,0,0,4,0,19,19,0,0,0-38,0Z" />
          <path d="M32,8.5a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0v-4A2,2,0,0,0,32,8.5Z" />
          <path
            d="M15.5322,20.9268a2,2,0,0,0,3.1358-2.4825l-2.4834-3.1357a2,2,0,0,0-3.1358,2.4824Z"
          />
          <path
            d="M48.4678,20.9268l2.4834-3.1358a2,2,0,0,0-3.1358-2.4824L45.332,18.4443a2,2,0,0,0,3.1358,2.4825Z"
          />
          <path
            d="M11.1284,31.5449a2,2,0,0,0-1.2651-2.5293L6.0684,27.751a2,2,0,0,0-1.2647,3.7949l3.7949,1.2646A1.9992,1.9992,0,0,0,11.1284,31.5449Z"
          />
          <path
            d="M55.4014,32.8105l3.7949-1.2646a2,2,0,0,0-1.2647-3.7949l-3.7949,1.2646a2,2,0,0,0,1.2647,3.7949Z"
          />
          <path
            d="M37.5859,45.0859,32,50.6719l-5.5859-5.586A2,2,0,0,0,25,44.5H7a2,2,0,0,0,0,4H24.1714l6.4145,6.4141a1.9995,1.9995,0,0,0,2.8282,0L39.8286,48.5H56a2,2,0,0,0,0-4H39A2,2,0,0,0,37.5859,45.0859Z"
          />
        </g>
      </svg>
      <span>Company Name</span>
    </div>
    ${Form()}
    <nav class="nav row center">
      <a href="/places">Places</a>
      <a href="/about">About</a>
      <a href="https://github.com/llfalcao" target="blank">GitHub</a>
    </nav>
  </header>
`;

export default Header;
