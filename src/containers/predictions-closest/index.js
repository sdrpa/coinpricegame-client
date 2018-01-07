import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ClosestTable from '../../components/closest-table'
import closestSelector from './selectors'

const Closest = props => {
   let xs = props.predictions

   return (
      <ClosestTable predictions={xs} />
   )
}
Closest.propTypes = {
   predictions: PropTypes.array
}

function mapStateToProps(state) {
   return {
      predictions: closestSelector(state)
   }
}

export default connect(mapStateToProps)(Closest)
