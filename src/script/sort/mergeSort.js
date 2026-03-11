export function mergeSort(arr) {

  let animations = [];
  let a = [...arr];

  function merge(left, mid, right) {

    let leftArr = a.slice(left, mid + 1);
    let rightArr = a.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {

      animations.push({ type: "compare", indices: [left + i, mid + 1 + j] });

      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i];
        i++;
      } else {
        a[k] = rightArr[j];
        j++;
      }

      animations.push({
        type: "overwrite",
        index: k,
        value: a[k],
        array: [...a]
      });

      k++;
    }

    while (i < leftArr.length) {
      a[k] = leftArr[i];

      animations.push({
        type: "overwrite",
        index: k,
        value: a[k],
        array: [...a]
      });

      i++;
      k++;
    }

    while (j < rightArr.length) {
      a[k] = rightArr[j];

      animations.push({
        type: "overwrite",
        index: k,
        value: a[k],
        array: [...a]
      });

      j++;
      k++;
    }
  }

  function sort(l, r) {

    if (l >= r) return;

    let mid = Math.floor((l + r) / 2);

    sort(l, mid);
    sort(mid + 1, r);

    merge(l, mid, r);
  }

  sort(0, a.length - 1);

  return animations;
}