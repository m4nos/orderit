"use client";

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetProductsQuery } from "@/services/api";
import styles from "./ProductsTable.module.css";
import { LinearProgress } from "@mui/material";

export const ProductsTable = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price (€)", width: 110 },
  ];

  return (
    <div className={styles.tableContainer}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <DataGrid
          className={styles.dataGrid}
          rows={products || []}
          columns={columns}
          loading={isLoading}
        />
      )}
    </div>
  );
};
