import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styles from '../styles/LoginComponent.module.css';
const Login = () => {
	const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
	const handleChangeForm = () => setIsLoginForm((state) => !state);
	return (
		<>
			{isLoginForm ? (
				<div className={styles.formComponent}>
					{' '}
					<h1>Log in</h1>
					<LoginForm handleChangeForm={handleChangeForm} />
				</div>
			) : (
				<div className={styles.formComponent}>
					<h1>Sign up</h1>
					<SignupForm handleChangeForm={handleChangeForm} />
				</div>
			)}
		</>
	);
};

export default Login;
