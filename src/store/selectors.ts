import { RootState } from "."

export const gameSelector = (state: RootState) => state.game
export const moveListSelector = (state: RootState) => state.game.moveList
export const uiSelector = (state: RootState) => state.ui
