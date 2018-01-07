import { createSelector } from 'reselect'

const predictionsSelector = state => state.predictions.all
const priceSelector = state => state.price.item

const getClosest = (predictions, price) => {
   if (!predictions || !price) {
      return []
   }

   const closest = (howMany, arr) => {
      arr.sort((a, b) => {
         return Math.abs(price.last - a.price) - Math.abs(price.last - b.price)
      })
      let rs = []
      for (let i = 0; i < howMany; i++) {
         rs.push(arr[i])
      }
      return rs
   }

   const howMany = 3
   const count = predictions.length
   const xs = closest((count < howMany) ? count : howMany, predictions)
   //console.log('xs', xs)
   return xs
}

export default createSelector(predictionsSelector, priceSelector, getClosest)
