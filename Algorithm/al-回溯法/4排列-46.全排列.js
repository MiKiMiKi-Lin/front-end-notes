/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (78.26%)
 * Likes:    1551
 * Dislikes: 0
 * Total Accepted:    412.2K
 * Total Submissions: 526.7K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1]
 * 输出：[[1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10
 * nums 中的所有整数 互不相同
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = []
  const path = []

  const len = nums.length

  // 回溯：使用used标识是否已使用
  const backTrack = used => {
    // 终止：已经有len个数了
    if (path.length === len) {
      result.push([...path])
      return
    }
    // 横向查找
    for (let i = 0; i < len; i++) {
      if (used[i]) continue

      used[i] = true
      path.push(nums[i])
      backTrack(used)
      path.pop()
      used[i] = false
    }
  }
  backTrack([])
  return result
}
// @lc code=end
