import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from '../../styles/CategoryDropdown.module.css';

const CategoryDropdown = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	const categoryLinks = [
		{ name: 'Kids', link: '/category/kids' },
		{ name: 'Dining', link: '/category/dining' },
		{ name: 'Outdoor', link: '/category/outdoor' },
		{ name: 'Living', link: '/category/living-room' },
		{ name: 'Office', link: 'category/office' },
	];

	return (
		<div
			className={styles.categoryContainer}
			onMouseEnter={() => setShowDropdown(true)}
			onMouseLeave={() => setShowDropdown(false)}
		>
			<button className={styles.categoryButton}>Categories</button>

			<AnimatePresence>
				{showDropdown && (
					<motion.div
						initial={{ opacity: 0, y: 0 }}
						animate={{ opacity: 1, y: 0.1 }}
						exit={{ opacity: 0, y: 0 }}
						className={styles.dropdownMenu}
					>
						{categoryLinks.map((link) => (
							<Link to={link.link} key={link.name}>
								{link.name}
							</Link>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CategoryDropdown;
