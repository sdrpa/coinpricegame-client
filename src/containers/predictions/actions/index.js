import { submit, predictions } from '../../api'

export const ActionType = {
   submit:   'SUBMIT_PREDICTION',
   fetch:    'FETCH_PREDICTION',
   fetchAll: 'FETCH_ALL_PREDICTIONS',
   fetching: 'FETCHING_PREDICTIONS'
}

export const submitPrediction = (v, txId) => {
   return dispatch => {
      return submit(v, txId)
         .then(response => {
            dispatch({ 
               type: ActionType.submit,
               payload: response.data
            })
         })
         .catch(e => {
            throw e
         })
   }
}

// export const fetch = (txId) => {
//    return dispatch => {
//       dispatch({
//          type: ActionType.fetching,
//          payload: true
//       })
//       return predictionWithTransactionId(txId)
//          .then(response => {
//             dispatch({ 
//                type: ActionType.fetch,
//                payload: response.data
//             })
//          })
//          .catch(e => {
//             throw e
//          })
//    }
// }

export const fetchAll = () => {
   return dispatch => {
      dispatch({
         type: ActionType.fetching,
         payload: true
      })
      return predictions()
         .then(response => {
            dispatch({ 
               type: ActionType.fetchAll,
               payload: response.data.xs
            })
         })
         .catch(e => {
            throw e
         })
   }
}
