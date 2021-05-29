import { Group } from 'react-konva'
import { useSelector } from 'react-redux'
import { gameSelector } from '../../store/selectors'

const Menu = () => {
  return <>
  </>
}

const GameUI = () => {
  return <>
  </>
}

const ResultUI = () => {
  return <>
  </>
}

export const UIGroup = () => {
  const game = useSelector(gameSelector)
  const { gameScene } = game
  return <Group>
    {gameScene === 'Menu' && <Menu />}
    {gameScene === 'Gameing' && <GameUI />}
    {gameScene === 'Result' && <ResultUI />}
  </Group>
}
