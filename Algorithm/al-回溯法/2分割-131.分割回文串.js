/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 *
 * https://leetcode-cn.com/problems/palindrome-partitioning/description/
 *
 * algorithms
 * Medium (72.41%)
 * Likes:    829
 * Dislikes: 0
 * Total Accepted:    130.9K
 * Total Submissions: 181K
 * Testcase Example:  '"aab"'
 *
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
 *
 * 回文串 是正着读和反着读都一样的字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aab"
 * 输出：[["a","a","b"],["aa","b"]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "a"
 * 输出：[["a"]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const result = []
  const path = [] // 已经回文的子串
  const len = s.length

  // 回溯（纵向遍历）
  const backTrack = start => {
    // 终止条件：已经遍历到最后，指针越界了，说明得到了一个结果
    if (start >= len) {
      // 注意这里拷贝 path
      result.push(path.slice(0))
      return
    }

    // 横向遍历
    for (let i = start; i < len; i++) {
      // 剪枝
      if (!isPalindrome(s, start, i)) continue
      // 处理
      path.push(s.substr(start, i - start + 1))
      backTrack(i + 1)
      path.pop() // 撤销、回溯
    }
  }

  backTrack(0)

  return result
}

// 是否回文串
var isPalindrome = function (s, l, r) {
  for (let i = l, j = r; i < j; i++, j--) {
    if (s[i] !== s[j]) return false
  }
  return true
}
// @lc code=end
