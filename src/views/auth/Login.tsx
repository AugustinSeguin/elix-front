import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { MdArrowForwardIos } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../../api/axiosConfig";
import Button from "../../components/button/Button";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Gestion de la soumission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Reset des erreurs
    setErrors({});

    // Validation simple
    if (!formData.email || !formData.password) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(`/api/User/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        login(response.data.token);
        try {
          const userResponse = await api.get("/api/User/me", {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          });
          setUser(userResponse.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }

      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      // Erreur générique comme sur la maquette
      setErrors({
        email: "L'identifiant ou le mot de passe est erroné",
        password: "L'identifiant ou le mot de passe est erroné",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/logo.svg"
            alt="ELIX Logo"
            style={{
              width: "111px",
              height: "151px",
              opacity: 1,
            }}
          />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold tracking-wider text-black">ELIX</h1>
        </div>
        <h2 className="text-xl font-semibold text-black">Connexion</h2>
      </div>

      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/Identifiant Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs text-white dark:text-gray-500 ml-4"
            >
              Identifiant
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="jean.dupont@gmail.com"
              className={`w-full px-5 py-3 rounded-full border ${
                errors.email ? "border-red-500" : ""
              } placeholder:text-gray`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-500 ml-4">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs text-white dark:text-gray-500 ml-4"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
                }}
                placeholder="Mot de passe"
                className={`w-full px-5 py-3 rounded-full border pr-12 ${
                  errors.password ? "border-red-500" : ""
                } placeholder:text-gray`}
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-0"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 ml-4">{errors.password}</p>
            )}
            {/* Mot de passe oublié */}
            <div className="text-left ml-4">
              <span className="text-xs text-gray-400">
                Mot de passe oublié ?
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            size="lg"
          >
            <span>Connexion</span>
          </Button>

          {/* Register Link */}
          <div className="text-center pt-2">
            <span className="text-sm text-gray-600">
              Pas de compte ?{" "}
              <Link
                to="/register"
                className="text-black underline hover:opacity-80 transition-opacity"
              >
                Je m'inscris
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
