import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export const useLogout = async () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  await api
    .get("/user/logout")
    .then((res) => {
      dispatch(logout());
      navigate("/login");
    })
    .catch((err) => console.log(err));
};
