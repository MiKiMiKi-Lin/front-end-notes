/*
 * @lc app=leetcode.cn id=441 lang=javascript
 *
 * [441] 排列硬币
 *
 * https://leetcode-cn.com/problems/arranging-coins/description/
 *
 * algorithms
 * Easy (42.46%)
 * Likes:    111
 * Dislikes: 0
 * Total Accepted:    43.3K
 * Total Submissions: 101.9K
 * Testcase Example:  '5'
 *
 * 你总共有 n 枚硬币，你需要将它们摆成一个阶梯形状，第 k 行就必须正好有 k 枚硬币。
 *
 * 给定一个数字 n，找出可形成完整阶梯行的总行数。
 *
 * n 是一个非负整数，并且在32位有符号整型的范围内。
 *
 * 示例 1:
 *
 *
 * n = 5
 *
 * 硬币可排列成以下几行:
 * ¤
 * ¤ ¤
 * ¤ ¤
 *
 * 因为第三行不完整，所以返回2.
 *
 *
 * 示例 2:
 *
 *
 * n = 8
 *
 * 硬币可排列成以下几行:
 * ¤
 * ¤ ¤
 * ¤ ¤ ¤
 * ¤ ¤
 *
 * 因为第四行不完整，所以返回3.
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function (n) {
  if (n === 0) return 0

  let low = 0
  let high = n // 一定不超过n行
  while (low <= high) {
    const x = Math.floor((low + high) / 2)
    // x = n时，需要的硬币数为 ((x + 1) * x) / 2
    const s = ((x + 1) * x) / 2
    if (s === n) {
      return x
    } else if (s < n) {
      low = x + 1
    } else {
      high = x - 1
    }
  }
  return high
}
// @lc code=end

// 思路：
// 给n个硬币的完成阶梯行
// 第 0、1、2、3、4...x 层阶梯需要的硬币个数为 [0, 1, 3, 6, 10 ... (x+1)*x/2]
// 设 arr = [0, 1, 3, 6, 10 ... (x+1)*x/2]
// 则只需要找到 n 在 arr的下标即可，若找不到，则找其最相近数字左侧对应的下标
// 该题可看作：有序数组的查找，可使用二分法解决, 且一定满足 x<=n
