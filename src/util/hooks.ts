
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ContextType } from '../App';

const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const validatePassword = (password: string) => {
	return password.length >= 6;
};

const validateConfirmPassword = (password: string, confirmPassword: string) => {
	return password === confirmPassword;
};
const validateFirstName = (name: string) => {
	return name.length >= 2;
};
const validateLastname = (lastname: string) => {
	return lastname.length >= 2;
};
const validateForm = (
	email: string,
	password: string,
	isLoginForm: boolean,
	lastName?: string,
	firstName?: string,
	confirmPassword?: string
): boolean => {
	if (isLoginForm) {
		return validateEmail(email) && validatePassword(password);
	} else {
		return (
			validateEmail(email) &&
			validatePassword(password) &&
			validateConfirmPassword(password, confirmPassword!) &&
			validateFirstName(firstName!) &&
			validateLastname(lastName!)
		);
	}
};

export const useFormValidation = (isLoginForm: boolean) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState(<string>'');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');

	const [emailHelperText, setEmailHelperText] = useState<string>('');
	const [passwordHelperText, setPasswordHelperText] = useState<string>('');
	const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
		useState<string>('');
	const [firstNameHelperText, setFirstNameHelperText] = useState<string>('');
	const [lastNameHelperText, setLastNameHelperText] = useState<string>('');

	const [emailError, setEmailError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [confirmPasswordError, setConfirmPasswordError] =
		useState<boolean>(false);
	const [firstNameError, setFirstNameError] = useState<boolean>(false);
	const [lastNameError, setLastNameError] = useState<boolean>(false);

	const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
	const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);
	const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
		useState<boolean>(false);
	const [isFirstNameTouched, setIsFirstNameTouched] = useState<boolean>(false);
	const [isLastNameTouched, setIsLastNameTouched] = useState<boolean>(false);

	const [formIsValid, setFormIsValid] = useState<boolean>(false);

	useEffect(() => {
		if (isEmailTouched) {
			console.log('email', email);

			if (email) {
				setEmailHelperText(validateEmail(email) ? '' : 'Invalid email format');
				setEmailError(!validateEmail(email));
			} else {
				setEmailHelperText('Please enter your email');
				setEmailError(true);
			}
		}

		if (isPasswordTouched) {
			if (password) {
				setPasswordHelperText(
					validatePassword(password)
						? ''
						: 'Password must be at least 6 characters'
				);
				setPasswordError(!validatePassword(password));
			} else {
				setPasswordHelperText('Please enter your password');
				setPasswordError(true);
			}
		}

		if (isConfirmPasswordTouched) {
			if (confirmPassword) {
				setConfirmPasswordHelperText(
					validateConfirmPassword(password, confirmPassword)
						? ''
						: 'Passwords do not match'
				);
				setConfirmPasswordError(
					!validateConfirmPassword(password, confirmPassword)
				);
			} else {
				setConfirmPasswordHelperText('Please enter your password again');
				setConfirmPasswordError(true);
			}
		}
		if (isFirstNameTouched) {
			if (firstName) {
				setFirstNameHelperText(
					validateFirstName(firstName)
						? ''
						: 'Your first name must have at least 2 letters'
				);
				setFirstNameError(!validateFirstName(firstName));
			} else {
				setFirstNameHelperText('Please enter your First Name');
				setFirstNameError(true);
			}
		}
		if (isLastNameTouched) {
			if (lastName) {
				setLastNameHelperText(
					validateLastname(lastName)
						? ''
						: 'Your last name must have at least 2 letters'
				);
				setLastNameError(!validateLastname(lastName));
			} else {
				setLastNameHelperText('Please enter your Last Name');
				setLastNameError(true);
			}
		}
		if (isLoginForm) {
			setFormIsValid(validateForm(email, password, isLoginForm));
		} else {
			setFormIsValid(
				validateForm(
					email,
					password,
					isLoginForm,
					firstName,
					lastName,
					confirmPassword
				)
			);
		}
	}, [
		email,
		password,
		confirmPassword,
		firstName,
		lastName,
		isEmailTouched,
		isPasswordTouched,
		isConfirmPasswordTouched,
		isFirstNameTouched,
		isLastNameTouched,
	]);

	return {
		values: {
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			formIsValid,
		},
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
		touchedFields: {
			isEmailTouched,
			isPasswordTouched,
			isConfirmPasswordTouched,
			isFirstNameTouched,
			isLastNameTouched,
		},
	};
};

export const useProduct = () => {
	return useOutletContext<ContextType>();
};
