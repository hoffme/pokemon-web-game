import {BrowserRouter, Routes, Route} from "react-router-dom";

import useAuthContext from "../hooks/auth";

import SignInPage from "../pages/sign_in";
import BoxesPage from "../pages/boxes";
import DecksPage from "../pages/decks";
import HallPage from "../pages/hall";

import ProtectedRoute from "./protected";
import ProtectedDashboardRoute from "./dashboard";

const AppRoutes = () => {
    const { logged } = useAuthContext();

    return <BrowserRouter>
        <Routes>
            <Route path={'*'} element={<ProtectedDashboardRoute isAllowed={logged} redirectTo={'/auth'} />} >
                <Route path={'boxes'} element={<BoxesPage />} />
                <Route path={'decks'} element={<DecksPage />} />
                <Route index element={<HallPage />} />
            </Route>
            <Route path={'/auth'} element={<ProtectedRoute isAllowed={!logged} redirectTo={'/'} />} >
                <Route index element={<SignInPage />} />
            </Route>
            <Route path={'*'} element={404} />
        </Routes>
    </BrowserRouter>
}

export default AppRoutes;