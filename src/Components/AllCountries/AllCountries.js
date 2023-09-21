import Card from "../CountryCard/CountryCard";
import './AllCountries.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function AllCountries({countries}) {

    const countryCards = countries.map(country => {
        
        return (
            <Card 
                id={Date.now()}
                key={country.countryCode}
                countryCode={country.countryCode}
                countryName={country.name}
            />
        )
    })

    return (
        <div className="countries-container">
            {countryCards}
        </div>
    )
}

export default AllCountries

AllCountries.propTypes = {
    countries: PropTypes.array.isRequired,
  }