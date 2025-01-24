import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrderResponse,
  MessageResponse,
  NewOrderQuery,
  orderDetailsResponse,
  UpdateOrderQuery,
} from "../../types/api-types";

export const orderAPI = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderQuery>({
      query: (order) => ({ url: "new", method: "POST", body: order }),
      invalidatesTags: ["order"],
    }),
    updateOrder: builder.mutation<MessageResponse, UpdateOrderQuery>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrderQuery>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    myOrders: builder.query<AllOrderResponse, string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["order"],
    }),
    allOrders: builder.query<AllOrderResponse, string>({
      query: (id) => `/all?id=${id}`,
      providesTags: ["order"],
    }),
    orderDetails: builder.query<orderDetailsResponse, string>({
      query: (id) => id,
      providesTags: ["order"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
} = orderAPI;
