/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 *
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/description/
 *
 * algorithms
 * Medium (54.53%)
 * Likes:    968
 * Dislikes: 0
 * Total Accepted:    186.5K
 * Total Submissions: 341.9K
 * Testcase Example:  '[1,2,3,4,5]\n2\n4'
 *
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left  。请你反转从位置 left 到位置 right 的链表节点，返回
 * 反转后的链表 。
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4,5], left = 2, right = 4
 * 输出：[1,4,3,2,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [5], left = 1, right = 1
 * 输出：[5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点数目为 n
 * 1
 * -500
 * 1
 *
 *
 *
 *
 * 进阶： 你可以使用一趟扫描完成反转吗？
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/** 方法二： 穿针引线 一次遍历（头插法）
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  // 创建虚拟头节点
  let p = new ListNode(-1)
  p.next = head
  // 记录left的前一个
  let preNode = p
  let count = 1
  while (count++ < left) {
    preNode = preNode.next
  }

  // 当前正在操作的位置
  let curNode = preNode.next

  // 一次遍历一边反转
  count = 1
  while (count < right - left + 1) {
    const next = curNode.next
    curNode.next = next.next
    next.next = preNode.next // ！！！
    preNode.next = next
    count++
  }
  return p.next
}
// @lc code=end

/** 方法一： 穿针引线
 * 缺点：遍历两遍链表，特别是left和right区域很大时尤为明显
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  // 创建虚拟头节点
  let p = new ListNode(-1)
  p.next = head
  // 记录left的前一个
  let preNode = p
  let count = 1
  while (count < left) {
    preNode = preNode.next
    count++
  }

  // 需要反转的左节点的位置
  let leftNode = preNode.next
  // 需要反转的右节点的位置
  let rightNode = preNode
  count = 1
  while (count <= right - left + 1) {
    rightNode = rightNode.next
    count++
  }

  // 记录right的下一个
  let lastNode = rightNode.next

  // 切断
  preNode.next = null
  rightNode.next = null

  // 反转中间部分(leetCode 206 反转链表)
  let pre = null
  let cur = leftNode
  while (cur !== null) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }

  // 衔接
  preNode.next = rightNode
  leftNode.next = lastNode

  return p.next
}
