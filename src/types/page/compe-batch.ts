export type CompeBatch = {
  id: string;
  name: string;
  category: string;
  start_date: string; // ISO string
  end_date: string; // ISO string
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
