import './App.css'
import { getCountries, getCountryHolidays } from './api'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AllCountries from './Components/AllCountries/AllCountries'
import Header from './Header/Header'
import SelectedCountry from './Components/SelectedCountry/SelectedCountry'
import Error from './Components/ServerError/ServerError'
import TrackedHolidays from './Components/TrackedHolidays/TrackedHolidays'

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
      {serverError.hasError ? (
          <Error
            message={serverError.message} 
            resetError={resetError}
          />
        ) : (
        <Routes>
          <Route path='/' element={<AllCountries countries={countries} />} />
          <Route path='/2023/:countryCode' element={<SelectedCountry />} />
          <Route path='/trackedHolidays' element={<TrackedHolidays />} />
          <Route path='*' element={<Error message={{message: "The page you're looking for doesn't exist."}} resetError={resetError} />} />
        </Routes>
        )}
    </div>
  )
}

export default App;
