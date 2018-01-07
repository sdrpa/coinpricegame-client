import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import price from '../containers/price/reducers'
import predictions from '../containers/predictions/reducers'

const rootReducer = (state, action) => {
   const combinedReducers = combineReducers({
      price,
      predictions,
      form: form
   })
   return combinedReducers(state, action)
}

export default rootReducer
