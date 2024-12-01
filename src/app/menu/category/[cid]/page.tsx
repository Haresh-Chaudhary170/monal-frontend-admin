"use client";
import { useEffect, useState } from 'react';
import { deleteCategory, fetchCategories } from '../../../services/subcategoryService';
import { Category } from '../../../types/category';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import SubcategoryList from '@/components/SubcategoryList';
import { getCategoryById } from '@/app/services/categoryService';


const CalendarPage = ({params}:any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [cname, setCName] = useState('');

  const categoryId = params.cid;

  const loadCategories = async () => {
    try {
      const data = await fetchCategories(categoryId);
      console.log(data);
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };
  const loadCategory= async () => {
    try {
      const category = await getCategoryById(categoryId);
      setCName(category.name);
    } catch (err) {
      console.error('Error fetching category:', err);
      alert('Failed to fetch category');
    }
  };

  useEffect(() => {
    console.log(categoryId);
    loadCategory();
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
      customClass: {
        confirmButton: "bg-brown text-white hover:bg-brown", // Custom style for confirm button
        cancelButton: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-400", // Custom style for cancel button
      },
    });
    if (result.isConfirmed) {
      try {
        await deleteCategory(id)
        setCategories(categories.filter((category) => category._id !== id));
      } catch (err) {
        console.error('Error deleting category:', err);
      }
    }
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName={`${cname}`} prevPageName='Category'/>
      {/* <TableThree />
       */}
      <div className="container mx-auto p-4">
        <div className="mb-5 flex justify-between">
          <Link href={`/menu/category/${categoryId}/add`}>
            <button className="bg-brown border border-4-white text-white font-bold py-2 px-4 rounded">
              Add Subcategory
            </button>
          </Link>
          <Link href={`/menu/`}>
            <button className="bg-gold border border-4-white text-white font-bold py-2 px-4 rounded">
              Back
            </button>
          </Link>

        </div>
        {/* <CategoryForm onCategoryAdded={loadCategories} /> */}
        {/* <SubcategoryList categories={categories} deleteCategory={deleteCategoryy} /> */}

        <div className="bg-[#633110c5] shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border border-gray-300">Name</th>
              <th className="py-3 px-6 text-left border border-gray-300">Category
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-white text-sm font-light">
            {categories?.length!==0? (categories?.map((category:any) => (
              <tr
                key={category._id}
                className="border-b border-gray-200"
              >
                <td className="py-3 px-6 text-left border border-gray-300">
                  {category.name}
                </td>

                <td className="py-3 px-6 text-left border border-gray-300">
                  {category.parentCategory
                    ? typeof category.parentCategory === 'object'
                      ? category.parentCategory?.name
                      : category.parentCategory
                    : 'None'}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-center flex gap-2">
                <Link
                    href={`/menu/category/${categoryId}/${category._id}/item`}
                    className=" px-4 py-2 rounded-md shadw focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  </Link>
                  <Link
                    href={`/menu/category/${categoryId}/edit/${category._id}`}
                    className=" px-4 py-2 rounded-md shadw focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                  </Link>
                  <button
                    className="px-4 py-2 rounded-md shadow focus:ring-offset-1 text-red-600"
                    onClick={() => deleteCategoryy(category._id)}
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                  </button>
                </td>
              </tr>
            ))):(<>
            <span className='flex justify-center font-bold text-xl p-4'>No Data</span></>)}
          </tbody>
        </table>
      </div>
    </div>
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
