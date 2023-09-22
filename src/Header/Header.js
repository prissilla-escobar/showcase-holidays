import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
            <Link to={`/`}>
                <h1>Public Holidays</h1>
            </Link>
        </header>
    )
}

export default Header