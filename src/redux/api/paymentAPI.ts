import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  couponDetailsResponse,
  CouponResponse,
  DeleteCouponQuery,
  MessageResponse,
  UpdateCouponQuery
} from "../../types/api-types";

export const paymentAPI = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/`,
  }),
  tagTypes: ["Coupon"],
  endpoints: (builder) => ({
    coupon: builder.query<CouponResponse, string>({
      query: (id) => `coupon/all?id=${id}`,
      providesTags: ["Coupon"],
    }),
    couponDetails: builder.query<couponDetailsResponse, string>({
      query: (id: string) => `coupon/${id}`,
      providesTags: ["Coupon"],
    }),
    newCoupon: builder.mutation<MessageResponse, { code: string; amount: number; id: string }>({
      query: ({ code, amount, id }) => ({
        url: `coupon/new?id=${id}`,
        method: "POST",
        body: { code, amount },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Coupon"],
    }),
    
    updateCoupon: builder.mutation<MessageResponse, UpdateCouponQuery>({
      query: ({ payload, UserId, couponId }) => ({
        url: `coupon/${couponId}?id=${UserId}`,
        method: "PUT",
        body: payload, // Send payload directly as JSON
      }),
      invalidatesTags: ["Coupon"],
    }),    
    deleteCoupon: builder.mutation<MessageResponse, DeleteCouponQuery>({
      query: ({ UserId, couponId }) => ({
        url: `coupon/${couponId}?id=${UserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useCouponQuery,
  useCouponDetailsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  useNewCouponMutation
} = paymentAPI;
