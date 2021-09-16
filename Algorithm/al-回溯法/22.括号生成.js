/**
 * 回溯法
 */

/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (76.63%)
 * Likes:    1490
 * Dislikes: 0
 * Total Accepted:    211.7K
 * Total Submissions: 276.3K
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 *
 *
 * 示例：
 *
 * 输入：n = 3
 * 输出：[
 * ⁠      "((()))",
 * ⁠      "(()())",
 * ⁠      "(())()",
 * ⁠      "()(())",
 * ⁠      "()()()"
 * ⁠    ]
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n === 0) return []

  const result = []

  /**
   * 回溯法
   * @param {number} l 左括号剩余额度
   * @param {number} r 右括号剩余额度
   * @param {array} resItem 结果串
   */
  const backTrack = (l, r, resItem) => {
    // console.log(l, r, resItem)
    // 左右额度耗尽则得到一个组合
    if (l === 0 && r === 0) {
      result.push(resItem)
    }
    // 只要左括号的个数在0-n之间则可以继续放左括号
    if (l > 0) {
      backTrack(l - 1, r, resItem + '(')
    }
    // 只要右括号剩余可放置个数大于左边则可以继续放右括号
    if (r > l) {
      backTrack(l, r - 1, resItem + ')')
    }
  }

  backTrack(n, n, '')

  return result
}
// @lc code=end
