import { Menu } from "@/validations/menu-valitaion";

export type OrderFormState = {
  status?: string;
  errors?: {
    customer_name?: string[];
    table_id?: string[];
    status?: string[];
    capacity?: string[];
    status?: string[];
    _form?: string[];
  };
};

export type Cart = {
  menu_id: string;
  quantity: number;
  nominal: number;
  notes: string;
  menu: Menu;
  order_id?: string;
};
