import LanguageStats from "./LanguageStats.js";

export default function TemporalStats(updatedStats) {
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

  const formatNumber = (value) => value.toLocaleString("en-US");

  const buildBadgeUrl = (label, value, color) => {
    const encodedLabel = encodeURIComponent(label);
    const encodedValue = encodeURIComponent(value);
    return `https://img.shields.io/badge/${encodedLabel}-${encodedValue}-${color}?style=for-the-badge&labelColor=0f172a`;
  };

  const date = newDate.toLocaleDateString("en-US", options);

  return `
  
<br>

<div align="center" style="margin-top: 20px" > 

<img src="https://github.com/Bardolog1/Bardolog1/actions/workflows/runGHActions.yml/badge.svg" alt="gh actions"  style="width: 350px; height: 30px;"/> 

</div>

<br>

## Automatic Metrics Panel

Automatically updated with GitHub Actions every 6 hours.

<div align="center">
  <img src="${buildBadgeUrl("Repositories", formatNumber(totalReposValue), "2563EB")}" alt="Repositories" />
  <img src="${buildBadgeUrl("Commits", formatNumber(totalCommitsValue), "0EA5E9")}" alt="Commits" />
  <img src="${buildBadgeUrl("Pull Requests", formatNumber(totalPullRequestsValue), "16A34A")}" alt="Pull Requests" />
  <img src="${buildBadgeUrl("Stars", formatNumber(totalStarsValue), "EA580C")}" alt="Stars" />
</div>

${LanguageStats(updatedStats.langPercents)}

**Last updated:** ${date} (America/Bogota)
 
<br>
    `;
}
