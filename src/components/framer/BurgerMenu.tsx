import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/BurgerMenu.module.css";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const menuList = [
    { title: "Home", navigateTo: "/home-page" },
    { title: "Whishlist", navigateTo: "/customer/wishlist" },
    { title: "Checkout", navigateTo: "/checkout" },
    { title: "Account", navigateTo: "/customer-account" },
  ];

  return (
    <div className={styles.container}>
      <button onClick={toggleMenu} className={styles.button}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -30, scale: 0 }}
            animate={{ opacity: 1, y: 55, scale: 1 }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0,
              transition: { duration: 0.2, delay: 0.5 },
            }}
            className={styles.nav}
          >
            <ul>
              {menuList.map((m, i) => (
                <motion.li
                  key={i}
                  onClick={() => {
                    navigate(m.navigateTo);
                    toggleMenu();
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  exit={{
                    x: -50,
                    opacity: 0,
                    scale: 0,
                    transition: {
                      duration: 0.2,
                      delay: (menuList.length - 1 - i) * 0.1,
                    },
                  }}
                >
                  {m.title}
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BurgerMenu;
