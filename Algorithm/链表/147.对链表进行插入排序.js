/*
 * @lc app=leetcode.cn id=147 lang=javascript
 *
 * [147] 对链表进行插入排序
 *
 * https://leetcode-cn.com/problems/insertion-sort-list/description/
 *
 * algorithms
 * Medium (68.03%)
 * Likes:    420
 * Dislikes: 0
 * Total Accepted:    95.8K
 * Total Submissions: 140.8K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 对链表进行插入排序。
 *
 *
 * 插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
 * 每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。
 *
 *
 *
 * 插入排序算法：
 *
 *
 * 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
 * 每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
 * 重复直到所有输入数据插入完为止。
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入: 4->2->1->3
 * 输出: 1->2->3->4
 *
 *
 * 示例 2：
 *
 * 输入: -1->5->3->4->0
 * 输出: -1->0->3->4->5
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function (head) {
  // 边界：链表为空或链表只有一个元素
  if (head === null || head.next === null) return head

  // 保存头部指针
  const newHead = new ListNode()
  newHead.next = head

  // 当前指针
  let cur = head.next // 当前指针
  let lastSorted = head // 记录最后一个排好序的位置，方便直接比较
  while (cur !== null) {
    if (lastSorted.val <= cur.val) {
      // 不需要换位置，lastSorted后移
      lastSorted = lastSorted.next
    } else {
      // 寻找插入点
      let pre = newHead
      while (pre.next.val <= cur.val) {
        pre = pre.next
      }
      // 交换
      lastSorted.next = cur.next
      cur.next = pre.next
      pre.next = cur
    }
    // 当前指针继续移动
    cur = lastSorted.next
  }
  return newHead.next
}
// @lc code=end
