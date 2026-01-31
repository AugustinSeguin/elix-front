import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "../../components/button/Button";

const CGU = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="relative flex items-center justify-center min-h-[60px] py-4 border-b border-gray-200 px-4 bg-white z-10 shadow-sm">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="sm"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <MdArrowBackIosNew className="w-5 h-5 text-black" />
        </Button>
        <h1 className="text-lg font-bold tracking-widest text-black uppercase text-center leading-tight">
          Termes & conditions
          <br />
          d'utilisation
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 pb-24 flex flex-col items-center">
        <div className="w-full max-w-md border border-gray-200 rounded-lg p-5 shadow-sm">
          <p className="text-[15px] text-black mb-6">
            En utilisant cette application, tu acceptes les règles suivantes :
          </p>

          <div className="space-y-6">
            {/* Section 1 */}
            <div>
              <h3 className="text-[15px] font-bold text-black mb-1">
                1. C'est quoi cette appli ?
              </h3>
              <p className="text-[15px] text-black">
                Cette application est un outil d'information et d'éducation sur
                la sexualité. Elle est conçue pour t'aider à mieux comprendre
                ton corps et tes relations.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-[15px] font-bold text-black mb-1">
                2. Pas un avis médical
              </h3>
              <p className="text-[15px] text-black">
                Les informations ici sont sérieuses et vérifiées par des
                experts, mais elles ne remplacent jamais une visite chez un
                médecin ou un professionnel de santé. Si tu as un problème de
                santé, parles-en à un adulte de confiance ou à un docteur.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-[15px] font-bold text-black mb-1">
                3. Ton comportement
              </h3>
              <p className="text-[15px] text-black">
                L'application est un espace sûr. Si des fonctions communautaires
                (comme un forum ou des commentaires) sont ajoutées, tu t'engages
                à rester poli, respectueux et à ne jamais harceler personne.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-[15px] font-bold text-black mb-1">
                4. Propriété
              </h3>
              <p className="text-[15px] text-black">
                Tout ce que tu vois ici (textes, images, logos) appartient à
                l'équipe de l'application. Tu peux les lire pour toi, mais tu
                n'as pas le droit de les copier pour les vendre ou les utiliser
                ailleurs sans autorisation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CGU;
