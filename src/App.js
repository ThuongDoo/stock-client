import logo from "./logo.svg";
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
import AboutUs from "./routes/AboutUs";
import Dashboard from "./routes/Dashboard";
import BangDien from "./routes/BangDien";
import BuySell from "./routes/BuySell";
import News from "./routes/News";
import { useSelector } from "react-redux";
import { getTheme } from "./slices/themeSlice";
import Settings from "./routes/Settings";

function App() {
  const darkMode = useSelector(getTheme);
  console.log(darkMode);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />} errorElement={<ErrorPage />}>
        <Route element={<Home />} path="/home">
          <Route element={<AboutUs />} path="about-us" />
        </Route>
        <Route element={<Settings />} path="/settings" />
        <Route element={<News />} path="/tin-tuc" />
        <Route element={<Dashboard />} path="/dashboard">
          <Route element={<BangDien />} index />
          <Route element={<BuySell />} path="buy-sell" />
        </Route>
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
