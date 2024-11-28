export interface Category {
    id: string;
    _id: string;
    name: string;
    parentCategory: string | null;
    type: 'food' | 'drink';
  }
  