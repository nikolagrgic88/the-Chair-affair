import { FormEvent, useEffect, useState } from 'react';
import FormInput from './FormInput';
import { Button } from '@mui/material';
import { authHandleLogin } from '../firestore/auth';
import { useFormValidation } from '../util/hooks';
import styles from '../styles/LoginForm.module.css';
import { getAuth, onAuthStateChanged, Unsubscribe, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleChangeForm }: { handleChangeForm: () => void }) => {
	const {
		values: { email, password, formIsValid },
		setters: { setEmail, setPassword },
		helperTexts: { emailHelperText, passwordHelperText },
		errors: { emailError, passwordError },
		touchHandlers: { setIsEmailTouched, setIsPasswordTouched },
	} = useFormValidation(true);
	const navigate = useNavigate();
	const auth = getAuth();
	const [formIsLoading, setFormIsLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [authPasswordError, setAuthPasswordError] = useState({
		error: false,
		text: '',
	});

	const [authEmailError, setAuthEmailError] = useState({
		error: false,
		text: '',
	});

	useEffect(() => {
		let unsubscribe: Unsubscribe | null = null; 
		if (!currentUser) {
			unsubscribe = onAuthStateChanged(auth, (user) => {
			  setCurrentUser(user);
			});
		  }
		
		
		  return () => {
			if (unsubscribe) {
			  unsubscribe();
			}
		  };
		

	}, [auth]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsEmailTouched(true);
		setIsPasswordTouched(true);
		setAuthEmailError({
			error: false,
			text: '',
		});
		setAuthPasswordError({
			error: false,
			text: '',
		});

		if (!emailError && !passwordError) {
			setFormIsLoading(true);
			const error = await authHandleLogin({ email, password });

			setFormIsLoading(false);
			if (error) {
				if (error?.type === 'email') {
					setAuthEmailError({ error: true, text: error.message });
				} else if (error?.type === 'password') {
					setAuthPasswordError({ error: true, text: error.message });
				} else if (error?.type === 'all') {
					setAuthEmailError({ error: true, text: '' });
					setAuthPasswordError({ error: true, text: error.message });
				}
			} else {
				navigate('/customer-account');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.loginContainer}>
			<FormInput
				id='email'
				label='Email'
				type='email'
				error={emailError || authEmailError.error}
				helperText={emailHelperText || authEmailError.text}
				onBlur={() => setIsEmailTouched(true)}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<FormInput
				id='password'
				label='Password'
				type={showPassword ? 'text' : 'password'}
				error={passwordError || authPasswordError.error}
				helperText={passwordHelperText || authPasswordError.text}
				onChange={(e) => setPassword(e.target.value)}
				onBlur={() => setIsPasswordTouched(true)}
				handleShowPassword={() => setShowPassword((show) => !show)}
			/>
			<Button
				disabled={!formIsValid}
				type='submit'
				color='warning'
				variant='contained'
				sx={{ mt: 2 }}
			>
				{formIsLoading ? 'Loading' : 'Login'}
			</Button>

			<span className={styles.buttonContainer}>
				New to The Chair Affair{' '}
				<Button onClick={handleChangeForm}>Create Account</Button>
			</span>
		</form>
	);
};

export default LoginForm;
