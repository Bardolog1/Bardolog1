import LanguageBadge from "../utils/LanguagesBadges.json" assert { type: "json" };

const LanguagesData = LanguageBadge;
const FALLBACK_COLOR = "334155";
const PROGRESS_BAR_LENGTH = 18;

function getLanguageMeta(languageName) {
  return LanguagesData.find(
    (language) => language.name.toLowerCase() === languageName.toLowerCase()
  );
}

function buildProgressBar(value) {
  const clampedValue = Math.max(0, Math.min(100, Number(value)));
  const filledBlocks = Math.round((clampedValue / 100) * PROGRESS_BAR_LENGTH);
  const emptyBlocks = PROGRESS_BAR_LENGTH - filledBlocks;

  return `${"#".repeat(filledBlocks)}${"-".repeat(emptyBlocks)}`;
}

function buildLanguageRow(languageStat) {
  const languageMeta = getLanguageMeta(languageStat.name);

  const color = (languageMeta?.color ?? `#${FALLBACK_COLOR}`).replace("#", "");
  const languageId = languageMeta?.id ?? encodeURIComponent(languageStat.name);
  const logoName = languageMeta?.logoName
    ? `&logo=${languageMeta.logoName.toLowerCase()}&logoColor=white`
    : "";

  const percentageValue = Number(languageStat.value);
  const formattedPercentage = `${percentageValue.toFixed(2)}%`;
  const usageBar = buildProgressBar(percentageValue);
  const badgeUrl = `https://img.shields.io/badge/${languageId}-${color}.svg?style=for-the-badge${logoName}`;

  return `| ![${languageStat.name}](${badgeUrl}) | **${formattedPercentage}** \`${usageBar}\` |`;
}

export default function LanguageStats(langsStats) {
  if (!langsStats.length) {
    return `
| Lenguaje | Uso |
| --- | --- |
| Sin datos por ahora | -- |
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
| Lenguaje | Uso |
| --- | --- |
${topLanguages.map((languageStat) => buildLanguageRow(languageStat)).join("\n")}
`;
}

