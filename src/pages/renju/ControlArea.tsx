import { Box, Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { gameActions } from '../../store/game'
import { uiActions } from '../../store/ui'

export const ControlArea = () => {
  const dispatch = useDispatch()
  return (
    <Box>
      <Stack spacing={2}>
        <Button onClick={() => dispatch(gameActions.drawback())}>撤销</Button>
        <Button onClick={() => dispatch(uiActions.toggleShowStep())}>
          切换序号
        </Button>
        <Button onClick={() => dispatch(uiActions.toggleShowPosInfo())}>
          切换坐标
        </Button>
        <Button
          onClick={() => dispatch(gameActions.restart())}
          colorScheme="cyan"
        >
          重新开始
        </Button>
      </Stack>
    </Box>
  )
}
