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

Actualización automática con GitHub Actions cada 6 horas.

<table align="center" width="100%">
  <tr>
    <td align="center" width="25%">
      <img src="${buildBadgeUrl("Repositorios", formatNumber(totalReposValue), "2563EB")}" alt="Repositorios" />
      <br/>
      <sub>Total de repositorios</sub>
    </td>
    <td align="center" width="25%">
      <img src="${buildBadgeUrl("Commits", formatNumber(totalCommitsValue), "0EA5E9")}" alt="Commits" />
      <br/>
      <sub>Histórico de commits</sub>
    </td>
    <td align="center" width="25%">
      <img src="${buildBadgeUrl("Pull Requests", formatNumber(totalPullRequestsValue), "16A34A")}" alt="Pull Requests" />
      <br/>
      <sub>PRs detectados</sub>
    </td>
    <td align="center" width="25%">
      <img src="${buildBadgeUrl("Estrellas", formatNumber(totalStarsValue), "EA580C")}" alt="Estrellas" />
      <br/>
      <sub>Stars acumuladas</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="25%">
      <img src="${buildBadgeUrl("Publicos", `${formatNumber(totalPublicReposValue)} (${publicRatio}%)`, "0284C7")}" alt="Repositorios publicos" />
      <br/>
      <progress value="${publicRatio}" max="100"></progress>
      <br/>
      <sub>${publicRatio}% del total</sub>
    </td>
    <td align="center" width="25%">
      <img src="${buildBadgeUrl("Privados", `${formatNumber(totalPrivateReposValue)} (${privateRatio}%)`, "1D4ED8")}" alt="Repositorios privados" />
      <br/>
      <progress value="${privateRatio}" max="100"></progress>
      <br/>
      <sub>${privateRatio}% del total</sub>
    </td>
    <td align="center" width="25%">
      <img src="${buildBadgeUrl("Lenguajes", formatNumber(updatedStats.langPercents.length), "7C3AED")}" alt="Lenguajes detectados" />
      <br/>
      <sub>Diversidad del stack</sub>
    </td>
    <td align="center" width="25%">
      <img src="${buildBadgeUrl("Top", `${topLanguage.name.toUpperCase()} ${Number(topLanguage.value).toFixed(2)}%`, "BE123C")}" alt="Top lenguaje" />
      <br/>
      <progress value="${Number(topLanguage.value).toFixed(2)}" max="100"></progress>
      <br/>
      <sub>Lenguaje dominante</sub>
    </td>
  </tr>
</table>

> **Última actualización:** ${date} (America/Bogota)
 
<br>
### Top 6 Lenguajes Por Volumen De Código
<p align="center">
  Basado en bytes detectados en repositorios propios del perfil.
</p>

${LanguageStats(updatedStats.langPercents)}

<br>
    `;
}
