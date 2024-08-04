import styles from "../styles/ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.errorPageContainer}>
      <div className={styles.innerErrorPageContainer}>
        <div className={styles.header}>
          <h1>Error</h1>
        </div>
        <div className={styles.messageContainer}>
          <p>Something Went Wrong!</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
