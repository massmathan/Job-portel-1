import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext/AuthContext";
import AppRouters from "./routes/AppRouters";
 import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
 

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
