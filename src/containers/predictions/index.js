import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { fetchAll } from './actions'
import Graph from '../predictions-graph'
import Table from '../predictions-table'

class Predictions extends Component {
   componentDidMount() {
      this.props.fetchAll()
         .then(() => {})
         .catch(e => {
            if (e.response) {
               console.log(e.response.data)
            } else {
               console.log(e.message)
            }
         })
   }

   render() {
      const { predictions, fetching } = this.props   
      if (!predictions) {
         return <div />
      }
      if (fetching) {
         return <div>Loading...</div>
      } else {
         if (predictions.length === 0) {
            return (
               <div className="mb-5">
                  <h4>There are no predictions to show. Be the first one to make a prediction!</h4>
               </div>
            )
         }
         return (
            <div>
               <Table predictions={predictions} />
               <Graph predictions={predictions} />
            </div>
         )
      }
   }
}
Predictions.propTypes = {
   predictions: PropTypes.array,
   fetching: PropTypes.bool.isRequired,
   //
   fetchAll: PropTypes.func.isRequired
}

function mapStateToProps(state) {
   return {
      predictions: state.predictions.all,
      fetching: state.predictions.fetching
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ 
      fetchAll
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Predictions)
