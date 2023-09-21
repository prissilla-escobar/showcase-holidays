import './CountryCard.css'
import PropTypes from 'prop-types'
import { countryFlags } from '../../countryEmoji'

function Card({id, countryName, countryCode}) {

    const individualFlag = countryFlags.find(country => {
        if (country.name === countryName) {
            return country
        }
    })
    
    return (
        <div className="country-card">
            <img className={`${countryCode}-country-flag`} src={`${individualFlag.imageURL}`} alt={`image of ${countryName}'s flag`} />
            <div className="country-name">
                <h2>{countryName}</h2>
            </div>
        </div>
    )
}

export default Card