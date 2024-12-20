"use client";

import { useEffect, useState } from 'react';
import { deleteItem, fetchItems, fetchItemsByCategory } from '../../../../../services/itemService';
import { Item } from '../../../../../types/item';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Link from 'next/link';
import Swal from 'sweetalert2';
import PrivateRoute from '../../../../../login/privateRoute';
import { getCategoryById } from '@/app/services/categoryService';
import axios from 'axios';

const ItemsPage: React.FC = ({ params }: any) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [cname, setCName] = useState('');
  const [scname, setSCName] = useState('');

  const categoryId = params.cid;
  const subcategoryId = params.scid;


  useEffect(() => {
    console.log(categoryId);
    const loadItems = async () => {
      try {
        const fetchedItems = await fetchItemsByCategory(subcategoryId);
        console.log(fetchedItems);
        setItems(fetchedItems);
      } catch (err) {
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
    loadCategory()
    loadSubategory();
  }, []);
  const loadCategory = async () => {
    try {
      const category = await getCategoryById(categoryId);
      setCName(category.name);
    } catch (err) {
      console.error('Error fetching category:', err);
      alert('Failed to fetch category');
    }
  };
  const loadSubategory = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subcategories/${subcategoryId}`, { withCredentials: true });
    setSCName(response.data.name);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this item? This action cannot be undone.",
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
        await deleteItem(id);
        Swal.fire('Deleted!', 'The item has been deleted.', 'success');
        setItems((prev) => prev.filter((emp) => emp._id !== id));
      } catch (err) {
        console.error('Error deleting item:', err);
        Swal.fire('Error!', 'Failed to delete the item.', 'error');
      }
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName={scname} prevPageName='Menu' prevPageName2={cname} />
      {/* <TableThree />
       */}
      <div className="container mx-auto p-4">

        <div className="mb-5">
          <div className="flex justify-between">
              <Link href={`/menu/category/${categoryId}`}>
                <button className="bg-gold border border-4-white text-white font-bold py-2 px-4 rounded">
                  Back
                </button>
              </Link>
              <Link className='flex justify-end' href={`/menu/category/${categoryId}/${subcategoryId}/item/add`}>
                <button className="bg-brown text-white font-bold py-2 px-4 rounded">
                  Add Item
                </button>
              </Link>
          </div>

        </div>      {loading ? (
          <p className='text-white'>Loading items...</p>
        ) : items.length > 0 ? (
          <table className="min-w-full bg-[#633110c5] border border-gray-200 text-white">
            <thead>
              <tr className='bg-white text-gray-700'>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{item.subcategory?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{item.description}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center flex gap-2">
                    <Link
                      href={`/menu/category/${categoryId}/${subcategoryId}/item/edit/${item._id}`}
                      className=" px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </Link>
                    <button
                      className="px-4 py-2 rounded-md shadow focus:ring-offset-1 text-red-600"
                      onClick={() => handleDelete(item._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-white font-bold'>No items found.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ItemsPage;
