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
import Home from "./views/user/Home";
import Quiz from "./views/quiz/Quiz";
import QuizResult from "./views/quiz/QuizResult";
import RunQuiz from "./views/quiz/RunQuiz";
import ArticlesList from "./views/articles/ArticlesList";
import ArticlesByCategory from "./views/articles/ArticlesByCategory";
import Article from "./views/articles/Article";
import Resources from "./views/resources/Resources";
import ResourcesMap from "./views/resources/ResourcesMap";
import Settings from "./views/legal/Settings";
import CGU from "./views/legal/CGU";
import PrivacyPolicy from "./views/legal/PrivacyPolicy";
import Faq from "./views/legal/Faq";
import AboutUs from "./views/legal/AboutUs";
import Profile from "./views/user/Profile";
import EditProfile from "./views/user/EditProfile";
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
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:categoryId"
          element={
            <ProtectedRoute>
              <Quiz />
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
        <Route
          path="/run-quiz"
          element={
            <ProtectedRoute>
              <RunQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <ArticlesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles/:categoryId"
          element={
            <ProtectedRoute>
              <ArticlesByCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/article/:articleId"
          element={
            <ProtectedRoute>
              <Article />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources/map"
          element={
            <ProtectedRoute>
              <ResourcesMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cgu"
          element={
            <ProtectedRoute>
              <CGU />
            </ProtectedRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <ProtectedRoute>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <Faq />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutUs />
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
