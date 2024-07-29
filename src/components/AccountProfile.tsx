import { Button } from '@mui/material';
import styles from '../styles/AccountProfile.module.css';
import { authDeleteAccount, authLogout } from '../firestore/auth';
import { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const AccountProfile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const name = auth.currentUser!.displayName?.split(' ');
	let firstName: string = '';
	let lastName: string = '';
	let email: string = '';
	if (name) {
		console.log(name);
		firstName = `${name![0][0].toUpperCase()}${name[0].slice(1)}`;
		lastName = `${name![1][0].toUpperCase()}${name[1].slice(1)}`;
	}
	if (auth) {
		email = auth.currentUser!.email!;
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, [auth]);

	const handleLogout = () => {
		const error = authLogout() as any;
		if (error) {
			setErrorMessage(error);
		}
		navigate('/login');
	};

	const handleDeleteAccount = async () => {
		console.log('curentUser', currentUser);
		setErrorMessage('');

		if (currentUser) {
			const confirmation = window.confirm(
				'Are you sure you want to delete your account?'
			);

			if (confirmation) {
				try {
					const error = await authDeleteAccount();
					if (error) {
						setErrorMessage(error);
					} else {
						navigate('/login');
					}
				} catch (error) {
					console.error('Error deleting account:', error);
				}
			}
		}
	};

	return (
		<div className={styles.profileContainer}>
			<div className={styles.heading}>
				<h2>
					Welcome back, {firstName} {lastName}
				</h2>
			</div>
			<div className={styles.mainContainer}>
				<div>Customer details</div>
				<div className={styles.userDetails}>
					<p>Name: {firstName}</p>
					<p>Last Name: {lastName}</p>
					<p>Email: {email}</p>
				</div>
			</div>
			<p style={{ color: 'red' }}>{errorMessage}</p>
			<Button onClick={handleLogout}>Logout</Button>
			<Button onClick={handleDeleteAccount} color='error'>
				Delete Account
			</Button>
		</div>
	);
};

export default AccountProfile;
