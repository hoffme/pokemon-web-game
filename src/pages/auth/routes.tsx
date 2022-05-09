import {Route, Routes } from "react-router-dom";

import SignInPage from "./sign_in";

const AuthRoutes = () => {
    return <Routes>
        <Route path={'/'} element={<SignInPage />} />
    </Routes>
}

export default AuthRoutes;