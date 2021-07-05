/**
 * 交换列表两元素
 * @param {*} list
 * @param {*} i
 * @param {*} j
 */

function swap(list, i, j) {
  ;[list[i], list[j]] = [list[j], list[i]]
}

export { swap }
