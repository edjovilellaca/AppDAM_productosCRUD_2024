import axios from 'axios';
export async function getProductosAll() {
	let result = await axios.get(`${import.meta.env.VITE_REST_API_SECURITY_EDUCATION}/products`);
	console.log('<<AXIOS-PRODUCTOS>>: ', result.data);
	return result.data;
}