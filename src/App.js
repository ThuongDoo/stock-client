import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import Root from "./routes/Root";
import Dashboard from "./routes/Dashboard";
import BangDien from "./routes/BangDien";
import BuySell from "./routes/BuySell";
import News from "./routes/News";
import { useSelector } from "react-redux";
import { getTheme } from "./slices/themeSlice";
import Settings from "./routes/Settings";
import LocCoPhieu from "./routes/LocCoPhieu";
import Admin from "./routes/Admin";
import Login from "./routes/Login";

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
