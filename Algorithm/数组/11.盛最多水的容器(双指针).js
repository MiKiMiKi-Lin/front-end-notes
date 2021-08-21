/**
 * 暴力解法：双重循环
 * 使用双指针(单循环)
 */

/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 *
 * https://leetcode-cn.com/problems/container-with-most-water/description/
 *
 * algorithms
 * Medium (64.52%)
 * Likes:    2036
 * Dislikes: 0
 * Total Accepted:    330.6K
 * Total Submissions: 512.3K
 * Testcase Example:  '[1,8,6,2,5,4,8,3,7]'
 *
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为
 * (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *
 * 说明：你不能倾斜容器。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 *
 * 示例 2：
 *
 *
 * 输入：height = [1,1]
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：height = [4,3,2,1,4]
 * 输出：16
 *
 *
 * 示例 4：
 *
 *
 * 输入：height = [1,2,1]
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * n = height.length
 * 2
 * 0
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let result = 0
  let i = 0
  let j = height.length - 1
  while (i < j) {
    // 当前体积
    const v = (j - i) * Math.min(height[i], height[j])
    // 存储最大体积
    result = Math.max(result, v)
    if (height[i] < height[j]) {
      i++
    } else {
      j--
    }
  }
  return result
}
// @lc code=end

var maxArea = function (height) {
  let result = 0
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      let curArea = (j - i) * Math.min(height[i], height[j])

      if (curArea > result) {
        result = curArea
      }
    }
  }
  return result
}
