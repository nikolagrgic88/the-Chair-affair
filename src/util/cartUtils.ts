import { LikedCartProduct } from '../store/likedCart-slice';

export const loadCartFromSessionStorage = (key: 'cart' | 'wishlist') => {
	const storedCart = sessionStorage.getItem(key);
	return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCartToSessionStorage = (
	key: 'cart' | 'wishlist',
	cartItems: LikedCartProduct[]
) => {
	sessionStorage.setItem(key, JSON.stringify(cartItems));
};
export const clearSessionStorage = (key: 'cart' | 'wishlist') => {
	sessionStorage.removeItem(key);
};
