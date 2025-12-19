import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import {
  ProtectedRoute,
  PublicOnlyRoute,
} from "./components/routes/RouteGuards";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Home from "./views/Home";
import Quiz from "./views/quiz/Quiz";
import QuizResult from "./views/quiz/QuizResult";
import Navbar from "./components/navbar/Navbar";

// Liste des routes publiques (accessible sans authentification)

const AppContent = () => {
  const location = useLocation();

  // Routes où la Navbar ne doit pas apparaître
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        {/* Routes publiques (accessibles uniquement si NON authentifié) */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />

        {/* Routes protégées (accessibles uniquement si authentifié) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-result"
          element={
            <ProtectedRoute>
              <QuizResult />
            </ProtectedRoute>
          }
        />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {shouldShowNavbar && <Navbar />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
