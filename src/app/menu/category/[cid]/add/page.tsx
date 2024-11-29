'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For App Router navigation
import { createCategory, fetchPCategories } from '../../../../services/subcategoryService';
import { Category } from '../../../../types/category';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import PrivateRoute from '@/app/login/privateRoute';

const AddCategoryPage: React.FC = ({params}:any) => {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); // To store fetched categories
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const categoryId = params.cid; // Directly access the id from params
  

  // Fetch categories for the parent dropdown
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchPCategories();
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
      await createCategory({ name, parentCategory });
      setName('');
      setParentCategory(null);
      router.push(`/menu/category/${categoryId}`);
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
          className="bg-[#633110c5] shadow-md rounded px-8 pt-6 pb-8 text-gray-700"
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
        
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Parent Category
            </label>
            <select
              value={parentCategory || ''}
              onChange={(e) => setParentCategory(e.target.value || null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">None</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
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
              onClick={() => router.push(`/menu/category/${categoryId}`)}
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