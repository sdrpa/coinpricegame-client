import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Link } from 'react-router-dom'
import Clipboard from 'clipboard'
import PropTypes from 'prop-types'

import { submitPrediction }  from '../predictions/actions'
import { validate, asyncValidate } from './validate'
import Input from '../../components/input'
import ProgressIndicator from '../../components/progress-indicator'

class Predict extends Component {
   componentDidMount() {
      new Clipboard('.clipboard', {
         target: () => document.getElementById('receiverId')
      });       
   }

   formDidSubmit({ txId, price }) {
      const { submitPrediction } = this.props
      return submitPrediction(price, txId)
         .then(() => {
            // TODO: Display success message or simpler redirect to sucess page
         }, e => {
            let error = e.message
            if (e.response) {
               error = e.response.data
            }
            throw new SubmissionError({ _error: error})
         })
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
      const { dates, handleSubmit, submitting, pristine, error } = this.props
      const currEpoch = new Date().getTime() / 1000

      const renderDisabled = (dueEpoch, endEpoch) => {
         const dueDate = new Date(dueEpoch * 1000)
         const nextDate = new Date(endEpoch * 1000 + 1000) // The next week start date
         const utc = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }
         return (
            <div className="alert alert-info mt-4">
               <h5 className="mb-3">The submissions were closed at {Intl.DateTimeFormat('en-US', utc).format(dueDate)} GMT.</h5>
               The next round starts on {Intl.DateTimeFormat('en-US', utc).format(nextDate)} GMT.
            </div>
         )
      }

      const renderForm = () => {
         return (            
            <form onSubmit={handleSubmit(this.formDidSubmit.bind(this))}>
               <Field
                  label="Enter your prediction (in USD)"
                  name="price"
                  isRequired={true}
                  type="text"
                  spellCheck={false}
                  component={Input}
               />
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
                  <ProgressIndicator animated={submitting} /> Submit Prediction
               </button>
            </form>
         )
      }

      return (
         <section className="mt-2 mb-1">
            <div className="pb-4">
               {(currEpoch > dates.due && currEpoch < dates.end) 
                  ? renderDisabled(dates.due, dates.end)
                  : renderForm()
               }
            </div>
            <Link to="/prediction">Check my prediction</Link>
         </section>
      )
   }
}
Predict.propTypes = {
   dates: PropTypes.object.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   submitting: PropTypes.bool.isRequired,
   pristine: PropTypes.bool.isRequired,
   error: PropTypes.string,
   //
   submitPrediction: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ 
      submitPrediction,
   }, dispatch)
}

export default connect(null, mapDispatchToProps)(reduxForm({
   validate,
   asyncValidate,
   asyncBlurFields: ['price'],
   form: 'PredictForm',
})(Predict))
