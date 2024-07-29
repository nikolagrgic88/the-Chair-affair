import Components from '../components/index';
import { useCartSelector } from '../store/hooks';
import styles from '../styles/Wishlist.module.css';
import Component from '../components/index';

const Wishlist = () => {
	const wishList = useCartSelector((state) => state.likedCart.items);

	return (
		<div className={styles.wishlistContainer}>
			<h1>Wishlist</h1>
			{wishList.length === 0 ? (
				<Component.ErrorMessage>
					You wishlist cart is empty! Add some items you like.
				</Component.ErrorMessage>
			) : (
				<ul className={styles.listContainer}>
					{wishList.map((item, index) => (
						<li key={index}>
							<Components.WishlistProduct {...item} />
						</li>
					))}
				</ul>
			)}

			<Component.BackButton />
		</div>
	);
};
export default Wishlist;
