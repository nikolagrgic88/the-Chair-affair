import { UNSAFE_useScrollRestoration } from "react-router-dom";
import styles from "../styles/Home.module.css";
import FramerComponents from "../components/framer";

const Home = () => {
  UNSAFE_useScrollRestoration();
  return (
    <div className={styles.homeContainer}>
      <FramerComponents.ImageGridAnimation />
      <FramerComponents.CategoryListAnimation />
      <FramerComponents.SugestedItemsAnimation />
    </div>
  );
};

export default Home;
