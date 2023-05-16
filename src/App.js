import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Home } from "./components/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ForgotPassword } from "./components/ForgotPassword";
import TweetThread from "./components/Tweets/TweetThread";
import EventDashboard from "./components/EventDashboard/EventDashboard";
import { SetUser } from "./components/SetUser";

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
                <SetUser />
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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
