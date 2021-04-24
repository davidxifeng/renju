import { ReactReduxContext } from 'react-redux'
import { Stage } from 'react-konva'
import { Flex } from '@chakra-ui/react'

import { BoardLayer } from './Board'
import { STAGE_WIDTH, STAGE_HEIGHT } from './const'
import { ChessLayer } from './Chess'

export const KonvaStage = () => {
  return (
    <Flex justifyContent="center" padding={5}>
      <ReactReduxContext.Consumer>
        {context => (
          <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
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
