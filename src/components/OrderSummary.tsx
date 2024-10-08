import styles from "../styles/OrderSummary.module.css";
import { IonButton } from "@ionic/react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/customer-account");
  };

  return (
    <div>
      <div className={styles.orderSummary}>
        <h4>Order summary</h4>
        <hr />
        <div className={styles.subtotalContainer}>
          <span>Subtotal - {numberCheckoutItems}</span>
          <strong>{totalPrice.toFixed(2)}</strong>
        </div>
        <div className={styles.shipping}>
          <span>Estimated shipping</span>
          <strong style={{ color: `${shipping.free ? "#40e0d0" : ""}` }}>
            {shipping.free ? "FREE" : numberCheckoutItems === 0 ? "$0" : "$50"}
          </strong>
        </div>
        <hr />
        <div className={styles.total}>
          <h4>Total</h4>
          <strong>${shipping.price.toFixed(2)}</strong>
        </div>
      </div>
      <div>
        <IonButton className={styles.button} onClick={() => handleCheckout()}>
          Securly Checkout
        </IonButton>
      </div>
    </div>
  );
};
export default OrderSummary;
