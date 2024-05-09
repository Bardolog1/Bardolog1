export default function LanguageStats(langsStats) {
console.log(langsStats);
  return langsStats?.slice(0, 5).map((lang, index) => {
    return `
<div align="center">
    <img
        src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${lang.name}/${lang.name}.png"
        alt="Language ${lang.name}"
        width="100%"
    />
</div>
            `;
  }).join('');
}
