import React from 'react'

const Rules = () => {
   return (
      <div>
         <a data-toggle="collapse" href="#collapse1" aria-expanded="false" aria-controls="collapse1">
         Rules and Prizes
         </a>
         <div className="collapse" id="collapse1">
            <div className="collapsible">
               <ul className="list-unstyled pl-4">
                  <li><strong>The 3 closest predictions win.</strong></li>
                  <li>One prediction per transaction, the price must be unique.</li>
                  <li>Predictions must be placed at least 24 hours before the end date.</li>
               </ul>
               <ul className="list-unstyled pl-4">
                  <li><span className="gold">1st</span> prize <strong>60%</strong> of the Pools Fund.</li>
                  <li><span className="silver">2nd</span> prize <strong>25%</strong> of the Pools Fund.</li>
                  <li><span className="bronze">3rd</span> prize <strong>10%</strong> of the Pools Fund.</li>
                  <li className="pt-2"><strong>5%</strong> is reserved for development and maintenance.</li>
               </ul>
               <ul className="list-unstyled pl-4">
                  <li>Pools Fund is the total amount of Lisk raised from all submitted predictions.</li>
                  <li>The winning price is determined according to Lisk&apos;s price on <a href="https://bittrex.com/Market/Index?MarketName=BTC-LSK">Bittrex</a> at midnight on the end date.</li>
                  <li>Reward payouts will be paid out to winner accounts automatically on the next day.</li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Rules
