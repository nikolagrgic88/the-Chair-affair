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
		img: 'src/assets/office1.jpg',
		hover: 'src/assets/office2.jpg',
		description: 'Office',
		link: '/category/office',
	},
	{
		img: 'src/assets/dining1.avif',
		hover: 'src/assets/dining2.avif',
		description: 'Dining',
		link: '/category/dining',
	},
	{
		img: 'src/assets/kids.jpg',
		hover: 'src/assets/kids2.jpg',
		description: 'Kids',
		link: '/category/kids',
	},
	{
		img: 'src/assets/outdoor1.jpg',
		hover: 'src/assets/outdoor2.jpg',
		description: 'Outdoor',
		link: '/category/outdoor',
	},
	{
		img: 'src/assets/sofa1.jpg',
		hover: 'src/assets/sofa2.avif',
		description: 'Living',
		link: '/category/living-room',
	},
];