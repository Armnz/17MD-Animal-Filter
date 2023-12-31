import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterReducer.ts'
import loadedAnimalsReducer from "../features/animalCards/loadedAnimalsSlice.ts";
import {api} from '../features/api/api.ts'
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        loadedAnimals: loadedAnimalsReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);