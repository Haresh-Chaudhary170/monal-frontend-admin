export interface Category {
    _id: string; // MongoDB ObjectId as a string
    name: string; // Name of the category
    type: 'food' | 'drink'; // Type of the category
    parentCategory?: string | null; // Optional parent category ID (can be null)
    __v?: number; // MongoDB version key (optional)
  }
  