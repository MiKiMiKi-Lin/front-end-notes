/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let mp = new Map()
  for (let item of strs) {
    let current = item
    let sortVal = item.split('').sort().join('')

    if (mp.has(sortVal)) {
      mp.set(sortVal, [...mp.get(sortVal), current])
    } else {
      mp.set(sortVal, [current])
    }
  }

  //   let result = []
  //   for (let [key, value] of mp) {
  //     result.push(value)
  //   }
  //   return result

  return Array.from(mp.values())
}
