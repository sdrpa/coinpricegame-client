import { ActionType } from '../actions'

const initialState = {
   all: null,
   fetching: false
}

export default function(state = initialState, action) {
   switch (action.type) {
   case ActionType.submit:
   case ActionType.fetch: {
      return { 
         all: [...state.all, action.payload],
         fetching: false
      }
   }
   case ActionType.fetchAll: {
      return {
         all: action.payload, 
         fetching: false,
      }
   }
   case ActionType.fetching: {
      return { 
         all: state.all, 
         fetching: action.payload
      }
   }
   default:
      return state
   }
}
