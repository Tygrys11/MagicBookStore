import Books from "@/app/components/DashBoard/Books";
import DashBoardSidebar from "@/app/components/DashBoard/DashBoardSidebar";
import styles from "@/app/styles/OtherPagesStyles/dashBoard.module.css";

export default function BooksPage() {
  return (
    <div className={styles.dashboard_container}>
      <DashBoardSidebar />
      <Books />
    </div>
  );
}
