/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
 *
 * https://leetcode-cn.com/problems/path-sum-ii/description/
 *
 * algorithms
 * Medium (62.68%)
 * Likes:    577
 * Dislikes: 0
 * Total Accepted:    175.5K
 * Total Submissions: 280.1K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22'
 *
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
 *
 * 叶子节点 是指没有子节点的节点。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * 输出：[[5,4,11,2],[5,8,4,5]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,3], targetSum = 5
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,2], targetSum = 0
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点总数在范围 [0, 5000] 内
 * -1000
 * -1000
 *
 *
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
/** 精简版
 * 注意：需要搜索整颗二叉树且不用处理递归返回值 —— 不需要返回值
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  if (root === null) return []

  const result = []
  const path = []

  const backTrack = (node, sum) => {
    const diff = sum - node.val
    path.push(node.val)

    if (!node.left && !node.right) {
      diff === 0 && result.push([...path])
      //   return
    }

    node.left && backTrack(node.left, diff)

    node.right && backTrack(node.right, diff)

    path.pop()
  }

  //   path.push(root.val)
  backTrack(root, targetSum)
  return result
}
// @lc code=end

// 回溯清晰版
var pathSum = function (root, targetSum) {
  if (root === null) return []

  const result = []
  const path = []

  const backTrack = (node, sum) => {
    if (!node.left && !node.right) {
      sum - node.val === 0 && result.push([...path])
      return
    }

    if (node.left) {
      path.push(node.val)
      backTrack(node.left, sum - node.val)
      path.pop()
    }
    if (node.right) {
      path.push(node.val)
      backTrack(node.right, sum - node.val)
      path.pop()
    }
  }

  path.push(root.val)
  backTrack(root, targetSum)
  return result
}
