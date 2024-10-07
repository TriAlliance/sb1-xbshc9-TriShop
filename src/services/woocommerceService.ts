import axios from 'axios';

const API_URL = '/api';

export const searchProducts = async (searchParams: any) => {
  const response = await axios.get(`${API_URL}/products`, { params: searchParams });
  return response.data;
};

export const updateProduct = async (product: any) => {
  const response = await axios.put(`${API_URL}/products/${product.id}`, product);
  return response.data;
};