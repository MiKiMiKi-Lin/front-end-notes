/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 *
 * https://leetcode-cn.com/problems/combination-sum-ii/description/
 *
 * algorithms
 * Medium (62.58%)
 * Likes:    687
 * Dislikes: 0
 * Total Accepted:    196.5K
 * Total Submissions: 314K
 * Testcase Example:  '[10,1,2,7,6,1,5]\n8'
 *
 * 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *
 * candidates 中的每个数字在每个组合中只能使用一次。
 *
 * 注意：解集不能包含重复的组合。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: candidates = [10,1,2,7,6,1,5], target = 8,
 * 输出:
 * [
 * [1,1,6],
 * [1,2,5],
 * [1,7],
 * [2,6]
 * ]
 *
 * 示例 2:
 *
 *
 * 输入: candidates = [2,5,2,1,2], target = 5,
 * 输出:
 * [
 * [1,2,2],
 * [5]
 * ]
 *
 *
 *
 * 提示:
 *
 *
 * 1
 * 1
 * 1
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const result = []
  const path = []

  const backTrack = (start, sum) => {
    if (sum === target) {
      result.push([...path])
      return
    }
    // let pre = -1
    for (let i = start; i < candidates.length; i++) {
      const item = candidates[i]
      // 剪枝(不能重复)
      if (item + sum > target || (i > start && item === candidates[i - 1]))
        continue

      sum += item
      path.push(item)
      // pre = item
      // 下一层从下一个开始（不重复）
      backTrack(i + 1, sum)

      sum -= item
      path.pop()
    }
  }

  candidates.sort((a, b) => a - b)
  backTrack(0, 0)
  return result
}
// @lc code=end
