import { ReactNode } from 'react';
import styles from '../styles/ErrorMessage.module.css';

type ErrorMessage = {
	children: ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessage) => {
	return (
		<div className={styles.errorContainer}>
			<div className={styles.errorMessageContainer}>
				<p>{children}</p>
			</div>
		</div>
	);
};

export default ErrorMessage;
