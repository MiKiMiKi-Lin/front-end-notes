/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
 *
 * https://leetcode-cn.com/problems/sort-list/description/
 *
 * algorithms
 * Medium (66.76%)
 * Likes:    1254
 * Dislikes: 0
 * Total Accepted:    196.2K
 * Total Submissions: 293.8K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 *
 * 进阶：
 *
 *
 * 你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [4,2,1,3]
 * 输出：[1,2,3,4]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [-1,5,3,4,0]
 * 输出：[-1,0,3,4,5]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = []
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目在范围 [0, 5 * 10^4] 内
 * -10^5
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
/** 这里采用自顶向下的归并排序法（另一种解法：自底向上）
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  return mergeSort(head)
}
// 归并排序
var mergeSort = function (head, tail = null) {
  if (head === null) return head
  if (head.next === tail) {
    head.next = null
    return head
  }
  // 快慢指针寻找中间节点
  let slow = head
  let fast = head

  while (fast !== tail) {
    slow = slow.next
    fast = fast.next
    if (fast !== tail) {
      fast = fast.next
    }
  }
  const mid = slow
  // 分别对左右排序
  const left = mergeSort(head, mid)
  const right = mergeSort(mid, tail)
  // 合并
  return mergeList(left, right)
}
// 合并两个排序后的链表，返回有序链表
var mergeList = function (left, right) {
  let p = left
  let q = right
  let resultHead = new ListNode()
  let result = resultHead
  while (p !== null && q !== null) {
    if (p.val <= q.val) {
      result.next = p
      p = p.next
    } else {
      result.next = q
      q = q.next
    }
    result = result.next
  }

  if (p !== null) {
    result.next = p
  }
  if (q !== null) {
    result.next = q
  }
  return resultHead.next
}
// @lc code=end
