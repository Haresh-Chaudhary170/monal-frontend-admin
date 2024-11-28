"use client";

import { useEffect, useState } from 'react';
import { deleteItem, fetchItems } from '../services/itemService';
import { Item } from '../types/item';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Link from 'next/link';
import Swal from 'sweetalert2';
import PrivateRoute from '../login/privateRoute';

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        console.log(fetchedItems);
        setItems(fetchedItems);
      } catch (err) {
        console.error('Error fetching items:', err);
        alert('Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);


  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this item? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
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
    <PrivateRoute>
      <DefaultLayout>
        <Breadcrumb pageName="Menu" />
        {/* <TableThree />
       */}
        <div className="container mx-auto p-4">

          <div className="mb-5 flex justify-between">
            <span className="text-2xl font-bold text-gray-300">Item</span>
            <div className="flex gap-2">
              <Link href="/menu/add">
                <button className="bg-golden-500 hover:bg-gray-700 border border-4-white text-white font-bold py-2 px-4 rounded">
                  Add Item
                </button>
              </Link>
              <Link href="/menu/category">
                <button className="bg-gray-500 hover:bg-gray-700 border border-4-white text-white font-bold py-2 px-4 rounded">
                  Categories
                </button>
              </Link>
            </div>

          </div>      {loading ? (
            <p>Loading items...</p>
          ) : items.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
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
                    <td className="py-2 px-4 border-b">{item.category?.name || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{item.description}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-center flex gap-2">
                      <Link
                        href={`/menu/edit/${item._id}`}
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
            <p>No items found.</p>
          )}
        </div>
      </DefaultLayout>
    </PrivateRoute>
  );
};

export default ItemsPage;
