import './TrackedHolidays.css'
import { useNavigate, useParams } from 'react-router-dom'
import { countryFlags } from '../../countryEmoji'
import close from '../../Assets/close.png'

function TrackedHolidays({ trackedHolidays, countries, removeTracked }) {
    console.log("HERE", countries)
    console.log('tracked', trackedHolidays)
    const dayjs = require('dayjs')
    const navigate = useNavigate()
    const {countryCode} = useParams()

    const selectedFlag = countryFlags.find(country => country.countryCode === countryCode)
    // if (!selectedFlag) {
    //     navigate('*')
    // }
    console.log('selected', selectedFlag)

    const favored = trackedHolidays.map(fave => {
        console.log('fave',fave)
        return (
            <div className='holiday-card' key={`${fave.localName}-${fave.date}`} id={Date.now()}>
                 <img className='close' alt='remove from tracker button' src={close} onClick={(id) => {removeTracked(id)}} />
                 {/* <h3>Country: {selectedFlag.name}</h3> */}
                <h3>Holiday Name: {fave.name}</h3>
                <h4>Local Name: {fave.localName}</h4>
                <h4>Date: {dayjs(fave.date).format('MM/DD/YYYY')}</h4>
            </div>
        )
    })

    return (
        <div>{favored}</div>
    )
}

export default TrackedHolidays