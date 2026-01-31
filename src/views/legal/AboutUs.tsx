import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "../../components/button/Button";

const AboutUs = () => {
  const navigate = useNavigate();

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
      {/* Header */}
      <header className="relative flex items-center justify-center h-[60px] border-b border-gray-200 px-4 z-10 shadow-sm">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="sm"
          className="absolute left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <MdArrowBackIosNew className="w-5 h-5 text-black" />
        </Button>
        <h1 className="text-lg font-bold tracking-widest text-black uppercase">
          A propos
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 pb-24 flex flex-col items-center">
        <div className="w-full max-w-md border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="w-full max-w-md space-y-5">
            {items.map((item, index) => (
              <div
                key={index}
                className="w-full border-b border-gray-200 pb-5 last:border-0"
              >
                <h3 className="text-[15px] font-bold text-black mb-1">
                  {item.label} :{" "}
                  <span className="font-normal">{item.value}</span>
                </h3>
              </div>
            ))}

            {/* Équipe et auteurs - Special formatting */}
            <div className="w-full border-b border-gray-200 pb-5">
              <h3 className="text-[15px] font-bold text-black mb-1">
                Équipe et auteurs :{" "}
                <span className="font-normal">
                  Les contenus ont été rédigé et vérifié par :
                </span>
              </h3>
              <ul className="list-disc pl-5 text-[15px] text-black mt-1 space-y-1">
                <li>Des professionnels de la santé (médecins, infirmiers).</li>
                <li>Des éducateurs sexuels certifiés.</li>
                <li>Des psychologues.</li>
              </ul>
            </div>

            {/* Sources d'information */}
            <div className="w-full border-b border-gray-200 pb-5">
              <h3 className="text-[15px] font-bold text-black mb-1">
                Sources d'information :{" "}
                <span className="font-normal">
                  Les contenus sont basés sur des sources scientifiques et des
                  organismes de santé publique reconnus.
                </span>
              </h3>
            </div>

            {/* Site web officiel */}
            <div className="w-full border-b border-gray-200 pb-5">
              <h3 className="text-[15px] font-bold text-black mb-1">
                Site web officiel : <span className="font-normal">elix.fr</span>
              </h3>
            </div>

            {/* Crédits & remerciements */}
            <div className="w-full border-b border-gray-200 pb-5">
              <h3 className="text-[15px] font-bold text-black mb-1">
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
