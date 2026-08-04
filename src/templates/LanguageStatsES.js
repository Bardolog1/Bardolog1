import { createRequire } from "module";

const require = createRequire(import.meta.url);
const LanguagesData = require("../utils/LanguagesBadges.json");
const FALLBACK_COLOR = "334155";

function getLanguageMeta(languageName) {
  return LanguagesData.find(
    (language) => language.name.toLowerCase() === languageName.toLowerCase()
  );
}

function buildLanguageBadge(languageStat) {
  const languageMeta = getLanguageMeta(languageStat.name);

  const color = (languageMeta?.color ?? `#${FALLBACK_COLOR}`).replace("#", "");
  const languageId = languageMeta?.id ?? encodeURIComponent(languageStat.name);
  const logoName = languageMeta?.logoName
    ? `&logo=${languageMeta.logoName.toLowerCase()}`
    : "";
  const logoColor = languageMeta?.textColor
    ? `&logoColor=${languageMeta.textColor.replace("#", "")}`
    : "";

  const percentageValue = Number(languageStat.value);
  const formattedPercentage = `${percentageValue.toFixed(2)}%`;

  const badgeLabelId = languageId.replace(/-/g, "%2D");

  return `<img src="https://img.shields.io/badge/${badgeLabelId}-${encodeURIComponent(formattedPercentage)}-${color}.svg?style=flat-square${logoName}${logoColor}" alt="${languageStat.name} ${formattedPercentage}" />`;
}

export default function LanguageStatsES(langsStats) {
  if (!langsStats.length) {
    return `
<p align="center">Sin datos de lenguajes por ahora</p>
`;
  }

  const topLanguages = langsStats
    .map((language) => ({
      ...language,
      value: Number(language.value),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return `
<p align="center">
  ${topLanguages.map(buildLanguageBadge).join("\n  ")}
</p>
`;
}
