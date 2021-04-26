import { Flex, useMediaQuery } from '@chakra-ui/react'

import { InfoArea } from './InfoArea'
import { ControlArea } from './ControlArea'
import { KonvaStage } from './Stage'

export const RenjuPage = () => {
  const [isLandscape] = useMediaQuery('(orientation: landscape)')

  return (
    <Flex
      padding={0}
      alignItems="center"
      bg={'gray.400'}
      justifyContent="space-evenly"
      flexDir={isLandscape ? 'row' : 'column'}
      height="100vh"
    >
      <InfoArea />
      <KonvaStage />
      <ControlArea />
    </Flex>
  )
}
