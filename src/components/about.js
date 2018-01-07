import React from 'react'
//import { Link } from 'react-router-dom'

import config from '../config'

const About = () => {
   return (
      <div className="py-2">
         <article className="mt-0">
            <h4>About</h4>
            <p>Coinpricegame is a weekly Lisk price prediction challenge.
            </p>
         </article>
         <article>
            <h4>Rules</h4>
            <p>The 3 closest predictions win.<br />
               A price must be unique.<br />
               One prediction per transaction.<br />
               Predictions must be placed at least 24 hours before the end date.<br />
               The winning price is determined according to Lisk&apos;s price on <a href="https://bittrex.com/Market/Index?MarketName=BTC-LSK">Bittrex</a> at midnight on the end date.<br />
               Reward payouts will be paid out to winner accounts automatically on the next day.
            </p>
         </article>
         <article>
            <h4>Prize payout: 95% of the Pools Fund</h4>
            <p>Prize payout breakdown:</p>
            <p>
               1st prize <strong>60%</strong> of the Pools fund.<br />
               2nd prize <strong>25%</strong> of the Pools fund.<br />
               3rd prize <strong>10%</strong> of the Pools fund.<br />
            </p>
            <p><strong>5%</strong> is reserved for development and maintenance.
            </p>
            <p>Pools fund is the total amount of Lisk received raised from all submitted predictions.</p>
         </article>
         <article>
            <h4>Technology</h4>
            <p>The source code is available at GitHub: <a href={config.github1}>server app</a>, <a href={config.github2}>client app</a>.<br />
               Back-end is written in <a href="https://swift.org">Swift</a> using <a href="http://www.kitura.io">Kitura</a> and <a href="https://postgresql.org">PostgreSQL</a>. Front-end is built with <a href="https://reactjs.org">React</a>.<br />
               If you want to contribute, feel free to send a pull request.
            </p>
         </article>
         <article>
            <h4>Contact</h4>
            <p>You can reach me by <a href={`mailto:${config.support}`}>email</a>, or as <a href={config.twitter}>sdrpa</a> on Twitter.
            </p>
         </article>
      </div>
   )
}

export default About
