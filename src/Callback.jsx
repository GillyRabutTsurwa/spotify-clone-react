import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function Callback() {
    const location = useLocation();

    return <Navigate to="/library" />;
}

export default Callback;
