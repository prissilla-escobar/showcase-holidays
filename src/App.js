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
  const [trackedHolidays, setTrackedHolidays] = useState(JSON.parse(localStorage.getItem('trackedHolidays')) || [])

  useEffect(() => {
    getCountries()
      .then(data => {
        setCountries(data)
      })
      .catch(error => {
        setServerError({hasError: true, message: `${error.message}`})
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('trackedHolidays', JSON.stringify(trackedHolidays))
    }, [trackedHolidays])

  const resetError = () => {
    setServerError({hasError: false, message: ''})
  }

  const addToTracked = (holiday) => {
    setTrackedHolidays([...trackedHolidays, holiday])
  }

const removeTracked = (id) => {
    const filteredDays = trackedHolidays.filter(holiday => holiday.id !== id)
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
          <Route path='/2023/:countryCode' element={<SelectedCountry addToTracked={addToTracked} trackedHolidays={trackedHolidays} />} />
          <Route path='/trackedHolidays' element={<TrackedHolidays countries={countries} trackedHolidays={trackedHolidays} removeTracked={removeTracked} />} />
          <Route path='*' element={<Error message={{message: "The page you're looking for doesn't exist."}} resetError={resetError} />} />
        </Routes>
        )}
    </div>
  )
}

export default App;
