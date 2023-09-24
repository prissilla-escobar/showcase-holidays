import './App.css'
import { getCountries } from './api'
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
    if(trackedHolidays.includes(holiday)) {
      const filteredDays = trackedHolidays.filter(filteredHoliday => filteredHoliday.localName !== holiday.localName && filteredHoliday.date !== holiday.date)
      setTrackedHolidays(filteredDays)
    } else {
      setTrackedHolidays([...trackedHolidays, holiday])
    }
  }

  const removeTracked = (holiday) => {
    const filtered= trackedHolidays.filter(filteredDay => {
    const check = filteredDay.localName === holiday.localName && filteredDay.date === holiday.date
    return !check
    })
    setTrackedHolidays(filtered)
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

export default App
