export function quickSort(arr) {

  let animations = [];
  let a = [...arr];

  function partition(low, high) {

    let pivot = a[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {

      animations.push({ type: "compare", indices: [j, high] });

      if (a[j] < pivot) {

        i++;

        [a[i], a[j]] = [a[j], a[i]];

        animations.push({
          type: "swap",
          indices: [i, j],
          array: [...a]
        });
      }
    }

    [a[i + 1], a[high]] = [a[high], a[i + 1]];

    animations.push({
      type: "swap",
      indices: [i + 1, high],
      array: [...a]
    });

    return i + 1;
  }

  function sort(low, high) {

    if (low < high) {

      let pi = partition(low, high);

      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, a.length - 1);

  return animations;
}