import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../../api/axiosConfig";
import Button from "../../components/button/Button";
import InputText from "../../components/input-text/InputText";

interface RegisterFormData {
  email: string;
  password: string;
  passwordRepeated: string;
  firstname: string;
  lastname: string;
  username: string;
  birthdate: string;
  gender: string;
  phoneNumber: string;
  isPremium: boolean;
}

interface RegisterErrors {
  email?: string;
  password?: string;
  passwordRepeated?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  birthdate?: string;
  gender?: string;
  phoneNumber?: string;
  general?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    passwordRepeated: "",
    firstname: "",
    lastname: "",
    username: "",
    birthdate: "",
    gender: "",
    phoneNumber: "",
    isPremium: false,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeated, setShowPasswordRepeated] = useState(false);

  const genderOptions = [
    { value: "0", label: "Homme" },
    { value: "1", label: "Femme" },
    { value: "2", label: "Autre" },
  ];

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};

    // Email
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

    // Password confirmation
    if (!formData.passwordRepeated) {
      newErrors.passwordRepeated = "Veuillez confirmer le mot de passe";
    } else if (formData.password !== formData.passwordRepeated) {
      newErrors.passwordRepeated = "Les mots de passe ne correspondent pas";
    }

    // Firstname
    if (!formData.firstname) {
      newErrors.firstname = "Le prénom est requis";
    } else if (formData.firstname.length < 2) {
      newErrors.firstname = "Le prénom doit contenir au moins 2 caractères";
    }

    // Lastname
    if (!formData.lastname) {
      newErrors.lastname = "Le nom est requis";
    } else if (formData.lastname.length < 2) {
      newErrors.lastname = "Le nom doit contenir au moins 2 caractères";
    }

    // Username
    if (!formData.username) {
      newErrors.username = "Le nom d'utilisateur est requis";
    } else if (formData.username.length < 3) {
      newErrors.username =
        "Le nom d'utilisateur doit contenir au moins 3 caractères";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores";
    }

    // Birthdate
    if (!formData.birthdate) {
      newErrors.birthdate = "La date de naissance est requise";
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = "Le genre est requis";
    }

    // Phone number
    if (formData.phoneNumber && !/^\d{9,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Numéro de téléphone invalide (9-15 chiffres)";
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
      // Formatage de la date au format ISO 8601
      const formattedBirthdate = new Date(formData.birthdate).toISOString();

      const payload = {
        email: formData.email,
        password: formData.password,
        passwordRepeated: formData.passwordRepeated,
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username,
        birthdate: formattedBirthdate,
        gender: parseInt(formData.gender),
        isPremium: formData.isPremium,
        ...(formData.phoneNumber && { phoneNumber: formData.phoneNumber }),
      };

      console.log("Registration payload:", payload);

      const response = await api.post(`/api/User/register`, payload);

      console.log("Registration successful:", response.data);

      // Stocker le token et mettre à jour le contexte d'authentification
      if (response.data.token) {
        login(response.data.token);

        // Récupérer les données utilisateur complètes
        try {
          const userResponse = await api.get("/api/User/me", {
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
      console.error("Registration error:", error);

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 400) {
          // Validation errors from API
          if (data.errors) {
            const apiErrors: RegisterErrors = {};
            Object.keys(data.errors).forEach((key) => {
              const lowerKey = key.toLowerCase() as keyof RegisterErrors;
              apiErrors[lowerKey] = data.errors[key][0];
            });
            setErrors(apiErrors);
          } else {
            setErrors({ general: data.message || "Données invalides" });
          }
        } else if (status === 409) {
          setErrors({
            general: "Cet email ou nom d'utilisateur est déjà utilisé",
          });
        } else {
          setErrors({
            general: "Erreur serveur. Veuillez réessayer plus tard.",
          });
        }
      } else if (error.request) {
        setErrors({ general: "Impossible de se connecter au serveur" });
      } else {
        setErrors({ general: "Une erreur inattendue est survenue" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 sm:px-8">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center gap-3 mb-8">
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
        <h2 className="text-xl font-semibold color-text">Inscription</h2>
      </div>

      <div className="w-full max-w-2xl">
        {/* Erreur générale */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              id="firstname"
              label="Prénom"
              type="text"
              value={formData.firstname}
              onChange={(e) => {
                setFormData({ ...formData, firstname: e.target.value });
                if (errors.firstname)
                  setErrors({ ...errors, firstname: undefined });
              }}
              placeholder="Jean"
              error={errors.firstname}
              disabled={isLoading}
              fullWidth
            />

            <InputText
              id="lastname"
              label="Nom"
              type="text"
              value={formData.lastname}
              onChange={(e) => {
                setFormData({ ...formData, lastname: e.target.value });
                if (errors.lastname)
                  setErrors({ ...errors, lastname: undefined });
              }}
              placeholder="Dupont"
              error={errors.lastname}
              disabled={isLoading}
              fullWidth
            />
          </div>

          <InputText
            id="username"
            label="Nom d'utilisateur"
            type="text"
            autoComplete="username"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              if (errors.username)
                setErrors({ ...errors, username: undefined });
            }}
            placeholder="johndoe1"
            error={errors.username}
            disabled={isLoading}
            fullWidth
          />

          {/* Email */}
          <InputText
            id="email"
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
            disabled={isLoading}
            fullWidth
          />

          {/* Date de naissance et genre */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              id="birthdate"
              label="Date de naissance"
              type="date"
              value={formData.birthdate}
              onChange={(e) => {
                setFormData({ ...formData, birthdate: e.target.value });
                if (errors.birthdate)
                  setErrors({ ...errors, birthdate: undefined });
              }}
              error={errors.birthdate}
              disabled={isLoading}
              fullWidth
            />

            <div className="space-y-1">
              <label htmlFor="gender" className="block text-sm color-text ml-1">
                Genre
              </label>
              <div className="relative">
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => {
                    setFormData({ ...formData, gender: e.target.value });
                    if (errors.gender)
                      setErrors({ ...errors, gender: undefined });
                  }}
                  className={`w-full px-6 py-3.5 rounded-full border appearance-none ${
                    errors.gender
                      ? "border-red-400 text-red-500"
                      : "border-gray-300 color-text"
                  } focus:outline-none focus:ring-1 focus:ring-primary transition-colors`}
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Sélectionnez votre genre
                  </option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 color-text">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.gender && (
                <p className="text-xs text-red-400 ml-1">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* Téléphone (optionnel) */}
          <InputText
            id="phoneNumber"
            label="Numéro de téléphone (optionnel)"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => {
              setFormData({ ...formData, phoneNumber: e.target.value });
              if (errors.phoneNumber)
                setErrors({ ...errors, phoneNumber: undefined });
            }}
            placeholder="123456789"
            error={errors.phoneNumber}
            disabled={isLoading}
            fullWidth
          />

          {/* Mots de passe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm color-text ml-1"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password)
                      setErrors({ ...errors, password: undefined });
                  }}
                  placeholder="••••••••"
                  className={`w-full px-6 py-3.5 rounded-full border ${
                    errors.password
                      ? "border-red-400 text-red-500"
                      : "border-gray-300 color-text"
                  } focus:outline-none focus:ring-1 focus:ring-primary transition-colors pr-12`}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 color-text hover:color-text dark:hover:color-text p-0"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 ml-1">{errors.password}</p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="passwordRepeated"
                className="block text-sm color-text ml-1"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  id="passwordRepeated"
                  type={showPasswordRepeated ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.passwordRepeated}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      passwordRepeated: e.target.value,
                    });
                    if (errors.passwordRepeated)
                      setErrors({ ...errors, passwordRepeated: undefined });
                  }}
                  placeholder="••••••••"
                  className={`w-full px-6 py-3.5 rounded-full border ${
                    errors.passwordRepeated
                      ? "border-red-400 text-red-500"
                      : "border-gray-300 color-text"
                  } focus:outline-none focus:ring-1 focus:ring-primary transition-colors pr-12`}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  onClick={() => setShowPasswordRepeated(!showPasswordRepeated)}
                  variant="ghost"
                  size="sm"
                >
                  {showPasswordRepeated ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {errors.passwordRepeated && (
                <p className="text-xs text-red-400 ml-1">
                  {errors.passwordRepeated}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              size="lg"
            >
              <span>{isLoading ? "Inscription..." : "S'inscrire"}</span>
            </Button>
          </div>
        </form>

        {/* Lien vers login */}
        <div className="mt-6 text-center">
          <p className="text-sm color-text">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:opacity-80 transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
