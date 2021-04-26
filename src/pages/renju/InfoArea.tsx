import { Alert, AlertIcon } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { gameSelector } from './Chess'

export const InfoArea = () => {
  const game = useSelector(gameSelector)
  return (
    <Flex flexDir="row" justifyContent="center" justifyItems="center">
      <Alert width="initial" status={game.winner === 'nil' ? 'info' : 'success'}>
        <AlertIcon />
        {game.winner === 'nil'
          ? '連珠'
          : game.winner === 'black'
          ? '黑胜'
          : '白胜'}
      </Alert>
      {game.winner === 'nil' && (
        <Alert width="initial" status={'success'}>
          <AlertIcon />
          {game.isNextTurnBlack ? '黑' : '白'}
        </Alert>
      )}
    </Flex>
  )
}
