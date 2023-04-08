import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPrivateRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const localAuth = localStorage?.getItem("auth");

        const auth = JSON.parse(localAuth);

        if (!auth?.accessToken && !auth?.user) navigate("/admin");
    }, [navigate]);

    return children;
}

export default AdminPrivateRoute;
