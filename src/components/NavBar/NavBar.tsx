import React from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/products">Products</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/orders">Orders</Link>
        </li>
      </ul>
    </nav>
  );
};
