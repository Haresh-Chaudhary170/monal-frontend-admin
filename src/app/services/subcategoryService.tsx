import axios from 'axios';
import { Category } from '../../types/category';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Update with your API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/categories');
  return response.data;
};
export const fetchCategories = async (cid:string): Promise<Category[]> => {
  const response = await apiClient.get(`/subcategori/${cid}`);
  return response.data.subcategories;
};

export const createCategory = async (category: Partial<Category>) => {
  const response = await axios.post(`${API_BASE_URL}/subcategories/add`, category,{
    withCredentials: true 
  });
  return response.data;
};


export const getCategoryById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/subcategories/${id}`,{withCredentials:true});
  return response.data;
};

export const updateCategory = async (id: string, categoryData: any) => {
  const response = await axios.put(`${API_BASE_URL}/subcategories/${id}`, categoryData,{withCredentials:true});
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> =>
  axios.delete(`${API_BASE_URL}/subcategories/${id}`,{withCredentials:true}).then(res => res.data);