import { Alert, AlertIcon } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { gameSelector } from './Chess'

export const InfoArea = () => {
  const game = useSelector(gameSelector)
  return (
    <Box>
      <Alert status={game.winner === 'nil' ? 'info' : 'success'}>
        <AlertIcon />
        {game.winner === 'nil'
          ? '連珠'
          : game.winner === 'black'
          ? '黑胜'
          : '白胜'}
      </Alert>
      {game.winner === 'nil' && (
        <Alert status={'success'}>
          <AlertIcon />
          {game.isNextTurnBlack ? '黑' : '白'}
        </Alert>
      )}
    </Box>
  )
}
