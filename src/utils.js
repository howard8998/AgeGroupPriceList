export const addComma = (input) => {
  if (input === "") return "";
  let numWithoutComma =
    typeof input === "string" ? input.replace(/,/g, "") : input;

  // 检查首位是否为0，如果是，则移除
  if (numWithoutComma[0] === "0") {
    numWithoutComma = numWithoutComma.slice(1);
  }
  const parts = numWithoutComma.toString().split(".");
  parts[0] = parts[0] === "" ? "0" : parts[0];

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
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
  if (set[pos] === 0) {
    notInclude.push([pos, 20]);
    pos = -1;
  } else if (set[pos] >1) {
    overlap.push([pos, 20]);
    pos = -1;
  }
  return { overlap, notInclude };
};
