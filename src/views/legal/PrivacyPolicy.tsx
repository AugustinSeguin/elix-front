import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="relative flex items-center justify-center min-h-[60px] py-4 border-b border-gray-200 px-4 bg-white z-10 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <MdArrowBackIosNew className="w-5 h-5 text-black" />
        </button>
        <h1 className="text-lg font-bold tracking-widest text-black uppercase text-center leading-tight">
          Politiques de<br />confidentialité
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 pb-24 flex flex-col items-center">
        <div className="w-full max-w-md border border-gray-200 rounded-lg p-5 shadow-sm">
          <p className="text-[15px] text-black mb-6">
            On protège tes données comme si c'étaient les nôtres.
          </p>

          <div className="space-y-6">
            {/* Section 1 */}
            <div>
              <h3 className="text-[15px] font-bold text-black mb-2">
                1. Quelles données on collecte ?
              </h3>
              <ul className="list-disc pl-5 text-[15px] text-black space-y-1">
                <li>
                  <span className="font-bold">Ton pseudo</span> : Pour
                  personnaliser ton expérience.
                </li>
                <li>
                  <span className="font-bold">Ton âge</span> : Pour te montrer
                  du contenu adapté à ton niveau.
                </li>
                <li>
                  <span className="font-bold">Ton activité</span> : Les badges
                  que tu gagnes et les leçons que tu termines, pour que tu
                  puisses suivre ta progression. On ne te demandera jamais ton
                  nom de famille, ton adresse précise ou ton numéro de
                  téléphone.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-[15px] font-bold text-black mb-2">
                2. Pourquoi on les collecte ?
              </h3>
              <p className="text-[15px] text-black">
                Uniquement pour que l'application fonctionne bien et pour savoir
                quels sujets intéressent le plus les jeunes de ton âge (de façon
                anonyme).
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-[15px] font-bold text-black mb-2">
                3. Qui voit tes infos ?
              </h3>
              <ul className="list-disc pl-5 text-[15px] text-black space-y-1">
                <li>
                  <span className="font-bold">Toi</span> : Tu es le seul à avoir
                  accès à ton profil.
                </li>
                <li>
                  <span className="font-bold">Nous</span> : On voit des
                  statistiques globales (ex: "100 personnes ont lu l'article sur
                  le consentement"), mais on ne sait pas qui a lu quoi
                  précisément.
                </li>
                <li>
                  <span className="font-bold">Zéro partage</span> : On ne vendra
                  jamais tes infos à des entreprises pour te montrer des pubs.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-[15px] font-bold text-black mb-2">
                4. Tes droits
              </h3>
              <p className="text-[15px] text-black mb-2">
                Tu es le boss de tes données. Dans les Paramètres, tu peux :
              </p>
              <ul className="list-disc pl-5 text-[15px] text-black space-y-1">
                <li>Effacer ton historique de lecture à tout moment.</li>
                <li>
                  Supprimer ton compte définitivement (toutes tes infos
                  disparaîtront avec lui).
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="text-[15px] font-bold text-black mb-2">
                5. Sécurité
              </h3>
              <p className="text-[15px] text-black">
                On utilise des technologies de pointe pour que personne ne
                puisse pirater tes informations. Pour plus de sécurité, n'oublie
                pas d'activer le Code PIN dans les paramètres de l'appli !
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
