const URL ='https://node-rest-dev.fl0.io/signals'

function signalMapper(signal) {
  return {
    id: signal.id,
    title: signal.title,
    code: signal.code,
    category: signal.category,
    image: {
      url: signal.image_url,
      width: signal.image_width,
      height: signal.image_height,
      format: signal.image_format,
    },
  }
}

export async function getSignals() {
  const response = await fetch(URL)

  if(!response.ok) throw new Error('Failed to fetch signals')

  const data = await response.json()

  return data.map(signalMapper)
}
