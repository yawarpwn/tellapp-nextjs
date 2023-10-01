
export const getItem = (id) => {

  return new Promise((resolve) => {
    setTimeout(() => resolve({
      id: 1, 
      name: 'Item 1'
    }), 1000)
  })
}

export const preload =(id) =>  {
  void(getItem(id))
}


export default async function Item() {
  const item = await getItem(1)
  return <div>{item.name}</div>
}
