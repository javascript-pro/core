'use client';

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { initialState } from './initialState';

const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    setUbereduxKey: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },    
    resetUberedux: () => initialState,
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

export const setUbereduxKey = reduxSlice.actions.setUbereduxKey;
export const resetUberedux = reduxSlice.actions.resetUberedux;

export type TRootState = ReturnType<typeof store.getState>;
export type TUbereduxDispatch = typeof store.dispatch;
