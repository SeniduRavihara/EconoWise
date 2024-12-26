import {
  Bell,
  ChartSpline,
  DollarSign,
  Layout,
  MessageCircle,
  NotebookPen,
  Settings,
  User,
  Users,
  Wallet,
  Wallet2Icon,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";

const clientRoutes = [
  { icon: Layout, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  {
    icon: DollarSign,
    label: "Currency Exchange",
    href: "/dashboard/currency-exchange",
  },
  {
    icon: Wallet,
    label: "Add Investment",
    href: "/dashboard/investments/add",
  },
  {
    icon: Wallet2Icon,
    label: "Investment Details",
    href: "/dashboard/investments/:investmentId",
  },
  { icon: MessageCircle, label: "Messaging", href: "/dashboard/messaging" },
];

const adminRoutes = [
  { icon: Layout, label: "Admin Dashboard", href: "/admin" },
  { icon: Users, label: "Clients", href: "/admin/users" },
  {
    icon: NotebookPen,
    label: "Manage Investments",
    href: "/admin/investments",
  },
  {
    icon: DollarSign,
    label: "Currency Exchange",
    href: "/admin/currency-exchange",
  },
  { icon: ChartSpline, label: "Analytics", href: "/admin/analytics" },
  { icon: Wallet, label: "Transactions", href: "/admin/transactions" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: User, label: "Profile", href: "/admin/profile" },
  { icon: MessageCircle, label: "Messaging", href: "/admin/messaging" },
];

const SidebarRoutes = () => {
  const location = useLocation();
  const isTeacherPage = location.pathname.includes("/admin");

  const routes = isTeacherPage ? adminRoutes : clientRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
