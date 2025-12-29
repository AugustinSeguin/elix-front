import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { MdArrowForwardIos } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    // Validation email
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format de l'adresse mail incorrect";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la soumission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Reset des erreurs générales
    setErrors((prev) => ({ ...prev, general: undefined }));

    // Validation
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`/api/User/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        login(response.data.token);
        try {
          const userResponse = await axios.get("/api/User/me", {
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
      // Erreur générique pour le mot de passe/email comme sur la maquette
      setErrors({
        password: "L'identifiant ou le mot de passe est erroné",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 sm:px-8">
      {/* Logo Section */}
      <div className="flex flex-row items-center justify-center mb-12 gap-4">
        <div>
          <img
            src="/logo.png"
            alt="ELIX Logo"
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-4xl font-bold tracking-widest text-black leading-none">
            ELIX
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-black">
            Le savoir qui libère tes relations
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 tracking-wide">
          Connexion
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm text-gray-600 ml-1">
              Email
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
              className={`w-full px-6 py-3.5 rounded-full border ${
                errors.email
                  ? "border-red-400 text-red-500"
                  : "border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-1 focus:ring-primary transition-colors`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-400 ml-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 ml-1"
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
                className={`w-full px-6 py-3.5 rounded-full border ${
                  errors.password
                    ? "border-red-400 text-red-500"
                    : "border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-1 focus:ring-primary transition-colors pr-12`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 ml-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center relative"
            >
              <span>Connexion</span>
              <MdArrowForwardIos className="absolute right-6 w-4 h-4" />
            </button>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/register"
              className="text-sm text-primary hover:opacity-80 transition-colors"
            >
              Vous n'avez pas de compte ? Inscrivez-vous
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
