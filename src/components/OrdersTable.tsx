"use client";

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../services/api";
import { Order } from "@prisma/client";

const OrdersTable = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = (
    id: number,
    status: "completed" | "cancelled"
  ) => {
    updateOrderStatus({ id, status });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "customerName", headerName: "Customer Name", width: 150 },
    { field: "deliveryDate", headerName: "Delivery Date", width: 150 },
    { field: "status", headerName: "Status", width: 110 },
    { field: "totalPrice", headerName: "Total Price (€)", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: { row: Order }) => (
        <div>
          <button
            onClick={() => handleStatusChange(params.row.id, "completed")}
          >
            Complete
          </button>
          <button
            onClick={() => handleStatusChange(params.row.id, "cancelled")}
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={orders || []} columns={columns} loading={isLoading} />
    </div>
  );
};

export default OrdersTable;
