import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState } from './cart-slice';

export type LikedCartProduct = {
	id: string;
	name: string;
	typeName: string;
	price: number;
	image: string;
	imageAlt: string;
	contextualImageUrl: string;
};

type LikedCartProductState = {
	items: LikedCartProduct[];
};
const initialState: LikedCartProductState = {
	items: [],
};

const likedCartState = createSlice({
	name: 'likedCart',
	initialState: initialState,
	reducers: {
		setLikedCart(state, action: PayloadAction<LikedCartProduct[]>) {
			action.payload.forEach((item) => state.items.push({ ...item }));
		},
		addToLikedCart(state, action: PayloadAction<LikedCartProduct>) {
			const currentState = new Set<string>();
			state.items.forEach((item) => currentState.add(item.id));
			if (!currentState.has(action.payload.id)) {
				state.items.push(action.payload);
			}
		},
		removeFromLikedCart(state, action: PayloadAction<string>) {
			if (state.items.length !== 0) {
				state.items = state.items.filter((item) => item.id !== action.payload);
			}
		},
	},
});

export const { addToLikedCart, removeFromLikedCart, setLikedCart } =
	likedCartState.actions;
export default likedCartState.reducer;
