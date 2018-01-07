import { ActionType } from '../actions'

const initialState = {
   item: null,
   trend: 0
}

export default function(state = initialState, action) {
   switch (action.type) {
   case ActionType.update: {
      let trend = 0
      if (state.item) {
         if (state.item.last > action.payload.last) {
            trend = 1 
         } else if (state.item.last < action.payload.last) {
            trend = -1
         } else {
            trend = state.trend
         }
      } 
      
      return {
         item: action.payload,
         trend
      }
   }
   default:
      return state
   }
}
