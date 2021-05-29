import { Alert, AlertIcon } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { gameSelector } from '../../store/selectors'

export const InfoArea = () => {
  const game = useSelector(gameSelector)
  return (
    <Box>
      <Alert status={'success'}>
        <AlertIcon />
        {game.winner === 'black'
          ? '黑胜'
          : game.winner === 'white'
          ? '白胜'
          : game.isNextTurnBlack
          ? '黑'
          : '白'}
      </Alert>
    </Box>
  )
}
