/** 方法二：前缀和 + 哈希表
 * pre[i]−pre[j−1]==k，可得符合条件的下标 j 满足：pre[j−1]==pre[i]−k
 * 有点难理解，详情可看官方解释：https://leetcode-cn.com/problems/subarray-sum-equals-k/solution/he-wei-kde-zi-shu-zu-by-leetcode-solution/
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const countMap = new Map()
  countMap.set(0, 1)

  let count = 0 // 符合条件的pre[j]的个数
  let pre = 0 // 当前前缀和
  for (let i = 0; i < nums.length; i++) {
    // 计算 前缀和
    pre += nums[i]
    // 找到符合 pre[i] - k 的 pre[j]， 其中 pre[i] - pre[j]= k
    if (countMap.has(pre - k)) {
      count += countMap.get(pre - k)
    }
    // 将结果放入Map中
    if (countMap.has(pre)) {
      countMap.set(pre, countMap.get(pre) + 1)
    } else {
      countMap.set(pre, 1)
    }
  }
  return count
}

/** 方法一：枚举(不推荐，执行结果：超出时间限制)
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
//  var subarraySum = function (nums, k) {
//     let count = 0
//     for (let i = 0; i < nums.length; i++) {
//       let sum = 0
//       for (let j = i; j >= 0; j--) {
//         sum += nums[j]

//         if (sum === k) {
//           count++
//         }
//       }
//     }
//     return count
//   }
