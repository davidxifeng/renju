import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type BoardPosition = {
  /**
   * 棋盘横向位置， 范围 1 - N
   */
  x: number

  /**
   * 棋盘纵向位置， 范围 1 - N
   */
  y: number
}

export type Move = {
  serial: number
  position: BoardPosition
}

export type GameData = {
  moveList: Move[]
}

export const initialState: GameData = {
  moveList: [
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
  ],
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addMove(state, action: PayloadAction<BoardPosition>) {
      const serial = state.moveList.length + 1
      state.moveList.push({
        serial: serial,
        position: action.payload,
      })
    },
  },
})
