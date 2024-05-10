import LanguageBadge from "../utils/LanguagesBadges.json" assert { type: "json" };

/* Parse JSON to Object */
const LanguagesData = LanguageBadge;

export default function LanguageStats(langsStats) {
  return langsStats
    .sort((a, b) => b.value - a.value)
    .slice(0, 4)
    .map((lang, index) => {
      return LanguagesData.map((language) => {
        if (language.name.toLowerCase().includes(lang.name.toLowerCase())) {
          return `


<img src="https://img.shields.io/badge/${language.id}-${language.color.slice(1)}.svg?style=for-the-badge&logo=${language.logoName.toLowerCase()}&logoColor=white" alt="${language.name}" />
<img src="https://img.shields.io/badge/${lang.value+"%25"}-${language.color.slice(1)}.svg?style=social" alt="${lang.name}" />

`;
        }
      }).join('');
    }).join('');
}


/* return langsStats?.slice(0, 5).map((lang, index) => {
    return `
<div align="center">
    <img
        src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${lang.name}/${lang.name}.png"
        alt="Language ${lang.name}"
        width="100%"
    />
</div>
            `;
  }).join(''); */
