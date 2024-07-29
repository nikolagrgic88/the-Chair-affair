import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	deleteUser,
	updateProfile,
	AuthErrorCodes,
} from 'firebase/auth';

type AuthProps = {
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
};
export const authHandleLogin = async ({ email, password }: AuthProps) => {
	const auth = getAuth();
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error: any) {
		if (error.code === AuthErrorCodes.INVALID_EMAIL) {
			return { type: 'emial', message: 'Invalid email address.' };
		} else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
			return { type: 'password', message: 'Incorrect password.' };
		} else if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
			return {
				type: 'all',
				message: 'Invalid email address or password.',
			};
		} else {
			console.log(error.code);

			return { type: 'all', message: 'An unexpected error occurred.' };
		}
	}
};

export const authHandleSignup = async ({
	email,
	password,
	firstName = '',
	lastName = '',
}: AuthProps) => {
	const auth = getAuth();
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		if (firstName || lastName) {
			await updateProfile(userCredential.user, {
				displayName: `${firstName} ${lastName}`,
			});
		}

		console.log('User signed up successfully:', userCredential.user);
		return null;
	} catch (error: any) {
		if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
			return { type: 'email', message: 'Email is already in use.' };
		} else {
			return {
				type: 'all',
				message: 'An unexpected error occurred during signup.',
			};
		}
	}
};

export const authLogout = async () => {
	const auth = getAuth();

	try {
		await signOut(auth);
		return null;
	} catch (error: any) {
		if (error.code === AuthErrorCodes.UNSUPPORTED_TENANT_OPERATION) {
			console.error('Logout is not supported for the current user.');
			return 'Logout is not supported for the current user.';
		} else {
			console.error('Unexpected error during logout:', error.message);
			return 'An unexpected error occurred during logout.';
		}
	}
};

export const authDeleteAccount = async () => {
	const auth = getAuth();

	try {
		await deleteUser(auth.currentUser!);
		return null;
	} catch (error: any) {
		return 'An unexpected error occurred while deleting your account.';
	}
};
