type Quo = {
  id: string,
  ruc?: string,
  company?: string
  deadline?: number
  created_at: string,
  updated_at: string
}



type QuoCreate = Omit<Quo, 'id'> 

type QuoUpdate = Partial<Quo>

const quos: Quo[] = []

const create = (quo: QuoCreate) => {
  quos.push({
    ...quo,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  })
}

const update  = (quo: QuoUpdate) => {
  const index = quos.findIndex(q => q.id === quo.id)
  quos[index] = {
    ...quos[index],
    ...quo
  } 
}


const createOrUpdate = (quo: QuoCreate | QuoUpdate) => {

  if('id' in quo) {
    console.log(quo)
  } else {
    console.log(quo)
  } 

}
