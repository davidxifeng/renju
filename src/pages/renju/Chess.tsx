import _ from 'underscore'
import { Circle, Layer, Text } from 'react-konva'
import {
  BOARD_COLUMN_COUNT,
  BOARD_ROW_COUNT,
  ChessTextFontSize,
  ChessTextWidth,
  CHESS_RADIUS,
  GRID_GAP,
} from './const'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { baseX, baseY } from './Board'
import React from 'react'
import { Vector2d } from 'konva/types/types'
import { BoardPosition } from '../../store/types'

export const chessPositionList = _.range(BOARD_ROW_COUNT)
  .map(y =>
    _.range(BOARD_COLUMN_COUNT).map(x => ({
      x,
      y,
      px: x * GRID_GAP,
      py: y * GRID_GAP,
    })),
  )
  .flat()

/**
 *
 * @param x 棋盘x轴位置 1 - N
 * @param y 棋盘y轴位置 1 - N
 * @returns 棋盘位置list下标
 */
export const logicalPosToIndex = (x: number, y: number): number => {
  if (x < 1 || x > BOARD_COLUMN_COUNT || y < 1 || y > BOARD_ROW_COUNT) {
    throw new Error(`bad logical chess position: ${x} ${y}`)
  }
  return (y - 1) * BOARD_ROW_COUNT + x - 1
}

export const uiPositionFromLogicalPos = (x: number, y: number) => {
  return chessPositionList[logicalPosToIndex(x, y)]
}

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
        x: inGridX + 1,
        y: inGridY + 1,
      }
    }
  } else {
    return false
  }
}

const moveListSelector = (state: RootState) => state.game.moveList

export const ChessLayer = () => {
  const moveList = useSelector(moveListSelector)

  return (
    <Layer>
      {moveList.map((value, index) => {
        const {
          serial,
          position: { x, y },
        } = value
        const pos = uiPositionFromLogicalPos(x, y)
        const px = pos.px + baseX
        const py = pos.py + baseY
        const isWhiteChess = serial % 2 === 0
        return (
          <React.Fragment key={index}>
            <Circle
              x={px}
              y={py}
              fill={isWhiteChess ? 'white' : 'black'}
              radius={CHESS_RADIUS}
            />
            {false && (
              <Circle
                x={px + GRID_GAP / 2}
                y={py + GRID_GAP / 2}
                fill={isWhiteChess ? 'white' : 'black'}
                stroke="red"
                radius={CHESS_RADIUS}
              />
            )}
            <Text
              text={String(serial)}
              fontSize={ChessTextFontSize}
              x={px - ChessTextWidth / 2}
              y={py - ChessTextWidth / 2}
              width={ChessTextWidth}
              height={ChessTextWidth}
              align={'center'}
              verticalAlign={'middle'}
              fill={isWhiteChess ? 'black' : 'white'}
            />
          </React.Fragment>
        )
      })}
    </Layer>
  )
}
