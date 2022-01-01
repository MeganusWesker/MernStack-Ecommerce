import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import './Footer.css'

const Footer = () => {
    return (
        <footer id="footer">
            <div className='left-footer'>
            <h4> Download our app </h4>
            <p> Download our app for android and for ios mobile phones</p>
             <img src={playStore} alt="playstore" />
             <img src={appStore} alt="appstore" />
            </div>

            <div className='middle-footer'>
             <h1>Ecommerce</h1>
             <p>High Quality is our first Priority </p>
             <p> Copyrights 2021 &copy; MeganusWesker</p>
              
            </div>

            <div className='right-footer'>
             <h4> Follow us</h4>
            <a href="/"> Instagram</a>
            <a href="/"> facebook</a>
            <a href="/"> youtube</a>
            </div>
        </footer>
    )
}

export default Footer;
