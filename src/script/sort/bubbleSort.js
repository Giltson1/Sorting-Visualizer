export function bubbleSort(arr) {
  let animations = [];
  let a = [...arr];
  let n = a.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {

      animations.push({ type: "compare", indices: [j, j + 1] });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];

        animations.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...a]
        });
      }
    }
  }

  return animations;
}