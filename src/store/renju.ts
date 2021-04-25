import { BOARD_COLUMN_COUNT, BOARD_ROW_COUNT } from "../pages/renju/const"
import { BoardPosition, Move } from "./types"
import _ from 'underscore'
import { boardPosToIndex } from "../pages/renju/functions"

export type PointState = {
  coordX: number
  coordY: number
  isBlack?: boolean
  /**
   * 0: 代表棋盘上初始已有的棋子，表示残局时使用
   * 1 - N： 表示第N步时下的棋子
   */
  moveStep: number
}


export const buildPointStateList = (moveList: Move[]) => {
  const pointStateList: PointState[] = _.range(BOARD_ROW_COUNT)
    .map(y =>
      _.range(BOARD_COLUMN_COUNT).map(x => ({
        coordX: x + 1,
        coordY: y + 1,
        moveStep: 0,
      })),
    )
    .flat()
  for (const move of moveList) {
    const { moveStep, boardX, boardY, isBlack: chess, } = move
    const pointState = pointStateList[boardPosToIndex(boardX, boardY)]
    pointState.moveStep = moveStep
    pointState.isBlack = chess
  }
  return pointStateList
}

export const isPointEmpty = (bp: BoardPosition, moveList: Move[]) => {
  for (const { boardX, boardY } of moveList) {
    if (bp.boardX === boardX && bp.boardY === boardY) {
      return false
    }
  }
  return true
}
