"use client";

import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetOrdersQuery } from "@/services/api";
import { Order } from "@prisma/client";
import styles from "./OrdersTable.module.css";
import { format } from "date-fns";
import { LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { hydrateOrders } from "@/store/ordersSlice";

export const OrdersTable = () => {
  const dispatch = useDispatch();
  const { data: fetchedOrders, isLoading } = useGetOrdersQuery();

  useEffect(() => {
    if (fetchedOrders) {
      // @ts-expect-error Property 'products' is missing in type '{ id: string; deliveryDate: Date; customerName: string; status: string; totalPrice: number; }' but required in type 'Order' // TODO: fix this
      dispatch(hydrateOrders(fetchedOrders));
    }
  }, [dispatch, fetchedOrders]);

  const { orders } = useSelector((state: RootState) => state.orders);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "customerName", headerName: "Customer Name", width: 150 },
    {
      field: "deliveryDate",
      headerName: "Delivery Date",
      width: 150,
      renderCell: (params: { row: Order }) => (
        <div>{format(params.row.deliveryDate, "dd/MM/yyyy")}</div>
      ),
    },
    { field: "status", headerName: "Status", width: 110 },
    { field: "totalPrice", headerName: "Total Price (€)", width: 130 },
  ];

  return (
    <div className={styles.tableContainer}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        // @ts-expect-error prisma doesn't support this // TODO: fix this
        <DataGrid rows={orders} columns={columns} />
      )}
    </div>
  );
};
