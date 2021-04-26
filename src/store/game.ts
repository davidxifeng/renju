import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { checkNewFiveInGaming, CheckResult, isPointEmpty } from './renju'
import { Move, BoardPosition } from './types'

export type GameData = {
  moveList: Move[]
  nextMoveStep: number
  isNextTurnBlack: boolean
  winner: 'black' | 'white' | 'nil'
  checkResult: CheckResult
}

const initialMoveList: Move[] = []

export const initialState: GameData = {
  moveList: initialMoveList,
  nextMoveStep: initialMoveList.length + 1,
  isNextTurnBlack: true,
  checkResult: false,
  winner: 'nil',
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    placeChessAt(state, action: PayloadAction<BoardPosition>) {
      const movePos = action.payload

      if (
        state.checkResult === false &&
        isPointEmpty(movePos, state.moveList)
      ) {
        state.moveList.push({
          moveStep: state.nextMoveStep,
          boardX: movePos.boardX,
          boardY: movePos.boardY,
          isBlack: state.isNextTurnBlack,
        })

        const result = checkNewFiveInGaming(current(state.moveList), true)
        if (result === false) {
          state.nextMoveStep += 1
          state.isNextTurnBlack = !state.isNextTurnBlack
        } else {
          state.checkResult = result
          state.winner = state.isNextTurnBlack ? 'black' : 'white'
        }
      }
    },
    restart(state) {
      if (state.checkResult !== false) {
        state.nextMoveStep = 1
        state.isNextTurnBlack = true
        state.moveList = []
        state.winner = 'nil'
        state.checkResult = false
      }
    },
    drawback(state) {
      if (state.checkResult === false && state.moveList.length > 0) {
        state.moveList.pop()
        state.isNextTurnBlack = !state.isNextTurnBlack
        state.nextMoveStep -= 1
      }
    },
  },
})

export const gameActions = gameSlice.actions
