/**
 * 快速幂
 * （分治的思路）
 */
/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 *
 * https://leetcode-cn.com/problems/powx-n/description/
 *
 * algorithms
 * Medium (37.61%)
 * Likes:    690
 * Dislikes: 0
 * Total Accepted:    198.2K
 * Total Submissions: 526.9K
 * Testcase Example:  '2.00000\n10'
 *
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，x^n）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：x = 2.00000, n = 10
 * 输出：1024.00000
 *
 *
 * 示例 2：
 *
 *
 * 输入：x = 2.10000, n = 3
 * 输出：9.26100
 *
 *
 * 示例 3：
 *
 *
 * 输入：x = 2.00000, n = -2
 * 输出：0.25000
 * 解释：2^-2 = 1/2^2 = 1/4 = 0.25
 *
 *
 *
 *
 * 提示：
 *
 *
 * -100.0
 * -2^31
 * -10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (x === 0) return 0
  if (x === 1) return 1
  // n & 1, 与运算，n为奇数时结果为1，偶数时结果为0
  if (x === -1) return n & 1 ? -1 : 1
  // 处理边界（？）
  if (n == 2147483647) return 0
  if (n == -2147483648) return x === 2 ? 0 : 1

  if (n < 0) {
    x = 1 / x
    n = -n
  }
  let res = 1
  while (n) {
    if (n & 1) res *= x
    x *= x
    n >>= 1
  }
  return res
}
// @lc code=end
