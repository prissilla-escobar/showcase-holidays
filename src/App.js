import './App.css'
import { getCountries, getCountryHolidays } from './api'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AllCountries from './Components/AllCountries/AllCountries'
import Header from './Header/Header'
import SelectedCountry from './Components/SelectedCountry/SelectedCountry'

function App() {

  const [countries, setCountries] = useState([])
  const [serverError, setServerError] = useState({hasError: false, message: ''})

  useEffect(() => {
    getCountries()
      .then(data => {
        setCountries(data)
      })
      .catch(error => {
        setServerError({hasError: true, message: `${error.message}`})
      })
  }, [])

  const resetError = () => {
    setServerError({hasError: false, message: ''})
  }

  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path='/' element={<AllCountries countries={countries} />} />
          <Route path='/2023/:countryCode' element={<SelectedCountry />} />
        </Routes>
    </div>
  );
}

export default App;
