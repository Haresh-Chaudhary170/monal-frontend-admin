import { Category } from './category';

export interface Item {
  _id: string;
  name: string;
  price: number;
  category: Category | null;
  description: string;
}
