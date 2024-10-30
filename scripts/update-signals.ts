import { SignalsModel } from '@/models'
;(async () => {
  const signals = await SignalsModel.getAll()
  console.log(signals)
})()
