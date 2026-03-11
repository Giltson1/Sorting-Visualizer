import { useState } from 'react';

export default function QuickSort() {
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

  function quickSortAnimations(arr) {
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
    const animations = quickSortAnimations(array);
    
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const anim = animations[i];
        
        if (anim.type === "compare" || anim.type === "swap") {
          setActiveBars(anim.indices || []);
        }
        
        if (anim.type === "swap") {
          setArray([...anim.array]);
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
      <h2 className="sort-title">QuickSort Visualizer</h2>

      <div className="sort-controls">
        <button onClick={handleReset} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={handleSort} disabled={isSorting}>
          Start QuickSort
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

