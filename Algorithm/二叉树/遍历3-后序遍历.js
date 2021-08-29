/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// 递归
function postOrderTraversal(root) {
  let result = []

  const traversal = p => {
    if (p === null) return []
    traversal(p.left)
    traversal(p.right)
    result.push(p.val)
  }
  traversal(root)
  return result
}

// 迭代1(前序遍历的变形)
// 前序：根-左-右；后序：左-右-根； 联系：前序变形为 根-右-左，取反后则为后序的结果
function postOrderTraversal(root) {
  if (root === null) return []

  let result = []
  let stack = []

  // 变形的前序遍历
  let p = root
  while (p || stack.length) {
    while (p) {
      result.push(p.val)
      stack.push(p)
      p = p.right // 前序遍历时是优先访问左节点，变形的前序先遍历右节点
    }
    const node = stack.pop()
    p = node.left
  }
  // 反转
  result = result.reverse()
  return result
}

// 迭代2
function postOrderTraversal(root) {
  let result = []
  let stack = []
  let prev = null // 记录上一次访问的节点（当前遍历的节点的右节点已经访问过了，从下往上回溯访问）

  let p = root
  while (p || stack.length) {
    while (p) {
      stack.push(p)
      p = p.left
    }
    p = stack.pop()
    if (!p.right || p.right === prev) {
      result.push(p.val)
      prev = p
      p = null
    } else {
      stack.push(p)
      p = p.right
    }
  }
  return result
}
