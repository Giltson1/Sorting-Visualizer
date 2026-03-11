export function heapsort(arr) {
    let animation = [];
    let a = [...arr];
    let n = a.length;

    function heapify(n, i) {
        let largest = i
        let left = 2 * i + 1
        let right = 2 * i + 2

        if (left > n) {
            animation.push({ type: "compare", indeces: [left, largest] });
            if (a[left] > a[largest]) {
                largest = left;
            }
        }
        if (right < n) {
            animation.push({ type: "compare", indeces: [right, largest] });
            if (a[right] > a[largest]) {
                largest = right;
            }

        }
        if (largest !== i) {
            [a[i], a[largest]] = [a[largest], a[i]];
            animation.push({
                type: "swap",
                indeces: [i, largest],
                arr: [...a]
            });

            heapify(n, largest)
        }
    }
    for (let i = Math.floor (n/2) - 1; i >= 0; i-- ){
        heapify(n, i)
    }
    for (let i = n -1 ; i > 0 ; i--){
        [a[0],a[i]] = [a[i], a[0]]
        animation.push({
            type: "swap",
         indeces: [0, i],
                arr: [...a]
            });

            heapify(i, 0)
    }
    return animation;
}