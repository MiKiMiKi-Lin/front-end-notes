/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 递归1（易理解版）
 * @param {TreeNode} root
 * @param {Array} result
 * @returns {Array}
 */
function preOrderTraversal1(root) {
  let result = []
  // 递归遍历，非空则放入result
  const traversal = p => {
    if (p === null) return
    result.push(p.val)
    traversal(p.left)
    traversal(p.right)
  }
  traversal(root)
  return result
}

/**
 * 递归2
 * @param {TreeNode} root
 * @param {Array} result
 * @returns {Array}
 */
function preOrderTraversal(root, result = []) {
  // 如果还没有到叶子节点则递归遍历
  if (root) {
    result.push(root.val)
    preOrderTraversal(root.left, result)
    preOrderTraversal(root.right, result)
  }
  // 每次返回结果
  return result
}

/**
 * 迭代1（需要显示维护类似递归的隐式的栈）
 * @param {TreeNode} root
 * @param {Array} result
 * @returns {Array}
 */
function preOrderTraversal1(root) {
  if (!root) return []

  let result = []
  let stack = [] // 显示维护一个栈

  let p = root
  while (p || stack.length) {
    // 一直遍历p的左子树，入栈
    while (p) {
      result.push(p.val)
      stack.push(p)
      p = p.left
    }

    const node = stack.pop()
    p = node.right
  }
  return result
}

/**
 * 迭代2（比迭代1空间复杂度稍高）
 * @param {TreeNode} root
 * @param {Array} result
 * @returns {Array}
 */
function preOrderTraversal1(root) {
  if (!root) return []

  let result = []
  let stack = []

  stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    result.push(node.val)

    // 右节点先入栈（栈先进后出）
    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
  }
  return result
}
