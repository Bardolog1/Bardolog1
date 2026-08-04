export default function RepositoriesES(updatedStats) {
  const totalReposValue = Number(updatedStats.totalRepos ?? 0);
  const totalPublicReposValue = Number(updatedStats.totalPublicRepos ?? 0);
  const totalPrivateReposValue = Number(updatedStats.totalPrivateRepos ?? 0);

  const formatNumber = (value) => value.toLocaleString("es-ES");

  const buildBadgeUrl = (label, value, color) => {
    const encodedLabel = encodeURIComponent(label);
    const encodedValue = encodeURIComponent(value);
    return `https://img.shields.io/badge/${encodedLabel}-${encodedValue}-${color}?style=for-the-badge&labelColor=0f172a`;
  };

  const featuredRepos = [
    "Microservices-Project-Spring",
    "thinking-orbs-colorized",
    "blog-arq-software",
  ];

  const repoCards = featuredRepos
    .map(
      (repo) =>
        `<img src="https://github-readme-stats.vercel.app/api/pin/?username=Bardolog1&repo=${repo}&theme=github_dark&hide_border=true" alt="${repo}" />`
    )
    .join("\n  ");

  return `
## Repositorios

<div align="center">
  <img src="${buildBadgeUrl("Repositorios", formatNumber(totalReposValue), "2563EB")}" alt="Total de repositorios" />
  <img src="${buildBadgeUrl("Públicos", formatNumber(totalPublicReposValue), "22C55E")}" alt="Repositorios públicos" />
  <img src="${buildBadgeUrl("Privados", formatNumber(totalPrivateReposValue), "1D4ED8")}" alt="Repositorios privados" />
</div>

<div align="center">
  ${repoCards}
</div>

<p align="center">Una selección de proyectos públicos. Explora más en la pestaña de repositorios.</p>

<br>
    `;
}
