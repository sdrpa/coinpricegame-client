import Promise from 'promise'

import { predictionWithPrice } from '../api'

export const validate = (values) => {
   const { txId, price } = values
   let errors = {}

   // Price
   if (!price) {
      errors.price = 'Please enter a price.'
   } else {
      // http://www.regular-expressions.info/javascriptexample.html
      const regexp = /^\d*(\.\d{1,4})?$/
      if (!price.match(regexp)) {
         errors.price = 'Please enter a decimal number with max. 4 decimal places.'
      }
   }

   // Transaction ID
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

// Async

export const asyncValidate = (values) => {
   const { price } = values
   // Don't allow duplicate price predictions 
   return predictionWithPrice(price)
      .then(response => {
         const p = response.data
         throw { price: `$${p.price} has already been submitted by ${p.senderId}.` }
      }, () => {
         return new Promise.resolve()
      })
}
