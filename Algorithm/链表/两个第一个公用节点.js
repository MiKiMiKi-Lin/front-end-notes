/**
 * 输入两个链表，找出它们的第一个公共结点
 */
function findFirstCommonNode(pHead1, pHead2) {
  if (pHead1 === null || pHead2 === null) return null

  const p1Length = getListLength(pHead1)
  const p2Length = getListLength(pHead2)
  const diffLen = Math.abs(p1Length - p2Length)

  const p1 = pHead1
  const p2 = pHead2

  // 将长的一方向前走直到两者剩余长度相同
  if (p1Length > p2Length) {
    p1 = walkSteps(diffLen, p1)
  } else if (p2Length > p1Length) {
    p2 = walkSteps(diffLen, p2)
  }

  while (p1 !== null) {
    if (p1 === p2) return p1

    p1 = p1.next
    p2 = p2.next
  }

  return null
}
// 获取链表长度
function getListLength(head) {
  let count = 0

  const p = head
  while (p !== null) {
    count++
    p = p.next
  }
  return count
}
// 链表前进 n 步
function walkSteps(n, head) {
  while (n--) {
    head = head.next
  }
  return head
}
