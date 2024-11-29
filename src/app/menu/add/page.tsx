'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For App Router navigation
import { createCategory, fetchCategories } from '../../services/categoryService';
import { Category } from '../../../types/category';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import PrivateRoute from '@/app/login/privateRoute';

const AddCategoryPage: React.FC = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]); // To store fetched categories
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch categories for the parent dropdown
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createCategory({ name });
      setName('');
      router.push('/menu');
    } catch (err) {
      console.error('Error adding category:', err);
      alert('Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  return (
<PrivateRoute>
<DefaultLayout>
      <Breadcrumb pageName="Add Category" />
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
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`${loading ? 'bg-brown' : 'bg-brown hover:bg-brown'
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {loading ? 'Adding...' : 'Add Category'}
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

export default AddCategoryPage;
