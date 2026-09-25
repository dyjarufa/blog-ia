export async function readJSONBody(req) {
  const bodyBuffer = []

  return new Promise((resolve, reject) => {
    req.on('data', (chunk) => bodyBuffer.push(chunk))
    req.on('error', (error) => reject(error))
    req.on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(bodyBuffer).toString())
        resolve(body)
      } catch (error) {
        reject(error)
      }
    })
  })
}
