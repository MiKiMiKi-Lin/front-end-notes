onconnect = function (e) {
  const port = e.ports[0]
  port.onmessage = function (e) {
    const { data } = e
    console.log('received message: ', data)
    const result = data.sort((a, b) => a - b)
    port.postMessage(100)
  }
}