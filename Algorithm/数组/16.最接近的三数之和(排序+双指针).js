/**
 * 双指针
 * 先排序
 */
/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 *
 * https://leetcode-cn.com/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (45.84%)
 * Likes:    649
 * Dislikes: 0
 * Total Accepted:    175.3K
 * Total Submissions: 382.4K
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target
 * 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
 *
 *
 *
 * 示例：
 *
 * 输入：nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= nums.length <= 10^3
 * -10^3 <= nums[i] <= 10^3
 * -10^4 <= target <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  // 先排序
  nums.sort((a, b) => a - b)

  const len = nums.length

  let result = nums[0] + nums[1] + nums[len - 1]
  // 长度为3则直接返回相加的结果
  if (nums.length === 3) return result

  let delta = 0
  let sum = 0

  for (let i = 0; i < len; i++) {
    // 优化点：保证当前枚举的值和上一次不同
    if (i > 0 && nums[i - 1] === nums[i]) continue

    // 每次先固定i
    let j = i + 1
    let k = len - 1
    // 双指针查找j和k
    while (j < k) {
      sum = nums[i] + nums[j] + nums[k]
      delta = sum - target
      // 找到该值则直接返回
      if (delta === 0) {
        return sum
      }

      // 继续寻找下个枚举值
      if (delta > 0) {
        // 优化点：保证下一轮枚举的值和上一次不同
        while (j < k - 1 && nums[k - 1] === nums[k]) k--
        k--
      } else {
        // 优化点：保证当前下一轮的值和上一次不同
        while (j + 1 < k && nums[j + 1] === nums[j]) j++
        j++
      }
      // 若当前三值之和和target的差值更小则重新记录三者之和
      let diff = Math.abs(sum - target) - Math.abs(result - target)
      if (diff < 0) {
        result = sum
      }
    }
  }
  return result
}
// @lc code=end
