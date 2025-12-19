import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputText from "../../components/input-text/InputText";
import Button from "../../components/button/Button";
import { useAuth } from "../../contexts/AuthContext";

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

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    // Validation email
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
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

      // Succès - stocker le token ou les infos utilisateur
      console.log("Login successful:", response.data);

      // Stocker le token et mettre à jour le contexte d'authentification
      if (response.data.token) {
        login(response.data.token);

        // Récupérer les données utilisateur complètes
        try {
          const userResponse = await axios.get("/api/User/me", {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          });
          setUser(userResponse.data);
          console.log("User data loaded:", userResponse.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }

      // Redirection vers la page d'accueil
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);

      // Gestion des erreurs API
      if (error.response) {
        // Erreur de la réponse serveur
        const status = error.response.status;

        if (status === 401) {
          setErrors({ general: "Email ou mot de passe incorrect" });
        } else if (status === 404) {
          setErrors({ general: "Utilisateur introuvable" });
        } else if (status === 400) {
          setErrors({
            general: error.response.data.message || "Données invalides",
          });
        } else {
          setErrors({
            general: "Erreur serveur. Veuillez réessayer plus tard.",
          });
        }
      } else if (error.request) {
        // Pas de réponse du serveur
        setErrors({ general: "Impossible de se connecter au serveur" });
      } else {
        setErrors({ general: "Une erreur inattendue est survenue" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
            <p className="mt-2 text-sm text-gray-600">
              Connectez-vous à votre compte Elix
            </p>
          </div>

          {/* Erreur générale */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center">
                {errors.general}
              </p>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputText
              label="Email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="votre@email.com"
              error={errors.email}
              fullWidth
              disabled={isLoading}
            />

            <InputText
              label="Mot de passe"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              placeholder="••••••••"
              error={errors.password}
              fullWidth
              disabled={isLoading}
            />

            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                Mot de passe oublié ?
              </a>
            </div>

            <Button
              type="submit"
              label={isLoading ? "Connexion..." : "Se connecter"}
              variant="primary"
              fullWidth
              disabled={isLoading}
            />
          </form>

          {/* Lien vers inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
