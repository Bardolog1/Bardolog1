import { createRequire } from "module";

const require = createRequire(import.meta.url);
const LanguagesData = require("../utils/LanguagesBadges.json");
const FALLBACK_COLOR = "334155";

function getLanguageMeta(languageName) {
  return LanguagesData.find(
    (language) => language.name.toLowerCase() === languageName.toLowerCase()
  );
}

function buildLanguageCard(languageStat) {
  if (!languageStat) {
    return `<td width="50%" valign="top" align="left"></td>`;
  }

  const languageMeta = getLanguageMeta(languageStat.name);

  const color = (languageMeta?.color ?? `#${FALLBACK_COLOR}`).replace("#", "");
  const languageId = languageMeta?.id ?? encodeURIComponent(languageStat.name);
  const logoName = languageMeta?.logoName
    ? `&logo=${languageMeta.logoName.toLowerCase()}&logoColor=white`
    : "";

  const percentageValue = Number(languageStat.value);
  const formattedPercentage = `${percentageValue.toFixed(2)}%`;
  const badgeUrl = `https://img.shields.io/badge/${languageId}-${color}.svg?style=for-the-badge${logoName}`;
  const usageBadgeUrl = `https://img.shields.io/badge/Uso-${encodeURIComponent(formattedPercentage)}-0f172a?style=flat-square`;

  return `
<td width="50%" valign="top" align="left">
  <img src="${badgeUrl}" alt="${languageStat.name}" />
  <br/>
  <img src="${usageBadgeUrl}" alt="Uso ${languageStat.name}" />
  <br/>
  <progress value="${percentageValue.toFixed(2)}" max="100"></progress>
  <br/>
  <sub>${formattedPercentage} del código detectado</sub>
</td>`;
}

function buildLanguageRows(languages) {
  const rows = [];

  for (let index = 0; index < languages.length; index += 2) {
    rows.push([languages[index], languages[index + 1] ?? null]);
  }

  return rows
    .map(
      ([leftLanguage, rightLanguage]) => `
<tr>
  ${buildLanguageCard(leftLanguage)}
  ${buildLanguageCard(rightLanguage)}
</tr>`
    )
    .join("\n");
}

export default function LanguageStats(langsStats) {
  if (!langsStats.length) {
    return `
<table align="center" width="100%">
  <tr>
    <td align="center">Sin datos de lenguajes por ahora</td>
  </tr>
</table>
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
<table align="center" width="100%">
${buildLanguageRows(topLanguages)}
</table>
`;
}

