export default function Repositories(updatedStats) {
  const totalReposValue = Number(updatedStats.totalRepos ?? 0);
  const totalPublicReposValue = Number(updatedStats.totalPublicRepos ?? 0);
  const totalPrivateReposValue = Number(updatedStats.totalPrivateRepos ?? 0);

  const formatNumber = (value) => value.toLocaleString("en-US");

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
## Repositories

<div align="center">
  <img src="${buildBadgeUrl("Repositories", formatNumber(totalReposValue), "2563EB")}" alt="Total repositories" />
  <img src="${buildBadgeUrl("Public", formatNumber(totalPublicReposValue), "22C55E")}" alt="Public repositories" />
  <img src="${buildBadgeUrl("Private", formatNumber(totalPrivateReposValue), "1D4ED8")}" alt="Private repositories" />
</div>

<div align="center">
  ${repoCards}
</div>

<p align="center">A selection of public projects. Explore more in the repositories tab.</p>

<br>
    `;
}
