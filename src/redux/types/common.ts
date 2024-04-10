export interface IInitialUserState {
    data: {
      id: string;
      name: string;
      email: string;
      phone: string;
      token: string;
    };
  }
  

  export interface ICategories{
    category_id?: number;
    name: string;
    is_active: boolean;
    is_disabled: boolean;
    is_new: boolean;
    products_id?: number[];
  }

  export interface IProducts{
    product_id?: number;
    name: string;
    price: number;
    is_active: boolean;
    is_disabled: boolean;
  }