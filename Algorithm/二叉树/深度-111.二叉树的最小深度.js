/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 *
 * https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (48.34%)
 * Likes:    567
 * Dislikes: 0
 * Total Accepted:    257.3K
 * Total Submissions: 531.5K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最小深度。
 *
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 *
 * 说明：叶子节点是指没有子节点的节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [2,null,3,null,4,null,5,null,6]
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数的范围在 [0, 10^5] 内
 * -1000
 *
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
/** 方法二：迭代
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (root === null) return 0

  let queue = [root]
  let level = 0
  while (queue.length) {
    let levelLen = queue.length
    // 一边将当前层级的节点出栈，一边将出栈元素的左右节点入栈
    while (levelLen--) {
      let node = queue.shift()
      // 一找到叶子节点则返回！
      if (!node.left && !node.right) return level + 1
      // 继续入队
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    level++
  }
  return level
}
// @lc code=end

/** 方法一：递归
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (root === null) return 0
  if (root.left && root.right)
    // 我们要找的是到最近叶子的深度，不是到空节点的高度
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1
  if (root.left) return minDepth(root.left) + 1
  if (root.right) return minDepth(root.right) + 1

  return 1
}
