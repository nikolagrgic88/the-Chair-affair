import styles from '../styles/OrderSummary.module.css';

type OrderSummary = {
	totalPrice: number;
	shipping: { free: boolean; price: number };
	numberCheckoutItems: number;
};

const OrderSummary = ({
	totalPrice,
	shipping,
	numberCheckoutItems,
}: OrderSummary) => {
	return (
		<div className={styles.orderSummary}>
			<h4>Order summary</h4>
			<hr />
			<div className={styles.subtotalContainer}>
				<span>Subtotal - {numberCheckoutItems}</span>
				<strong>{totalPrice.toFixed(2)}</strong>
			</div>
			<div className={styles.shipping}>
				<span>Estimated shipping</span>
				<strong style={{ color: `${shipping.free ? '#40e0d0' : ''}` }}>
					{shipping.free ? 'FREE' : numberCheckoutItems === 0 ? '$0' : '$50'}
				</strong>
			</div>
			<hr />
			<div className={styles.total}>
				<h4>Total</h4>
				<strong>${shipping.price.toFixed(2)}</strong>
			</div>
		</div>
	);
};
export default OrderSummary;
