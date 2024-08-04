import { FormEvent, useState } from 'react';
import FormInput from './FormInput';
import { Button } from '@mui/material';
import { authHandleSignup } from '../firestore/auth';
import { useFormValidation } from '../util/hooks';
import styles from '../styles/LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ handleChangeForm }: { handleChangeForm: () => void }) => {
	const {
		values: { email, password, firstName, lastName, formIsValid },
		setters: {
			setEmail,
			setPassword,
			setConfirmPassword,
			setFirstName,
			setLastName,
		},
		helperTexts: {
			emailHelperText,
			passwordHelperText,
			confirmPasswordHelperText,
			firstNameHelperText,
			lastNameHelperText,
		},
		errors: {
			emailError,
			passwordError,
			confirmPasswordError,
			firstNameError,
			lastNameError,
		},
		touchHandlers: {
			setIsEmailTouched,
			setIsPasswordTouched,
			setIsConfirmPasswordTouched,
			setIsFirstNameTouched,
			setIsLastNameTouched,
		},
	} = useFormValidation(false);

	const [formIsLoading, setFormIsLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [authError, setAuthError] = useState({ message: '', error: false });
	const [authEmailError, setAuthEmailError] = useState({
		message: '',
		error: false,
	});
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormIsLoading(true);
		setIsEmailTouched(true);
		setIsPasswordTouched(true);
		setAuthEmailError({ error: false, message: '' });
		setAuthError({ error: false, message: '' });

		if (!emailError && !passwordError && !confirmPasswordError) {
			const error = await authHandleSignup({
				email,
				password,
				firstName,
				lastName,
			});
			setFormIsLoading(false);
			if (error) {
				if (error?.type === 'email') {
					setAuthEmailError({ message: error.message, error: true });
				} else {
					setAuthError({ message: error!.message, error: true });
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
				helperText={emailHelperText || authEmailError.message}
				onBlur={() => setIsEmailTouched(true)}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<FormInput
				id='password'
				label='Password'
				type={showPassword ? 'text' : 'password'}
				error={passwordError}
				helperText={passwordHelperText}
				onChange={(e) => setPassword(e.target.value)}
				onBlur={() => setIsPasswordTouched(true)}
				handleShowPassword={() => setShowPassword((show) => !show)}
			/>
			<FormInput
				id='confirm-password'
				label='Confirm Password'
				type={showConfirmPassword ? 'text' : 'password'}
				error={confirmPasswordError}
				helperText={confirmPasswordHelperText}
				onChange={(e) => setConfirmPassword(e.target.value)}
				onBlur={() => setIsConfirmPasswordTouched(true)}
				handleShowPassword={() => setShowConfirmPassword((show) => !show)}
			/>
			<FormInput
				id='first-name'
				label='First Name'
				type='text'
				error={firstNameError}
				helperText={firstNameHelperText}
				onChange={(e) => setFirstName(e.target.value)}
				onBlur={() => setIsFirstNameTouched(true)}
			/>
			<FormInput
				id='last-name'
				label='Last Name'
				type='text'
				error={lastNameError}
				helperText={lastNameHelperText || authError.message}
				onChange={(e) => setLastName(e.target.value)}
				onBlur={() => setIsLastNameTouched(true)}
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
				Already have an account?{' '}
				<Button onClick={handleChangeForm}>Log in</Button>
			</span>
		</form>
	);
};

export default SignupForm;
