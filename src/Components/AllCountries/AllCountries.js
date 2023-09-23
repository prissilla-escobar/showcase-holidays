import Card from "../CountryCard/CountryCard"
import './AllCountries.css'
import PropTypes from 'prop-types'

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
    countries: PropTypes.arrayOf(
      PropTypes.shape({
        countryCode: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }