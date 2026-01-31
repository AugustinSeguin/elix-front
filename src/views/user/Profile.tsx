import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import Icon from "../../components/icon/Icon";
import Button from "../../components/button/Button";

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
        <p className="text-lg text-gray-600">Chargement du profil...</p>
      </div>
    );
  }

  const birthDate = user.birthdate
    ? new Date(user.birthdate).toLocaleDateString("fr-FR")
    : "-";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white py-8 px-4 text-center sticky top-0 z-10">
        <h1 className="text-3xl font-bold">Mon Profil</h1>
      </div>

      {/* Profile Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Profile Picture */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          {user.pictureMediaPath ? (
            <img
              src={user.pictureMediaPath}
              alt="Profil"
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto bg-blue-200 flex items-center justify-center mb-4">
              <span className="text-4xl text-primary">👤</span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4 mb-6">
          {/* Email */}
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>

          {/* Username */}
          {user.username && (
            <div>
              <p className="text-sm text-gray-500">Nom d'utilisateur</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.username}
              </p>
            </div>
          )}

          {/* Firstname */}
          {user.firstname && (
            <div>
              <p className="text-sm text-gray-500">Prénom</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.firstname}
              </p>
            </div>
          )}

          {/* Lastname */}
          {user.lastname && (
            <div>
              <p className="text-sm text-gray-500">Nom</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.lastname}
              </p>
            </div>
          )}

          {/* Birthdate */}
          {user.birthdate && (
            <div>
              <p className="text-sm text-gray-500">Date de naissance</p>
              <p className="text-lg font-semibold text-gray-800">{birthDate}</p>
            </div>
          )}

          {/* Gender */}
          {user.gender !== undefined && (
            <div>
              <p className="text-sm text-gray-500">Genre</p>
              <p className="text-lg font-semibold text-gray-800">
                {GENDER_MAP[user.gender] || "-"}
              </p>
            </div>
          )}

          {/* Phone Number */}
          {user.phoneNumber && (
            <div>
              <p className="text-sm text-gray-500">Numéro de téléphone</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.phoneNumber}
              </p>
            </div>
          )}

          {/* Premium Status */}
          <div>
            <p className="text-sm text-gray-500">Statut</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.isPremium ? "Premium ⭐" : "Gratuit"}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <Button
          onClick={() => navigate("/edit-profile")}
          variant="primary"
          className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Icon icon={FaEdit} size="md" color="white" />
          Modifier mon profil
        </Button>
      </div>
    </div>
  );
};

export default Profile;
