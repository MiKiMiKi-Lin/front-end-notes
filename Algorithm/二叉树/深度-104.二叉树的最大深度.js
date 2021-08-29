/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 *
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (75.82%)
 * Likes:    815
 * Dislikes: 0
 * Total Accepted:    359.7K
 * Total Submissions: 474.3K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最大深度。
 *
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例：
 * 给定二叉树 [3,9,20,null,null,15,7]，
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 返回它的最大深度 3 。
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
/** 迭代（层序遍历）
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (root === null) return 0

  const queue = [root]
  let level = 0

  while (queue.length) {
    let levelLen = queue.length
    // 一边将当前层级的节点出栈，一边将出栈元素的左右节点入栈
    while (levelLen--) {
      let node = queue.shift()
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    level++
  }
  return level
}
// @lc code=end

/** 递归
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  // 递归终止条件
  if (root === null) return 0
  // 取左子树或右子树的最大深度再加上根节点的高度
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
