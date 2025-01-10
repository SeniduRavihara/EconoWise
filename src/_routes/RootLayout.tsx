import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div >
      <Outlet />
      <Toaster />
    </div>
  );
};
export default RootLayout;
