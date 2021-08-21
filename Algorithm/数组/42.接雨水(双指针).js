/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 *
 * https://leetcode-cn.com/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (56.56%)
 * Likes:    2515
 * Dislikes: 0
 * Total Accepted:    280.2K
 * Total Submissions: 494.5K
 * Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
 *
 *
 * 示例 2：
 *
 *
 * 输入：height = [4,2,0,3,2,5]
 * 输出：9
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == height.length
 * 0
 * 0
 *
 *
 */

// @lc code=start
/** 方法一：双指针
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let result = 0
  // 双指针
  let left = 0
  let right = height.length - 1
  // 记录左右最高的挡板（水不能漫过左右最高挡板）
  let leftMax = 0
  let rightMax = 0

  while (left < right) {
    leftMax = Math.max(height[left], leftMax)
    rightMax = Math.max(height[right], rightMax)
    // 每次水往低处走，哪个矮走哪里
    if (height[left] < height[right]) {
      result += leftMax - height[left]
      left++
    } else {
      result += rightMax - height[right]
      right--
    }
  }

  return result
}
// @lc code=end
