import { useEffect, useState } from "react";
import { useCartDisaptch, useCartSelector } from "../store/hooks";
import styles from "../styles/Checkout.module.css";
import { addToLikedCart } from "../store/likedCart-slice";
import {
  addToCart,
  CartItem,
  deleteFromCart,
  removeFromCart,
} from "../store/cart-slice";
import Component from "../components/index";
import Components from "../components/index";

const Checkout = () => {
  const dispatch = useCartDisaptch();
  const checkoutCart = useCartSelector((state) => state.cart.items);
  const numberCheckoutItems = useCartSelector((state) =>
    state.cart.items.reduce((val, item) => val + item.quantity, 0)
  );
  const totalPrice = useCartSelector((state) =>
    state.cart.items.reduce((val, item) => val + item.quantity * item.price, 0)
  );
  const [shipping, setShipping] = useState({
    free: false,
    price: 0,
  });

  useEffect(() => {
    const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));
    if (roundedTotalPrice > 250) {
      setShipping({ free: true, price: roundedTotalPrice });
    } else {
      setShipping({
        free: false,
        price: numberCheckoutItems
          ? parseFloat((roundedTotalPrice + 50).toFixed(2))
          : 0,
      });
    }
  }, [totalPrice]);

  const handleMoveToLikedCart = (product: CartItem) => {
    dispatch(addToLikedCart(product));
    dispatch(deleteFromCart(product.id));
  };
  const handleRemoveItem = (id: string) => {
    dispatch(deleteFromCart(id));
  };
  const handleIncreaseQuantity = (product: CartItem) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseQuanitity = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout cart</h1>
      <div className={styles.orderContainer}>
        <Components.OrderSummaryItemsList
          checkoutCart={checkoutCart}
          handleDecreaseQuanitity={handleDecreaseQuanitity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleMoveToLikedCart={handleMoveToLikedCart}
          handleRemoveItem={handleRemoveItem}
        />
        <Components.OrderSummary
          numberCheckoutItems={numberCheckoutItems}
          shipping={shipping}
          totalPrice={totalPrice}
        />
      </div>
      <Component.BackButton />
    </div>
  );
};
export default Checkout;
