export async function calculateLangPercents(lang) {
  if (!lang.length) {
    return [];
  }

  const totalBytes = lang.reduce((accumulator, current) => {
    return accumulator + current.value;
  }, 0);

  if (totalBytes === 0) {
    return lang.map((language) => ({
      name: language.name,
      value: 0,
    }));
  }

  const langPercents = lang.map((language) => ({
    name: language.name,
    value: Number(((language.value * 100) / totalBytes).toFixed(2)),
  }));

  langPercents.sort((a, b) => b.value - a.value);
  return langPercents;
}
