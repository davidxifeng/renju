import React from 'react'
import { ReactReduxContext, useDispatch } from 'react-redux'
import { Stage } from 'react-konva'
import Konva from 'konva'

import { BoardLayer } from './BoardLayer'
import { STAGE_WIDTH, STAGE_HEIGHT } from './const'
import { gameActions } from '../../store/game'
import { stageMousePositionToChessCoordinate } from './functions'
import { GameLayer } from './GameLayer'

export const KonvaStage = () => {
  const dispatch = useDispatch()
  const onBoardClick = React.useCallback(
    (event: Konva.KonvaEventObject<MouseEvent>) => {
      const pos = event.target.getStage()?.getPointerPosition()
      if (pos != null) {
        const r = stageMousePositionToChessCoordinate(pos)
        if (r !== false) {
          dispatch(gameActions.placeChessAt(r))
        }
      }
    },
    [dispatch],
  )

  return (
    <ReactReduxContext.Consumer>
      {context => (
        <Stage
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          onClick={onBoardClick}
          onTap={onBoardClick}
        >
          <ReactReduxContext.Provider value={context}>
            <BoardLayer />
            <GameLayer />
          </ReactReduxContext.Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  )
}
