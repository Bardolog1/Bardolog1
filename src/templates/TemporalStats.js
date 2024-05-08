import LanguageStats from "./LanguageStats.js";

export default function TemporalStats(updatedStats) {
    const { totalRepos,totalPrivateRepos, totalPublicRepos, totalCommits, totalStars } = updatedStats;
    /* fecha de colombia actual*/
    
    const newDate = new Date()
        .toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
        }
    );
    
    newDate.setHours(newDate.getHours() - 5);

    return `
        <div align="center"> 
            [![Run GH Actions & GH Stats Main](https://github.com/Bardolog1/Bardolog1/actions/workflows/runGHActions.yml/badge.svg)](https://github.com/Bardolog1/Bardolog1/actions/workflows/runGHActions.yml)    
            [![Run GH Actions & GH Stats Features](https://github.com/Bardolog1/Bardolog1/actions/workflows/npm-publish-github-packages.yml/badge.svg)](https://github.com/Bardolog1/Bardolog1/actions/workflows/npm-publish-github-packages.yml) 
        </div>
        
        # Mi Proyecto de Readme Actualizado con GitHub Actions
         
             
        Estadísticas actualizadas por GH Actions (Falta perfeccionar):
         
        - Total de repositorios: ${totalRepos}
        - Total de repositorios privados: ${totalPrivateRepos}
        - Total de repositorios publicos: ${totalPublicRepos}
        - Total de commits: ${totalCommits} 
        - Total de estrellas: ${totalStars}
        - Last update :${newDate}
     
         - ...
        <div align="center">
            ${LanguageStats(updatedStats?.lang)}
        </div>    
    `;
}