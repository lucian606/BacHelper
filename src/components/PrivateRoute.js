import { useAuth } from "../contexts/AuthContext";
import { Route, Navigate } from "react-router-dom";

export default function PrivateRoute({children}) {
   const { currentUser } = useAuth();
   console.log("PrivateRoute");
   console.log(currentUser);
   return currentUser ? children : <Navigate to="/login" />;
}