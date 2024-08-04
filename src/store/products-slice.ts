import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../App';


type DataItem = ApiResponse;

const initialState: DataItem = [];

const productsSlice = createSlice({
	name: 'loadedDataSlice',
	initialState,
	reducers: {
		setProducts(state,action: PayloadAction<DataItem>) {
			state = [...action.payload]
			return state
			
		},
		appendProducts(state, action: PayloadAction<DataItem>) {
			const newIds = new Set(action.payload.map((item) => item.id));
			const filteredState = state.filter((item) => !newIds.has(item.id));
			return [...filteredState, ...action.payload];
		},
	},
});

export const { setProducts, appendProducts } = productsSlice.actions;
export default productsSlice.reducer;
