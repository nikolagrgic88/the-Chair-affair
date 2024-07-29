import { configureStore } from '@reduxjs/toolkit';

import likedCartSlice from './likedCart-slice';
import loadedDataSlice from './products-slice';

import cartSlice from './cart-slice';

export const store = configureStore({
	reducer: {
		cart: cartSlice,
		likedCart: likedCartSlice,
		loadedData: loadedDataSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
