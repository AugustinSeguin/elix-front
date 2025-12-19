const CGU = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-8 px-4 text-center sticky top-0 z-10">
        <h1 className="text-3xl font-bold">
          Conditions Générales d'Utilisation
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Objet</h2>
            <p className="text-gray-600">
              Les présentes conditions générales d'utilisation régissent l'accès
              et l'utilisation de la plateforme Elix. Elix est une application
              éducative destinée à l'éducation sexuelle des jeunes âgés de 10 à
              18 ans.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              2. Acceptation des conditions
            </h2>
            <p className="text-gray-600">
              En accédant à la plateforme Elix, vous acceptez sans réserve les
              présentes conditions générales d'utilisation. Si vous n'acceptez
              pas ces conditions, veuillez cesser l'utilisation de la
              plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              3. Inscription et sécurité du compte
            </h2>
            <p className="text-gray-600">
              Vous êtes responsable du maintien de la confidentialité de vos
              identifiants de connexion. Vous vous engagez à ne pas partager vos
              identifiants avec des tiers et à informer immédiatement l'équipe
              Elix de toute utilisation non autorisée de votre compte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              4. Utilisation responsable
            </h2>
            <p className="text-gray-600">
              Vous acceptez d'utiliser la plateforme Elix de manière responsable
              et respectueuse. Vous vous engagez à ne pas :
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-2">
              <li>Accéder à des informations protégées</li>
              <li>Utiliser la plateforme à des fins illégales</li>
              <li>Déranger ou harceler d'autres utilisateurs</li>
              <li>Télécharger des contenus malveillants</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              5. Contenu éducatif
            </h2>
            <p className="text-gray-600">
              Le contenu fourni par Elix est conçu à titre éducatif uniquement.
              Ce contenu ne remplace en aucun cas un conseil médical ou
              psychologique professionnel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              6. Limitation de responsabilité
            </h2>
            <p className="text-gray-600">
              Elix ne peut être tenu responsable de tout dommage direct,
              indirect, ou consécutif résultant de l'utilisation ou de
              l'impossibilité d'utiliser la plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              7. Modification des conditions
            </h2>
            <p className="text-gray-600">
              Elix se réserve le droit de modifier les présentes conditions
              générales à tout moment. Les modifications seront publiées sur la
              plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              8. Contact
            </h2>
            <p className="text-gray-600">
              Pour toute question concernant ces conditions, veuillez contacter
              :
              <br />
              <a
                href="mailto:contact@elix.com"
                className="text-blue-500 hover:underline"
              >
                contact@elix.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CGU;
