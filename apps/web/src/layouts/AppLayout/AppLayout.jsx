import { Outlet } from "react-router-dom";

import Navbar from "@/components/navbar/Navbar/Navbar";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;