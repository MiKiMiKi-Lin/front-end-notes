/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个升序链表
 *
 * https://leetcode-cn.com/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (55.74%)
 * Likes:    1456
 * Dislikes: 0
 * Total Accepted:    302K
 * Total Submissions: 541.6K
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * 给你一个链表数组，每个链表都已经按升序排列。
 *
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 *
 *
 *
 * 示例 1：
 *
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
 * 输出：[1,1,2,3,4,4,5,6]
 * 解释：链表数组如下：
 * [
 * ⁠ 1->4->5,
 * ⁠ 1->3->4,
 * ⁠ 2->6
 * ]
 * 将它们合并到一个有序链表中得到。
 * 1->1->2->3->4->4->5->6
 *
 *
 * 示例 2：
 *
 * 输入：lists = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 * 输入：lists = [[]]
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * k == lists.length
 * 0 <= k <= 10^4
 * 0 <= lists[i].length <= 500
 * -10^4 <= lists[i][j] <= 10^4
 * lists[i] 按 升序 排列
 * lists[i].length 的总和不超过 10^4
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
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (lists.length === 0) return null
  return mergeArr(lists)
}
// 分治合并数组
var mergeArr = function (lists) {
  if (lists.length === 1) return lists[0]
  // 取中间的下标
  const mid = (lists.length / 2) | 0
  // 左右分而治之
  const left = mergeArr(lists.slice(0, mid))
  const right = mergeArr(lists.slice(mid))
  // 合并左右两个链表并返回
  return mergeList(left, right)
}
// 合并两个升序链表
function mergeList(headA, headB) {
  // 当一个链表为空则直接返回另一个链表
  if (headA === null) return headB
  if (headB === null) return headA

  let head = new ListNode()
  let result = head
  let p = headA
  let q = headB
  while (p && q) {
    if (p.val <= q.val) {
      result.next = p
      p = p.next
    } else {
      result.next = q
      q = q.next
    }
    result = result.next
  }
  result.next = p ? p : q
  return head.next
}
// @lc code=end
