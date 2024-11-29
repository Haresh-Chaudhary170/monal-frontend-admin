'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPCategories, getCategoryById, updateCategory } from '../../../../../services/subcategoryService';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import PrivateRoute from '@/app/login/privateRoute';
import { Category } from '@/types/category';



const EditCategoryPage: React.FC = ({ params }:any) => {
  const categoryId = params.id; // Directly access the id from params
  const router = useRouter();
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pacategories, setPacategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
    }
    // fetchAllCategories();
    // fetchPcategories()
    const loadPaCategories =async()=>{
      const fetchedPaCategories = await fetchPCategories();
      console.log(fetchPCategories);
      setPacategories(fetchedPaCategories);
    }
    loadPaCategories();
  }, [categoryId]);

  const fetchCategory = async (id: string) => {
    try {
      const category = await getCategoryById(id);
      setName(category.name);
      setParentCategory(category.parentCategory?._id || null);
    } catch (err) {
      console.error('Error fetching category:', err);
      alert('Failed to fetch category');
    }
  };


  const fetchPcategories = async () => {
    try {
      const allPaategories = await fetchPCategories;
      console.log(allPaategories);
      // setPacategories(allCategories);
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
        parentCategory,
      });
      router.push(`/menu/category/${params.cid}`); // Redirect to categories list
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
      <Breadcrumb pageName="Edit Subcategory" />

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
   
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Parent Category
            </label>
            <select
              value={parentCategory || ''}
              onChange={(e) => setParentCategory(e.target.value || null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">None</option>
              {pacategories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
              onClick={() => router.push(`/menu/category/${params.cid}`)}
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