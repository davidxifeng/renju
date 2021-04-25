import React from 'react'
import _ from 'underscore'
import { useSelector } from 'react-redux'
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
import { baseX, baseY } from './Board'
import { boardPosToIndex } from './functions'
import { isGameEnd } from '../../store/renju'

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

export const uiPositionFromLogicalPos = (x: number, y: number) => {
  return chessPositionList[boardPosToIndex(x, y)]
}

const moveListSelector = (state: RootState) => state.game.moveList

export const ChessLayer = () => {
  const moveList = useSelector(moveListSelector)
  React.useEffect(() => {
    isGameEnd(moveList)

  }, [moveList])

  return (
    <Layer>
      {moveList.map((value, index) => {
        const { moveStep, boardX, boardY, isBlack } = value
        const pos = uiPositionFromLogicalPos(boardX, boardY)
        const px = pos.px + baseX
        const py = pos.py + baseY
        return (
          <React.Fragment key={index}>
            <Circle
              x={px}
              y={py}
              fill={isBlack ? 'black' : 'white'}
              radius={CHESS_RADIUS}
            />
            {moveStep > 0 && (
              <Text
                text={String(moveStep)}
                fontSize={ChessTextFontSize}
                x={px - ChessTextWidth / 2}
                y={py - ChessTextWidth / 2}
                width={ChessTextWidth}
                height={ChessTextWidth}
                align={'center'}
                verticalAlign={'middle'}
                fill={isBlack ? 'white' : 'black'}
              />
            )}
            {true && (
              <Text
                text={`${boardX}-${boardY} (${boardX + boardY - 1}/${boardX + BOARD_ROW_COUNT - boardY + 1 - 1})`}
                fontSize={ChessTextFontSize / 2}
                x={px - ChessTextWidth / 2}
                y={py - ChessTextWidth / 2 + 20}
                width={ChessTextWidth * 2}
                height={ChessTextWidth}
                align={'center'}
                verticalAlign={'middle'}
                fill={isBlack ? '#ccc' : 'blue'}
              />
            )}
          </React.Fragment>
        )
      })}
    </Layer>
  )
}
