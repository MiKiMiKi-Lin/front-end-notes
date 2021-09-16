/*
 * @lc app=leetcode.cn id=90 lang=javascript
 *
 * [90] 子集 II
 *
 * https://leetcode-cn.com/problems/subsets-ii/description/
 *
 * algorithms
 * Medium (63.36%)
 * Likes:    650
 * Dislikes: 0
 * Total Accepted:    135.4K
 * Total Submissions: 213.7K
 * Testcase Example:  '[1,2,2]'
 *
 * 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
 *
 * 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,2]
 * 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0]
 * 输出：[[],[0]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10
 *
 *
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums 存在重复元素
 * @return {number[][]} 求取的子集要去重
 */
var subsetsWithDup = function (nums) {
  let result = []
  let path = []

  const backTrack = start => {
    result.push([...path])

    // let pre = -Infinity
    for (let i = start; i < nums.length; i++) {
      const item = nums[i]
      if (i > start && nums[i - 1] === item) continue

      path.push(item)
      //   pre = item
      backTrack(i + 1)
      path.pop()
    }
  }

  // 先排序
  nums.sort((a, b) => a - b)
  backTrack(0)
  return result
}
// @lc code=end
