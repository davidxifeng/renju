import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BoardPosition } from './types'

export type UIState = {
}

export const initialState: UIState = {
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        clickOnBoard(state, action: PayloadAction<BoardPosition>) {
            console.log('click on board: ', action.payload)
        }
    }
})