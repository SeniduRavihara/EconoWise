import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import AuthLayout from "./_routes/_auth/AuthLayout";
import SignupPage from "./_routes/_auth/forms/SignupPage";
import LoginPage from "./_routes/_auth/forms/LoginPage";
import HomePage from "./_routes/_root/pages/HomePage";
import AuthContextProvider from "./context/AuthContext";
import RootLayout from "./_routes/_root/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* private routes */}
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};
export default App;
