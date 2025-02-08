import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { Button } from "@mui/material";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Order Management System</h1>
      <p>Manage your products and orders efficiently.</p>
      <div className={styles.links}>
        <Link href="/products" passHref>
          <Button className={styles.button}>View Products</Button>
        </Link>
        <Link href="/orders" passHref>
          <Button className={styles.button}>View Orders</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
