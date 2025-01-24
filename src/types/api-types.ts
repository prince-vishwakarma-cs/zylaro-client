import { Bar, CartItem, Coupon, Line, Order, Pie, Product, Review, shippingInfo, Stats, User } from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllUserResponse = {
  success: boolean;
  user: User[];
};
export type UserResponse = {
  success: boolean;
  user: User;
};

export type ProductsResponse = {
  success: boolean;
  products: Product[];
};

export type ReviewsResponse = {
  success: boolean;
  reviews: Review[];
}

export type CategoryResponse = {
  success: boolean;
  categories: string[];
};

export type SearchResponse = ProductsResponse & {
  totalPages: number;
};

export type SeachRequestQuery = {
  search: string;
  sort: string;
  maxPrice: number;
  category: string;
  page: number;
};

export type NewReviewQuery = {
  rating: number;
  comment: string;
  userId:string,
  productId: string;
};

export type DeleteReviewQuery={
  userId:string,
  reviewId:string
}
export type NewProductQuery = {
  id: string;
  formData: FormData;
};
export type NewCouponQuery = {
  id: string;
  formData: FormData;
};

export type UpdateProductQuery = {
  UserId: string;
  productId: string;
  formData: FormData;
};


export interface UpdateCouponQuery {
  payload: {
    code: string;
    amount: number; 
  };
  couponId: string; 
  UserId: string;
}



export type NewOrderQuery = {
  shippingInfo: shippingInfo;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderQuery = {
  userId: string;
  orderId: string;
};

export type DeleteProductQuery = {
  UserId: string;
  productId: string;
};

export type DeleteCouponQuery = {
  UserId: string;
  couponId: string;
};

export type DeleteUserQuery = {
  userId:string,
  adminId:string
}

export type customError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type productDetailsResponse = {
  success: boolean;
  product: Product;
};

export type AllOrderResponse = {
  success: boolean;
  orders: Order[];
};

export type StatsResponse = {
  success: boolean;
  stats: Stats
}

export type CouponResponse ={
  success: true,
  coupons:Coupon[]
}

export type couponDetailsResponse = {
  success: boolean;
  coupon: Coupon;
};
export type PieResponse = {
  success: boolean;
  charts:Pie
}
export type BarResponse = {
  success: boolean;
  charts:Bar
}
export type LineResponse = {
  success: boolean;
  charts:Line
}
export type orderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type SingleDiscountResponse = {
  success:boolean,
  coupon:Coupon
}