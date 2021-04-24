import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { game, initialState } from './game'

export const rootReducer = combineReducers({
  [game.name]: game.reducer,
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

export const store = configureAppStore({ game: initialState })
