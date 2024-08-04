

export type Categories = {
	office: string[];
	kids: string[];
	dining: string[];
	outdoor: string[];
	'living-room': string[];
};
export const CATEGORIES: Categories = {
	office: ['Desk chairs', 'Gaming chairs', 'Bathroom storage', 'Shoe cabinets'],
	kids: [
		`Children's chairs`,
		`Kids chairs`,
		'Kids armchairs',
		'Kids',
		'Kids study furniture & accessories',
		'Kids desks',
	],
	dining: [
		'Dining chairs',
		'Benches',
		'Dining sets',
		'Bar stools & chairs',
		'Café chairs',
		'High chairs',
	],
	outdoor: [
		'Outdoor',
		'Outdoor dining sets',
		'Outdoor seating',
		'Outdoor chairs',
	],
	'living-room': [
		'high chairs',
		'furniture sets',
		'lounge',

		'Sofa',
		'Chair covers',
		'Armchairs',
		'Armchairs & accent chairs',
		'Sofa & armchairs covers',
	],
};
export const CATEGORY_IMAGES = [
	{
		img: 'office1.jpg',
		hover: 'office2.jpg',
		description: 'Office',
		link: '/category/office',
	},
	{
		img: 'dining1.avif',
		hover: 'dining2.avif',
		description: 'Dining',
		link: '/category/dining',
	},
	{
		img: 'kids.jpg',
		hover: 'kids2.jpg',
		description: 'Kids',
		link: '/category/kids',
	},
	{
		img: 'outdoor1.jpg',
		hover: 'outdoor2.jpg',
		description: 'Outdoor',
		link: '/category/outdoor',
	},
	{
		img: 'sofa1.jpg',
		hover: 'sofa2.avif',
		description: 'Living',
		link: '/category/living-room',
	},
];