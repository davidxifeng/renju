import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isPointEmpty } from './renju'
import { Move, BoardPosition } from './types'

export type GameData = {
  moveList: Move[]
  nextMoveStep: number
  isNextTurnBlack: boolean
}

const initialMoveList: Move[] = []

export const initialState: GameData = {
  moveList: initialMoveList,
  nextMoveStep: initialMoveList.length + 1,
  isNextTurnBlack: true,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    placeChessAt(state, action: PayloadAction<BoardPosition>) {
      const movePos = action.payload
      if (isPointEmpty(movePos, state.moveList)) {
        state.moveList.push({
          moveStep: state.nextMoveStep,
          boardX: movePos.boardX,
          boardY: movePos.boardY,
          isBlack: state.isNextTurnBlack,
        })

        state.nextMoveStep += 1
        state.isNextTurnBlack = !state.isNextTurnBlack
      }
    },
  },
})

export const gameActions = gameSlice.actions