import { Box, Button, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { gameActions } from '../../store/game'
import { gameSelector } from '../../store/selectors'
import { uiActions } from '../../store/ui'

export const ControlArea = () => {
  const dispatch = useDispatch()
  const game = useSelector(gameSelector)
  return (
    <Box>
      <Stack spacing={2}>
        <Button size="sm" onClick={() => dispatch(gameActions.drawback())}>
          撤销
        </Button>
        <Button size="sm" onClick={() => dispatch(uiActions.toggleShowStep())}>
          切换序号
        </Button>
        <Button
          size="sm"
          onClick={() => dispatch(uiActions.toggleShowPosInfo())}
        >
          切换坐标
        </Button>
        <Button
          size="sm"
          onClick={() => dispatch(gameActions.restart())}
          colorScheme="cyan"
          disabled={game.checkResult === false}
        >
          新的开始
        </Button>
      </Stack>
    </Box>
  )
}
