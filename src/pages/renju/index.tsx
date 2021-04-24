import { ReactReduxContext } from 'react-redux'
import { Stage } from 'react-konva'
import { Flex } from '@chakra-ui/react'

import { Board } from './Board'
import { STAGE_WIDTH, STAGE_HEIGHT } from './const'

export const KonvaStage = () => {
  return (
    <Flex justifyContent="center" padding={5}>
      <ReactReduxContext.Consumer>
        {context => (
          <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
            <ReactReduxContext.Provider value={context}>
              <Board />
            </ReactReduxContext.Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  )
}
