import { useParams, useRouteLoaderData } from "react-router-dom";
import { heartOutline, heart } from "ionicons/icons";
import { useCartDisaptch, useCartSelector } from "../store/hooks";
import { addToCart, CartItem } from "../store/cart-slice";
import { motion } from "framer-motion";
import styles from "../styles/ProductPage.module.css";
import {
  addToLikedCart,
  LikedCartProduct,
  removeFromLikedCart,
} from "../store/likedCart-slice";
import { ContextType } from "../App";
import { IonButton, IonIcon } from "@ionic/react";
import { useEffect, useState } from "react";
import Component from "../components/index";
import FramerComponents from "../components/framer";
import { CombinedData } from "../util/loaders";

const Product = () => {
  const { productId } = useParams();
  const [itemIsLiked, setItemIsLiked] = useState<boolean>(false);
  const items = useCartSelector((state) => state.likedCart.items);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { data } = useRouteLoaderData("root-page") as CombinedData;
  const dispatch = useCartDisaptch();

  const getProduct = (productId: string, data: ContextType): CartItem => {
    const rowProduct = data?.find((item) => item.id === productId);

    if (!rowProduct) {
      throw new Error("Product not found");
    }
    return {
      id: rowProduct.id,
      name: rowProduct.name,
      typeName: rowProduct.typeName,
      quantity: 1,
      image: rowProduct.image ?? "",
      imageAlt: rowProduct.imageAlt ?? "",
      price: rowProduct.price.currentPrice,
      contextualImageUrl: rowProduct.contextualImageUrl,
    };
  };
  useEffect(() => {
    const likedItem = items.find((item) => item.id === productId);
    setItemIsLiked(!!likedItem);
  }, [items, productId]);

  const product = getProduct(productId!, data!);

  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart({ ...item }));
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };
  const handleAddToWishList = (item: LikedCartProduct) => {
    dispatch(addToLikedCart({ ...item }));
  };
  const handleRemoveFromWishList = (id: string) => {
    dispatch(removeFromLikedCart(id));
  };

  return (
    <div className={styles.productContainer}>
      <div id={styles.topButton}>
        <Component.BackButton />
      </div>
      <div className={styles.productDetailsImageContainer}>
        <motion.div className={styles.imageContainer}>
          <motion.img
            src={product.contextualImageUrl}
            alt={`category-hover-${product.name}`}
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.img
            src={product.image}
            alt={`category-${product.name}`}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </motion.div>
        <div className={styles.productDetailsContainer}>
          <div className={styles.details}>
            <h4>{product.name}</h4>
            <span>{product.typeName}</span>
            <span>${product.price}</span>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.alertButton}>
              <FramerComponents.AlertMessage
                showAlert={showAlert}
                id={styles.alertMessage}
              />
              <IonButton
                className={styles.ionButton}
                size="small"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </IonButton>
            </div>
            <IonButton
              className={styles.ionButton}
              size="small"
              onClick={() =>
                itemIsLiked
                  ? handleRemoveFromWishList(productId!)
                  : handleAddToWishList(product)
              }
            >
              <IonIcon icon={itemIsLiked ? heart : heartOutline} />
            </IonButton>
          </div>
        </div>
      </div>

      <div className={styles.sugestedItemsContainer}>
        <FramerComponents.SugestedItemsAnimation />
      </div>
      <Component.BackButton />
    </div>
  );
};
export default Product;
