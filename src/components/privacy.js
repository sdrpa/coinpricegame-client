import React from 'react'
import { Link } from 'react-router-dom'

import config from '../config'

const Privacy = () => {
   const coinpricegame = <Link to="/">Coinpricegame</Link>
   return (
      <div className="py-2">
         <h4>Privacy</h4>
         <p>{coinpricegame} runs on dedicated server. <a href={config.github1}>Server</a>, <a href={config.github2}>client</a> app source code can be publicly audited.<br />
            With participating you agree that your public wallet address can be used on the site to announce the winners.<br />
            If you spot a privacy leak, please report it discreetly to <a href={`mailto:${config.support}?subject=Coinpricegame privacy leak`}>support</a>.
         </p>
      </div>
   )
}

export default Privacy
