import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toggle from "../../components/toggle/Toggle";
import { useAuth } from "../../contexts/AuthContext";
import {
  FaMoon,
  FaFileAlt,
  FaPhone,
  FaTrash,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import Icon from "../../components/icon/Icon";

const Settings = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [themeEnabled, setThemeEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post(
        "/api/User/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Erreur lors de la déconnexion");
      // Logout anyway
      logout();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Êtes-vous sûr ? Cette action est irréversible.")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`/api/User/${user?.id || 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Erreur lors de la suppression du compte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white py-8 px-4 text-center sticky top-0 z-10">
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Theme Toggle */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Icon icon={FaMoon} size="lg" color="#3b82f6" />
            <h3 className="text-lg font-bold text-gray-800">Thème</h3>
          </div>
          <Toggle
            enabled={themeEnabled}
            onChange={setThemeEnabled}
            label="Thème sombre"
          />
          <p className="text-sm text-gray-500 mt-3">(Fonctionnalité à venir)</p>
        </div>

        {/* CGU Link */}
        <button
          onClick={() => navigate("/cgu")}
          className="w-full bg-white rounded-lg shadow-md p-6 mb-4 text-left hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <Icon icon={FaFileAlt} size="lg" color="#3b82f6" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Conditions Générales
              </h3>
              <p className="text-sm text-gray-500">
                Lire les CGU de la plateforme
              </p>
            </div>
          </div>
        </button>

        {/* FAQ Link */}
        <button
          onClick={() => navigate("/faq")}
          className="w-full bg-white rounded-lg shadow-md p-6 mb-4 text-left hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <Icon icon={FaQuestionCircle} size="lg" color="#3b82f6" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">FAQ</h3>
              <p className="text-sm text-gray-500">Foire aux questions</p>
            </div>
          </div>
        </button>

        {/* Contact Link */}
        <a
          href="mailto:contact@elix.com"
          className="w-full bg-white rounded-lg shadow-md p-6 mb-4 text-left hover:shadow-lg transition-shadow block"
        >
          <div className="flex items-center gap-3">
            <Icon icon={FaPhone} size="lg" color="#3b82f6" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Nous contacter
              </h3>
              <p className="text-sm text-gray-500">contact@elix.com</p>
            </div>
          </div>
        </a>

        {/* Delete Account Button */}
        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="w-full bg-red-100 border-2 border-red-500 rounded-lg p-6 mb-4 text-left hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <div className="flex items-center gap-3">
            <Icon icon={FaTrash} size="lg" color="#ef4444" />
            <div>
              <h3 className="text-lg font-bold text-red-600">
                Supprimer mon compte
              </h3>
              <p className="text-sm text-red-500">Action irréversible</p>
            </div>
          </div>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-primary text-white rounded-lg p-6 hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-3"
        >
          <Icon icon={FaSignOutAlt} size="lg" color="white" />
          <span className="font-bold">
            {loading ? "Chargement..." : "Déconnexion"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
