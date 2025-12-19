import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputText from "../../components/input-text/InputText";
import SelectList from "../../components/select-list/SelectList";
import Button from "../../components/button/Button";
import { useAuth } from "../../contexts/AuthContext";

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

      const response = await axios.post(`/api/User/register`, payload);

      console.log("Registration successful:", response.data);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Créer un compte
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Rejoignez Elix - Éducation sexuelle pour les jeunes
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
            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputText
                label="Prénom"
                value={formData.firstname}
                onChange={(e) => {
                  setFormData({ ...formData, firstname: e.target.value });
                  if (errors.firstname)
                    setErrors({ ...errors, firstname: undefined });
                }}
                placeholder="John"
                error={errors.firstname}
                fullWidth
                disabled={isLoading}
              />

              <InputText
                label="Nom"
                value={formData.lastname}
                onChange={(e) => {
                  setFormData({ ...formData, lastname: e.target.value });
                  if (errors.lastname)
                    setErrors({ ...errors, lastname: undefined });
                }}
                placeholder="Doe"
                error={errors.lastname}
                fullWidth
                disabled={isLoading}
              />
            </div>

            <InputText
              label="Nom d'utilisateur"
              autoComplete="username"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                if (errors.username)
                  setErrors({ ...errors, username: undefined });
              }}
              placeholder="johndoe1"
              error={errors.username}
              helperText="Lettres, chiffres et underscores uniquement"
              fullWidth
              disabled={isLoading}
            />

            {/* Email */}
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

            {/* Mots de passe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputText
                label="Mot de passe"
                type="password"
                autoComplete="new-password"
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

              <InputText
                label="Confirmer le mot de passe"
                type="password"
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
                error={errors.passwordRepeated}
                fullWidth
                disabled={isLoading}
              />
            </div>

            {/* Date de naissance et genre */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputText
                label="Date de naissance"
                type="date"
                value={formData.birthdate}
                onChange={(e) => {
                  setFormData({ ...formData, birthdate: e.target.value });
                  if (errors.birthdate)
                    setErrors({ ...errors, birthdate: undefined });
                }}
                error={errors.birthdate}
                fullWidth
                disabled={isLoading}
              />

              <SelectList
                label="Genre"
                options={genderOptions}
                value={formData.gender}
                onChange={(value) => {
                  setFormData({ ...formData, gender: value as string });
                  if (errors.gender)
                    setErrors({ ...errors, gender: undefined });
                }}
                error={errors.gender}
                placeholder="Sélectionnez votre genre"
                fullWidth
              />
            </div>

            {/* Téléphone (optionnel) */}
            <InputText
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
              fullWidth
              disabled={isLoading}
            />

            <Button
              type="submit"
              label={isLoading ? "Inscription..." : "S'inscrire"}
              variant="primary"
              fullWidth
              disabled={isLoading}
            />
          </form>

          {/* Lien vers login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{" "}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
