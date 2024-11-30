'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCategoryById, updateCategory, fetchCategories } from '../../../services/categoryService';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import PrivateRoute from '@/app/login/privateRoute';



const EditCategoryPage: React.FC = ({ params }:any) => {
  const categoryId = params.id; // Directly access the id from params
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
    }
    fetchAllCategories();
  }, [categoryId]);

  const fetchCategory = async (id: string) => {
    try {
      const category = await getCategoryById(id);
      setName(category.name);
    } catch (err) {
      console.error('Error fetching category:', err);
      alert('Failed to fetch category');
    }
  };

  const fetchAllCategories = async () => {
    try {
      const allCategories = await fetch('https://monal-api-haresh-chaudhary170s-projects.vercel.app/api/categories').then((res) => res.json());
      setCategories(allCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateCategory(categoryId, {
        name,
      });
      router.push('/menu'); // Redirect to categories list
    } catch (err) {
      console.error('Error updating category:', err);
      alert('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  return (
<PrivateRoute>
<DefaultLayout>
      <Breadcrumb pageName="Edit Category" />

      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-[#633110c5] shadow-md rounded px-8 pt-6 pb-8"
        >
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? 'bg-brown' : 'bg-brown hover:bg-brown'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {loading ? 'Updating...' : 'Update Category'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/menu')}
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

export default EditCategoryPage;
