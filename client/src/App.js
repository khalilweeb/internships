import { Routes, Route, Navigate } from "react-router-dom";
import Signup from './pages/auth/Sginup'
import Login from './pages/auth/login'
import Profile from "./pages/profill/profie"

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  return authToken ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;
