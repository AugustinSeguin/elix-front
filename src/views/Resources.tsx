import { useState, useEffect } from "react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Icon from "../components/icon/Icon";

interface Resource {
  id: number;
  name: string;
  localization: {
    latitude: number;
    longitude: number;
  };
  phoneNumber: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        const response = await fetch("/resources.json");
        if (!response.ok) {
          throw new Error("Impossible de charger les ressources");
        }
        const data = await response.json();
        setResources(data.resources);
      } catch (err) {
        console.error("Error loading resources:", err);
        setError("Erreur lors du chargement des ressources");
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const displayedResources = resources.slice(0, displayedCount);
  const hasMore = displayedCount < resources.length;

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + 6);
  };

  const openGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/@${latitude},${longitude},15z`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-20">
        <p className="text-lg text-gray-600">Chargement des ressources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-20">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-8 px-4 text-center sticky top-0 z-10">
        <h1 className="text-3xl font-bold">Ressources</h1>
        <p className="text-blue-100 mt-2">
          Trouvez les ressources qui vous conviennent
        </p>
      </div>

      {/* Resources grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {resource.name}
              </h3>

              {/* Phone */}
              <div className="flex items-center gap-3 mb-3">
                <Icon icon={FaPhone} size="md" color="#3b82f6" />
                <a
                  href={`tel:${resource.phoneNumber}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  {resource.phoneNumber}
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 mb-4">
                <Icon icon={FaMapMarkerAlt} size="md" color="#ef4444" />
                <button
                  onClick={() =>
                    openGoogleMaps(
                      resource.localization.latitude,
                      resource.localization.longitude
                    )
                  }
                  className="text-blue-500 hover:underline text-sm"
                >
                  Voir sur la carte
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Voir plus ({displayedCount} / {resources.length})
            </button>
          </div>
        )}

        {/* No more resources message */}
        {!hasMore && resources.length > 0 && (
          <div className="flex justify-center mt-10">
            <p className="text-gray-600">
              Vous avez vu toutes les {resources.length} ressources
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
