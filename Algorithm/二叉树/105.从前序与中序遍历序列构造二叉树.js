/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (69.70%)
 * Likes:    1041
 * Dislikes: 0
 * Total Accepted:    195.9K
 * Total Submissions: 281K
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 根据一棵树的前序遍历与中序遍历构造二叉树。
 *
 * 注意:
 * 你可以假设树中没有重复的元素。
 *
 * 例如，给出
 *
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 *
 * 返回如下的二叉树：
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
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
/** 迭代
 * 迭代解法比较巧妙，掌握递归，了解迭代
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length === 0) return null
  if (preorder.length === 1) return new TreeNode(preorder[0])

  const stack = []

  let i = 0 // 前序遍历的指针
  let j = 0 // 中序遍历的指针（指向当前节点的左子树的最后一个节点）
  // 初始化当前节点为根节点
  const root = new TreeNode(preorder[i++])
  // 先将根节点入栈
  stack.push(root)
  // 依次遍历前序序列
  while (i < preorder.length) {
    const curVal = preorder[i]
    let node = stack[stack.length - 1] // 取栈顶节点
    // 栈顶的节点还不是中序遍历的节点，则将当前节点作为栈顶的左节点并入栈
    if (node.val !== inorder[j]) {
      node.left = new TreeNode(curVal)
      stack.push(node.left)
    } else {
      // 当前节点与中序遍历指向的节点相同说明下一个遍历的节点将不作为左子树的节点
      while (stack.length && stack[stack.length - 1].val === inorder[j]) {
        node = stack.pop()
        j++
      }
      node.right = new TreeNode(curVal)
      stack.push(node.right)
    }
    i++
  }
  return root
}

// @lc code=end

/** 递归 时间复杂度：O(n)
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length === 0) return null
  if (preorder.length === 1) return new TreeNode(preorder[0])

  // 获取根节点
  const rootVal = preorder[0]
  // 找到根节点在中序序列的位置
  const rootValInorderIdx = inorder.indexOf(rootVal)
  // 切割中序序列的左右部分作为左右子树
  const inorderLeft = inorder.slice(0, rootValInorderIdx)
  const inorderRight = inorder.slice(rootValInorderIdx + 1)
  // 切割前序序列根节点后面的左右子树
  const preorderLeft = preorder.slice(1, rootValInorderIdx + 1)
  const preorderRight = preorder.slice(rootValInorderIdx + 1)

  // 递归构建左右子树并返回
  const tree = new TreeNode(rootVal)
  tree.left = buildTree(preorderLeft, inorderLeft)
  tree.right = buildTree(preorderRight, inorderRight)
  return tree
}
