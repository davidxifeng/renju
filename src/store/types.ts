export type BoardPosition = {
  /**
   * 棋盘横向位置， 范围 1 - N
   */
  x: number

  /**
   * 棋盘纵向位置， 范围 1 - N
   */
  y: number
}

export type Move = {
  serial: number
  position: BoardPosition
}