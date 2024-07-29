import { AnimatePresence, motion } from 'framer-motion';
import styles from '../../styles/AlertMessage.module.css';
type AlertMessageProps = {
	showAlert: boolean;
	id?: string;
};
const AlertMessage = ({ showAlert, id }: AlertMessageProps) => {
	return (
		<div className={styles.alertContainer} id={id}>
			<AnimatePresence>
				{showAlert && (
					<motion.div
						initial={{ opacity: 0, y: 0 }}
						animate={{ opacity: 1, y: -25 }}
						exit={{ opacity: 0, y: 0 }}
						className={styles.alert}
					>
						Item added to bag!
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
export default AlertMessage;
