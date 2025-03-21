"use client";
import styles from "../../styles/OtherPagesStyles/dashBoardSidebar.module.css";
import { MdDashboard, MdQueryStats } from "react-icons/md";
import { FaBook, FaShoppingCart } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

const sidebarLinks = [
  { name: "Dashboard", href: "/profile/dashboard", icon: <MdDashboard /> },
  { name: "Books", href: "/profile/dashboard/books", icon: <FaBook /> },
  { name: "Categories", href: "/profile/dashboard/categories", icon: <BiCategory /> },
  { name: "Orders", href: "/profile/dashboard/orders", icon: <FaShoppingCart /> },
  { name: "Analytics", href: "/profile/dashboard/analytics", icon: <MdQueryStats /> },
];

const bottomLinks = [
  { name: "Settings", href: "/profile/dashboard/settings", icon: <IoSettingsOutline /> },
];

export default function DashBoardComponent() {
  const { signOut } = useClerk();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo_content}>
        <div className={styles.logo}>
          <img alt="Logo" src="/assets/book.png" className={styles.logo_icon} />
        </div>
      </div>

      <ul className={styles.nav_list}>
        {sidebarLinks.map((link) => (
          <li key={link.name} className={styles.nav_item}>
            <Link href={link.href} className={styles.nav_link}>
              <span className={styles.icon}>{link.icon}</span>
              <span className={styles.tooltip}>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.bottom_section}>
        {bottomLinks.map((link) => (
          <li key={link.name} className={styles.nav_item}>
            <Link href={link.href} className={styles.nav_link}>
              <span className={styles.icon}>{link.icon}</span>
              <span className={styles.tooltip}>{link.name}</span>
            </Link>
          </li>
        ))}
        {/* Logout button */}
        <li className={styles.nav_item} onClick={() => signOut()}>
          <button className={styles.nav_link}>
            <span className={styles.icon}><FiLogOut /></span>
            <span className={styles.tooltip}>Logout</span>
          </button>
        </li>
      </div>
    </div>
  );
}
