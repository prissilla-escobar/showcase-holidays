import './ServerError.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Error({ resetError, message }) {
    
    return (
        <div className='error-message'>
            <img className="error-photo" src='https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1667345491.5716999/how-to-travel-with-a-dog-on-a-plane.png' />
            <h2 className='oh-no'>OH NO!</h2>
            <h2 className='message'>
                {!message 
                ? "The page you're looking for doesn't exist." 
                : typeof message === 'string'
                    ? message
                    : message.message}
            </h2>
            <Link to='/' className='nav'>
                <div onClick={resetError}>
                <button className='home-link'>Please Return Home</button>
                </div>
            </Link>
        </div>
    )
}

export default Error

Error.propTypes = {
    resetError: PropTypes.func.isRequired,
    message: PropTypes.shape({
        message: PropTypes.string.isRequired,
      }).isRequired
}