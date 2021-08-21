/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
 *
 * https://leetcode-cn.com/problems/reverse-nodes-in-k-group/description/
 *
 * algorithms
 * Hard (65.51%)
 * Likes:    1248
 * Dislikes: 0
 * Total Accepted:    210.5K
 * Total Submissions: 321.2K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
 *
 * k 是一个正整数，它的值小于或等于链表的长度。
 *
 * 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 *
 * 进阶：
 *
 *
 * 你可以设计一个只使用常数额外空间的算法来解决此问题吗？
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[2,1,4,3,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1,2,3,4,5], k = 3
 * 输出：[3,2,1,4,5]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = [1,2,3,4,5], k = 1
 * 输出：[1,2,3,4,5]
 *
 *
 * 示例 4：
 *
 *
 * 输入：head = [1], k = 1
 * 输出：[1]
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 列表中节点的数量在范围 sz 内
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
/** TODO：提交后的结果显示效率比较低，后面可以考虑优化
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (head === null) return null
  if (k === 1) return head

  let newHead = new ListNode()
  newHead.next = head
  let end = newHead // 当前待排序序列的最后一个
  let pre = newHead // 当前待排序序列的前一个（已排序的最后一个）

  let count = 0
  while (end !== null) {
    if (count === k) {
      let start = pre.next
      // 截断待排序序列后面的未处理序列
      let unHandleList = end.next
      end.next = null
      // 将待排序的排好后和前面的已排序的拼接
      pre.next = reverseList(start)
      // 翻转后，start指向当前处理序列的最后一个
      // 将未处理序列拼接回来
      start.next = unHandleList
      // 重置pre和end指针为已排序的最后一个
      pre = start
      end = start

      count = 0
    } else {
      // end 向前走到k个节点
      count++
      end = end.next
    }
  }
  return newHead.next
}
// 反转链表 head
var reverseList = function (head) {
  let cur = head
  let first = null
  while (cur !== null) {
    const next = cur.next
    cur.next = first
    first = cur
    cur = next
  }
  return first
}
// @lc code=end
