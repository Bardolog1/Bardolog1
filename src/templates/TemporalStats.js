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
  
  const langBest = updatedStats.langPercents.sort((a, b) => b.value - a.value)[0].name.toUpperCase();
  
  const valueLangBest = updatedStats.langPercents.sort((a, b) => b.value - a.value)[0].value;

  const date = newDate.toLocaleDateString("es-ES", options);

  return `
  
<br>

<details open="">
<summary>
<div align="center" style="margin-top: 20px" > 

<img src="https://github.com/Bardolog1/Bardolog1/actions/workflows/runGHActions.yml/badge.svg" alt="gh actions"  style="width: 350px; height: 30px;"/> 
<img src="https://github.com/Bardolog1/Bardolog1/actions/workflows/npm-publish-github-packages.yml/badge.svg" alt="gh actions"  style="width: 350px; height: 30px;"/>

</div>

<br>
</summary>
</details>

## <img src="https://media.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="25"> <b>Estadísticas actualizadas por GH Actions (Falta perfeccionar)</b>

<details open="">

<summary>
  <g-emoji class="g-emoji" alias="chart_with_upwards_trend" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f4c8.png">🚀</g-emoji>
  <strong>Stats </strong>
</summary>
<br/>

<summary>

<img src="https://github-readme-activity-graph.vercel.app/graph?username=bardolog1&theme=synthwave-84&hide_border=true&area=true&custom_title=Contribution%20Graph&radius=16&height=500&area_color=F16FBA" alt="gh actions" width="100%" />

</summary>

<summary>

\`\`\`
  - Total de repositorios: ${totalRepos}
  - Total de repositorios privados: ${totalPrivateRepos}
  - Total de repositorios publicos: ${totalPublicRepos}
  - Total de commits: ${totalCommits} 
  - Total de estrellas obtenidas: ${totalStars}
  - Total de Lenguajes: ${Object.keys(updatedStats.langPercents).length}
  - Lenguaje con mayor porcentaje de uso: ${langBest} con ${valueLangBest}%
  - Total de pull requests: ${updatedStats.totalPullRequests}
  - Ultima actualización del README desde GitHub Actions : ${date}
 
  \`\`\`
  
</summary>
<summary>
<br>
<div align="center" width="100%">
    ${LanguageStats(updatedStats.langPercents)}
</div>
<br>
</summary>
</details>
    `;
}
