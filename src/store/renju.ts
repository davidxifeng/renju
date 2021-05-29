import _ from 'underscore'

import { BOARD_COLUMN_COUNT, BOARD_ROW_COUNT } from '../pages/renju/const'
import { BoardPosition, LineType, Move } from './types'
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

/**
 * 检测坐标是否已经有落子
 * @param bp 检测的位置
 * @param moveList 落子list
 * @returns 目标位置没有落子时返回true
 */
export const isPointEmpty = (bp: BoardPosition, moveList: Move[]) => {
  for (const { boardX, boardY } of moveList) {
    if (bp.boardX === boardX && bp.boardY === boardY) {
      return false
    }
  }
  return true
}

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

const isSameLine = (moveA: Move, moveB: Move) => {
  return (
    moveA.boardX === moveB.boardX ||
    moveA.boardY === moveB.boardY ||
    moveA.boardX + moveA.boardY === moveB.boardX + moveB.boardY ||
    moveA.boardX - moveA.boardY === moveB.boardX - moveB.boardY
  )
}

export const groupChessesByLines = (
  moveList: Move[],
  onlyCheckLastMove: boolean,
): LineChessInfo => {
  const rowLines = new Map(),
    columnLines = new Map(),
    zxLines = new Map(),
    zyLines = new Map()
  const lastMove = moveList[moveList.length - 1]
  for (const move of moveList) {
    if (onlyCheckLastMove && !isSameLine(lastMove, move)) {
      continue
    }

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
  return { rowLines, columnLines, zxLines, zyLines }
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
        return pointList[i - 4]
      }
    } else {
      maxN = 1
    }
    prevValue = currentValue
  }

  return false
}

const checkColumnLine = (pointList: Move[]): false | Move => {
  if (pointList.length < 5) {
    return false
  }

  pointList.sort((a, b) => a.boardY - b.boardY)

  let prev = pointList[0]
  let maxN = 1
  for (let i = 1; i < pointList.length; i++) {
    const curr = pointList[i]
    if (prev.isBlack === curr.isBlack && prev.boardY + 1 === curr.boardY) {
      maxN += 1
      if (maxN === 5) {
        return pointList[i - 4]
      }
    } else {
      maxN = 1
    }
    prev = curr
  }

  return false
}

const checkZXLine = (pointList: Move[]): false | Move => {
  if (pointList.length < 5) {
    return false
  }

  pointList.sort((a, b) => a.boardX - b.boardX)

  let prev = pointList[0]
  let maxN = 1
  for (let i = 1; i < pointList.length; i++) {
    const curr = pointList[i]
    if (prev.isBlack === curr.isBlack && prev.boardY - 1 === curr.boardY) {
      maxN += 1
      if (maxN === 5) {
        return pointList[i - 4]
      }
    } else {
      maxN = 1
    }
    prev = curr
  }

  return false
}
const checkZYLine = (pointList: Move[]): false | Move => {
  if (pointList.length < 5) {
    return false
  }

  pointList.sort((a, b) => a.boardX - b.boardX)

  let prev = pointList[0]
  let maxN = 1
  for (let i = 1; i < pointList.length; i++) {
    const curr = pointList[i]
    if (prev.isBlack === curr.isBlack && prev.boardY + 1 === curr.boardY) {
      maxN += 1
      if (maxN === 5) {
        return pointList[i - 4]
      }
    } else {
      maxN = 1
    }
    prev = curr
  }

  return false
}
type LineChecker = (pointList: Move[]) => false | Move

const checkLines = (
  checker: LineChecker,
  columnLines: Map<number, Move[]>,
): false | Move => {
  for (const lineChessList of columnLines.values()) {
    const r = checker(lineChessList)
    if (r !== false) {
      return r
    }
  }
  return false
}

export type WinResult = {
  lineType: LineType
  startPos: Move
}
export type CheckResult = WinResult | false

/**
 * 检测下棋过程中，是否产生了5连
 * @param moveList 当前棋盘
 * @returns
 */
export const checkNewFiveInGaming = (
  moveList: Move[],
  onlyCheckLastMove = false,
): CheckResult => {
  const { rowLines, columnLines, zxLines, zyLines } = groupChessesByLines(
    moveList,
    onlyCheckLastMove,
  )

  const r1 = checkLines(checkRowLine, rowLines)
  if (r1 !== false) {
    return {
      lineType: 'Row',
      startPos: r1,
    }
  }
  const r2 = checkLines(checkColumnLine, columnLines)
  if (r2 !== false) {
    return {
      lineType: 'Column',
      startPos: r2,
    }
  }
  const r3 = checkLines(checkZXLine, zxLines)
  if (r3 !== false) {
    return {
      lineType: 'ZX',
      startPos: r3,
    }
  }
  const r4 = checkLines(checkZYLine, zyLines)
  if (r4 !== false) {
    return {
      lineType: 'ZY',
      startPos: r4,
    }
  }

  return false
}
