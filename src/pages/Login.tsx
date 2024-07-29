import styles from '../styles/Account.module.css';
import Components from '../components';

const Login = () => {
	return (
		<div className={styles.accountContainer}>
			<div className={styles.accountMain}>
				<Components.Login />
			</div>
		</div>
	);
};

export default Login;
