import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./business/context/authContext";
import { Home } from "./presentation/Home";
import { ProtectedRoute } from "./business/commons/ProtectedRoute";
import { LoginScreen } from "./presentation/LoginScreen";
import { RegisterScreen } from "./presentation/RegisterScreen";
import { ForgotPassword } from "./presentation/ForgotPassword";
import TweetThread from "./presentation/TweetThread";
import EventDashboard from "./presentation/EventDashboard";
import { SetUserScreen } from "./presentation/SetUserScreen";

function App() {
  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/thread"
            element={
              <ProtectedRoute>
                <TweetThread />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/setUser"
            element={
              <ProtectedRoute>
                <SetUserScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <EventDashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
