import LanguageStats from "./LanguageStats.js";

export default function TemporalStats(updatedStats) {
  const {
    totalRepos,
    totalPrivateRepos,
    totalPublicRepos,
    totalCommits,
    totalStars,
  } = updatedStats;


  const newDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "America/Bogota", 
  };
  
  const sortedLangs = [...updatedStats.langPercents].sort(
    (a, b) => b.value - a.value
  );
  const topLanguage = sortedLangs[0] ?? { name: "N/A", value: 0 };

  const totalReposValue = Number(totalRepos ?? 0);
  const totalPrivateReposValue = Number(totalPrivateRepos ?? 0);
  const totalPublicReposValue = Number(totalPublicRepos ?? 0);
  const totalCommitsValue = Number(totalCommits ?? 0);
  const totalStarsValue = Number(totalStars ?? 0);
  const totalPullRequestsValue = Number(updatedStats.totalPullRequests ?? 0);

  const formatNumber = (value) => value.toLocaleString("es-ES");
  const publicRatio =
    totalReposValue > 0
      ? ((totalPublicReposValue * 100) / totalReposValue).toFixed(1)
      : "0.0";
  const privateRatio =
    totalReposValue > 0
      ? ((totalPrivateReposValue * 100) / totalReposValue).toFixed(1)
      : "0.0";

  const buildBadgeUrl = (label, value, color) => {
    const encodedLabel = encodeURIComponent(label);
    const encodedValue = encodeURIComponent(value);
    return `https://img.shields.io/badge/${encodedLabel}-${encodedValue}-${color}?style=for-the-badge&labelColor=0f172a`;
  };

  const date = newDate.toLocaleDateString("es-ES", options);

  return `
  
<br>

<div align="center" style="margin-top: 20px" > 

<img src="https://github.com/Bardolog1/Bardolog1/actions/workflows/runGHActions.yml/badge.svg" alt="gh actions"  style="width: 350px; height: 30px;"/> 

</div>

<br>

## Panel De Métricas Automáticas
 
<p align="center">
  Actualización automática con GitHub Actions cada 6 horas.
</p>

<div align="center">
  <img src="${buildBadgeUrl("Repositorios", formatNumber(totalReposValue), "2563EB")}" alt="Repositorios" />
  <img src="${buildBadgeUrl("Commits", formatNumber(totalCommitsValue), "0EA5E9")}" alt="Commits" />
  <img src="${buildBadgeUrl("Pull Requests", formatNumber(totalPullRequestsValue), "16A34A")}" alt="Pull Requests" />
  <img src="${buildBadgeUrl("Estrellas", formatNumber(totalStarsValue), "EA580C")}" alt="Estrellas" />
</div>

<div align="center">
  <img src="${buildBadgeUrl("Repos públicos", `${formatNumber(totalPublicReposValue)} (${publicRatio}%)`, "0891B2")}" alt="Repos públicos" />
  <img src="${buildBadgeUrl("Repos privados", `${formatNumber(totalPrivateReposValue)} (${privateRatio}%)`, "1D4ED8")}" alt="Repos privados" />
  <img src="${buildBadgeUrl("Lenguajes", formatNumber(updatedStats.langPercents.length), "7C3AED")}" alt="Lenguajes" />
  <img src="${buildBadgeUrl("Top lenguaje", `${topLanguage.name.toUpperCase()} ${topLanguage.value}%`, "BE123C")}" alt="Top lenguaje" />
</div>

<p align="center">
  <strong>Última actualización:</strong> ${date} (America/Bogota)
</p>
 
<br>
### Top 6 Lenguajes Por Volumen De Código
<p align="center">
  Basado en bytes detectados en repositorios propios del perfil.
</p>

${LanguageStats(updatedStats.langPercents)}

<br>
    `;
}
