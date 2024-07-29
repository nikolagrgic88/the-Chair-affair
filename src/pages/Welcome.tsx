import { UNSAFE_useScrollRestoration, useNavigate } from 'react-router-dom';
import styles from '../styles/Welcome.module.css';
import FramerComponents from '../components/framer';
import useMediaQuery from '@mui/material/useMediaQuery';

const Welcome = () => {
	const match = useMediaQuery('(max-width:1023px)');
	console.log(match);
	UNSAFE_useScrollRestoration();
	const navigate = useNavigate();

	return (
		<div className={styles.welcomePageContainer}>
			<div className={styles.innerContainer}>
				<h1>Your Seat Awaits at The Chair Affair</h1>
				<div className={styles.imageContainer}>
					<img
						src='./welcome.jpg'
						alt='man sitting in the chair and relaxing '
					/>
					<div className={styles.buttonContainer}>
						<FramerComponents.Button onClick={() => navigate('/home-page')}>
							Find Your Perfect Seat
						</FramerComponents.Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Welcome;
