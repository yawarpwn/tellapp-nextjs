export default async function TestPage() {
  let data
  try {
    const res = await fetch('https://api.tellsenales.workers.dev/api/quotations')
    if (!res.ok) {
      throw new Error('Error en peticion')
    }
    data = await res.json()
  } catch (error) {
    console.log(error)
    data = []
  }

  if (!data) {
    return <div>NO DATA PAPU</div>
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
