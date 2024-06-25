import "./App.css";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Root from "./pages/root/Root";
import Dashboard from "./pages/dashboard/Dashboard";
import News from "./pages/news/News";
import { useSelector } from "react-redux";
import { getTheme } from "./slices/themeSlice";
import Settings from "./pages/settings/Settings";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import BangDien from "./pages/dashboard/bangdien/BangDien";
import BuySell from "./pages/dashboard/buysell/BuySell";
import LocCoPhieu from "./pages/dashboard/locCoPhieu/LocCoPhieu";
import UserManager from "./pages/admin/UserManager";
import RequestManager from "./pages/admin/requestManager/RequestManager";
import ImportBuysell from "./pages/admin/importFile/ImportBuysell";
import Roc from "./pages/dashboard/roc/Roc";
import { useEffect } from "react";
import { socket } from "./utils/socket";
import CategoryManager from "./pages/admin/category/CategoryManager";
import Signup from "./pages/signup/Signup";
import Academic from "./pages/dashboard/academic/Academic";
import ArticleManager from "./pages/admin/article/ArticleManager";
import ArticleCategory from "./pages/admin/article/category/ArticleCategory";
import Article from "./pages/admin/article/article/Article";
import Chart from "./pages/dashboard/chart/Chart";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);

  const darkMode = useSelector(getTheme);
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
          <Route element={<Roc />} path="roc" />
          <Route element={<Academic />} path="academic" />
          <Route element={<Chart />} path="chart" />
        </Route>
        <Route element={<Admin />} path="/admin">
          <Route element={<UserManager />} path="user-manager" />
          <Route element={<RequestManager />} path="request-manager" />
          <Route element={<ImportBuysell />} path="buysell" />
          <Route element={<CategoryManager />} path="category" />
          <Route element={<ArticleManager />} path="article-manager">
            <Route element={<Article />} path="article" />
            <Route element={<ArticleCategory />} path="category" />
          </Route>
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        {/* <Route path="*" element={<Navigate to="/" replace />}></Route> */}
      </Route>
    )
  );
  return (
    <div className={`App ${darkMode ? "dark" : ""} text-xs md:text-base`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
