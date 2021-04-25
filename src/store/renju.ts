import { BOARD_COLUMN_COUNT, BOARD_ROW_COUNT } from '../pages/renju/const'
import { BoardPosition, Move } from './types'
import _ from 'underscore'
import { boardPosToIndex } from '../pages/renju/functions'

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
    const { moveStep, boardX, boardY, isBlack: chess } = move
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

/**
 * X: 横线
 * Y: 纵线
 * ZX: /斜线 编号范围 [1 ~ (row_count + column_count - 1)], 有效范围: [5 ~ max - 4]
 * ZY: \斜线 同上 坐标->编号 转换方法: x + (row_count - y + 1) - 1
 */
export type LineSet = {
  xLines: Set<number>
  yLines: Set<number>
  zxLines: Set<number>
  zyLines: Set<number>
}

const maxValidZ = BOARD_ROW_COUNT + BOARD_COLUMN_COUNT - 5

const normalizeZ = (x: number, y: number): number | false => {
  const zNumber = x + y - 1
  if (zNumber >= 5 && zNumber <= maxValidZ) {
    return zNumber
  } else {
    return false
  }
}

export const calcCheckLines = (moveList: Move[]) => {
  const lineSet: LineSet = {
    xLines: new Set(),
    yLines: new Set(),
    zxLines: new Set(),
    zyLines: new Set(),
  }
  for (const { boardX, boardY } of moveList) {
    lineSet.xLines.add(boardY)
    lineSet.yLines.add(boardX)
    const zx = normalizeZ(boardX, boardY)
    if (zx !== false) {
      lineSet.zxLines.add(zx)
    }
    const zy = normalizeZ(boardX, BOARD_ROW_COUNT - boardY + 1)
    if (zy !== false) {
      lineSet.zyLines.add(zy)
    }
    console.log(`x: ${boardX} y: ${boardY} zx: ${zx} zy: ${zy}`)
  }
  return lineSet
}

export const isGameEnd = (moveList: Move[]): boolean => {
  return false
}
