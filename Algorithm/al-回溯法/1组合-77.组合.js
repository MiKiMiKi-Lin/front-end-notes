/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 *
 * https://leetcode-cn.com/problems/combinations/description/
 *
 * algorithms
 * Medium (77.01%)
 * Likes:    707
 * Dislikes: 0
 * Total Accepted:    214.4K
 * Total Submissions: 278.4K
 * Testcase Example:  '4\n2'
 *
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 *
 * 你可以按 任何顺序 返回答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 4, k = 2
 * 输出：
 * [
 * ⁠ [2,4],
 * ⁠ [3,4],
 * ⁠ [2,3],
 * ⁠ [1,2],
 * ⁠ [1,3],
 * ⁠ [1,4],
 * ]
 *
 * 示例 2：
 *
 *
 * 输入：n = 1, k = 1
 * 输出：[[1]]
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  let result = []
  let path = []

  const backTrack = start => {
    if (path.length === k) {
      result.push([...path])
      return
    }
    // 注意结束条件的优化点
    // 已经选择的元素个数 path.length, 还需要(k - path.length)个
    // +1 是因为遍历包括start在内的左闭区间
    for (let i = start; i <= n - (k - path.length) + 1; i++) {
      path.push(i)
      backTrack(i + 1)
      path.pop()
    }
  }

  // 从第一个数开始
  backTrack(1)
  return result
}
// @lc code=end
