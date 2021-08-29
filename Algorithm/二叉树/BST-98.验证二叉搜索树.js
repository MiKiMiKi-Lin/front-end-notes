/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
 *
 * https://leetcode-cn.com/problems/validate-binary-search-tree/description/
 *
 * algorithms
 * Medium (34.77%)
 * Likes:    1186
 * Dislikes: 0
 * Total Accepted:    328.8K
 * Total Submissions: 943.6K
 * Testcase Example:  '[2,1,3]'
 *
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 *
 * 假设一个二叉搜索树具有如下特征：
 *
 *
 * 节点的左子树只包含小于当前节点的数。
 * 节点的右子树只包含大于当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 *
 *
 * 示例 1:
 *
 * 输入:
 * ⁠   2
 * ⁠  / \
 * ⁠ 1   3
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入:
 * ⁠   5
 * ⁠  / \
 * ⁠ 1   4
 * / \
 * 3   6
 * 输出: false
 * 解释: 输入为: [5,1,4,null,null,3,6]。
 * 根节点的值为 5 ，但是其右子节点值为 4 。
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
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {}
// @lc code=end

/**方法一：递归（加入上下界的DFS）
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  // 子树node的所有节点都在（min, max）内（开区间）
  const helper = (node, min, max) => {
    // 遍历到叶子了，前面没出错，则返回true
    if (node === null) return true
    // 不满足条件则直接返回false
    if (node.val <= min || node.val >= max) return false
    // 返回左右子树是否同时的结果
    return helper(node.left, min, node.val) && helper(node.right, node.val, max)
  }
  // 初始化min和max
  return helper(root, Math.MIN_SAFE_INTEGER, Math.MAX_SAFE_INTEGER)
}

/**中序遍历(非递归)
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let prev = Math.MIN_SAFE_INTEGER // 继续上一次遍历的值
  const stack = []
  while (stack.length || root !== null) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    const node = stack.pop()
    // 中序遍历二叉搜索树时，当前节点node的值一定大于上一个节点
    if (node.val <= prev) return false
    // 说明当前节点满足条件，记录当前值为下一次比较所用
    prev = node.val
    // 继续遍历右节点
    root = node.right
  }
  return true
}

/**中序遍历（递归） TODO not very understand
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let prev = Math.MIN_SAFE_INTEGER // 继续上一次遍历的值
  const inorder = node => {
    if (node === null) return true
    console.log(node.left)
    const left = inorder(node.left)
    console.log(left)
    if (left === null) return false
    if (prev >= node.val) return false
    // 保存当前节点的值，方便下次使用
    prev = node.val
    // 返回继续遍历右子树的结果
    return inorder(node.right)
  }
  return inorder(root)
}
