import { ChangeEvent } from "react";
import Button from "../../components/button/Button";
import InputText from "../../components/input-text/InputText";

interface RegisterFormData {
  firstname: string;
  lastname: string;
  username: string;
  birthdate: string;
}

interface RegisterFirstProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
  setErrors: (errors: any) => void;
  onNext: () => void;
}

const RegisterFirst = ({
  formData,
  setFormData,
  errors,
  setErrors,
  onNext,
}: RegisterFirstProps) => {
  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Nom et Prénom */}
      <div className="space-y-4">
        <InputText
          id="lastname"
          label="Nom *"
          type="text"
          value={formData.lastname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("lastname", e.target.value)}
          placeholder="Dupont"
          error={errors.lastname}
          fullWidth
        />

        <InputText
          id="firstname"
          label="Prénom *"
          type="text"
          value={formData.firstname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("firstname", e.target.value)}
          placeholder="Jean"
          error={errors.firstname}
          fullWidth
        />
      </div>

      {/* Date de naissance */}
      <InputText
        id="birthdate"
        label="Date de naissance *"
        type="date"
        value={formData.birthdate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("birthdate", e.target.value)}
        error={errors.birthdate}
        fullWidth
      />

      {/* Username */}
      <div className="space-y-4">
        <InputText
          id="username"
          label="Nom d'utilisateur (Enfant) *"
          type="text"
          value={formData.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("username", e.target.value)}
          placeholder="jean.dupont"
          error={errors.username}
          fullWidth
        />
      </div>

      <div className="pt-4">
        <Button
          type="button"
          onClick={onNext}
          variant="primary"
          size="lg"
          // On force l'utilisation de la variable primaire pour le fond et le texte inverse
          className="w-full bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-[var(--color-primary-50)] rounded-full border-none"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default RegisterFirst;