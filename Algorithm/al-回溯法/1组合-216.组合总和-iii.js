/*
 * @lc app=leetcode.cn id=216 lang=javascript
 *
 * [216] 组合总和 III
 *
 * https://leetcode-cn.com/problems/combination-sum-iii/description/
 *
 * algorithms
 * Medium (73.80%)
 * Likes:    351
 * Dislikes: 0
 * Total Accepted:    97.2K
 * Total Submissions: 131.7K
 * Testcase Example:  '3\n7'
 *
 * 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
 *
 * 说明：
 *
 *
 * 所有数字都是正整数。
 * 解集不能包含重复的组合。
 *
 *
 * 示例 1:
 *
 * 输入: k = 3, n = 7
 * 输出: [[1,2,4]]
 *
 *
 * 示例 2:
 *
 * 输入: k = 3, n = 9
 * 输出: [[1,2,6], [1,3,5], [2,3,4]]
 *
 *
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  let result = []
  let path = []

  const backTrack = (start, sum) => {
    // 剪枝（当path个数大于k或sum大于n时没意义了，直接return）
    if (path.length > k || sum > n) return

    if (path.length === k && sum === n) {
      result.push([...path])
      return
    }

    // 优化点：
    // 已经选择的元素个数 path.length, 还需要(k - path.length)个
    // +1 是因为遍历包括start在内的左闭区间
    // for (let i = start; i <= 9; i++) {
    for (let i = start; i <= 9 - (k - path.length) + 1; i++) {
      sum += i
      path.push(i)
      backTrack(i + 1, sum)
      sum -= i
      path.pop()
    }
  }

  // 从1开始，初始和为0
  backTrack(1, 0)
  return result
}
// @lc code=end
