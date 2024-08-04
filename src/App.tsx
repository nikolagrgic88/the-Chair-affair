import {
	Outlet,
	UNSAFE_useScrollRestoration,
	
} from 'react-router-dom';
import styles from './styles/App.module.css';
import Components from './components';
import { ProductProps } from './components/Product';
import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';
import { useEffect, useRef } from 'react';
import { useCartDisaptch, useCartSelector } from './store/hooks';
import { loadCartFromSessionStorage } from './util/cartUtils';
import { setLikedCart } from './store/likedCart-slice';
import { setCart } from './store/cart-slice';
setupIonicReact();
export type ApiResponse = ProductProps[];
export type ContextType = ApiResponse;

const App = () => {
	UNSAFE_useScrollRestoration();
	const dispatch = useCartDisaptch();
	const likedCartStoredData = useCartSelector((state) => state.likedCart.items);
	const checkoutCartStoredData = useCartSelector((state) => state.cart.items);

	const effectRan = useRef(false);
	const wishlistSessionDataCart = loadCartFromSessionStorage('wishlist');
	const checkoutSessionDataCart = loadCartFromSessionStorage('cart');

	useEffect(() => {
		if (effectRan.current) {
			return;
		}

		if (
			wishlistSessionDataCart.length > 0 &&
			likedCartStoredData.length === 0
		) {
			dispatch(setLikedCart(wishlistSessionDataCart));
		}
		if (
			checkoutSessionDataCart.length > 0 &&
			checkoutCartStoredData.length === 0
		) {
			dispatch(setCart(checkoutSessionDataCart));
		}

		effectRan.current = true;
	}, [
		dispatch,
		likedCartStoredData.length,
		checkoutCartStoredData.length,
		wishlistSessionDataCart,
		checkoutSessionDataCart,
	]);


	return (
		<div className={styles.mainContainer}>
			<Components.Header />
			<div className={styles.outletContainer}>
				<Outlet />
			</div>
			<Components.Footer />
		</div>
	);
};

export default App;
