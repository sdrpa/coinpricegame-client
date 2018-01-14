import React from 'react'

const Howto = () => {
   return (
      <div>
         <a data-toggle="collapse" href="#collapse0" aria-expanded="false" aria-controls="collapse1">
            How to submit a prediction?
         </a>
         <div className="collapse" id="collapse0">
            <div className="collapsible">
               <ol>
                  <li>Send <strong>1</strong> LSK to 
                     <span className="pl-1" id="receiverId">
                        <strong>6300871565689347639L</strong>
                        <i className="pl-1 fa fa-clipboard clipboard"
                           data-clipboard-snippet="" />
                     </span>
                  </li>
                  <li>Copy transaction ID of the transaction from Lisk Nano. { /* Alternatively, use <a href="https://explorer.lisk.io/">Blockchain explorer</a> to find the transaction ID. */ }</li>
                  <li>Enter a prediction in USD and the transaction ID in the form below and click &apos;Submit Prediction&apos; button.</li>
               </ol>
               <p className="pl-4 text-muted">The form will check as you type that the price has not been taken by another participant.
               </p>
            </div>
         </div>
      </div>
   )
}

export default Howto
