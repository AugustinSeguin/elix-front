import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import InputText from "../../components/input-text/InputText";
import Button from "../../components/button/Button";
import api from "../../api/axiosConfig";
import Header from "../../components/header/Header";
import { FormErrors, EditFormData } from "../../types/user";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, token, setUser } = useAuth();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<EditFormData>({
    username: user?.username || "",
    birthdate: user?.birthdate ? user.birthdate.split("T")[0] : "",
    gender: user?.gender !== undefined ? user.gender : undefined,
    phoneNumber: user?.phoneNumber?.toString() || "",
    password: "",
    passwordRepeated: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.pictureMediaPath || null,
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.username && formData.username.length < 3) {
      newErrors.username =
        "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }

    if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Le numéro de téléphone doit contenir uniquement des chiffres";
    }

    if (formData.password !== formData.passwordRepeated) {
      newErrors.passwordRepeated = "Les mots de passe ne correspondent pas";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, pictureFile: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Build UserDto
      const userDto = {
        id: user?.id,
        email: user?.email,
        username: formData.username || user?.username,
        firstname: user?.firstname,
        lastname: user?.lastname,
        birthdate: formData.birthdate || null,
        gender: formData.gender !== undefined ? formData.gender : null,
        phoneNumber: formData.phoneNumber
          ? Number.parseInt(formData.phoneNumber)
          : null,
        isPremium: user?.isPremium,
        isAdmin: user?.isAdmin,
        pictureMediaPath: user?.pictureMediaPath,
        password: formData.password || "", // Laisser vide si pas de changement
        passwordRepeated: formData.passwordRepeated || "",
      };

      // 1. Mettre à jour les données utilisateur
      const response = await api.put(`/api/User/${user?.id}`, userDto, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // 2. Mettre à jour la photo si elle a été modifiée
      if (formData.pictureFile) {
        const formDataToSend = new FormData();
        formDataToSend.append("pictureFile", formData.pictureFile);

        const pictureResponse = await api.put(
          `/api/User/${user?.id}/picture`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        // Utiliser la réponse avec la photo mise à jour
        setUser(pictureResponse.data);
      } else {
        // Pas de photo à mettre à jour, utiliser la réponse de la première requête
        setUser(response.data);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setErrors({
        general:
          err.response?.data?.message ||
          "Erreur lors de la mise à jour du profil",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-20">
        <p className="text-lg color-text">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <Header title="Modifier mon profil" sticky={true} />

      {/* Form */}
      <main className="max-w-md mx-auto px-4 py-8">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            Profil mis à jour avec succès ! Redirection...
          </div>
        )}

        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-semibold color-text mb-2">
              Photo de profil
            </label>
            <div className="text-center mb-4">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-4xl text-primary">📷</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Username */}
          <InputText
            label="Nom d'utilisateur"
            type="text"
            value={formData.username || ""}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            error={errors.username}
          />

          {/* Birthdate */}
          <InputText
            label="Date de naissance"
            type="date"
            value={formData.birthdate || ""}
            onChange={(e) =>
              setFormData({ ...formData, birthdate: e.target.value })
            }
            error={errors.birthdate}
            fullWidth
          />

          {/* Phone Number */}
          <InputText
            label="Numéro de téléphone"
            type="tel"
            autoComplete="tel"
            value={formData.phoneNumber || ""}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            error={errors.phoneNumber}
          />

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold color-text mb-2">
              Mot de passe{" "}
              <span className="color-text">
                (laissez vide pour ne pas le changer)
              </span>
            </label>
            <InputText
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              placeholder="Nouveau mot de passe"
            />
          </div>

          {/* Password Repeated */}
          <InputText
            label="Confirmer le mot de passe"
            type="password"
            autoComplete="new-password"
            value={formData.passwordRepeated}
            onChange={(e) =>
              setFormData({ ...formData, passwordRepeated: e.target.value })
            }
            error={errors.passwordRepeated}
            placeholder="Confirmez le mot de passe"
          />

          {/* Submit Button */}
          <Button
            variant="primary"
            size="lg"
            label={
              isLoading ? "Mise à jour..." : "Enregistrer les modifications"
            }
            onClick={() => {}}
            disabled={isLoading}
          />
        </form>

        {/* Back Button */}
        <Button
          onClick={() => navigate("/profile")}
          variant="ghost"
          className="w-full mt-4 text-primary font-semibold"
        >
          Retour au profil
        </Button>
      </main>
    </div>
  );
};

export default EditProfile;
