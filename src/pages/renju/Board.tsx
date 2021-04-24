import { Layer, Line, Rect, Circle } from 'react-konva'
import {
  BOARD_COLUMN_COUNT,
  BOARD_ROW_COUNT,
  GRID_GAP,
  TAG_RADIUS,
  STAGE_HEIGHT,
  STAGE_WIDTH,
} from './const'
import _ from 'underscore'

const rowLineLength = (BOARD_COLUMN_COUNT - 1) * GRID_GAP
const columnLineLength = (BOARD_ROW_COUNT - 1) * GRID_GAP
export const baseX = (STAGE_WIDTH - rowLineLength) / 2
export const baseY = (STAGE_HEIGHT - columnLineLength) / 2

const rowLinePoints = [0, 0, rowLineLength, 0]
const columnLinePoints = [0, 0, 0, columnLineLength]

const tagPosList = [
  {
    x: ((BOARD_COLUMN_COUNT - 1) / 2) * GRID_GAP,
    y: ((BOARD_ROW_COUNT - 1) / 2) * GRID_GAP,
  },
  {
    x: 3 * GRID_GAP,
    y: 3 * GRID_GAP,
  },
  {
    x: (BOARD_COLUMN_COUNT - 3) * GRID_GAP,
    y: 3 * GRID_GAP,
  },
  {
    x: 3 * GRID_GAP,
    y: (BOARD_ROW_COUNT - 3) * GRID_GAP,
  },
  {
    x: (BOARD_COLUMN_COUNT - 3) * GRID_GAP,
    y: (BOARD_ROW_COUNT - 3) * GRID_GAP,
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
        <Line
          key={value}
          x={baseX}
          y={value * GRID_GAP + baseY}
          points={rowLinePoints}
          stroke="#ccc"
          strokeWidth={1}
        />
      ))}
      {/* 纵向的线 */}
      {_.range(BOARD_COLUMN_COUNT).map(value => (
        <Line
          key={value}
          x={value * GRID_GAP + baseX}
          y={baseY}
          points={columnLinePoints}
          stroke="#ccc"
          strokeWidth={1}
        />
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
