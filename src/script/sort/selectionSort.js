export function selectionSort(arr) {
  let animations = [];
  let a = [...arr];
  let n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let min = i;

    for (let j = i + 1; j < n; j++) {

      animations.push({ type: "compare", indices: [min, j] });

      if (a[j] < a[min]) {
        min = j;
      }
    }

    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];

      animations.push({
        type: "swap",
        indices: [i, min],
        array: [...a]
      });
    }
  }

  return animations;
}