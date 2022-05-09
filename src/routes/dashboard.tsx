import { Outlet, Navigate } from "react-router-dom";

import DashboardPage from "../components/layout/dashboard/page";

interface Props {
    isAllowed: boolean
    redirectTo: string
}

const ProtectedDashboardRoute = (props: Props) => {
    return props.isAllowed ?
        <DashboardPage children={<Outlet />} />:
        <Navigate to={props.redirectTo} replace />;
};

export default ProtectedDashboardRoute;