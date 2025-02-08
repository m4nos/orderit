"use client";

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetProductsQuery } from "../services/api";

const ProductsTable = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price (€)", width: 110 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={products || []} columns={columns} loading={isLoading} />
    </div>
  );
};

export default ProductsTable;
