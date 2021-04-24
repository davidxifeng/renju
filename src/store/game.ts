import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Move, BoardPosition } from './types'

export type GameData = {
  moveList: Move[]
}

export const initialState: GameData = {
  moveList: [],
}

const isCoordinateEmpty = (coord: BoardPosition, moveList: Move[]) => {
  for (const { position } of moveList) {
    if (position.x === coord.x && position.y === coord.y) {
      return false
    }
  }
  return true
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    placeChessAt(state, action: PayloadAction<BoardPosition>) {
      const pos = action.payload
      const serial = state.moveList.length + 1
      if (isCoordinateEmpty(pos, state.moveList)) {
        state.moveList.push({
          serial: serial,
          position: action.payload,
        })
      }
    },
  },
})

export const gameActions = gameSlice.actions

export const demoMoveList = [
  { serial: 1, position: { x: 6, y: 8 } },
  { serial: 2, position: { x: 9, y: 9 } },
  { serial: 3, position: { x: 7, y: 8 } },
  { serial: 4, position: { x: 1, y: 1 } },
  { serial: 5, position: { x: 8, y: 8 } },
  { serial: 6, position: { x: 10, y: 8 } },
  { serial: 7, position: { x: 9, y: 8 } },
  { serial: 8, position: { x: 1, y: 2 } },
  { serial: 9, position: { x: 10, y: 8 } },
  { serial: 10, position: { x: 1, y: 3 } },
  { serial: 11, position: { x: 1, y: 3 } },
  { serial: 225, position: { x: 15, y: 15 } },
]
