import Categories from "@/app/components/DashBoard/Categories";
import DashBoardSidebar from "@/app/components/DashBoard/DashBoardSidebar";
import styles from "@/app/styles/OtherPagesStyles/dashBoard.module.css";

export default function CategoriesPage() {
  return (
    <div className={styles.dashboard_container}>
      <DashBoardSidebar />
      <Categories />
    </div>
  );
}
