import { getAuth } from 'firebase/auth';
import Components from '../components';
import styles from '../styles/Account.module.css';

const Account = () => {
	const auth = getAuth().currentUser;
	console.log('logged in', auth);
	return (
		<div className={styles.accountContainer}>
			<div className={styles.accountHeading}>
				<h1>Account</h1>
			</div>
			<div className={styles.accountMain}>
				{!auth ? <Components.Login /> : <Components.AccountProfile />}
			</div>
		</div>
	);
};
export default Account;
