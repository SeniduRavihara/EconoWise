import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthLayout from "./_routes/auth/AuthLayout";
import SignupPage from "./_routes/auth/forms/SignupPage";
import LoginPage from "./_routes/auth/forms/LoginPage";
import HomePage from "./_routes/public/pages/HomePage";
import AuthContextProvider from "./context/AuthContext";
import PublicLayout from "./_routes/public/PublicLayout";
import PrivateLayout from "./_routes/private/PrivateLayout";
import AdminLayout from "./_routes/admin/AdminLayout";
import DashboardPage from "./_routes/private/pages/DashboardPage";
import UserProfilePage from "./_routes/private/pages/UserProfilePage";
import CurrencyExchangePage from "./_routes/private/pages/CurrencyExchangePage";
import InvestmentsPage from "./_routes/private/pages/InvestmentsPage";
import AddInvestmentPage from "./_routes/private/pages/AddInvestmentPage";
import InvestmentDetailsPage from "./_routes/private/pages/InvestmentDetailsPage";
import AdminDashboardPage from "./_routes/admin/pages/AdminDashboardPage";
import ManageUsersPage from "./_routes/admin/pages/ManageUsersPage";
import UserDetailsPage from "./_routes/admin/pages/UserDetailsPage";
import ManageInvestmentsPage from "./_routes/admin/pages/ManageInvestmentsPage";
import AddInvestmentTypePage from "./_routes/admin/pages/AddInvestmentTypePage";
import ManageCurrencyExchangePage from "./_routes/admin/pages/ManageCurrencyExchangePage";
import AnalyticsPage from "./_routes/admin/pages/AnalyticsPage";
import ManageTransactionsPage from "./_routes/admin/pages/ManageTransactionsPage";
import ManageNotificationsPage from "./_routes/admin/pages/ManageNotificationsPage";
import SystemSettingsPage from "./_routes/admin/pages/SystemSettingsPage";
import AdminProfilePage from "./_routes/admin/pages/AdminProfilePage";
import RootLayout from "./_routes/RootLayout";
import DataContextProvider from "./context/DataContext";
import AdminMessagingPage from "./_routes/admin/pages/AdminMessagingPage";
import ClientMessagingPage from "./_routes/private/pages/ClientMessagingPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {/* auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* public routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="currency-exchange" element={<CurrencyExchangePage />} />
        <Route path="messaging" element={<ClientMessagingPage />} />;
        <Route path="investments" element={<InvestmentsPage />}>
          <Route path="add" element={<AddInvestmentPage />} />
          <Route path=":investmentId" element={<InvestmentDetailsPage />} />
        </Route>
      </Route>

      {/* admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="users/:userId" element={<UserDetailsPage />} />
        <Route path="investments" element={<ManageInvestmentsPage />} />
        <Route path="investments/add" element={<AddInvestmentTypePage />} />
        <Route
          path="investments/:investmentId"
          element={<InvestmentDetailsPage />}
        />
        <Route
          path="currency-exchange"
          element={<ManageCurrencyExchangePage />}
        />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="transactions" element={<ManageTransactionsPage />} />
        <Route path="notifications" element={<ManageNotificationsPage />} />
        <Route path="settings" element={<SystemSettingsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="messaging" element={<AdminMessagingPage />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <DataContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </DataContextProvider>
  );
};
export default App;
