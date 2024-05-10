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

  const date = newDate.toLocaleDateString("es-ES", options);

  return `
  
<br>

<div align="center" style="margin-top: 20px" > 

<img src="https://github.com/Bardolog1/Bardolog1/actions/workflows/runGHActions.yml/badge.svg" alt="gh actions"  style="width: 300px; height: 30px;"/> 
<img src="https://github.com/Bardolog1/Bardolog1/actions/workflows/npm-publish-github-packages.yml/badge.svg" alt="gh actions"  style="width: 300px; height: 30px;"/>

</div>

<br>

# Mi Proyecto de Readme Actualizado con GitHub Actions
 
     
Estadísticas actualizadas por GH Actions (Falta perfeccionar):

\`\`\`
  - Total de repositorios: ${totalRepos}
  - Total de repositorios privados: ${totalPrivateRepos}
  - Total de repositorios publicos: ${totalPublicRepos}
  - Total de commits: ${totalCommits} 
  - Total de estrellas obtenidas: ${totalStars}
  - Total de Lenguajes: ${Object.keys(updatedStats.langPercents).length}
  - Lenguaje con mayor porcentaje: ${Object.keys(updatedStats.langPercents).reduce(
    (a, b) => (updatedStats.langPercents[a] > updatedStats.langPercents[b] ? a : b)
  )} con ${updatedStats.langPercents[Object.keys(updatedStats.langPercents).reduce(
    (a, b) => (updatedStats.langPercents[a] > updatedStats.langPercents[b] ? a : b)
  )]} porcentaje
  - Total de pull requests: ${updatedStats.totalPullRequests}
  - Ultima actualización del README desde GitHub Actions : ${date}
 
  \`\`\`
 
<br>
<div align="center" width="100%">
    ${LanguageStats(updatedStats.langPercents)}
</div>
<br>
    `;
}
