export function heapsort(arr) {
  const animations = [];
  const a = [...arr];
  const n = a.length;

  function heapify(size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      animations.push({ type: "compare", indices: [left, largest] });
      if (a[left] > a[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      animations.push({ type: "compare", indices: [right, largest] });
      if (a[right] > a[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      animations.push({
        type: "swap",
        indices: [i, largest],
        arr: [...a],
      });

      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    animations.push({
      type: "swap",
      indices: [0, i],
      arr: [...a],
    });

    animations.push({
      type: "sorted",
      index: i,
    });

    heapify(i, 0);
  }

  if (n > 0) {
    animations.push({
      type: "sorted",
      index: 0,
    });
  }

  return animations;
}