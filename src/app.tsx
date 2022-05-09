import {BrowserRouter} from "react-router-dom";

import {AuthProvider} from "./contexts/auth";

import AppRoutes from "./pages/routes";

const App = () => {
  return <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
}

export default App;
