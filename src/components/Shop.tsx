import { type ReactNode } from 'react';

type ShopProps = {
	children: ReactNode;
};

const Shop = ({ children }: ShopProps) => {
	return (
		<section id='shop'>
			<h2>The Chair Affair</h2>

			<ul id='products'>{children}</ul>
		</section>
	);
};
export default Shop;
