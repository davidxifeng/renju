import { Layer, Line, Rect } from 'react-konva'
import {
  BOARD_COLUMN_COUNT,
  BOARD_ROW_COUNT,
  STAGE_HEIGHT,
  STAGE_WIDTH,
} from './const'
import _ from 'underscore'


const GRID_GAP = 32

// 32 * 14 = 448
const rowLineLength = (BOARD_COLUMN_COUNT - 1) * GRID_GAP
const columnLineLength = (BOARD_ROW_COUNT - 1) * GRID_GAP
const baseX = (STAGE_WIDTH - rowLineLength) / 2
const baseY = (STAGE_HEIGHT - columnLineLength) / 2

const rowLinePoints = [0, 0, rowLineLength, 0]
const columnLinePoints = [0, 0, 0, columnLineLength]

export const Board = () => {
  return (
    <Layer listening={false}>
      <Rect
        x={0}
        y={0}
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        fill="antiquewhite"
        cornerRadius={16}
      />
      {_.range(BOARD_ROW_COUNT).map(value => {
        const top = value * GRID_GAP + baseY
        return (
          <Line
            key={value}
            x={95}
            y={top}
            points={rowLinePoints}
            stroke="black"
            strokeWidth={1}
          />
        )
      })}
      {_.range(BOARD_COLUMN_COUNT).map(value => {
        const left = value * GRID_GAP + baseX
        return (
          <Line
            key={value}
            x={left}
            y={15}
            points={columnLinePoints}
            stroke="black"
            strokeWidth={1}
          />
        )
      })}
    </Layer>
  )
}
