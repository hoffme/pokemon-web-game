import {AuthProvider} from "./contexts/auth";

import AppRoutes from "./routes/routes";

const App = () => {
  return <AuthProvider>
    <AppRoutes />
  </AuthProvider>
}

export default App;
