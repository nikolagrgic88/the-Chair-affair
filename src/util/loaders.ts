import { getAuth } from 'firebase/auth';
import { ApiResponse } from '../App';
import { getIkeaData, Data, fetchProductData } from '../firestore/firebaseUtil';
import { redirect } from 'react-router-dom';

export const initialDataLoader = async (): Promise<Data> => {
	try {
		const response = await getIkeaData();
		return response;
	} catch (e) {
		console.error('Error fetching initial data:', e);
		return { data: [], lastVisibleItem: null };
	}
};

export const productDataLoader = async (): Promise<ApiResponse | null> => {
	try {
		const response = await fetchProductData();

		return response;
	} catch (e) {
		console.error('Error fetching initial data:', e);
		return [];
	}
};

export const checkAuthLoader = () => {
	const user = getAuth().currentUser;
	if (!user) return redirect('/login');
	return null;
};
