import React from "react";
import useAuth from "./useAuth";

export default function Dashboard(props) {
    const { code } = props;
    const accessToken = useAuth(code);

    return (
        <div>
            {code}
            <h4>{accessToken}</h4>
        </div>
    );
}
