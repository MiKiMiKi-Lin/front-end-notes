/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 *
 * https://leetcode-cn.com/problems/n-queens/description/
 *
 * algorithms
 * Hard (73.91%)
 * Likes:    1013
 * Dislikes: 0
 * Total Accepted:    151.3K
 * Total Submissions: 204.7K
 * Testcase Example:  '4'
 *
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 *
 * 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
 *
 *
 *
 * 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 4
 * 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * 解释：如上图所示，4 皇后问题存在两个不同的解法。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：[["Q"]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
 *
 *
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const result = []
  // 初始化棋盘
  const chessboard = new Array(n).fill([]).map(() => new Array(n).fill('.'))

  const backTrack = row => {
    if (row === n) {
      result.push(getstrListResult(chessboard))
      return
    }
    for (let col = 0; col < n; col++) {
      // 剪枝
      if (!isVaildPosition(n, row, col, chessboard)) continue

      chessboard[row][col] = 'Q'
      backTrack(row + 1)
      // 回溯撤销
      chessboard[row][col] = '.'
    }
  }

  backTrack(0)
  return result
}
// 是否n皇后不被攻击的位置
var isVaildPosition = function (n, row, col, chessboard) {
  // 检查列
  for (let i = 0; i < row; i++) {
    if (chessboard[i][col] === 'Q') return false
  }
  // 检查左斜线
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (chessboard[i][j] === 'Q') return false
  }
  // 检查右斜线
  for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
    if (chessboard[i][j] === 'Q') return false
  }

  return true
}
// 获取字符串数组结果
var getstrListResult = function (chessboard) {
  let arr = []
  chessboard.forEach(row => {
    arr.push(row.join(''))
  })
  return arr
  // 也可以直接用reduce
  //  return chessboard.reduce((prev, cur) => [...prev, cur.join('')], [])
}
// @lc code=end
