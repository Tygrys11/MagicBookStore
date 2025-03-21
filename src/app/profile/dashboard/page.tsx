import DashBoard from "@/app/components/DashBoard/DashBoard";
import DashBoardSidebar from "@/app/components/DashBoard/DashBoardSidebar";
import styles from "../../../app/styles/OtherPagesStyles/dashBoard.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.dashboard_container}>
      <DashBoardSidebar />
      <DashBoard />
    </div>
  );
}
