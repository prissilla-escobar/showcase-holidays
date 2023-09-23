import './Header.css'
import { Link } from 'react-router-dom'
import planePic from '../Assets/travel (2).png'
import home from '../Assets/home-icon-silhouette.png'

function Header() {
    return (
        <header>
            <Link to={`/`}>
                <h1>Public Holidays</h1>
            </Link>
            <div className='buttons'>
                <Link to={`/trackedHolidays`}>
                    <button className='track-button'>My Tracked Holidays<img className='plane-pic' alt='a plane with the plus sign that takes you to your tracked holidays' src={planePic} /></button>
                </Link>
                <Link to={`/`}>
                    <button className="home-button">Home<img className='plane-pic' alt='a home icon that takes you to the home page' src={home} /></button>
                </Link>
            </div>
        </header>
    )
}

export default Header