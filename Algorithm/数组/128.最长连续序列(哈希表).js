/*
 * @lc app=leetcode.cn id=128 lang=typescript
 *
 * [128] 最长连续序列
 *
 * https://leetcode-cn.com/problems/longest-consecutive-sequence/description/
 *
 * algorithms
 * Medium (53.97%)
 * Likes:    840
 * Dislikes: 0
 * Total Accepted:    143K
 * Total Submissions: 264.8K
 * Testcase Example:  '[100,4,200,1,3,2]'
 *
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 *
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,3,7,2,5,8,4,6,0,1]
 * 输出：9
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * -10^9
 *
 *
 */

// @lc code=start
/** 外层循环需要 O(n) 的时间复杂度，只有当一个数是连续序列的第一个数的情况下才会进入内层循环
 * 然后在内层循环中匹配连续序列中的数，因此数组中的每个数只会进入内层循环一次。根据上述分析可知，
 * 总时间复杂度为 O(n)O(n)，符合题目要求。
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums: number[]): number {
  const numsSet: Set<number> = new Set(nums)

  let maxLength = 0
  for (const num of numsSet) {
    // 找到要枚举的数：我们要枚举的数 x 一定是在数组中不存在前驱数 x-1 的
    if (!numsSet.has(num - 1)) {
      let current = num
      let count = 1
      while (numsSet.has(current + 1)) {
        current = current + 1
        count++
      }

      maxLength = Math.max(maxLength, count)
    }
  }
  return maxLength
}
// @lc code=end

// 遍历一次，但是Array.sort相对耗时，此题要求时间复杂度O(n)
var longestConsecutive1 = function (nums) {
  if (nums.length <= 1) return nums.length
  // 去重
  const list = Array.from(new Set(nums))
  // 排序
  list.sort((a, b) => a - b)

  let maxLength = 1
  let count = 1
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] + 1 === list[i + 1]) {
      count++
    } else {
      maxLength = Math.max(maxLength, count)
      count = 1 // 重新计算
    }
  }
  return Math.max(count, maxLength)
}
