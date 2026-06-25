import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";

import AppNav from "./AppNav";
import Logo from "./Logo";

function Sidebar() {
  // outlet => use for set my nasted routes
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()}
        by wordWise inc
      </p>
    </footer>
  );
}

export default Sidebar;
