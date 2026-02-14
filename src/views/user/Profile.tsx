import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import Icon from "../../components/icon/Icon";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";

const GENDER_MAP: Record<number, string> = {
  0: "Fille",
  1: "Garçon",
  2: "Non binaire",
};

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-20">
        <p className="text-lg color-text">Chargement du profil...</p>
      </div>
    );
  }

  const birthDate = user.birthdate
    ? new Date(user.birthdate).toLocaleDateString("fr-FR")
    : "-";

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <Header title="Mon profil" sticky={true}>
        <button
          type="button"
          onClick={() => navigate("/settings")}
          className="p-2 rounded-full transition-colors"
          aria-label="Paramètres"
        >
          <span
            role="img"
            className="h-6 w-6 inline-block"
            style={{
              backgroundColor: "var(--color-primary-700)",
              display: "inline-block",
              WebkitMaskImage: `url(/settings.svg)`,
              maskImage: `url(/settings.svg)`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </button>
      </Header>

      {/* Profile Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Profile Picture */}
        <div className="rounded-lg shadow-md p-6 mb-6 text-center">
          {user.pictureMediaPath ? (
            <img
              src={user.pictureMediaPath}
              alt="Profil"
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-4xl text-primary">👤</span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="rounded-lg shadow-md p-6 space-y-4 mb-6">
          {/* Email */}
          <div>
            <p className="text-sm color-text">Email</p>
            <p className="text-lg font-semibold color-text">{user.email}</p>
          </div>

          {/* Username */}
          {user.username && (
            <div>
              <p className="text-sm color-text">Nom d'utilisateur</p>
              <p className="text-lg font-semibold color-text">
                {user.username}
              </p>
            </div>
          )}

          {/* Firstname */}
          {user.firstname && (
            <div>
              <p className="text-sm color-text">Prénom</p>
              <p className="text-lg font-semibold color-text">
                {user.firstname}
              </p>
            </div>
          )}

          {/* Lastname */}
          {user.lastname && (
            <div>
              <p className="text-sm color-text">Nom</p>
              <p className="text-lg font-semibold color-text">
                {user.lastname}
              </p>
            </div>
          )}

          {/* Birthdate */}
          {user.birthdate && (
            <div>
              <p className="text-sm color-text">Date de naissance</p>
              <p className="text-lg font-semibold color-text">{birthDate}</p>
            </div>
          )}

          {/* Gender */}
          {user.gender !== undefined && (
            <div>
              <p className="text-sm color-text">Genre</p>
              <p className="text-lg font-semibold color-text">
                {GENDER_MAP[user.gender] || "-"}
              </p>
            </div>
          )}

          {/* Phone Number */}
          {user.phoneNumber && (
            <div>
              <p className="text-sm color-text">Numéro de téléphone</p>
              <p className="text-lg font-semibold color-text">
                {user.phoneNumber}
              </p>
            </div>
          )}

          {/* Premium Status */}
          <div>
            <p className="text-sm color-text">Statut</p>
            <p className="text-lg font-semibold color-text">
              {user.isPremium ? "Premium ⭐" : "Gratuit"}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <Button
          onClick={() => navigate("/edit-profile")}
          variant="primary"
          className="w-full bg-primary color-text py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Icon icon={FaEdit} size="md" color="white" />
          Modifier mon profil
        </Button>
      </div>
    </div>
  );
};

export default Profile;
