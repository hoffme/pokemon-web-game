import {ReactElement} from "react";
import { Outlet, Navigate } from "react-router-dom";

interface Props {
    isAllowed: boolean
    redirectTo: string
    children?: ReactElement
}

const ProtectedRoute = (props: Props) => {
    return props.isAllowed ?
        props.children ?
            props.children :
            <Outlet /> :
        <Navigate to={props.redirectTo} replace />;
};

export default ProtectedRoute;