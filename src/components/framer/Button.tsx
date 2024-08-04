import { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import styles from "../../styles/Button.module.css";
type ButtonProps = {
  children: ReactNode;
  isMotion?: boolean;
  onClick?: () => void;
} & ComponentPropsWithoutRef<"button">;

const Button = ({ children, isMotion = true, onClick }: ButtonProps) => {
  const controls = useAnimationControls();
  const x = useMotionValue(0);

  const handleHoverStart = () => {
    x.set(20);
  };
  const handleHoverEnd = () => {
    x.set(0);
  };

  return (
    <motion.div className={styles.buttonContainer}>
      {isMotion ? (
        <motion.button
          onClick={onClick}
          animate={controls}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          style={{
            x,
            border: "2px solid white",
          }}
        >
          {children}
        </motion.button>
      ) : (
        <button onClick={onClick}>{children}</button>
      )}
    </motion.div>
  );
};

export default Button;
