import './CountryCard.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { countryFlags } from '../../countryEmoji'

function Card({id, countryName, countryCode}) {

    const individualFlag = countryFlags.find(country => {
        if (country.name === countryName) {
            return country
        }
    })
    
    return (
        <Link to={`/2023/${countryCode}`}>
            <div className="country-card">
                <img className={`${countryCode}-country-flag`} src={`${individualFlag.imageURL}`} alt={`image of ${countryName}'s flag`} />
                <div className="country-name">
                    <h2>{countryName}</h2>
                </div>
            </div>
        </Link>
    )
}

export default Card