'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

interface Contact {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setContacts(response.data.users);
        console.log(response);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);


  return (
    <DefaultLayout>
      <Breadcrumb pageName='Contact'/>
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">Contact Messages</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-800 text-sm">
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody className='text-gray-100 font-bold'>
            {contacts.map((contact) => (
              <tr key={contact._id} className="">
                <td className="border border-gray-300 px-4 py-2">{contact.fname}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.lname}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.message}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </DefaultLayout>
  );
};

export default ContactsList;
