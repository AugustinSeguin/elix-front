import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axiosConfig";
import RegisterFirst from "../../components/register/RegisterFirst";
import RegisterSecond from "../../components/register/RegisterSecond";

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
  [key: string]: string | undefined;
}

const Register = () => {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

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

  // Validation Etape 1
  const validateStep1 = (): boolean => {
    const newErrors: RegisterErrors = {};

    if (!formData.lastname) newErrors.lastname = "Le nom est requis";
    else if (formData.lastname.length < 2) newErrors.lastname = "Min 2 caractères";

    if (!formData.firstname) newErrors.firstname = "Le prénom est requis";
    else if (formData.firstname.length < 2) newErrors.firstname = "Min 2 caractères";

    if (!formData.birthdate) newErrors.birthdate = "La date de naissance est requise";

    if (!formData.username) newErrors.username = "Le nom d'utilisateur est requis";
    else if (formData.username.length < 3) newErrors.username = "Min 3 caractères";
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) newErrors.username = "Lettres, chiffres et _";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation Etape 2
  const validateStep2 = (): boolean => {
    const newErrors: RegisterErrors = {};

    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email invalide";

    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 8) newErrors.password = "Min 8 caractères";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = "Format incorrect";

    if (!formData.passwordRepeated) newErrors.passwordRepeated = "Confirmation requise";
    else if (formData.password !== formData.passwordRepeated) newErrors.passwordRepeated = "Mots de passe différents";

    if(!acceptTerms) newErrors.terms = "Vous devez accepter les conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
        setStep(2);
        setErrors({});
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, general: undefined }));

    if (!validateStep2()) return;

    setIsLoading(true);

    try {
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

      const response = await api.post(`/api/User/register`, payload);

      if (response.data.token) {
        login(response.data.token);
        try {
          const userResponse = await api.get("/api/User/me", {
            headers: { Authorization: `Bearer ${response.data.token}` },
          });
          setUser(userResponse.data);
        } catch (err) {
          console.error(err);
        }
      }
      navigate("/");
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          if (data.errors) {
            const apiErrors: RegisterErrors = {};
            Object.keys(data.errors).forEach((key) => {
              apiErrors[key.toLowerCase()] = data.errors[key][0];
            });
            setErrors(apiErrors);
          } else {
            setErrors({ general: data.message || "Données invalides" });
          }
        } else if (status === 409) {
          setErrors({ general: "Email ou pseudo déjà utilisé" });
        } else {
          setErrors({ general: "Erreur serveur." });
        }
      } else {
        setErrors({ general: "Erreur inattendue." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Utilisation de var(--color-primary-100) pour le fond global
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 sm:px-8 bg-[var(--color-primary-100)] transition-colors duration-300">
      
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/logo.svg"
            alt="ELIX Logo"
            style={{ width: "111px", height: "151px" }}
          />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-text)] uppercase tracking-widest">
            {step === 1 ? "Inscription" : "Inscription Suite"}
        </h2>
      </div>

      {/* Card Container - Utilisation de secondary-50 comme surface de carte pour supporter le dark mode */}
      <div className="w-full max-w-md p-8 rounded-[40px] shadow-sm">
        
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{errors.general}</p>
          </div>
        )}

        {step === 1 && (
            <RegisterFirst 
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                onNext={handleNext}
            />
        )}

        {step === 2 && (
            <RegisterSecond
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                onSubmit={handleSubmit}
                onBack={handleBack}
                isLoading={isLoading}
                acceptTerms={acceptTerms}
                setAcceptTerms={setAcceptTerms}
            />
        )}
      </div>
      
        {/* Lien Login - Utilisation de primary-500 pour le lien */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--color-text)]">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/login"
              className="color-text underline hover:opacity-80 transition-opacity"
            >
              Se connecter
            </Link>
          </p>
        </div>
    </div>
  );
};

export default Register;