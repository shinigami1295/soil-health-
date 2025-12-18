import { useLanguage, Language } from "@/lib/i18n";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const options: { value: Language; label: string }[] = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिंदी" },
    { value: "te", label: "తెలుగు" },
    { value: "kn", label: "ಕನ್ನಡ" },
    { value: "mr", label: "मराठी" },
  ];

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="bg-white border rounded px-3 py-1"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
