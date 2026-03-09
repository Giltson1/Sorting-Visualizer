export function bubblestort(arr) {
  let animation = []
  let a = [...arr]

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1; j++) {
      animation.push([j, j + 1])

      if (a[j] > a[j + 1]) {
        [a[j]], a[j + 1] = [a[j + 1], a[j]];
        animation.push([j, a[j]])
      }
    }
  }
  return animation
}

