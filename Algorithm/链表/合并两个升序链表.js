/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// 方法二： 迭代
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
// 方法一：递归
function mergeList(headA, headB) {
  // 当一个链表为空则直接返回另一个链表
  if (headA === null) return headB
  if (headB === null) return headA

  if (headA.val < headB.val) {
    headA.next = mergeList(headA.next, headB)
    return headA
  } else {
    headB.next = mergeList(headB.next, headA)
    return headB
  }
}
