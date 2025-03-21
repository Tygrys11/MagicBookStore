import Orders from "@/app/components/DashBoard/Orders";
import DashBoardSidebar from "@/app/components/DashBoard/DashBoardSidebar";
import styles from "@/app/styles/OtherPagesStyles/dashBoard.module.css";

export default function OrdersPage() {
  return (
    <div className={styles.dashboard_container}>
      <DashBoardSidebar />
      <Orders />
    </div>
  );
}
