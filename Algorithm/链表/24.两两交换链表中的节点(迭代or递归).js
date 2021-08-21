/**
 * 法一：迭代法
 * 法二：递归
 */

/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 *
 * https://leetcode-cn.com/problems/swap-nodes-in-pairs/description/
 *
 * algorithms
 * Medium (68.82%)
 * Likes:    770
 * Dislikes: 0
 * Total Accepted:    207.8K
 * Total Submissions: 301.9K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
 *
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4]
 * 输出：[2,1,4,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = [1]
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目在范围 [0, 100] 内
 * 0
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
/** 递归法
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  // 递归的临界条件
  if (head === null || head.next === null) return head
  // 新链表的头结点为newHead
  const newHead = head.next
  // 交换
  head.next = swapPairs(newHead.next)
  newHead.next = head

  return newHead
}
// @lc code=end

// 迭代法
var swapPairs = function (head) {
  // 边界处理
  if (head === null || head.next === null) return head
  // 创建一个头部节点，指向head，便于后续返回链表头部，否则交换后原本的头部丢失，需要额外处理
  let result = new ListNode()
  result.next = head

  let p = result
  // 迭代处理，当后两个节点都不为空时则需要交换
  while (p.next !== null && p.next.next !== null) {
    const cur = p.next
    const next = p.next.next

    cur.next = next.next
    p.next = next
    next.next = cur

    p = cur
  }

  return result.next
}
