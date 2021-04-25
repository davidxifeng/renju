import { ReactReduxContext, useDispatch } from 'react-redux'
import { Stage } from 'react-konva'
import { Flex } from '@chakra-ui/react'

import { BoardLayer } from './Board'
import { STAGE_WIDTH, STAGE_HEIGHT } from './const'
import { ChessLayer, stageMousePositionToChessCoordinate } from './Chess'
import React from 'react'
import { KonvaEventObject } from 'konva/types/Node'
import { gameActions } from '../../store/game'

export const KonvaStage = () => {
  const dispatch = useDispatch()
  const onBoardClick = React.useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
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
    <Flex justifyContent="center" padding={0}>
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
              <ChessLayer />
            </ReactReduxContext.Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  )
}
