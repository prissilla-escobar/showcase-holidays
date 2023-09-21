import logo from './logo.svg';
import './App.css';
import { getCountries, getCountryHolidays } from './api';
import { useState, useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState('')

  useEffect(() => {
    getCountries()
      .then(data => {
        setCountries(data)
      })
  })

  const codes = () => {
    {countries.map((country) => {
      return country
    })}
  }


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
