export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  gender: string;
  dob: string;
}

export interface Product {
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  ratings: number;
  numReviews: number;
  photos: {
    url: string;
    public_id: string;
  }[];
  _id: string;
}

export interface Review{
  _id: string;
  rating: number;
  comment: string;
  product: string;
  user: {
    name: string;
    _id: string;
    photo : string;
  }
}
export type shippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};
export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type Coupon = {
  _id: string;
  code: string;
  amount: number;
}
export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: shippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

export type Stats = {
  userratio: {
    male: number;
    female: number;
  };
  categoryData: Record<string, number>[];
  changePercent: {
    revenue: number;
    product: number;
    user: number;
    order: number;
  };
  count: {
    revenue: number;
    Product: number;
    user: number;
    order: number;
  };
  chart: {
    order: number[];
    revenue: number[];
  };
  modifiedLatestTransaction: {
    _id: string;
    discount: number;
    amount: number;
    quantity: number;
    status: string;
  }[];
};

export type Pie = {
  orderFullfillment: {
    processing: number;
    shipped: number;
    delivered: number;
  };
  productCategories: Record<string, number>[]
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: {
    netIncome: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  userAgeDistribution: {
    teen: number;
    adult: number;
    old: number;
  };
  CustomerDistribution: {
    admin: number;
    customer: number;
    total: number;
  };
};
export type Bar = {
  users: number[],
  products: number[],
  orders:number[],
};
export type Line = {
  users: number[];
  products: number[];
  discount:number[];
  revenue:number[];
};


