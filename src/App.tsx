import { ChakraProvider, theme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AboutPage } from './pages/about'
import { HomePage } from './pages/home'
import { KonvaStage } from './pages/renjux'
import { store } from './store'

const AppRoutes = {
	home: '/',
	renju: '/renju',
	about: '/about',
} as const


export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path={AppRoutes.about} component={AboutPage}/>
          <Route exact path={AppRoutes.renju} component={KonvaStage}/>
          <Route path={AppRoutes.home} component={HomePage} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
)
