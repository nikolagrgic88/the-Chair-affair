import { getAuth } from 'firebase/auth';
import { ApiResponse } from '../App';
import { fetchProductData, fetchImagesFromStorage } from '../firestore/firebaseUtil';
import { redirect } from 'react-router-dom';

export type CombinedData = {
	data: ApiResponse | null;
	images: string[];
}



export const productDataLoader = async ():Promise<CombinedData> => {
	try {
		const [response, responseImages] = await Promise.all([
			fetchProductData(),
			fetchImagesFromStorage(),
		  ]);
	  
		  return {
			data: response,
			images: responseImages,
		  };
	} catch (e) {
		console.error('Error fetching initial data:', e);
		return {data: null, images: [] };
	}
};

export const checkAuthLoader = () => {
	const user = getAuth().currentUser;
	if (!user) return redirect('/login');
	return null;
};
