"use client";

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetOrdersQuery } from "@/services/api";
import { Order } from "@prisma/client";
import styles from "./OrdersTable.module.css";
import { format } from "date-fns";
import { LinearProgress } from "@mui/material";

export const OrdersTable = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();

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
        <DataGrid rows={orders || []} columns={columns} />
      )}
    </div>
  );
};
