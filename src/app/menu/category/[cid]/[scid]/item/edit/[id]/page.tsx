'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getItemById, updateItem, fetchCategories } from '../../../../../../../services/itemService';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import PrivateRoute from '@/app/login/privateRoute';

const EditItemPage = () => {
  const router = useRouter();
  const params = useParams();
  const itemId = params.id as string;
  const categoryId = params.cid as string;
  const subcategoryId = params.scid as string;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [subcategory, setCategory] = useState<string | null>(subcategoryId);
  const [inGlass, setInGlass] = useState<'glass' | 'bottle'>('glass');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemId) {
      fetchItem(itemId);
      fetchCategoriesData();
    }
  }, [itemId]);

  const fetchItem = async (id: string) => {
    console.log('category: '+categoryId);
    console.log('subcategory: '+subcategoryId);
    try {
      const item = await getItemById(id);
      setName(item.name);
      setDescription(item.description || '');
      setPrice(item.price);
      setCategory(subcategoryId);
      setInGlass(item.inGlass || 'glass');
    } catch (err) {
      console.error('Error fetching item:', err);
      alert('Failed to fetch item');
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateItem(itemId, { name, description, price, subcategory:subcategoryId });
      router.push(`/menu/category/${categoryId}/${subcategoryId}/item`); // Redirect to the items list
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  return (
<PrivateRoute>
<DefaultLayout>
      <Breadcrumb pageName="Edit Item" />
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="bg-[#633110c5] shadow-md rounded px-8 pt-6 pb-8">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Category</label>
            <select
              value={subcategory || ''}
              onChange={(e) => setCategory(e.target.value || null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div> */}
         
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? 'bg-brown' : 'bg-brown'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {loading ? 'Updating...' : 'Update Item'}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/menu/category/${categoryId}/${subcategoryId}/item`)}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
</PrivateRoute>
  );
};

export default EditItemPage;
