import { Stage } from 'react-konva'
import { ReactReduxContext } from 'react-redux'
import { Board } from './Board'

export const KonvaStage = () => {
  return (
    <ReactReduxContext.Consumer>
      {context => (
        <Stage width={640} height={480}>
          <ReactReduxContext.Provider value={context}>
            <Board />
          </ReactReduxContext.Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  )
}
