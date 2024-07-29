import { useEffect, useMemo, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import styles from '../../styles/SugestedItemsAnimation.module.css';
import { useRouteLoaderData } from 'react-router-dom';
import Product from '../Product';
import { ApiResponse } from '../../App';

const SugestedItemsAnimation = () => {
	const loadedData = useRouteLoaderData('root-page') as ApiResponse;
	const controls = useAnimationControls();
	const ref = useRef(null);

	const isInView = useInView(ref, { once: true });

	useEffect(() => {
		if (isInView) {
		}
	}, [controls, isInView]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 1,
				ease: 'easeOut',
				when: 'beforeChildren',
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, x: '100vh' },
		visible: {
			opacity: 1,
			y: 0,
			x: 0,
			transition: { duration: 1, ease: 'easeOut' },
		},
	};

	const getSugestedElements = (arr: ApiResponse) => {
		return arr
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value)
			.slice(0, 6);
	};
	const sugestedItems = useMemo(
		() => getSugestedElements(loadedData),
		[loadedData]
	);

	// const sugestedItems = DATA_T.slice(0, 6);

	return (
		<div className={styles.sugestedContainer}>
			<div className={styles.heading}>
				<h2>You may like</h2>
			</div>

			<motion.div
				ref={ref}
				className={styles.categoriesContainer}
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				transition={{ duration: 1, ease: 'easeOut' }}
			>
				<motion.ul className={styles.categoriesList}>
					{sugestedItems.map((item, index) => (
						<motion.li
							key={index}
							className={styles.listItem}
							variants={itemVariants}
						>
							<Product {...item}></Product>
						</motion.li>
					))}
				</motion.ul>
			</motion.div>
		</div>
	);
};

export default SugestedItemsAnimation;
