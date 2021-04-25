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
