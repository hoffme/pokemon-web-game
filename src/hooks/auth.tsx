import {useContext} from "react";

import AuthContext from "../contexts/auth";

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;