export const ActionType = {
   update: 'UPDATE_PRICE'
}

export const update = (string) => {
   return dispatch => {
      dispatch({ 
         type: ActionType.update,
         payload: JSON.parse(string)            
      })
   }
}
