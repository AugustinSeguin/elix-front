import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { FaLocationArrow } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "../../contexts/AuthContext";
import ResourcesHeader from "../../components/resources/ResourcesHeader";
import { Resource } from "../../types/resource";
import { renderToStaticMarkup } from "react-dom/server";
import Button from "../../components/button/Button";

// Fix for default marker icon in Leaflet with React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import api from "../../api/axiosConfig";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Couleurs depuis Tailwind config
const COLORS = {
  primary: "#993D80",
  secondary: "#D7B2D4",
  userLocation: "#3B82F6",
  danger: "#EF4444",
};

// Créer des icônes personnalisées avec le composant Icon
const createCustomIcon = (color: string) => {
  const iconMarkup = renderToStaticMarkup(
    <div
      style={{
        backgroundColor: color,
        width: "30px",
        height: "30px",
        borderRadius: "50% 50% 50% 0",
        transform: "rotate(-45deg)",
        border: "3px solid white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ transform: "rotate(45deg)", color: "white", fontSize: "16px" }}
      ></div>
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: "custom-marker",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

// Component to update map center
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const ResourcesMap = () => {
  const { token } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    45.1885, 5.7245,
  ]);
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem("resources_search") || ""
  );

  // Persist keyword across views
  useEffect(() => {
    localStorage.setItem("resources_search", searchTerm);
  }, [searchTerm]);

  // Cache pour les ressources
  const resourcesCache = useRef<
    Map<string, { data: Resource[]; timestamp: number }>
  >(new Map());
  const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      if (!token) return;

      try {
        // Enforce minimum search length before calling the API
        if (searchTerm && searchTerm.length < 3) {
          return;
        }

        const cacheKey = searchTerm || "all";
        const cached = resourcesCache.current.get(cacheKey);
        const now = Date.now();

        // Vérifier si le cache est valide
        if (cached && now - cached.timestamp < CACHE_DURATION) {
          setResources(cached.data);
          return;
        }

        let url = "/api/Resource";
        if (searchTerm && searchTerm.length >= 3) {
          url = `/api/Resource/search/keyword?keyword=${encodeURIComponent(
            searchTerm
          )}`;
        }

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Mettre en cache les résultats
        resourcesCache.current.set(cacheKey, {
          data: response.data,
          timestamp: now,
        });

        setResources(response.data);
      } catch (err) {
        console.error("Error loading resources:", err);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchResources();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [token, searchTerm]);

  return (
    <div className="flex flex-col h-screen bg-white pb-[83px]">
      <ResourcesHeader
        activeTab="map"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="flex-1 relative w-full">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater center={mapCenter} />

          {/* User Location Marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={createCustomIcon(COLORS.userLocation)}
            >
              <Popup>Vous êtes ici</Popup>
            </Marker>
          )}

          {/* Resources Markers */}
          {resources.map((resource) => {
            const lat = resource.localization?.latitude;
            const lng = resource.localization?.longitude;

            if (!lat || !lng) {
              console.warn(`Resource ${resource.id} missing coordinates`);
              return null;
            }

            return (
              <Marker
                key={resource.id}
                position={[lat, lng]}
                icon={createCustomIcon(COLORS.primary)}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-bold text-lg mb-1">{resource.name}</h3>
                    {resource.phoneNumber && (
                      <p className="text-primary mb-2">
                        <a href={`tel:${resource.phoneNumber}`}>
                          {resource.phoneNumber}
                        </a>
                      </p>
                    )}
                    <Button
                      onClick={() => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                        window.open(url, "_blank");
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-sm text-primary hover:underline p-0"
                    >
                      Itinéraire
                    </Button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Recenter Button */}
        {userLocation && (
          <Button
            onClick={() => setMapCenter(userLocation)}
            variant="ghost"
            size="sm"
            className="absolute bottom-4 right-4 z-[1000] bg-white p-3 rounded-full shadow-lg text-gray-700 hover:text-primary transition-colors"
          >
            <FaLocationArrow size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResourcesMap;
