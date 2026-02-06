import Header from "../../components/header/Header";

const AboutUs = () => {
  const items = [
    {
      label: "Nom officiel de l'application",
      value: "Elix",
    },
    {
      label: "Numéro de version",
      value: `Version ${__APP_VERSION__}`,
    },
    {
      label: "Date de la dernière mise à jour",
      value: `1/${new Date().getMonth() + 1}/${new Date()
        .getFullYear()
        .toString()
        .slice(-2)}`,
    },
    {
      label: "Année de Création/Droits d'Auteur",
      value: `© ${new Date().getFullYear()} SexEducation.`,
    },
    {
      label: "Déclaration de mission courte",
      value:
        "Notre mission est de rendre l'éducation sexuelle accessible, positive et sans jugement pour tous les adolescents.",
    },
    {
      label: "Public cible",
      value: "Notre contenu est spécifiquement adapté aux 12-15 ans.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="A propos" sticky={true}></Header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 pb-24 flex flex-col items-center">
        <div className="w-full max-w-md border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="w-full max-w-md space-y-5">
            {items.map((item, index) => (
              <div
                key={index}
                className="w-full border-b border-gray-200 pb-5 last:border-0"
              >
                <h3 className="text-[15px] font-bold color-text mb-1">
                  {item.label} :{" "}
                  <span className="font-normal">{item.value}</span>
                </h3>
              </div>
            ))}

            {/* Équipe et auteurs - Special formatting */}
            <div className="w-full border-b border-gray-200 pb-5">
              <h3 className="text-[15px] font-bold color-text mb-1">
                Équipe et auteurs :{" "}
                <span className="font-normal">
                  Les contenus ont été rédigé et vérifié par :
                </span>
              </h3>
              <ul className="list-disc pl-5 text-[15px] color-text mt-1 space-y-1">
                <li>Des professionnels de la santé (médecins, infirmiers).</li>
                <li>Des éducateurs sexuels certifiés.</li>
                <li>Des psychologues.</li>
              </ul>
            </div>

            {/* Sources d'information */}
            <div className="w-full border-b border-gray-200 pb-5">
              <h3 className="text-[15px] font-bold color-text mb-1">
                Sources d'information :{" "}
                <span className="font-normal">
                  Les contenus sont basés sur des sources scientifiques et des
                  organismes de santé publique reconnus.
                </span>
              </h3>
            </div>

            {/* Site web officiel */}
            <div className="w-full border-b border-gray-200 pb-5">
              <h3 className="text-[15px] font-bold color-text mb-1">
                Site web officiel :{" "}
                <a
                  className="font-normal"
                  href="https://app.elix.cleanascode.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  app.elix.cleanascode.fr
                </a>
              </h3>
            </div>

            {/* Crédits & remerciements */}
            <div className="w-full border-b border-gray-200 pb-5">
              <h3 className="text-[15px] font-bold color-text mb-1">
                Crédits & remerciements :{" "}
                <span className="font-normal">
                  Liste des contributeurs majeurs, des développeurs, et des
                  licences utilisées (icônes, API, etc.).
                </span>
              </h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
