import React from "react";
import ProductsTable from "@/components/ProductsTable";
import OrderForm from "@/components/OrderForm";
import { Stack } from "@mui/material";

const ProductsPage = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" padding={3}>
      <ProductsTable />
      <OrderForm />
    </Stack>
  );
};

export default ProductsPage;
