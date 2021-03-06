export const Float = (places, n) => {
   return n.toFixed(places)
}

export const weekNumber = d => {
   d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
   d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7))
   var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
   var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
   return weekNo
}

export const logError = e => {
   if (e.response) {
      console.log(e.response.data)
   } else {
      console.log(e.message)
   }
}