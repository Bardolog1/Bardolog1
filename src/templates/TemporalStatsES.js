import LanguageStatsES from "./LanguageStatsES.js";

export default function TemporalStatsES(updatedStats) {
  const {
    totalRepos,
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
  
  const totalReposValue = Number(totalRepos ?? 0);
  const totalCommitsValue = Number(totalCommits ?? 0);
  const totalStarsValue = Number(totalStars ?? 0);
  const totalPullRequestsValue = Number(updatedStats.totalPullRequests ?? 0);

  const formatNumber = (value) => value.toLocaleString("es-ES");

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

## Panel de Métricas Automáticas

Actualización automática con GitHub Actions cada 6 horas.

<div align="center">
  <img src="${buildBadgeUrl("Repositorios", formatNumber(totalReposValue), "2563EB")}" alt="Repositorios" />
  <img src="${buildBadgeUrl("Commits", formatNumber(totalCommitsValue), "0EA5E9")}" alt="Commits" />
  <img src="${buildBadgeUrl("Pull Requests", formatNumber(totalPullRequestsValue), "16A34A")}" alt="Pull Requests" />
  <img src="${buildBadgeUrl("Estrellas", formatNumber(totalStarsValue), "EA580C")}" alt="Estrellas" />
</div>

${LanguageStatsES(updatedStats.langPercents)}

**Última actualización:** ${date} (America/Bogota)
 
<br>
    `;
}
