import { useEffect, useMemo, useState } from "react";
import api from "../../api/axiosConfig";
import ProgressBar from "./ProgressBar";
import type { Category } from "../../types/category";

interface UserPointDto {
  id: number;
  userId: number;
  categoryId: number;
  points: number;
  maximumPoints: number;
}

const Progress = () => {
  const [userPoints, setUserPoints] = useState<UserPointDto[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => {
    try {
      const cached = localStorage.getItem("categories");
      if (!cached) return [] as Category[];
      return JSON.parse(cached) as Category[];
    } catch {
      return [] as Category[];
    }
  }, []);

  useEffect(() => {
    const fetchUserPoints = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUserPoints([]);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get<UserPointDto[]>(
          "/api/UserPoint/user/1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );
        setUserPoints(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching user points:", error);
        setUserPoints([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPoints();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl shadow-sm border border-gray-100 p-4">
        <p className="text-sm color-text">Chargement de la progression...</p>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="rounded-2xl shadow-sm border border-gray-100 p-4">
        <p className="text-sm color-text">Aucune catégorie disponible.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
      {categories.map((category) => {
        const entry = userPoints.find(
          (point) => point.categoryId === category.id,
        );
        const percentage = entry?.maximumPoints
          ? Math.round((entry.points / entry.maximumPoints) * 100)
          : 0;

        return (
          <ProgressBar
            key={category.id}
            category={category}
            percentage={percentage}
          />
        );
      })}
    </div>
  );
};

export default Progress;
