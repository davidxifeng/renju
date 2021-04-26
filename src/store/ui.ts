import { createSlice } from '@reduxjs/toolkit'

export type UIState = {
  showStepOnChess: boolean
  showChessPosInfo: boolean
}

export const initialState: UIState = {
  showStepOnChess: true,
  showChessPosInfo: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleShowStep(state) {
      state.showStepOnChess = !state.showStepOnChess
    },
    toggleShowPosInfo(state) {
      state.showChessPosInfo = !state.showChessPosInfo
    },
  },
})

export const uiActions = uiSlice.actions