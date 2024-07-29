import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
	id: string;
	name: string;
	typeName: string;
	price: number;
	quantity: number;
	image: string;
	imageAlt: string;
	contextualImageUrl: string;
};
export type CartState = {
	items: CartItem[];
};

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart(state, action: PayloadAction<CartItem[]>) {
			action.payload.forEach((item) => state.items.push(item));
		},
		addToCart(
			state,
			action: PayloadAction<{
				id: string;
				name: string;
				typeName: string;
				price: number;
				image: string;
				imageAlt: string;
				contextualImageUrl: string;
			}>
		) {
			const itemsIndex = state.items.findIndex(
				(item) => item.id === action.payload.id
			);
			if (itemsIndex === -1) {
				state.items.push({ ...action.payload, quantity: 1 });
			} else {
				state.items[itemsIndex].quantity++;
			}
		},
		removeFromCart(state, action: PayloadAction<string>) {
			const itemsIndex = state.items.findIndex(
				(item) => item.id === action.payload
			);
			if (state.items[itemsIndex].quantity === 1) {
				state.items.splice(itemsIndex, 1);
			} else {
				state.items[itemsIndex].quantity--;
			}
		},
		deleteFromCart(state, action: PayloadAction<string>) {
			if (state.items.length !== 0) {
				state.items = state.items.filter((item) => item.id !== action.payload);
			}
		},
	},
});
export const { addToCart, removeFromCart, setCart, deleteFromCart } =
	cartSlice.actions;
export default cartSlice.reducer;
