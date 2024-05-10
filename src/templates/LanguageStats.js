export default async function LanguageStats(langsStats) {
  try {
    const response = await fetch("../utils/LanguagesBadges.json");
    const data = await response.json();

    const LanguagesData = data;

    return langsStats
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
      .map((lang) => {
        const languageMatch = LanguagesData.find(
          (language) => lang.name.toLowerCase() === language.name.toLowerCase()
        );

        if (!languageMatch) return '';

        const { id, color, logoName, name } = languageMatch;

        return `
          <img src="https://img.shields.io/badge/${id}-${color.slice(
          1
        )}.svg?style=for-the-badge&logo=${logoName.toLowerCase()}&logoColor=white" alt="${name}" />
          <img src="https://img.shields.io/badge/${
            lang.value + "%25"
          }-${color.slice(1)}.svg?style=social" alt="${name}" />
        `;
      })
      .join("");
  } catch (error) {
    console.error(error);
    return ''; 
  }
}
