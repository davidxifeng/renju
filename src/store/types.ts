export type BoardPosition = {
  /**
   * 棋盘横向坐标， 范围 1 - N
   */
  boardX: number

  /**
   * 棋盘纵向坐标， 范围 1 - N
   */
  boardY: number
}

export type Move = BoardPosition & {
  /**
   * 0: 棋盘上预置的棋子，残局时用
   * 1 - N: 黑白双方轮流下的棋子步数
   */
  moveStep: number
  isBlack: boolean
}

/**
 * X: 横线
 * Y: 纵线
 * ZX: /斜线 编号范围 [1 ~ (row_count + column_count - 1)], 有效范围: [5 ~ max - 4]
 * ZY: \斜线 同上 坐标->编号 转换方法: x + (row_count - y + 1) - 1
 */
export type LineType = 'Row' | 'Column' | 'ZX' | 'ZY'