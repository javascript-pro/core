// /Users/goldlabel/GitHub/flash/app/src/Flash/lib/store.ts
'use client';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import baseStorage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { initialState } from '../initialState';

const persist = false;

const storage = {
  ...baseStorage,
  getItem: async (key: string) => {
    if (!persist) {
      // console.log(`[Uberedux] Skipping persist`);
      return null;
    } else {
      console.log(`[Uberedux] ryhydrating`);
    }
    return baseStorage.getItem(key);
  },
};

const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    setUbereduxKey: (
      state,
      action: PayloadAction<{ key: string; value: any }>,
    ) => {
      const { key, value } = action.payload;
      const keys = key.split('.');
      let target: any = state;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) {
          target[keys[i]] = {};
        }
        target = target[keys[i]];
      }

      target[keys[keys.length - 1]] = value;
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
