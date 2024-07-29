import {
	collection,
	query,
	getDocs,
	DocumentData,
	limit,
	QuerySnapshot,
	DocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { ProductProps } from '../components/Product';

type ApiResponse = ProductProps[] | null;
export type Data = {
	lastVisibleItem: DocumentSnapshot | null;
	data: ApiResponse;
};

const queryProvider = (
	querySnapshot: QuerySnapshot<DocumentData, DocumentData>
): ApiResponse => {
	const data: ApiResponse = querySnapshot.docs.map((doc) => {
		const firestoreData = doc.data();

		const product: ProductProps = {
			id: firestoreData.id,
			name: firestoreData.name || '',
			price: firestoreData.price || 0,
			categoryPath: firestoreData.categoryPath || [],
			contextualImageUrl: firestoreData.contextualImageUrl || '',
			image: firestoreData.image || '',
			imageAlt: firestoreData.imageAlt || '',
			typeName: firestoreData.typeName || '',
			variants: firestoreData.variants || [],
		};
		return product;
	});
	return data;
};

export const getIkeaData = async (): Promise<Data> => {
	try {
		const querySnapshot = await getDocs(
			query(collection(db, 'Ikea_api_data'), limit(30))
		);
		const lastVisibleItem = querySnapshot.docs[querySnapshot.docs.length - 1];
		return { data: queryProvider(querySnapshot), lastVisibleItem };
	} catch (error) {
		console.error('Error fetching Ikea data:', error);
		return { data: [], lastVisibleItem: null };
	}
};
export const fetchProductData = async (): Promise<ApiResponse> => {
	try {
		const querySnapshot = await getDocs(query(collection(db, 'Ikea_api_data')));

		return queryProvider(querySnapshot);
	} catch (error) {
		console.error('Error fetching Ikea data:', error);
		return [];
	}
};
