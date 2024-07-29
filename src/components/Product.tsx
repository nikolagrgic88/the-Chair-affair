import { IonIcon } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { useCartDisaptch, useCartSelector } from '../store/hooks';
import { addToLikedCart, removeFromLikedCart } from '../store/likedCart-slice';
import { Link } from 'react-router-dom';
import styles from '../styles/ProductComponent.module.css';

export type Product = {
	id: string;
	name: string;
	price: { currency: string; currentPrice: number };
	typeName: string;
	image: string;
	contextualImageUrl: string;
	imageAlt: string;
};
export type ProductProps = {
	categoryPath: { name: string }[];
	variants: Product[];
} & Product;

const Product = ({
	id,
	name,
	price,
	typeName,
	contextualImageUrl,
	imageAlt,
	image,
}: ProductProps) => {
	const dispatch = useCartDisaptch();
	const { items } = useCartSelector((state) => state.likedCart);

	const itemIsLiked = items.find((state) => state.id === id);

	const handleAddToLikedCart = () => {
		dispatch(
			addToLikedCart({
				id,
				name,
				typeName,
				price: price.currentPrice,
				image,
				imageAlt,
				contextualImageUrl,
			})
		);
	};
	const handleRemoveFromLikedCart = () => {
		dispatch(removeFromLikedCart(id));
	};

	return (
		<article className={styles.product}>
			<div className={styles.imageContainer}>
				<IonIcon
					icon={itemIsLiked ? heart : heartOutline}
					className={`${styles.ionIcon} ${itemIsLiked && styles.likedItem}`}
					onClick={
						itemIsLiked ? handleRemoveFromLikedCart : handleAddToLikedCart
					}
				/>

				<Link to={`/product/${id}`}>
					<img
						src={contextualImageUrl || './notAvailable.jpeg'}
						alt={imageAlt}
					/>
				</Link>
			</div>
			<div className={styles.productContent}>
				<Link to={`/product/${id}`}>
					<h4>{name}</h4>
					<span>{typeName}</span>
					<span className={styles.productPrice}>${price.currentPrice}</span>
				</Link>
			</div>
		</article>
	);
};
export default Product;
