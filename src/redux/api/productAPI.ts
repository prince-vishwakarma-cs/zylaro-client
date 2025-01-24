import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryResponse,
  DeleteProductQuery,
  DeleteReviewQuery,
  MessageResponse,
  NewProductQuery,
  NewReviewQuery,
  productDetailsResponse,
  ProductsResponse,
  ReviewsResponse,
  SeachRequestQuery,
  SearchResponse,
  UpdateProductQuery,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<ProductsResponse, string>({
      query: () => "latest",
      providesTags: ["Product"],
    }),
    allProducts: builder.query<ProductsResponse, string>({
      query: (id: string) => `admin/products?id=${id}`,
      providesTags: ["Product"],
    }),
    categories: builder.query<CategoryResponse, string>({
      query: () => `categories`,
      providesTags: ["Product"],
    }),
    searchProducts: builder.query<SearchResponse, SeachRequestQuery>({
      query: ({ search, sort, category, maxPrice, page }) => {
        let baseQuery = `all?search=${search}&page=${page}`;

        if (sort) baseQuery += `&sort=${sort}`;
        if (category) baseQuery += `&category=${category}`;
        if (maxPrice) baseQuery += `&price=${maxPrice}`;

        return baseQuery;
      },
      providesTags: ["Product"],
    }),
    productDetails: builder.query<productDetailsResponse, string>({
      query: (id:string) => id,
      providesTags: ["Product"],
    }),
    allReviews: builder.query<ReviewsResponse, string>({
      query: (productId: string) => `reviews/${productId}`,
      providesTags: ["Product"],
    }),
    newReview: builder.mutation<MessageResponse, NewReviewQuery>({
      query: ({ rating,comment,productId,userId}) => ({
        url: `review/new/${productId}?id=${userId}`,
        method: "POST",
        body:{comment,rating},
        headers:{
          "Content-Type":"application/json"
        }
      }),
      invalidatesTags: ["Product"],
    }),
    deleteReview: builder.mutation<MessageResponse, DeleteReviewQuery>({
      query: ({reviewId,userId}) => ({
        url: `review/${reviewId}?id=${userId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Product"],
    }),
    newProduct: builder.mutation<MessageResponse, NewProductQuery>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<MessageResponse, UpdateProductQuery>({
      query: ({ formData, UserId, productId }) => ({
        url: `${productId}?id=${UserId}`,
        method: "PUt",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<MessageResponse, DeleteProductQuery>({
      query: ({ UserId, productId }) => ({
        url: `${productId}?id=${UserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAllReviewsQuery,
  useNewReviewMutation,
  useDeleteReviewMutation
} = productAPI;
