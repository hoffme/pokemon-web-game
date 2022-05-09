import {Route, Routes } from "react-router-dom";

import DashboardPage from "../../components/layout/dashboard/page";

import HallPage from "./hall";
import DecksPage from "./decks";
import BoxesPage from "./boxes";

const PrivateRoutes = () => {
    return <DashboardPage>
        <Routes>
            <Route path={'/'}>
                <Route path={'boxes'} element={<BoxesPage />} />
                <Route path={'decks'} element={<DecksPage />} />
                <Route index element={<HallPage />} />
            </Route>
        </Routes>
    </DashboardPage>

}

export default PrivateRoutes;