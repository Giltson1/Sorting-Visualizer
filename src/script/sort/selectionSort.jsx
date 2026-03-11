import { useState } from 'react';

export default function SelectionSort() {
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

  function selectionSortAnimations(arr) {
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
      
      // Mark element as sorted after placing it
      animations.push({ type: "sorted", index: i });
    }
    
    // Mark the last element as sorted
    animations.push({ type: "sorted", index: n - 1 });

    return animations;
  }

  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    setSortedBars([]);
    const animations = selectionSortAnimations(array);
    
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const anim = animations[i];
        
        if (anim.type === "compare") {
          setActiveBars(anim.indices || []);
        }
        
        if (anim.type === "swap") {
          setArray([...anim.array]);
          setActiveBars(anim.indices || []);
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
      <h2 className="sort-title">SelectionSort Visualizer</h2>

      <div className="sort-controls">
        <button onClick={handleReset} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={handleSort} disabled={isSorting}>
          Start SelectionSort
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

