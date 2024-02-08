const z = require('zod')

const value = null

const squema = z.coerce.boolean()

console.log(squema.parse('on'))
