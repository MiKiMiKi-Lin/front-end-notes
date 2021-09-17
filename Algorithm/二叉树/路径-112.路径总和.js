/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
 *
 * https://leetcode-cn.com/problems/path-sum/description/
 *
 * algorithms
 * Easy (52.58%)
 * Likes:    665
 * Dislikes: 0
 * Total Accepted:    263.3K
 * Total Submissions: 500.6K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22'
 *
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，判断该树中是否存在 根节点到叶子节点
 * 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
 *
 * 叶子节点 是指没有子节点的节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,3], targetSum = 5
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,2], targetSum = 0
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点的数目在范围 [0, 5000] 内
 * -1000
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
/** 精简版回溯写法最终版
 * 比起累加计数用递减可以省去一些麻烦
 * 注意：要搜索其中一条符合条件的路径 —— 需要返回值
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (root === null) return false

  // 终止条件：遇到叶子节点
  if (!root.left && !root.right) {
    // 总结正确则返回 true
    return targetSum === root.val
  }

  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  )
}
// @lc code=end

// 隐式回溯写法
var hasPathSum = function (root, targetSum) {
  if (root === null) return false

  const backTrack = (node, sum) => {
    // 终止条件：遇到叶子节点
    if (!node.left && !node.right) {
      // 总结正确则返回 true
      return sum === targetSum
    }

    // 横向遍历（即左右叶子节点）
    if (node.left) {
      // 存在回溯的逻辑
      if (backTrack(node.left, sum + node.left.val)) return true
    }
    if (node.right) {
      // 存在回溯的逻辑
      if (backTrack(node.right, sum + node.right.val)) return true
    }

    // 前面没有返回true则返回false
    return false
  }

  return backTrack(root, root.val)
}

// 显式回溯写法
var hasPathSum = function (root, targetSum) {
  if (root === null) return false

  const backTrack = (node, sum) => {
    // 终止条件：遇到叶子节点
    if (!node.left && !node.right) {
      // 总结正确则返回 true
      return sum === targetSum
    }

    // 横向遍历（即左右叶子节点）
    if (node.left) {
      // 存在回溯的逻辑
      // if (backTrack(node.left, sum + node.left.val)) return true
      // 显式回溯的写法
      sum += node.left.val
      if (backTrack(node.left, sum)) return true
      sum -= node.left.val
    }
    if (node.right) {
      // 存在回溯的逻辑
      // if (backTrack(node.right, sum + node.right.val)) return true
      // 显式回溯的写法
      sum += node.right.val
      if (backTrack(node.right, sum)) return true
      sum -= node.right.val
    }

    // 前面没有返回true则返回false
    return false
  }

  return backTrack(root, root.val)
}
