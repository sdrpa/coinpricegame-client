import { get, post } from 'axios'

import config from '../config'

export const submit = (v, txId) => {
   const url = `${config.apiHttpRoot}/submit`
   return post(url, { v, txId })
}

export const predictionWithTransactionId = (txId) => {
   const url = `${config.apiHttpRoot}/prediction/tx?id=${txId}`
   return get(url)
}

export const predictionWithPrice = (price) => {
   const url = `${config.apiHttpRoot}/prediction/price?v=${price}`
   return get(url)
}

export const predictions = () => {
   const url = `${config.apiHttpRoot}/all`
   return get(url)
}

export const previousBest = () => {
   const url = `${config.apiHttpRoot}/previous-best`
   return get(url)
}

export const dates = () => {
   const url = `${config.apiHttpRoot}/dates`
   return get(url)
}
