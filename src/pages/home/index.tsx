import { Box, VStack, Grid } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../components/ColorModeSwitcher'

export const HomePage = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}></VStack>
      </Grid>
    </Box>
  )
}
