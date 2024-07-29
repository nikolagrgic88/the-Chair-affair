import { IonIcon } from '@ionic/react';
import { heartOutline, trashBinOutline, remove, add } from 'ionicons/icons';
import styles from '../styles/OrderSummaryItemsList.module.css';
import { CartItem } from '../store/cart-slice';
type OrderSummaryItemsList = {
	checkoutCart: CartItem[];
	handleMoveToLikedCart: (product: CartItem) => void;
	handleRemoveItem: (id: string) => void;
	handleDecreaseQuanitity: (id: string) => void;
	handleIncreaseQuantity: (product: CartItem) => void;
};

const OrderSummaryItemsList = ({
	checkoutCart,
	handleDecreaseQuanitity,
	handleIncreaseQuantity,
	handleMoveToLikedCart,
	handleRemoveItem,
}: OrderSummaryItemsList) => {
	return (
		<ul className={styles.listContainer}>
			{checkoutCart.map((product, index) => (
				<li key={index}>
					<div className={styles.imageDetailsContainer}>
						<div className={styles.imageContainer}>
							<img src={product.image} alt={product.imageAlt} />
						</div>
						<div className={styles.detailsContainer}>
							<h4>{product.name}</h4>
							<span>{product.typeName}</span>
							<span>${product.price}</span>

							<button
								className={styles.ionButton}
								id={styles.addButton}
								onClick={() => handleMoveToLikedCart(product)}
							>
								<IonIcon icon={heartOutline}></IonIcon>
								<span>Move to wishlist</span>
							</button>
							<button
								className={styles.ionButton}
								id={styles.removeButton}
								onClick={() => handleRemoveItem(product.id)}
							>
								<IonIcon icon={trashBinOutline}></IonIcon>
								<span>Remove item</span>
							</button>
							<div className={styles.quantityButtons}>
								{' '}
								<button
									className={styles.ionButton}
									onClick={() => handleDecreaseQuanitity(product.id)}
								>
									<IonIcon icon={remove}></IonIcon>
								</button>
								<button
									className={styles.ionButton}
									onClick={() => handleIncreaseQuantity(product)}
								>
									<IonIcon icon={add}>-</IonIcon>
								</button>
							</div>
							<div>Quantity: {product.quantity}</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default OrderSummaryItemsList;
