import { IonButton, IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/BackButton.module.css';
import { arrowBack } from 'ionicons/icons';

const BackButton = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.buttonContainer}>
			<IonButton className={styles.backButton} onClick={() => navigate(-1)}>
				<IonIcon icon={arrowBack} />
				Back
			</IonButton>
		</div>
	);
};

export default BackButton;
