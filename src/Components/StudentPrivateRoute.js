import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentPrivateRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const localAuth = localStorage?.getItem("auth");

        const auth = JSON.parse(localAuth);

        if (!auth?.accessToken && !auth?.user) navigate("/");
    }, [navigate]);

    return children;
}

export default StudentPrivateRoute;
