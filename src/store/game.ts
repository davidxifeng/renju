import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { checkNewFiveInGaming, CheckResult, isPointEmpty } from './renju'
import { Move, BoardPosition } from './types'

/**
 * AI: 人机对战模式
 * Board: 棋盘only
 */
export type GameMode = 'AI' | 'Board'

export type GameScene = 'Menu' | 'Gameing' | 'Result'

export type GameData = {
  gameScene: GameScene

  gameMode: GameMode

  /**
   * 落子列表
   */
  moveList: Move[]
  /**
   * 下一步的序号
   */
  nextMoveStep: number
  /**
   * 下一步是否黑
   */
  isNextTurnBlack: boolean
  winner: 'black' | 'white' | 'nil'
  checkResult: CheckResult
}

const initialMoveList: Move[] = []

export const initialState: GameData = {
  gameScene: 'Menu',
  gameMode: 'Board',
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
    setGameMode(state, action: PayloadAction<GameMode>) {

    },
    placeChessAt(state, action: PayloadAction<BoardPosition>) {
      const movePos = action.payload

      // 检查目标位置是否空
      if (
        state.checkResult === false &&
        isPointEmpty(movePos, state.moveList)
      ) {
        // 落子
        state.moveList.push({
          moveStep: state.nextMoveStep,
          boardX: movePos.boardX,
          boardY: movePos.boardY,
          isBlack: state.isNextTurnBlack,
        })

        // 落子后判断是否有五连,是否游戏结束
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
