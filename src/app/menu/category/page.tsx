"use client";
import { useEffect, useState } from 'react';
import { deleteCategory, fetchCategories } from '../../services/categoryService';
import { Category } from '../../../types/category';
import CategoryList from '../../../components/CategoryList';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


const CalendarPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  const deleteCategoryy = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this category? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        await deleteCategory(id)
        setCategories(categories.filter((category) => category.id !== id));
      } catch (err) {
        console.error('Error deleting category:', err);
      }
    }
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category" />
      {/* <TableThree />
       */}
      <div className="container mx-auto p-4">
        <div className="mb-5 flex justify-between">
          <Link href="/menu/category/add">
            <button className="bg-gray-500 hover:bg-gray-700 border border-4-white text-white font-bold py-2 px-4 rounded">
              Add New Category
            </button>
          </Link>

        </div>
        {/* <CategoryForm onCategoryAdded={loadCategories} /> */}
        <CategoryList categories={categories} deleteCategory={deleteCategoryy} />
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;

