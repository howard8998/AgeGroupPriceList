export const addComma = (input) => {
  const numWithoutComma = typeof input === 'string' ? input.replace(/,/g, '') : input;

  const parts = numWithoutComma.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  let result = parts.join('.');
  return result
};

export const getNumberIntervals = (inputset) => {
  let set = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (const innerset of inputset) {
    for (let i = innerset[0]; i < innerset[1] + 1; i++) {
      set[i]++;
    }
  }
  let overlap = [];
  let notInclude = [];
  let pos = -1;
  for (let i = 0; i < set.length; i++) {
    if (pos !== -1 && set[i] !== set[pos]) {
      if (set[pos] === 0) {
        notInclude.push([pos, i - 1]);
        pos = -1;
      } else if (set[i] < 2) {
        overlap.push([pos, i - 1]);
        pos = -1;
      }
    }
    if (pos === -1 && (set[i] === 0 || set[i] > 1)) {
      pos = i;
    }
  }
  return {overlap,notInclude};
};
