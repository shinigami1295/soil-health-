import { SoilType } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { useLocation } from "wouter";

export function SoilCard({ soil }: { soil: SoilType }) {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <img src={soil.image} alt={t(soil.name)} className="h-44 w-full object-cover" />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{t(soil.name)}</h3>
        <p className="text-sm mt-2">{t(soil.description)}</p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setLocation(`/conditions/${soil.id}`)}
            className="px-3 py-1 rounded bg-primary text-white"
          >
            Details
          </button>
          <button
            onClick={() => setLocation(`/recommendations/${soil.id}`)}
            className="px-3 py-1 rounded border"
          >
            Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}
