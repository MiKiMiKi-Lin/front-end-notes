/**
 * 排序
 * 双指针
 */
/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 *
 * https://leetcode-cn.com/problems/4sum/description/
 *
 * algorithms
 * Medium (39.52%)
 * Likes:    702
 * Dislikes: 0
 * Total Accepted:    143.5K
 * Total Submissions: 363.1K
 * Testcase Example:  '[1,0,-1,0,-2,2]\n0'
 *
 * 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c
 * + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
 *
 * 注意：
 *
 * 答案中不可以包含重复的四元组。
 *
 * 示例：
 *
 * 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
 *
 * 满足要求的四元组集合为：
 * [
 * ⁠ [-1,  0, 0, 1],
 * ⁠ [-2, -1, 1, 2],
 * ⁠ [-2,  0, 0, 2]
 * ]
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const len = nums.length

  if (len <= 3) return []
  // 先进行升序排序
  nums.sort((a, b) => a - b)

  let result = []
  for (let i = 0; i < len; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue // 略去重复的数值

    // 提前退出循环
    if (
      len - i < 4 ||
      nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target
    )
      break

    for (let j = i + 1; j < len; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue // 略去重复的数值

      let x = j + 1
      let y = len - 1
      // 第三第四个数使用双指针
      while (x < y) {
        const sum = nums[i] + nums[j] + nums[x] + nums[y]
        if (sum === target) {
          result.push([nums[i], nums[j], nums[x], nums[y]])

          // 第三第四的数略去重复的数值
          while (x < y && nums[x] === nums[x + 1]) x++
          while (x < y && nums[y] === nums[y - 1]) y--
        }
        // 当前和小于目标值时x向右移动，否则y向左移动
        // !! 这里不能用 else if， 因为 sum===target 时也要移动
        if (sum < target) {
          x++
        } else {
          // sum >= target
          y--
        }
      }
    }
  }
  return result
}
// @lc code=end
