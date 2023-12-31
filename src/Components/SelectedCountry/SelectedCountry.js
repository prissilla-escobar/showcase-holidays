import './SelectedCountry.css'
import { Link, useNavigate, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getCountryHolidays } from '../../api'
import { countryFlags } from '../../countryEmoji'
import backButton from '../../Assets/back-button.png'
import add from '../../Assets/travel.png'

function SelectedCountry({ addToTracked, trackedHolidays }) {
    const [selectedCountry, setSelectedCountry] = useState(false)
    const [holidays, setHolidays] = useState([])
    const {countryCode} = useParams()
    const [serverError, setServerError] = useState({hasError: false, message: ''})
    const dayjs = require('dayjs')
    const navigate = useNavigate()

    useEffect(() => {
        getCountryHolidays(countryCode)
            .then(data => {
                setSelectedCountry(data)
                const holidayNames = data.map(holiday => holiday)
                setHolidays(holidayNames)
            })
            .catch(error => setServerError({hasError: true, message: `${error.message}`}))
        }, [countryCode])

    const selectedFlag = countryFlags && countryFlags.find(country => country.countryCode === countryCode)
    if (!selectedFlag) {
        navigate('*')
    }
    
    const holidayInfo = holidays.map(holiday => {

        return (
            <div className='holiday-card' key={`${holiday.localName}-${holiday.date}`}>
                 {trackedHolidays.includes(holiday) ? (
                <span onClick={() => addToTracked(holiday)}>Tracked ✅ <br />Remove🗑️</span>
                ) : (
                 <img className='add' alt='add to tracker button' src={add} onClick={() => addToTracked(holiday)} />
                )}
                <h3>Country: {selectedFlag.name}</h3>
                <h3>Holiday Name: {holiday.name}</h3>
                <h4>Local Name: {holiday.localName}</h4>
                <h4>Date: {dayjs(holiday.date).format('MM/DD/YYYY')}</h4>
            </div>
        )
    })

    return (
        <main>
            <div className="selected-country-container">
                <div className="name-flag">
                    <h2 className="country-names">{`${selectedFlag?.name}`}</h2>
                    <img className={`country-flag`} src={`${selectedFlag?.imageURL}`} alt={`image of ${selectedFlag?.name}'s flag`} />
                </div>
                <div className='holiday-list'>
                    {holidayInfo}
                </div>
                <Link to={`/`}>
                    <img className='back-button' alt='back button' src={backButton}></img>
                </Link>
            </div>
        </main>
    )
}

export default SelectedCountry

SelectedCountry.propTypes = {
    addToTracked: PropTypes.func.isRequired,
    trackedHolidays: PropTypes.arrayOf(
        PropTypes.shape({
            countryCode: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            localName: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            fixed: PropTypes.bool,
            global: PropTypes.bool,
            launchYear: PropTypes.number,
        })
    )
}