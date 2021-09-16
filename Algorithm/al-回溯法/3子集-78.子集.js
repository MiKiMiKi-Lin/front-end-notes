/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 *
 * https://leetcode-cn.com/problems/subsets/description/
 *
 * algorithms
 * Medium (80.09%)
 * Likes:    1321
 * Dislikes: 0
 * Total Accepted:    306.8K
 * Total Submissions: 383.1K
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 *
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0]
 * 输出：[[],[0]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10
 * nums 中的所有元素 互不相同
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums 数组中的元素 互不相同
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = []
  const path = []

  const backTrack = start => {
    result.push([...path])

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])
      backTrack(i + 1)
      path.pop()
    }
  }

  backTrack(0)
  return result
}
// @lc code=end
