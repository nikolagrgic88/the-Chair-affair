import { createBrowserRouter } from 'react-router-dom';
import Pages from '../pages';
import { productDataLoader, checkAuthLoader } from '../util/loaders';
import App from '../App';


const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		id: 'root-page',
		errorElement: <Pages.ErrorPage />,
		loader: productDataLoader,
		children: [
			{ path: '/', element: <Pages.Welcome /> },
			{ path: '/home-page', element: <Pages.Home /> },
			{ path: '/product/:productId', element: <Pages.Product /> },
			{ path: '/customer/wishlist', element: <Pages.Wishlist /> },
			{ path: '/category/:category', element: <Pages.Category /> },
			{
				path: '/customer-account',
				element: <Pages.Account />,
				loader: checkAuthLoader,
			},
			{ path: '/login', element: <Pages.Login /> },
			{ path: '/checkout', element: <Pages.Checkout /> },
			{ path: '*', element: <Pages.ErrorPage /> },
		],
	},
]);
export default router;
