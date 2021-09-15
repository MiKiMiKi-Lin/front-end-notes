/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (42.55%)
 * Likes:    1111
 * Dislikes: 0
 * Total Accepted:    289.9K
 * Total Submissions: 681.3K
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 *
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 *
 * 进阶：
 *
 *
 * 你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 *
 * 示例 3：
 *
 *
 * 输入：nums = [], target = 0
 * 输出：[-1,-1]
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * -10^9
 * nums 是一个非递减数组
 * -10^9
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 其实我们要找的就是数组中「第一个等于 target 的位置」和「第一个大于 target 的位置减一」
var binarySearch = function (nums, target, isLower = true) {
  let low = 0
  let high = nums.length - 1
  while (low <= high) {
    // const mid = Math.floor((low + high) / 2)
    const mid = (low + high) >> 1

    if (nums[mid] > target || (isLower && nums[mid] === target)) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return low
}
var searchRange = function (nums, target) {
  if (nums.length === 0) return [-1, -1]
  // 第一个等于 target 的位置
  const leftIndex = binarySearch(nums, target, true)
  // 第一个大于 target 的位置减一(考虑边界)
  const rightIndex = binarySearch(nums, target, false) - 1

  // 不符合条件则返回[-1, -1]
  return leftIndex <= rightIndex &&
    rightIndex < nums.length &&
    nums[rightIndex] === target
    ? [leftIndex, rightIndex]
    : [-1, -1]
}
// @lc code=end
