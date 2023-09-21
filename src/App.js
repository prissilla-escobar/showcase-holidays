import logo from './logo.svg';
import './App.css';
import { getCountries, getCountryHolidays } from './api';

function App() {

  getCountries()

  getCountryHolidays()


  return (
    <div className="App">
      <img src='https://flagsapi.com/BE/flat/64.png' />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
