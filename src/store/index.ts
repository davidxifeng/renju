import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import { gameSlice, initialState as gameInitialState } from './game'
import { uiSlice, initialState as uiInitialState } from './ui'

export const rootReducer = combineReducers({
  [gameSlice.name]: gameSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

const configureAppStore = (preloadedState: RootState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState,
    enhancers: [],
  })
  return store
}

export const store = configureAppStore({
  [gameSlice.name]: gameInitialState,
  [uiSlice.name]: uiInitialState,
})
