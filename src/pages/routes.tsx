import useAuthContext from "../hooks/auth";

import PrivateRoutes from "./private/routes";
import AuthRoutes from "./auth/routes";

const AppRoutes = () => {
    const { logged } = useAuthContext();

    return logged ? <PrivateRoutes /> : <AuthRoutes />;
}

export default AppRoutes;