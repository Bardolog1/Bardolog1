export async function calculateLangPercents(lang) {
  let langPercents = lang.map((l) => ({
    name: l.name,
    value: ((l.value * 100) / lang.reduce((a, b) => a + b.value, 0)).toFixed(2),
  }));
  langPercents.sort((a, b) => b.value - a.value);
  return langPercents;
}
