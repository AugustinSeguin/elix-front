import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";

const ErrorPage = () => {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");

  useEffect(() => {
    // Récupérer le message d'erreur depuis sessionStorage ou location.state
    const storedMessage = sessionStorage.getItem("errorMessage");
    const storedStatusCode = sessionStorage.getItem("errorStatusCode");

    if (storedMessage) {
      setErrorMessage(storedMessage);
      setStatusCode(storedStatusCode || "");

      // Nettoyer le sessionStorage
      sessionStorage.removeItem("errorMessage");
      sessionStorage.removeItem("errorStatusCode");
    } else {
      // Fallback vers location.state si disponible
      setErrorMessage(
        location.state?.errorMessage || "Une erreur est survenue",
      );
      setStatusCode(location.state?.statusCode || "");
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Elix" />
      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-2xl">
          {statusCode && (
            <p className="text-6xl font-bold text-primary-500 mb-4">
              {statusCode}
            </p>
          )}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {errorMessage}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Nous sommes désolés pour la gêne occasionnée. Veuillez réessayer
            plus tard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
