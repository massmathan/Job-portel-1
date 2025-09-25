import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext/AuthContext";
import Header from "./components/Header";
import AppRouters from "./routes/AppRouters";
import Sidebar from "./components/Navbars";
import DashboardLayout from "./pages/DashboardLayout";

function App() {
  return (
    
     <AuthProvider>
      <BrowserRouter>
        {/* <DashboardLayout /> */}
        <AppRouters />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
