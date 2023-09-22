import './App.css'
import { getCountries, getCountryHolidays } from './api'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AllCountries from './Components/AllCountries/AllCountries'
import Header from './Header/Header'

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

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<AllCountries countries={countries} />} />
      </Routes>
    </div>
  );
}

export default App;
