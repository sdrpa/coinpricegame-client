import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { predictionWithTransactionId } from '../api'
import Input from '../../components/input'
import ProgressIndicator from '../../components/progress-indicator'

class Prediction extends Component {
   constructor(props) {
      super(props)

      this.state = {
         prediction: null
      }
   }

   formDidSubmit({ txId }) {
      this.setState({ prediction: null })
      
      return predictionWithTransactionId(txId)
         .then(response => {
            this.setState({ prediction: response.data })
         })
         .catch(e => {
            let error = e.message
            if (e.response) {
               error = e.response.data
            }
            throw new SubmissionError({ _error: error})
         })
   }

   renderResponse() {
      const renderText = row => {
         return (
            <div className="text-right">{row.value}</div>
         )
      }
   
      const renderDate = row => {
         const dt = new Date(row.value * 1000)
         const options = { month: 'short', day: 'numeric' }
         return (
            <div className="text-right">
               {dt.toLocaleTimeString('en-US', options)}
            </div>
         )
      }

      const columns = [{
         Header: 'Price in USD',
         accessor: 'price',
         Cell: row => renderText(row)
      }, {
         Header: 'Date',
         accessor: 'date',
         Cell: row => renderDate(row)
      }, {
         Header: 'Sender',
         accessor: 'senderId',
         Cell: row => renderText(row)
      }, {
         Header: 'Transaction ID',
         accessor: 'transactionId',
         Cell: row => renderText(row)
      }]

      const { prediction } = this.state
      if (prediction) {
         return (
            <ReactTable
               data={[prediction]}
               columns={columns}
               pageSize={1}
               showPagination={false} />
         )
      }
   }

   renderError(error) {
      if (error) {
         return (
            <div className="alert alert-danger">
               <strong>Oops!</strong> {error}
            </div>
         )
      }
   }

   render() {
      const { error, handleSubmit, pristine, submitting } = this.props
      return (
         <div>
            <section className="mt-2">
               <h5 className="text-uppercase">My Prediction</h5>
               <div className="submission-form py-3">
                  <form onSubmit={handleSubmit(this.formDidSubmit.bind(this))}>
                     <Field
                        label="Transaction ID"
                        name="txId"
                        isRequired={true}
                        type="text"
                        spellCheck={false}
                        component={Input}
                     />
                     {this.renderError(error)}
                     <button 
                        disabled={pristine || submitting}
                        className="btn btn-primary btn-lg btn-block">
                        <ProgressIndicator animated={submitting} /> Verify
                     </button>
                  </form>
               </div>
            </section>
            <section>
               {this.renderResponse()}
            </section>
         </div>
      )
   }
}
Prediction.propTypes = {
   handleSubmit: PropTypes.func.isRequired,
   submitting: PropTypes.bool.isRequired,
   pristine: PropTypes.bool.isRequired,
   error: PropTypes.string,
   //
   predictionWithTransactionId: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ 
      predictionWithTransactionId,
   }, dispatch)
}

const validate = (values) => {
   const { txId } = values
   let errors = {}

   if (!txId) {
      errors.txId = 'Please enter a transaction ID.'
   } else {
      const regexp = /^[0-9]{3,}$/ // 12221911281031945648
      if (!txId.match(regexp)) {
         errors.txId = 'Please enter a valid transaction ID.'
      }
   }

   return errors
}

export default connect(null, mapDispatchToProps)(reduxForm({
   validate,
   form: 'PredictionForm',
})(Prediction))
