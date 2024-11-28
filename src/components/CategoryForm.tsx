import { useState } from 'react';
import { createCategory } from '../app/services/categoryService';

interface Props {
  onCategoryAdded: () => void;
}

const CategoryForm: React.FC<Props> = ({ onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'food' | 'drink'>('food');
  const [parentCategory, setParentCategory] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCategory({ name, type, parentCategory });
      setName('');
      setParentCategory(null);
      onCategoryAdded();
    } catch (err) {
      console.error('Error creating category:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
          Parent Category (Optional)
        </label>
        <input
          type="text"
          value={parentCategory || ''}
          onChange={(e) => setParentCategory(e.target.value || null)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Category
      </button>
    </form>
  );
};

export default CategoryForm;
