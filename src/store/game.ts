import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { logicalPosToIndex } from '../pages/renju/Chess'
import { BOARD_COLUMN_COUNT, BOARD_ROW_COUNT } from '../pages/renju/const'
import { Move, BoardPosition } from './types'
import _ from 'underscore'

export type PointStatus = 'black' | 'white' | 'empty'

export type PointState = {
  coordX: number
  coordY: number
  pointStatus: PointStatus
  /**
   * 0: 代表棋盘上初始已有的棋子，表示残局时使用
   * 1 - N： 表示第N步时下的棋子
   */
  moveStep: number
}

export type GameData = {
  moveList: Move[]
  pointStateList: PointState[]
  nextMoveStep: number
}

const buildPointStateList = (moveList: Move[]) => {
  const pointStateList: PointState[] = _.range(BOARD_ROW_COUNT)
    .map(y =>
      _.range(BOARD_COLUMN_COUNT).map(x => ({
        coordX: x + 1,
        coordY: y + 1,
        pointStatus: 'empty' as PointStatus,
        moveStep: 0,
      })),
    )
    .flat()
  for (const move of moveList) {
    const {
      serial,
      position: { x, y },
    } = move
    const pointState = pointStateList[logicalPosToIndex(x, y)]
    pointState.moveStep = serial
    pointState.pointStatus = serial % 2 === 0 ? 'white' : 'black'
  }
  return pointStateList
}

export const initialState: GameData = {
  moveList: [],
  pointStateList: buildPointStateList([]),
  nextMoveStep: 1,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    placeChessAt(state, action: PayloadAction<BoardPosition>) {
      const pos = action.payload
      const serial = state.moveList.length + 1
      const index = logicalPosToIndex(pos.x, pos.y)
      const isPointEmpty = state.pointStateList[index].pointStatus === 'empty'
      if (isPointEmpty) {
        state.moveList.push({
          serial: serial,
          position: action.payload,
        })
        const pointState = state.pointStateList[index]
        pointState.pointStatus = serial % 2 === 0 ? 'white' : 'black'
        pointState.moveStep = serial
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
