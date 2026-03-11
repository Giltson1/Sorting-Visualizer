import { useState } from 'react';

export default function MergeSort() {
  const [array, setArray] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const NUMBER_OF_BARS = 25;
  const MIN_VALUE = 20;
  const MAX_VALUE = 300;
  const ANIMATION_SPEED = 50;

  useState(() => {
    generateNewArray();
  }, []);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateNewArray() {
    if (isSorting) return;

    const newArray = [];
    for (let i = 0; i < NUMBER_OF_BARS; i++) {
      newArray.push(randomIntFromInterval(MIN_VALUE, MAX_VALUE));
    }

    setArray(newArray);
    setActiveBars([]);
    setSortedBars([]);
  }

  function mergeSortAnimations(arr) {
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
    
    // Mark all as sorted at the end
    for (let i = 0; i < a.length; i++) {
      animations.push({ type: "sorted", index: i });
    }
    
    return animations;
  }

  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    setSortedBars([]);
    const animations = mergeSortAnimations(array);
    
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const anim = animations[i];
        
        if (anim.type === "compare") {
          setActiveBars(anim.indices || []);
        }
        
        if (anim.type === "overwrite") {
          setArray([...anim.array]);
          setActiveBars([anim.index]);
        }
        
        if (anim.type === "sorted") {
          setSortedBars(prev => {
            if (prev.includes(anim.index)) return prev;
            return [...prev, anim.index];
          });
          setActiveBars(prev => prev.filter(idx => idx !== anim.index));
        }
        
        if (i === animations.length - 1) {
          setIsSorting(false);
          setActiveBars([]);
        }
      }, i * ANIMATION_SPEED);
    }
  };

  const handleReset = () => {
    generateNewArray();
  };

  return (
    <div className="sort-page">
      <h2 className="sort-title">MergeSort Visualizer</h2>

      <div className="sort-controls">
        <button onClick={handleReset} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={handleSort} disabled={isSorting}>
          Start MergeSort
        </button>
      </div>

      <div className="array-container">
        {array.map((value, index) => {
          let barClass = "array-bar";

          if (sortedBars.includes(index)) {
            barClass += " sorted";
          } else if (activeBars.includes(index)) {
            barClass += " active";
          }

          return (
            <div key={index} className="bar-wrapper">
              <div
                className={barClass}
                style={{ height: `${value}px` }}
              ></div>
              <span className="bar-label">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

