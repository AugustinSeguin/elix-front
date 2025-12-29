import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import ResourcesHeader from "../../components/resources/ResourcesHeader";
import { Resource } from "../../types/resource";

const Resources = () => {
  const { token } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem("resources_search") || ""
  );

  // Persist keyword across views
  useEffect(() => {
    localStorage.setItem("resources_search", searchTerm);
  }, [searchTerm]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    // Get user location for distance calculation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      if (!token) return;

      // Enforce minimum search length before calling the API
      if (searchTerm && searchTerm.length < 3) {
        setLoading(false);
        return;
      }

      // Vérifier le cache d'abord si pas de recherche
      if (!searchTerm) {
        const cachedData = localStorage.getItem("resources");
        if (cachedData) {
          setResources(JSON.parse(cachedData));
          setLoading(false);
        }
      }

      try {
        let url = "/api/Resource";
        if (searchTerm && searchTerm.length >= 3) {
          url = `/api/Resource/search/keyword?keyword=${encodeURIComponent(
            searchTerm
          )}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResources(response.data);

        // Mettre à jour le cache seulement si on récupère toutes les ressources
        if (!searchTerm) {
          localStorage.setItem("resources", JSON.stringify(response.data));
        }
      } catch (err) {
        console.error("Error loading resources:", err);
        setError("Impossible de charger les ressources");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchResources();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [token, searchTerm]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d.toFixed(1);
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <ResourcesHeader
        activeTab="list"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="px-4 py-2 space-y-3">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : resources.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucune ressource trouvée.
          </div>
        ) : (
          resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-base">
                  {resource.name}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                {userLocation && (
                  <span className="text-xs text-gray-400">
                    {calculateDistance(
                      userLocation[0],
                      userLocation[1],
                      resource.localization.latitude,
                      resource.localization.longitude
                    )}{" "}
                    km
                  </span>
                )}

                {resource.phoneNumber && (
                  <a
                    href={`tel:${resource.phoneNumber}`}
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <FaPhone className="text-xl transform rotate-90" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Resources;
