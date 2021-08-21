/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 *
 * https://leetcode-cn.com/problems/linked-list-cycle/description/
 *
 * algorithms
 * Easy (50.87%)
 * Likes:    962
 * Dislikes: 0
 * Total Accepted:    347.5K
 * Total Submissions: 683.2K
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * 给定一个链表，判断链表中是否有环。
 *
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos
 * 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos
 * 不作为参数进行传递，仅仅是为了标识链表的实际情况。
 *
 * 如果链表中存在环，则返回 true 。 否则，返回 false 。
 *
 *
 *
 * 进阶：
 *
 * 你能用 O(1)（即，常量）内存解决此问题吗？
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：head = [1,2], pos = 0
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 *
 *
 * 示例 3：
 *
 *
 *
 * 输入：head = [1], pos = -1
 * 输出：false
 * 解释：链表中没有环。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目范围是 [0, 10^4]
 * -10^5 <= Node.val <= 10^5
 * pos 为 -1 或者链表中的一个 有效索引 。
 *
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/** 方法二：快慢指针
 * 若无环，快慢指针永远不会相遇
 * 若有环，快指针先进入环，并一直在环内转圈，慢指针后进入环，迟早与快指针相遇
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (head === null || head.next === null) return false

  let slow = head
  let fast = head.next

  while (slow !== fast) {
    // 如果有环不可能有 null
    if (fast === null || fast.next === null) return false
    // 快慢指针移动
    fast = fast.next.next
    slow = slow.next
  }
  return fast
}
// @lc code=end

// 方法一：迭代
var hasCycle = function (head) {
  if (head === null || head.next === null) return false

  let hashSet = new Set()
  while (head !== null) {
    if (hashSet.has(head)) {
      return true
    }
    hashSet.add(head)
    head = head.next
  }
  return false
}
