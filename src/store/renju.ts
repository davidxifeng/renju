import _ from 'underscore'

import { BOARD_COLUMN_COUNT, BOARD_ROW_COUNT } from '../pages/renju/const'
import { BoardPosition, Move } from './types'
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
export type LineChessInfo = {
  rowLines: Map<number, Move[]>
  columnLines: Map<number, Move[]>
  zxLines: Map<number, Move[]>
  zyLines: Map<number, Move[]>
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

export const groupChessesByLines = (moveList: Move[]): LineChessInfo => {
  const lineSet: LineChessInfo = {
    rowLines: new Map(),
    columnLines: new Map(),
    zxLines: new Map(),
    zyLines: new Map(),
  }
  const { rowLines, columnLines, zxLines, zyLines } = lineSet
  for (const move of moveList) {
    const { boardX, boardY } = move
    if (rowLines.has(boardY)) {
      rowLines.get(boardY)?.push(move)
    } else {
      rowLines.set(boardY, [move])
    }
    if (columnLines.has(boardX)) {
      columnLines.get(boardX)?.push(move)
    } else {
      columnLines.set(boardX, [move])
    }
    const zx = normalizeZ(boardX, boardY)
    if (zx !== false) {
      if (zxLines.has(zx)) {
        zxLines.get(zx)?.push(move)
      } else {
        zxLines.set(zx, [move])
      }
    }
    const zy = normalizeZ(boardX, BOARD_ROW_COUNT - boardY + 1)
    if (zy !== false) {
      if (zyLines.has(zy)) {
        zyLines.get(zy)?.push(move)
      } else {
        zyLines.set(zy, [move])
      }
    }
  }
  return lineSet
}

/**
 * 分析x轴线，暂时只检测5连
 * @param rowLines
 * @returns false, 或者5连的左侧起点
 */
const checkRowLine = (pointList: Move[]): false | Move => {

  if (pointList.length < 5) {
    return false
  }
  console.log('check same line points: ', pointList.map(v => `${v.moveStep} `).join())

  pointList.sort((a, b) => a.boardX - b.boardX)

  let prevValue = pointList[0]
  let maxN = 1
  for (let i = 1; i < pointList.length; i++) {
    const currentValue = pointList[i]
    if (
      prevValue.isBlack === currentValue.isBlack &&
      prevValue.boardX + 1 === currentValue.boardX
    ) {
      maxN += 1
      if (maxN === 5) {
        console.log('find five at: ', pointList[i - 4])
        return pointList[i - 4]
      }
    } else {
      maxN = 1
    }
    prevValue = currentValue
  }

  return false
}

const checkRowLines = (
  rowLines: Map<number, Move[]>,
): false | BoardPosition => {
  // 暂时检查到一个时就停止
  for (const value of rowLines.values()) {
    const r = checkRowLine(value)
    if (r !== false) {
      return r
    }
  }
  return false
}

export const isGameEnd = (moveList: Move[]): boolean => {
  const lineInfo = groupChessesByLines(moveList)
  if (checkRowLines(lineInfo.rowLines) !== false) {
    return true
  }

  return false
}
