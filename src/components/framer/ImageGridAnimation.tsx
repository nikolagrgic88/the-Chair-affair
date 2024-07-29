import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import styles from '../../styles/ImageGridAnimation.module.css';

const ImageGridAnimation = () => {
	const controls = useAnimationControls();
	const refLeft = useRef(null);
	const refRight = useRef(null);
	const refBottom = useRef(null);

	const isInViewLeft = useInView(refLeft, { once: true });
	const isInViewRight = useInView(refRight, { once: true });
	const isInViewBottom = useInView(refBottom, { once: true });

	useEffect(() => {
		if (isInViewLeft) {
			controls.start('visibleLeft');
		}
		if (isInViewRight) {
			controls.start('visibleRight');
		}
		if (isInViewBottom) {
			controls.start('visibleBottom');
		}
	}, [controls, isInViewLeft, isInViewRight, isInViewBottom]);

	const images = [
		{
			variants: {
				hidden: { x: '-100vw', opacity: 0 },
				visible: { x: 0, opacity: 1 },
			},
			src: '/imageChair1.avif',
			ref: refLeft,
			transition: {
				duration: 1,
				ease: 'easeOut',
			},
		},
		{
			variants: {
				hidden: { y: '0', opacity: 0 },
				visible: { y: 0, x: 0, opacity: 1 },
			},
			src: '/imageChair4.avif',
			ref: refBottom,
			transition: {
				duration: 1,
				delay: 0.4,
				ease: 'easeOut',
			},
		},
		{
			variants: {
				hidden: { x: '100vw', opacity: 0 },
				visible: { x: 0, opacity: 1 },
			},
			src: '/imageChair3.avif',
			ref: refRight,
			transition: {
				duration: 1,
				ease: 'easeOut',
			},
		},
	];
	return (
		<motion.div className={styles.imageContainer}>
			{images.map((image, index) => (
				<motion.div
					key={index}
					ref={image.ref}
					className={styles.imageInnerContainer}
					variants={image.variants}
					initial='hidden'
					animate='visible'
					transition={image.transition}
				>
					<motion.img src={image.src} alt='displayChair' />
				</motion.div>
			))}
		</motion.div>
	);
};
export default ImageGridAnimation;
