import { useParams, useRouteLoaderData } from 'react-router-dom';
import styles from '../styles/Category.module.css';
import { ApiResponse } from '../App';
import Product, { ProductProps } from '../components/Product';
import { useEffect, useState } from 'react';
import { IonButton } from '@ionic/react';
import { Categories } from '../util/util';
import { CATEGORIES as categories } from '../util/util';
import Component from '../components/index';

const Category = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { category } = useParams<{ category: keyof Categories }>();
	const loadedData = useRouteLoaderData('root-page') as ApiResponse;

	if (!category || !categories[category]) {
		return <div>No item found</div>;
	}
	const categoryItems = loadedData.filter((item): item is ProductProps => {
		const relevantCategories = categories[category];
		return item.categoryPath.some((path) =>
			relevantCategories.includes(path.name)
		);
	});

	const [visibleItems, setVisibleItems] = useState<ProductProps[]>(
		categoryItems.slice(0, 14)
	);

	useEffect(() => {
		setVisibleItems(categoryItems.slice(0, 14));

		setCurrentPage(1);
	}, [category]);

	const loadMoreItems = () => {
		const nextPage = currentPage + 1;
		const startIndex = (nextPage - 1) * 14;
		const endIndex = startIndex + 14;

		setVisibleItems((prevItems) => [
			...prevItems,
			...categoryItems.slice(startIndex, endIndex),
		]);

		setCurrentPage(nextPage);
	};

	return (
		<div className={styles.categoryContainer}>
			<div className={styles.heading}>
				<h1>{category.toUpperCase()}</h1>
			</div>
			<Component.BackButton />

			<div className={styles.categoriesContainer}>
				<ul className={styles.categoriesList}>
					{visibleItems.map((item, index) => (
						<li key={index} className={styles.listItem}>
							<Product {...item}></Product>
						</li>
					))}
				</ul>
			</div>

			<div className={styles.loadItemsButtonContainer}>
				<Component.BackButton />
				{visibleItems.length < categoryItems.length && (
					<IonButton className={styles.loadButton} onClick={loadMoreItems}>
						Load more items
					</IonButton>
				)}
			</div>
		</div>
	);
};

export default Category;
