const EXPERIENCE_START = new Date("2018-01-01");

export default function getExperienceYears(now = new Date()) {
  const years =
    (now.getFullYear() - EXPERIENCE_START.getFullYear()) +
    (now.getMonth() - EXPERIENCE_START.getMonth()) / 12;
  return Math.floor(years);
}
