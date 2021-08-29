/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
 *
 * https://leetcode-cn.com/problems/symmetric-tree/description/
 *
 * algorithms
 * Easy (54.88%)
 * Likes:    1374
 * Dislikes: 0
 * Total Accepted:    320.9K
 * Total Submissions: 584.7K
 * Testcase Example:  '[1,2,2,3,4,4,3]'
 *
 * 给定一个二叉树，检查它是否是镜像对称的。
 *
 *
 *
 * 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠/ \ / \
 * 3  4 4  3
 *
 *
 *
 *
 * 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠  \   \
 * ⁠  3    3
 *
 *
 *
 *
 * 进阶：
 *
 * 你可以运用递归和迭代两种方法解决这个问题吗？
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**方法二：迭代
 * @param {TreeNode} root
 * @return {boolean}
 */

var isSymmetric = function (root) {
  if (!root) return true
  //维护一个队列保存访问过的节点，并初始化存入根节点的左右节点
  const queue = [root.left, root.right]
  while (queue.length) {
    // 取队列前面两个节点
    const node1 = queue.shift()
    const node2 = queue.shift()
    // 两个节点均为空则继续
    if (!node1 && !node2) continue
    // 有一个节点为空或者值不相等则不满足条件，直接返回false
    if (!node1 || !node2 || node1.val !== node2.val) return false

    // 当前两个节点的值相等且不为空则继续判断下一层级的子节点
    queue.push(node1.left)
    queue.push(node2.right)
    queue.push(node1.right)
    queue.push(node2.left)
  }
  return true
}

// @lc code=end

/** 方法二：迭代
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true

  const queue = [root.left, root.right]
  while (queue.length) {
    let len = queue.length // 当前层级的长度
    const level = [] // 存储当前层级的节点
    while (len) {
      const curNode = queue.shift()
      level.push(curNode)
      if (curNode) {
        queue.push(curNode.left)
        queue.push(curNode.right)
      }
      len--
    }

    let levelLen = level.length
    for (let i = 0; i < levelLen / 2; i++) {
      // 一个null一个非null则不对称
      if (level[i] === null && level[levelLen - i - 1] !== null) return false
      if (level[i] !== null && level[levelLen - i - 1] === null) return false

      if (level[i] !== null && level[levelLen - i - 1] !== null) {
        if (level[i].val !== level[levelLen - i - 1].val) return false
      }
    }
  }
  return true
}

/** 方法一：递归
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true

  return isSame(root.left, root.right)
}

var isSame = function (leftNode, rightNode) {
  // 若左右节点有
  if (leftNode === null) return rightNode === null
  if (rightNode === null) return leftNode === null

  if (leftNode.val !== rightNode.val) return false

  return (
    isSame(leftNode.left, rightNode.right) &&
    isSame(leftNode.right, rightNode.left)
  )
}
