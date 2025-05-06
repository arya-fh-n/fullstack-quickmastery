/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { token } = useSelector((state: any) => state.auth);
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;