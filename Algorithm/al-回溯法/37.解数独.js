/*
 * @lc app=leetcode.cn id=37 lang=javascript
 *
 * [37] 解数独
 *
 * https://leetcode-cn.com/problems/sudoku-solver/description/
 *
 * algorithms
 * Hard (67.03%)
 * Likes:    945
 * Dislikes: 0
 * Total Accepted:    99K
 * Total Submissions: 147.6K
 * Testcase Example:  '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]'
 *
 * 编写一个程序，通过填充空格来解决数独问题。
 *
 * 数独的解法需 遵循如下规则：
 *
 *
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
 *
 *
 * 数独部分空格内已填入了数字，空白格用 '.' 表示。
 *
 *
 *
 *
 *
 *
 * 示例：
 *
 *
 * 输入：board =
 * [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
 *
 * 输出：[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
 * 解释：输入的数独如上图所示，唯一有效的解决方案如下所示：
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * board.length == 9
 * board[i].length == 9
 * board[i][j] 是一位数字或者 '.'
 * 题目数据 保证 输入数独仅有一个解
 *
 *
 *
 *
 *
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  let result = []

  const backTrack = board => {
    // 先遍历行
    for (let i = 0; i < board.length; i++) {
      // 再遍历列
      for (let j = 0; j < board[0].length; j++) {
        // 遇到原始数据则直接跳过（不需要放置）
        if (board[i][j] !== '.') continue
        // 一行一列确定下来之后，递归遍历这个位置放9个数字的可能性
        for (let val = 1; val <= 9; val++) {
          // 该值无效则跳过
          if (!isValidPosition(i, j, `${val}`, board)) continue
          // 有效则填充
          board[i][j] = `${val}`
          if (backTrack(board)) return true // 找到合适一组立刻返回
          board[i][j] = '.' // 回溯
        }
        // 9个数遍历完还没合适的，立刻返回false（无解）
        return false
      }
    }
    // 遍历完没有返回 false，说明找到了合适的棋盘位置
    return true
  }

  backTrack(board)
}
// 判断位置是否合法
var isValidPosition = function (row, col, val, chessboard) {
  // 判断行
  for (let i = 0; i < 9; i++) {
    if (chessboard[row][i] === val) return false
  }
  // 判断列
  for (let i = 0; i < 9; i++) {
    if (chessboard[i][col] === val) return false
  }
  // 9宫格内
  const boxStartRow = ((row / 3) | 0) * 3 // 9宫格的起始行
  const boxStartCol = ((col / 3) | 0) * 3 // 9宫格的起始列
  for (let i = boxStartRow; i < boxStartRow + 3; i++) {
    for (let j = boxStartCol; j < boxStartCol + 3; j++) {
      if (chessboard[i][j] === val) return false
    }
  }

  return true
}
// @lc code=end
