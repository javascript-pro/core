'use client';

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { initialState } from './initialState'

export interface UbereduxState {
  darkmode: boolean;
  [key: string]: any;
}

const reduxSlice = createSlice({
  name: 'uberedux',
  initialState,
  reducers: {
    setReduxKey: (state, action: PayloadAction<Partial<UbereduxState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

const rootReducer = combineReducers({
  redux: reduxSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['redux'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export const { setReduxKey } = reduxSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
