import { Layer, Line, Rect, Circle, Text } from 'react-konva'
import {
  BOARD_COLUMN_COUNT,
  BOARD_ROW_COUNT,
  GRID_GAP,
  TAG_RADIUS,
  STAGE_HEIGHT,
  STAGE_WIDTH,
} from './const'
import _ from 'underscore'
import React from 'react'

const rowLineLength = (BOARD_COLUMN_COUNT - 1) * GRID_GAP
const columnLineLength = (BOARD_ROW_COUNT - 1) * GRID_GAP
export const baseX = (STAGE_WIDTH - rowLineLength) / 2
export const baseY = (STAGE_HEIGHT - columnLineLength) / 2

const rowLinePoints = [0, 0, rowLineLength, 0]
const columnLinePoints = [0, 0, 0, columnLineLength]

const tagXU = (BOARD_COLUMN_COUNT + 1) / 4
const tagYU = (BOARD_ROW_COUNT + 1) / 4

const tagPosList = [
  {
    x: (tagXU * 2 - 1) * GRID_GAP,
    y: (tagYU * 2 - 1) * GRID_GAP,
  },
  {
    x: (tagXU - 1) * GRID_GAP,
    y: (tagYU - 1) * GRID_GAP,
  },
  {
    x: (tagXU * 3 - 1) * GRID_GAP,
    y: (tagYU - 1) * GRID_GAP,
  },
  {
    x: (tagXU - 1) * GRID_GAP,
    y: (tagYU * 3 - 1) * GRID_GAP,
  },
  {
    x: (tagXU * 3 - 1) * GRID_GAP,
    y: (tagYU * 3 - 1) * GRID_GAP,
  },
]

export const BoardLayer = () => {
  return (
    <Layer listening={false}>
      {/* 整个canvas的背景 */}
      <Rect
        x={0}
        y={0}
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        fill="antiquewhite"
        cornerRadius={16}
      />
      {/* 横向的线 */}
      {_.range(BOARD_ROW_COUNT).map(value => (
        <React.Fragment key={value}>
          <Text
            text={String(value + 1)}
            fontSize={16}
            x={baseX + rowLineLength + 16 / 2}
            y={value * GRID_GAP + baseY - 16 / 2}
            align={'center'}
            verticalAlign={'middle'}
            fill={'#38a169'}
          />
          <Line
            x={baseX}
            y={value * GRID_GAP + baseY}
            points={rowLinePoints}
            stroke="#ccc"
            strokeWidth={1}
          />
        </React.Fragment>
      ))}
      {/* 纵向的线 */}
      {_.range(BOARD_COLUMN_COUNT).map(value => (
        <React.Fragment key={value}>
          <Text
            text={String(value + 1)}
            fontSize={16}
            x={value * GRID_GAP + baseX - 16 / 2}
            y={baseY + columnLineLength + 16 / 2}
            align={'center'}
            verticalAlign={'middle'}
            fill={'#3182ce'}
          />
          <Line
            x={value * GRID_GAP + baseX}
            y={baseY}
            points={columnLinePoints}
            stroke="#ccc"
            strokeWidth={1}
          />
        </React.Fragment>
      ))}
      {/* 中心等特殊位置的标记 */}
      {tagPosList.map(({ x, y }, index) => (
        <Circle
          key={index}
          x={x + baseX}
          y={y + baseY}
          fill="#ccc"
          radius={TAG_RADIUS}
        />
      ))}
    </Layer>
  )
}
