import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

interface ProtectedRouteProps {
    adminOnly?: boolean;
}

const ProtectedRoute = ({ adminOnly = false }: ProtectedRouteProps) => {
    const { isAuthenticated, isAdmin } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && isAdmin) return <Navigate to="/admin/home" replace/>;

    return <Outlet />;
};

export default ProtectedRoute;