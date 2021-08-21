/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
 *
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (42.64%)
 * Likes:    1510
 * Dislikes: 0
 * Total Accepted:    472.2K
 * Total Submissions: 1.1M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 *
 * 进阶：你能尝试使用一趟扫描实现吗？
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1], n = 1
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中结点的数目为 sz
 * 1
 * 0
 * 1
 *
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
/** 方法二：一次遍历（优化版）
 * 可以看leetCode官方的分析，图解清晰
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let newHead = new ListNode()
  newHead.next = head
  let slow = newHead
  let fast = head

  let count = 0

  while (fast) {
    count++
    fast = fast.next
    // 当fast前进了count步并且大于n时，slow也开始前进
    if (count > n) {
      slow = slow.next
    }
  }
  slow.next = slow.next.next
  return newHead.next
}
// @lc code=end

/** 方法一：两次遍历
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const newHead = new ListNode()
  newHead.next = head

  let cur = head // 当前指针
  let pre = newHead // 前一个指针

  let count = 0 // 计数
  while (cur) {
    count++
    cur = cur.next
  }

  cur = head
  while (cur && count > n) {
    count--
    pre = pre.next
    cur = cur.next
  }
  const next = cur.next
  pre.next = next
  cur = next

  return newHead.next
}
