import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toggle from "../../components/toggle/Toggle";
import ThemeToggle from "../../components/toggle/ThemeToggle";
import { useAuth } from "../../contexts/AuthContext";
import { MdArrowForwardIos } from "react-icons/md";
import api from "../../api/axiosConfig";
import Button from "../../components/button/Button";

const Settings = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [daltonienEnabled, setDaltonienEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await api.post(
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
      logout();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      setLoading(true);
      await api.delete(`/api/User/${user?.id || 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Erreur lors de la suppression du compte");
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <p className="text-[13px] text-gray-400 pt-4 px-4 font-medium">{title}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );

  const Item = ({
    label,
    onClick,
    href,
    color = "text-black",
    arrow = false,
    toggle,
    onToggle,
  }: {
    label: string;
    onClick?: () => void;
    href?: string;
    color?: string;
    arrow?: boolean;
    toggle?: boolean;
    onToggle?: (val: boolean) => void;
  }) => {
    const content = (
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0">
        <span className={`text-[15px] font-medium ${color}`}>{label}</span>
        {arrow && <MdArrowForwardIos className="w-4 h-4 text-gray-400" />}
        {onToggle && (
          <div onClick={(e) => e.stopPropagation()}>
            <Toggle enabled={toggle || false} onChange={onToggle} />
          </div>
        )}
      </div>
    );

    if (href) {
      return (
        <a href={href} className="block">
          {content}
        </a>
      );
    }

    return (
      <div onClick={onClick} className="block">
        {content}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="relative flex items-center justify-center min-h-[60px] py-6 border-b border-gray-200 px-4 bg-white z-10 shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-black text-center tracking-wide">
          Paramètres
        </h1>
      </header>

      {/* Content */}
      <main className="px-4 max-w-md mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <Section title="Compte et Sécurité">
          <Item
            label="Informations personnelles"
            onClick={() => navigate("/edit-profile")}
            arrow
          />
          <Item
            label="Supprimer mon compte"
            onClick={handleDeleteAccount}
            color="text-red-500"
          />
        </Section>

        <Section title="Préférences de Contenu">
          <ThemeToggle label="Mode foncé" ItemComponent={Item} />
          <Item
            label="Mode daltonien-ne"
            toggle={daltonienEnabled}
            onToggle={setDaltonienEnabled}
          />
          <Item label="Taille du texte" arrow />
        </Section>

        <Section title="Aide et Informations">
          <Item label="F.A.Q" onClick={() => navigate("/faq")} arrow />
          <Item label="Contact" href="mailto:contact@elix.com" arrow />
          <Item label="À Propos" onClick={() => navigate("/about")} arrow />
          <Item
            label="Politique de confidentialité"
            onClick={() => navigate("/privacy-policy")}
            arrow
          />
          <Item
            label="Termes et conditions"
            onClick={() => navigate("/cgu")}
            arrow
          />
        </Section>

        <Button
          onClick={handleLogout}
          disabled={loading}
          variant="ghost"
          className="w-full bg-white text-red-500 font-bold rounded-xl p-4 shadow-sm border border-gray-100 hover:bg-red-50 transition-colors mt-4"
        >
          {loading ? "Chargement..." : "Déconnexion"}
        </Button>
      </main>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in fade-in zoom-in duration-200">
            <p className="text-center text-gray-600 mb-6 text-[15px]">
              Veux-tu vraiment supprimer ton compte ?
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={confirmDeleteAccount}
                disabled={loading}
                variant="primary"
                className="w-full bg-primary text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Suppression..." : "Supprimer mon compte"}
              </Button>
              <Button
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
                variant="ghost"
                className="w-full bg-gray-300 text-gray-700 font-bold py-3 rounded-full hover:bg-gray-400 transition-colors disabled:opacity-50"
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
