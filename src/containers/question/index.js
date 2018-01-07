import React from 'react'
import PropTypes from 'prop-types'

const Question = ({ endDate }) => {
   const end = new Date(endDate * 1000)
   const utcDate = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }
   const utcTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }
   //const local = { year: 'numeric', month: 'short', day: 'numeric' }
   //const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

   return (
      <div>
         <h4>Predict what the price of Lisk will be on <strong>{Intl.DateTimeFormat('en-US', utcDate).format(end)} at {Intl.DateTimeFormat('en-US', utcTime).format(end)} GMT</strong>?</h4>
      </div>
   )
}
Question.propTypes = {
   endDate: PropTypes.number.isRequired
}

export default Question
