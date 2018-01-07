export function randomString(length = 10) {
   var string = ''
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
   for (var i = 0; i < length; i++) {
      string += possible.charAt(Math.floor(Math.random() * possible.length))
   }
   return string
}

export function randomNumber(length = 10) {
   var string = ''
   var possible = '123456789'
   for (var i = 0; i < length; i++) {
      string += possible.charAt(Math.floor(Math.random() * possible.length))
   }
   return parseInt(string)
}
