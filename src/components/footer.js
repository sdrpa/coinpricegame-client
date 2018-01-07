import React from 'react'
import { Link } from 'react-router-dom'

import config from '../config'

const Footer = () => {
   const coinpricegame = <Link to="/">coinpricegame.com</Link>
   return (
      <footer>
         <ul className="list-unstyled">
            <li className="list-inline-item">Copyright © 2018 {coinpricegame}</li>
            <li className="list-inline-item"><Link to="/privacy">privacy</Link></li>
            <li className="list-inline-item"><Link to="/about">about</Link></li>
            <li className="list-inline-item"><a href={`mailto:${config.support}?subject=Coinpricegame support`}>support</a></li>
            <li className="list-inline-item"><Link to="/summary">latest report</Link></li>
         </ul>
      </footer>
   )
}

export default Footer
