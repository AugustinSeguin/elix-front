import { ChangeEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "../../components/button/Button";
import InputText from "../../components/input-text/InputText";

interface RegisterSecondProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
  setErrors: (errors: any) => void;
  onSubmit: (e: any) => void;
  onBack: () => void;
  isLoading: boolean;
  acceptTerms: boolean;
  setAcceptTerms: (val: boolean) => void;
}

const RegisterSecond = ({
  formData,
  setFormData,
  errors,
  setErrors,
  onSubmit,
  onBack,
  isLoading,
  acceptTerms,
  setAcceptTerms,
}: RegisterSecondProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeated, setShowPasswordRepeated] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Email */}
      <InputText
        id="email"
        label="Adresse mail*"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("email", e.target.value)
        }
        placeholder="marie.dupont@gmail.com"
        error={errors.email}
        disabled={isLoading}
        fullWidth
      />

      {/* Mot de passe */}
      <div>
        <div className="relative">
          <InputText
            id="password"
            label="Mot de passe *"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("password", e.target.value)
            }
            placeholder="Mot de passe"
            error={errors.password}
            disabled={isLoading}
            fullWidth
            // Ajout d'un padding-right pour éviter que le texte passe sous l'icône
            className="pr-12"
          />
          {/* Bouton Oeil positionné en absolu par dessus l'InputText */}
          <div className="absolute right-4 top-[34px] z-10">
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              variant="ghost"
              size="sm"
              className="p-0 text-[var(--color-text)] hover:bg-transparent"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="w-5 h-5" />
              ) : (
                <AiOutlineEye className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Mot de passe */}
      <div className="relative">
        <InputText
          id="passwordRepeated"
          label="Confirmation du mot de passe *"
          type={showPasswordRepeated ? "text" : "password"}
          value={formData.passwordRepeated}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("passwordRepeated", e.target.value)
          }
          placeholder="Mot de passe"
          error={errors.passwordRepeated}
          disabled={isLoading}
          fullWidth
          className="pr-12"
        />
        <div className="absolute right-4 top-[34px] z-10">
          <Button
            type="button"
            onClick={() => setShowPasswordRepeated(!showPasswordRepeated)}
            variant="ghost"
            size="sm"
            className="p-0 text-[var(--color-text)] hover:bg-transparent"
          >
            {showPasswordRepeated ? (
              <AiOutlineEyeInvisible className="w-5 h-5" />
            ) : (
              <AiOutlineEye className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Checkbox CGU */}
      <div className="flex items-start ml-1 mt-4">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => {
              setAcceptTerms(e.target.checked);
              if (errors.terms) setErrors({ ...errors, terms: undefined });
            }}
            className="w-5 h-5 border border-[var(--color-primary-300)] rounded focus:ring-3 focus:ring-[var(--color-primary-300)] bg-[var(--color-primary-50)] accent-[var(--color-primary-500)]"
          />
        </div>
        <label
          htmlFor="terms"
          className="ml-2 text-xs text-[var(--color-text)]"
        >
          J'ai lu et j'accepte les{" "}
          <a href="#" className="font-bold underline text-[var(--color-text)]">
            règles de l'appli (CGU)
          </a>{" "}
          et je suis d'accord avec la façon dont mes données sont protégées (
          <a href="#" className="font-bold underline text-[var(--color-text)]">
            Politique de Confidentialité
          </a>
          )
        </label>
      </div>
      {errors.terms && (
        <p className="text-xs text-red-400 ml-1">{errors.terms}</p>
      )}

      {/* Actions */}
      <div className="pt-4 flex flex-col gap-3">
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          variant="primary"
          size="lg"
          className="w-full bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-[var(--color-primary-50)] rounded-full border-none"
        >
          <span>{isLoading ? "Inscription..." : "M'inscrire"}</span>
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="text-sm text-[var(--color-text)] hover:text-[var(--color-primary-500)] underline opacity-70 hover:opacity-100 transition-opacity"
        >
          Retour à l'étape précédente
        </button>
      </div>
    </div>
  );
};

export default RegisterSecond;
