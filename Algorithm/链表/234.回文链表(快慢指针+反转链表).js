/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 *
 * https://leetcode-cn.com/problems/palindrome-linked-list/description/
 *
 * algorithms
 * Easy (48.76%)
 * Likes:    1063
 * Dislikes: 0
 * Total Accepted:    279.7K
 * Total Submissions: 573.1K
 * Testcase Example:  '[1,2,2,1]'
 *
 * 请判断一个链表是否为回文链表。
 *
 * 示例 1:
 *
 * 输入: 1->2
 * 输出: false
 *
 * 示例 2:
 *
 * 输入: 1->2->2->1
 * 输出: true
 *
 *
 * 进阶：
 * 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
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

// 反转链表
const reverseList = head => {
  let pre = null
  let cur = head
  while (cur !== null) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
// 快慢指针获取前半部分链表
const getEndOfFirstList = head => {
  let slow = head
  let fast = head
  while (fast.next !== null && fast.next.next !== null) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}

/** 方法三；快慢指针+反转链表（时间复杂度O(n)空间复杂度O(1)）
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  // 前半部分链表
  let firstHalfList = getEndOfFirstList(head)
  // 反转得到后半部分
  let lastHalfList = reverseList(firstHalfList.next)
  // 回文判断
  let p1 = head
  let p2 = lastHalfList

  let result = true
  while (p2 !== null) {
    if (p1.val !== p2.val) {
      result = false
      break
    }
    p1 = p1.next
    p2 = p2.next
  }
  // 恢复链表
  lastHalfList = reverseList(firstHalfList.next)
  firstHalfList.next = lastHalfList

  return result
}

// @lc code=end

/** 方法二、；反转后半部分链表（时间复杂度O(n)空间复杂度？）
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let totalCount = 0
  let p = head
  // 计算链表总长度
  while (p !== null) {
    totalCount++
    p = p.next
  }
  // 找到中间节点的下标
  let mid = ((totalCount - 1) / 2) | 0

  // 找到中间节点
  p = head
  for (let i = 0; i < mid; i++) {
    p = p.next
  }

  // 反转得到后半部分
  let lastHalfList = reverseList(p.next)

  let p1 = head
  let p2 = lastHalfList
  while (p2 !== null) {
    if (p1.val !== p2.val) return false
    p1 = p1.next
    p2 = p2.next
  }
  return true
}

/** 方法一：数组+双指针（时间复杂度O(n)空间复杂度O(n)，空间复杂度不符合要求）
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  const list = []
  // 将链表的值复制到数组
  while (head !== null) {
    list.push(head.val)
    head = head.next
  }

  if (list.length === 0) return false

  // 双指针判断数组是否回文
  let i = 0
  let j = list.length - 1
  while (i < j) {
    if (list[i++] !== list[j--]) return false
  }
  return true
}
