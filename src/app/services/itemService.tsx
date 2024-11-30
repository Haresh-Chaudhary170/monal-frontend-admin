import axios from 'axios';
import { Item } from '../types/item';

const API_URL = 'https://monal-api-haresh-chaudhary170s-projects.vercel.app/api';

export const createItem = async (itemData: {
  name: string;
  price: number;
  subcategory: string | null;
  description: string;
}) => {
  const response = await axios.post(`${API_URL}/items/add`, itemData, {
    withCredentials: true  // Include cookies with the request
  });
  return response.data;
};

export const fetchItems = async (): Promise<Item[]> => {
    const response = await axios.get(`${API_URL}/items`,  {
      withCredentials: true  // Include cookies with the request
    });
    return response.data;
  };

  //delete item
  export const deleteItem = async (id: string) => {
    await axios.delete(`${API_URL}/items/${id}`,  {
      withCredentials: true  // Include cookies with the request
    });
  };


  export const getItemById = async (id: string) => {
    const response = await fetch(`https://monal-api-haresh-chaudhary170s-projects.vercel.app/api/items/${id}`,);
    if (!response.ok) {
      throw new Error("Failed to fetch item");
    }
    return response.json();
  };
  
  export const updateItem = async (id: string, updatedData: any) => {
    const response = await fetch(`https://monal-api-haresh-chaudhary170s-projects.vercel.app/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
      credentials: "include" // Include cookies with the request
    });
    if (!response.ok) {
      throw new Error("Failed to update item");
    }
    return response.json();
  };
  
  export const fetchCategories = async () => {
    const response = await fetch(`https://monal-api-haresh-chaudhary170s-projects.vercel.app/api/subcategories`,{credentials:"include"});
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  };
  