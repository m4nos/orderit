"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { useCreateOrderMutation, useGetProductsQuery } from "@/services/api";
import styles from "./OrderForm.module.css"; // Import the CSS module
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Product } from "@prisma/client";

export const OrderForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Dayjs | null>(null);
  const [status, setStatus] = useState<"pending" | "completed" | "cancelled">(
    "pending"
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<Product["id"][]>([]);

  const { data: products } = useGetProductsQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleProductChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedProducts(event.target.value as Product["id"][]);
    setTotalPrice(
      Number(
        (event.target.value as Product["id"][])
          .reduce((acc, product) => {
            const productPrice = products?.find((p) => p.id === product)?.price;
            return acc + (productPrice || 0);
          }, 0)
          .toFixed(2)
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createOrder({
        customerName,
        deliveryDate: deliveryDate?.toDate(),
        status,
        totalPrice,
        // @ts-expect-error prisma doesn't support this // TODO: fix this
        productIds: selectedProducts,
      }).unwrap();
      // Reset form fields after successful submission
      setCustomerName("");
      setDeliveryDate(null);
      setStatus("pending");
      setTotalPrice(0);
      setSelectedProducts([]);
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h1>Create Order</h1>
      <TextField
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        margin="normal"
        required
        className={styles.textField}
      />

      <DatePicker
        label="Delivery Date"
        value={deliveryDate ? dayjs(deliveryDate) : null}
        onChange={(date) => setDeliveryDate(date)}
      />

      <FormControl fullWidth margin="normal" className={styles.textField}>
        <InputLabel>Products</InputLabel>
        <Select
          multiple
          value={selectedProducts}
          // @ts-expect-error  // TODO: fix this
          onChange={handleProductChange}
          input={<OutlinedInput label="Products" />}
          renderValue={(selected) =>
            selected
              .map((id) => products?.find((product) => product.id === id)?.name)
              .join(", ")
          }
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {products?.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              <Checkbox checked={selectedProducts.indexOf(product.id) > -1} />
              <ListItemText primary={product.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" className={styles.textField}>
        <Select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "pending" | "completed" | "cancelled")
          }
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Total Price"
        type="number"
        value={totalPrice}
        fullWidth
        margin="normal"
        required
        className={styles.textField}
        disabled
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? "Submitting..." : "Create Order"}
      </Button>
    </form>
  );
};
