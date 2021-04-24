import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Point = {
  x: number
  y: number
}

export type Move = {
  serial: number
  position: Point
}

export type GameData = {
  moveList: Move[]
}

export const initialState: GameData = {
  moveList: [],
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addMove(state, action: PayloadAction<Point>) {
      const serial = state.moveList.length + 1
      state.moveList.push({
        serial: serial,
        position: action.payload,
      })
    },
  },
})
