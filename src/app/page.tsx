import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Order Management System</h1>
      <p>Manage your products and orders efficiently.</p>
      <div className={styles.links}>
        <Link href="/products">View Products</Link>
        <Link href="/orders">View Orders</Link>
      </div>
    </div>
  );
};

export default HomePage;
