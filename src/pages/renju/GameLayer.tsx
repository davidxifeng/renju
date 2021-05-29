import { Layer } from 'react-konva'

import { UIGroup } from './UI'
import { ChessGroup } from './Chess'

export const GameLayer = () => {

  return (
    <Layer>
      <ChessGroup />
      <UIGroup />
    </Layer>
  )
}
