'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCategoryById, updateCategory, fetchCategories } from '../../../../services/categoryService';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';



const EditCategoryPage: React.FC = ({ params }:any) => {
  const categoryId = params.id; // Directly access the id from params
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState<'food' | 'drink'>('food');
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [showInHome, setShowInHome] = useState<'1' | '0'>('0');
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
      setType(category.type);
      setParentCategory(category.parentCategory?._id || null);
      setShowInHome(category.showInHome);
    } catch (err) {
      console.error('Error fetching category:', err);
      alert('Failed to fetch category');
    }
  };

  const fetchAllCategories = async () => {
    try {
      const allCategories = await fetch('http://localhost:4000/api/categories').then((res) => res.json());
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
        type,
        parentCategory,
        showInHome,
      });
      router.push('/menu/category'); // Redirect to categories list
    } catch (err) {
      console.error('Error updating category:', err);
      alert('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Category" />

      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'food' | 'drink')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="food">Food</option>
              <option value="drink">Drink</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Parent Category
            </label>
            <select
              value={parentCategory || ''}
              onChange={(e) => setParentCategory(e.target.value || null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">None</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Show in Home
            </label>
            <select
              value={showInHome}
              onChange={(e) => setShowInHome(e.target.value as '1' | '0')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {loading ? 'Updating...' : 'Update Category'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/menu/category')}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditCategoryPage;
