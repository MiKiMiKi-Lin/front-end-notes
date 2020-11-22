const list = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Changchun']

if (!!window.SharedWorker) {
  const worker = new SharedWorker('./worker.js')
  console.log("worker", worker)

  worker.port.postMessage(list)
  console.log('postMessage: ', list)

  worker.port.onmessage = function (e) {
    const { data } = e
    console.log('after sort the letters: ', data)
  }
}