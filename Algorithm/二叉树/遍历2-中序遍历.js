/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// 递归
function inOrderTraversal(root) {
  let result = []
  const traversal = p => {
    if (p === null) return
    traversal(p.left)
    result.push(p.val)
    traversal(p.right)
  }
  traversal(root)
  return result
}

// 迭代
function inOrderTraversal(root) {
  if (root === null) return []

  let result = []
  let stack = []

  let p = root

  while (p || stack.length) {
    // 一直遍历当前节点的左子树并将遍历到的节点入栈
    while (p) {
      stack.push(p)
      p = p.left
    }
    // 左子树遍历完则开始从栈顶取出节点，将val放入result
    let node = stack.pop()
    result.push(node.val)
    // 继续遍历右节点
    p = node.right
  }

  return result
}
