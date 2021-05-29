import { useSelector } from 'react-redux'
import { Circle, Text } from 'react-konva'
import {
  BOARD_ROW_COUNT,
  ChessTextFontSize,
  ChessTextWidth,
  CHESS_RADIUS,
} from './const'

import { baseX, baseY } from './BoardLayer'
import { uiPositionFromLogicalPos } from './functions'
import { Move } from '../../store/types'
import { UIState } from '../../store/ui'
import { moveListSelector, uiSelector } from '../../store/selectors'

type ChessProps = {
  move: Move
  ui: UIState
}

const Chess = (props: ChessProps) => {
  const { moveStep, boardX, boardY, isBlack } = props.move
  const ui = props.ui
  const pos = uiPositionFromLogicalPos(boardX, boardY)
  const px = pos.px + baseX
  const py = pos.py + baseY
  return (
    <>
      <Circle
        x={px}
        y={py}
        fill={isBlack ? 'black' : 'white'}
        radius={CHESS_RADIUS}
      />
      {moveStep > 0 && ui.showStepOnChess && (
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
      {ui.showChessPosInfo && (
        <Text
          text={`${boardX}-${boardY} (${boardX + boardY - 1}/${
            boardX + BOARD_ROW_COUNT - boardY + 1 - 1
          })`}
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
    </>
  )
}

export const ChessGroup = () => {
  const moveList = useSelector(moveListSelector)
  const ui = useSelector(uiSelector)

  return (
    <>
      {moveList.map((value, index) => (
        <Chess key={index} ui={ui} move={value} />
      ))}
    </>
  )
}
