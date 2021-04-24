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

export const uiPosition = (x: number, y: number) => {
  return chessPositionList[logicalPosToIndex(x, y)]
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
        const pos = uiPosition(x, y)
        const px = pos.px + baseX
        const py = pos.py + baseY
        const isWhiteChess = serial % 2 === 0
        return (
          <React.Fragment key={index}>
            <Circle
              key={index}
              x={px}
              y={py}
              fill={isWhiteChess ? 'white' : 'black'}
              radius={CHESS_RADIUS}
            />
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
