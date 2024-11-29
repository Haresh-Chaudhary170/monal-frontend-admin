import { Category } from './category';

export interface Item {
  [x: string]: any;
  _id: string;
  name: string;
  price: number;
  category: Category | null;
  description: string;
}
