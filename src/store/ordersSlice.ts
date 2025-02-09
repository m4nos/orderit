import { Product } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: string;
  deliveryDate: string;
  customerName: string;
  status: 'pending' | 'completed' | 'cancelled';
  products: Product['id'][];
  totalPrice: number;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    hydrateOrders(state, action: PayloadAction<Order[]>) {
      state.orders = [
        ...(action.payload || []),
        ...state.orders.filter(
      (o) =>
        !(action.payload || []).some(
          (fetchedOrder) => fetchedOrder.id === o.id
        )
        ),
      ];
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    updateStatus(state, action: PayloadAction<{ id: string; status: 'completed' | 'cancelled' }>) {
      const order = state.orders.find(order => order.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { hydrateOrders, addOrder, updateStatus } = ordersSlice.actions;
export default ordersSlice.reducer; 