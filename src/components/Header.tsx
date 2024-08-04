import { useEffect } from "react";
import styles from "../styles/Header.module.css";
import { useCartSelector } from "../store/hooks.ts";
import { IonIcon } from "@ionic/react";
import { personOutline, bagOutline, heartOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import {
  clearSessionStorage,
  saveCartToSessionStorage,
} from "../util/cartUtils.ts";
import CategoryDropdown from "./framer/CategoryDropdown.tsx";
import FramerComponents from "./framer/index.ts";

export default function Header() {
  const cartQuantity = useCartSelector((state) =>
    state.cart.items.reduce((val, item) => val + item.quantity, 0)
  );
  const checkoutCart = useCartSelector((state) => state.cart.items);
  const likedCart = useCartSelector((state) => state.likedCart.items);
  const likedCartQuanitity = likedCart.length;

  useEffect(() => {
    if (likedCart.length > 0) {
      saveCartToSessionStorage("wishlist", likedCart);
    } else if (likedCart.length === 0) {
      clearSessionStorage("wishlist");
    }
    if (checkoutCart.length > 0) {
      saveCartToSessionStorage("cart", checkoutCart);
    } else if (checkoutCart.length === 0) {
      clearSessionStorage("cart");
    }
  }, [likedCart, checkoutCart, saveCartToSessionStorage]);

  return (
    <>
      <header className={styles.mainHeader}>
        <div className={styles.innerHeader}>
          <div className={styles.mainTitle}>
            <Link to={"/home-page"} className={styles.logoContainer}>
              <img src={"thechairaffair.jpeg"} alt="The chair affair" />
            </Link>
            <FramerComponents.BurgerMenu />

            <div className={styles.mainTitleInner}>
              <h1>The Chair Affair</h1>
              <div className={styles.menuContainer}>
                <Link to={"/home-page"}>Home</Link>
                <CategoryDropdown />
                <Link to={"/customer/wishlist"}>Wishlist</Link>
                <Link to={"/checkout"}>Checkout</Link>
                <Link to={"/customer-account"}>Account</Link>
              </div>
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <div className={styles.buttonContainer}>
              <Link to={"/customer-account"}>
                <IonIcon icon={personOutline} className={styles.ionIcon} />
              </Link>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.quantityContainer}>
                {likedCartQuanitity}
              </div>
              <Link to={"/customer/wishlist"}>
                <IonIcon icon={heartOutline} className={styles.ionIcon} />
              </Link>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.quantityContainer}>{cartQuantity}</div>
              <Link to={"/checkout"}>
                <IonIcon icon={bagOutline} className={styles.ionIcon} />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
