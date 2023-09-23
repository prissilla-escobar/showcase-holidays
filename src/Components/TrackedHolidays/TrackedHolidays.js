import './TrackedHolidays.css'
import { useNavigate, useParams } from 'react-router-dom'
import { countryFlags } from '../../countryEmoji'
import close from '../../Assets/close.png'
import PropTypes from 'prop-types'

function TrackedHolidays({ trackedHolidays, countries, removeTracked }) {
    const dayjs = require('dayjs')
    const navigate = useNavigate()
    const {countryCode} = useParams()

    const favored = trackedHolidays.map(fave => {

        const countName = countryFlags.find(country => {
          if (fave.countryCode === country.countryCode) {
            return country
          }})
        return (
            <div className='holiday-card' key={`${fave.localName}-${fave.date}`} id={Date.now()}>
                 <img className='close' alt='remove from tracker button' src={close} onClick={() => {removeTracked(fave)}} /> <br />
                <img className={`tracked-country-flag`} src={`${countName?.imageURL}`} alt={`image of ${countName?.name}'s flag`} />
                <h2>{countName.name}</h2>
                <h3>Holiday Name: {fave.name}</h3>
                <h4>Local Name: {fave.localName}</h4>
                <h4>Date: {dayjs(fave.date).format('MM/DD/YYYY')}</h4>
            </div>
        )
    })

    if (trackedHolidays.length === 0) {
      return (
        <div className='no-tracked'>
          <h2 className='no-tracked-text'>You do not have any trackedHolidays.</h2>
        </div>
      )
    } else {
        return (
            <div className='tracked-container'>{favored}</div>
        )
}}

export default TrackedHolidays

TrackedHolidays.propTypes = {
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
    ).isRequired,
    countries: PropTypes.arrayOf(
      PropTypes.shape({
        countryCode: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    removeTracked: PropTypes.func.isRequired,
  }