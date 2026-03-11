export function insertionSort(arr) {
  let animations = [];
  let a = [...arr];

  for (let i = 1; i < a.length; i++) {

    let key = a[i];
    let j = i - 1;

    while (j >= 0 && a[j] > key) {

      animations.push({ type: "compare", indices: [j, i] });

      a[j + 1] = a[j];

      animations.push({
        type: "overwrite",
        index: j + 1,
        value: a[j],
        array: [...a]
      });

      j--;
    }

    a[j + 1] = key;

    animations.push({
      type: "overwrite",
      index: j + 1,
      value: key,
      array: [...a]
    });
  }

  return animations;
}