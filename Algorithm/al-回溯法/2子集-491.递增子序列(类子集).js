/*
 * @lc app=leetcode.cn id=491 lang=javascript
 *
 * [491] 递增子序列
 *
 * https://leetcode-cn.com/problems/increasing-subsequences/description/
 *
 * algorithms
 * Medium (54.71%)
 * Likes:    332
 * Dislikes: 0
 * Total Accepted:    46K
 * Total Submissions: 84.1K
 * Testcase Example:  '[4,6,7,7]'
 *
 * 给你一个整数数组 nums ，找出并返回所有该数组中不同的递增子序列，递增子序列中 至少有两个元素 。你可以按 任意顺序 返回答案。
 *
 * 数组中可能含有重复元素，如出现两个整数相等，也可以视作递增序列的一种特殊情况。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,6,7,7]
 * 输出：[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [4,4,3,2,1]
 * 输出：[[4,4]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 15
 * -100 <= nums[i] <= 100
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  let result = []
  let path = []

  const len = nums.length

  const backTack = start => {
    // 递归终止
    const curLen = path.length
    if (curLen > len) return

    if (curLen > 1) {
      result.push([...path])
    }

    let used = new Map() // 记录使用过的值，防止重复
    for (let i = start; i < len; i++) {
      // 剪枝：已使用的或者不满足递增条件的
      if (used.has(nums[i]) || (curLen > 0 && nums[i] < path[curLen - 1]))
        continue

      used.set(nums[i], true)
      path.push(nums[i])
      backTack(i + 1)
      path.pop()
    }
  }

  //   nums.sort((a, b) => a - b) // 不可以先排序
  backTack(0)
  return result
}
// @lc code=end
