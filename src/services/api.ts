import { Order, Product } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getOrders: builder.query<Order[], void>({
      query: () => 'orders',
    }),
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (newOrder) => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
      }),
    }),
    updateOrderStatus: builder.mutation<void, { id: number; status: 'completed' | 'cancelled' }>({
      query: ({ id, status }) => ({
        url: `orders/${id}`,
        method: 'PATCH',
        body: { status },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetOrdersQuery, useCreateOrderMutation, useUpdateOrderStatusMutation } = api; 