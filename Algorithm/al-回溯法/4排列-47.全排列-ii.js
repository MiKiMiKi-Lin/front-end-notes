/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 *
 * https://leetcode-cn.com/problems/permutations-ii/description/
 *
 * algorithms
 * Medium (63.73%)
 * Likes:    803
 * Dislikes: 0
 * Total Accepted:    211.5K
 * Total Submissions: 331.8K
 * Testcase Example:  '[1,1,2]'
 *
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,2]
 * 输出：
 * [[1,1,2],
 * ⁠[1,2,1],
 * ⁠[2,1,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  let result = []
  let path = []

  const len = nums.length

  // 回溯
  // 参数 used 标识
  const backTrack = used => {
    if (path.length === len) {
      result.push([...path])
      return
    }

    for (let i = 0; i < len; i++) {
      // 去重(注意 used[i - 1]为false 对树层去重)
      // 这里使用 used[i - 1] 也可以，但是是树枝去重，效率没那么高
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue

      // 使用过的排除
      if (used[i]) continue

      used[i] = true
      path.push(nums[i])
      backTrack(used)
      used[i] = false
      path.pop()
    }
  }

  nums.sort((a, b) => a - b) // 先排序
  backTrack([])
  return result
}
// @lc code=end
