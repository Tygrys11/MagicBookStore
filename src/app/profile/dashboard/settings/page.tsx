import Settings from "@/app/components/DashBoard/Settings";
import DashBoardSidebar from "@/app/components/DashBoard/DashBoardSidebar";
import styles from "@/app/styles/OtherPagesStyles/dashBoard.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.dashboard_container}>
      <DashBoardSidebar />
      <Settings />
    </div>
  );
}
