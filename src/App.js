import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Root from "./pages/root/Root";
import Dashboard from "./pages/dashboard/Dashboard";
import BangDien from "./pages/bangdien/BangDien";
import BuySell from "./pages/buysell/BuySell";
import News from "./pages/news/News";
import { useSelector } from "react-redux";
import { getTheme } from "./slices/themeSlice";
import Settings from "./pages/settings/Settings";
import LocCoPhieu from "./pages/locCoPhieu/LocCoPhieu";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";

function App() {
  const darkMode = useSelector(getTheme);
  console.log(darkMode);
  console.log("reloa");
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />} errorElement={<ErrorPage />}>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Settings />} path="/settings" />
        <Route element={<News />} path="/tin-tuc" />
        <Route element={<Dashboard />} path="/dashboard">
          <Route element={<BangDien />} path="bang-dien" />
          <Route element={<BuySell />} path="buy-sell" />
          <Route element={<LocCoPhieu />} path="loc-co-phieu" />
        </Route>
        <Route element={<Admin />} path="/admin" />
        <Route element={<Login />} path="/login" />
      </Route>
    )
  );
  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
