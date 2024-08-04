import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import styles from "../../styles/CategoryListAnimation.module.css";
import { Link, useRouteLoaderData } from "react-router-dom";
import { CATEGORY_IMAGES } from "../../util/util";
import { CombinedData } from "../../util/loaders";

const CategoryListAnimation = () => {
  const controls = useAnimationControls();
  const ref = useRef(null);
  const { images } = useRouteLoaderData("root-page") as CombinedData;

  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        when: "beforeChildren",
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: "-100vh" },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 2, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      ref={ref}
      className={styles.categoriesContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className={styles.header}>
        <h2>Discover our range</h2>
      </div>
      <motion.ul className={styles.categoriesList}>
        {CATEGORY_IMAGES.map((image, index) => (
          <motion.li
            key={index}
            className={styles.listItem}
            variants={itemVariants}
          >
            <Link to={image.link} className={styles.linkContainer}>
              {/* Main Image */}
              <motion.img
                src={images.filter((i) => i.includes(image.img))[0]}
                alt={`category-${index}`}
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 0 }}
              />
              {/* Hover Image */}
              <motion.img
                src={images.filter((i) => i.includes(image.hover))[0]}
                alt={`category-hover-${index}`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span>{image.description}</span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default CategoryListAnimation;
