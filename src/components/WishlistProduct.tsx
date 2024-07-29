import { IonButton, IonIcon } from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import styles from '../styles/WishlistProduct.module.css';
import { useCartDisaptch } from '../store/hooks';
import { removeFromLikedCart } from '../store/likedCart-slice';
import { addToCart } from '../store/cart-slice';
import { useState } from 'react';
import AlertMessage from './framer/AlertMessage';

type WishlistProduct = {
	id: string;
	name: string;
	typeName: string;
	price: number;
	image: string;
	imageAlt: string;
	contextualImageUrl: string;
};

const WishlistProduct = (product: WishlistProduct) => {
	const dispatch = useCartDisaptch();
	const [showAlert, setShowAlert] = useState(false);

	const handleRemoveFromWishList = (id: string) => {
		dispatch(removeFromLikedCart(id));
	};
	const handleAddToCart = (product: WishlistProduct) => {
		dispatch(
			addToCart({
				...product,
			})
		);
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 1500);
	};
	return (
		<div className={styles.productContainer}>
			<div className={styles.imageDetailsContainer}>
				<div className={styles.imageContainer}>
					<img src={product.image} alt={product.imageAlt} />
				</div>
				<div className={styles.detailsContainer}>
					<h4>{product.name}</h4>
					<span>{product.typeName}</span>
					<span>${product.price}</span>
				</div>
			</div>
			<AlertMessage showAlert={showAlert} />
			<div className={styles.actionButtons}>
				<IonButton
					className={styles.ionButton}
					onClick={() => handleAddToCart(product)}
				>
					Add to bag
				</IonButton>
				<span onClick={() => handleRemoveFromWishList(product.id)}>
					<p>Remove Item</p>
					<IonIcon icon={trashBinOutline}></IonIcon>
				</span>
			</div>
		</div>
	);
};

export default WishlistProduct;
