import { Vector2d } from 'konva/types/types'

import { BoardPosition } from '../../store/types'
import { baseX, baseY } from './Board'
import { BOARD_COLUMN_COUNT, BOARD_ROW_COUNT, CHESS_RADIUS, GRID_GAP } from './const'

export const isPointOutOfCircle = (
  dx: number,
  dy: number,
  radius: number,
): boolean => {
  const adx = Math.abs(dx)
  const ady = Math.abs(dy)
  if (adx + ady <= radius) {
    return false
  }
  if (adx > radius || ady > radius) {
    return true
  }
  return adx * adx + ady * ady > radius * radius
}

export const stageMousePositionToChessCoordinate = (
  pos: Vector2d,
): BoardPosition | false => {
  const { x, y } = pos
  const offsetX = x + GRID_GAP / 2 - baseX
  const offsetY = y + GRID_GAP / 2 - baseY
  if (
    offsetX >= 0 &&
    offsetX <= BOARD_COLUMN_COUNT * GRID_GAP &&
    offsetY >= 0 &&
    offsetY <= BOARD_ROW_COUNT * GRID_GAP
  ) {
    const inGridX = Math.floor(offsetX / GRID_GAP)
    const inGridY = Math.floor(offsetY / GRID_GAP)
    const circleCenterX = GRID_GAP * inGridX
    const circleCenterY = GRID_GAP * inGridY
    const dx = offsetX - GRID_GAP / 2 - circleCenterX
    const dy = offsetY - GRID_GAP / 2 - circleCenterY
    if (isPointOutOfCircle(dx, dy, CHESS_RADIUS)) {
      return false
    } else {
      return {
        boardX: inGridX + 1,
        boardY: inGridY + 1,
      }
    }
  } else {
    return false
  }
}

/**
 *
 * @param x 棋盘x轴位置 1 - N
 * @param y 棋盘y轴位置 1 - N
 * @returns 棋盘位置list下标
 */
export const boardPosToIndex = (x: number, y: number): number => {
  if (x >= 1 && x <= BOARD_COLUMN_COUNT && y >= 1 && y <= BOARD_ROW_COUNT) {
    return (y - 1) * BOARD_ROW_COUNT + x - 1
  } else {
    throw new Error(`bad logical chess position: ${x} ${y}`)
  }
}
