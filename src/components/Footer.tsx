import { useRouteLoaderData } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import { CombinedData } from "../util/loaders";

const Footer = () => {
  const { images } = useRouteLoaderData("root-page") as CombinedData;
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.companyInfo}>
          <img
            src={images.filter((i) => i.includes("thechairaffair.jpeg"))[0]}
            alt="The Chair Affair Logo"
            className="footer-logo"
          />
          <p>
            The Chair Affair is your one-stop shop for stylish and comfortable
            chairs. We believe everyone deserves a seat that perfectly blends
            form and function.
          </p>
        </div>

        <div className={styles.customerService}>
          <h3>Customer Service</h3>
          <ul>
            <li>
              <a href="#">Shipping & Returns</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className={styles.legal}>
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
          <p>&copy; 2024 The Chair Affair</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
