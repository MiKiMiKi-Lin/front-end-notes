/*
 * @lc app=leetcode.cn id=450 lang=javascript
 *
 * [450] 删除二叉搜索树中的节点
 *
 * https://leetcode-cn.com/problems/delete-node-in-a-bst/description/
 *
 * algorithms
 * Medium (48.23%)
 * Likes:    508
 * Dislikes: 0
 * Total Accepted:    55.8K
 * Total Submissions: 115.2K
 * Testcase Example:  '[5,3,6,2,4,null,7]\n3'
 *
 * 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key
 * 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。
 *
 * 一般来说，删除节点可分为两个步骤：
 *
 *
 * 首先找到需要删除的节点；
 * 如果找到了，删除它。
 *
 *
 * 说明： 要求算法时间复杂度为 O(h)，h 为树的高度。
 *
 * 示例:
 *
 *
 * root = [5,3,6,2,4,null,7]
 * key = 3
 *
 * ⁠   5
 * ⁠  / \
 * ⁠ 3   6
 * ⁠/ \   \
 * 2   4   7
 *
 * 给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
 *
 * 一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
 *
 * ⁠   5
 * ⁠  / \
 * ⁠ 4   6
 * ⁠/     \
 * 2       7
 *
 * 另一个正确答案是 [5,2,6,null,4,null,7]。
 *
 * ⁠   5
 * ⁠  / \
 * ⁠ 2   6
 * ⁠  \   \
 * ⁠   4   7
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root === null) return null

  if (key > root.val) {
    // 要删除的点大于当前值则在右子树删
    root.right = deleteNode(root.right, key)
  } else if (key < root.val) {
    // 要删除的点小于当前值则在左子树删
    root.left = deleteNode(root.left, key)
  } else {
    // 删除当前节点
    // 当前节点无叶子节点，直接删除
    if (root.left === null && root.right === null) {
      root = null
    } else if (root.right) {
      // 有右节点则用后继节点代替, 然后递归删除后继节点
      root.val = successor(root)
      root.right = deleteNode(root.right, root.val)
    } else {
      // 无右节点有左节点则用前驱节点代替，递归删除前驱节点
      root.val = predecessor(root)
      root.left = deleteNode(root.left, root.val)
    }
  }
  return root
}
// 寻找当前节点的后继节点
var successor = node => {
  node = node.right
  while (node.left) {
    node = node.left
  }
  return node.val
}
// 寻找当前节点的前驱节点
var predecessor = node => {
  node = node.left
  while (node.right) {
    node = node.right
  }
  return node.val
}
// @lc code=end
