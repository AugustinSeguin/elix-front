import Header from "../../components/header/Header";

const CGU = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header title="Termes & conditions d'utilisation" sticky={true}></Header>

      {/* Content */}
      <main className="flex flex-col flex-1 overflow-hidden !mt-[120px]">
        
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
