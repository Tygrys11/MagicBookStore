import Analytics from "@/app/components/DashBoard/Analytics";
import DashBoardSidebar from "@/app/components/DashBoard/DashBoardSidebar";
import styles from "@/app/styles/OtherPagesStyles/dashBoard.module.css";

export default function AnalyticsPage() {
  return (
    <div className={styles.dashboard_container}>
      <DashBoardSidebar />
      <Analytics />
    </div>
  );
}
