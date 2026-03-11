import { useState } from 'react';

export default function BubbleSort() {
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

  function bubbleSortAnimations(arr) {
    let animations = [];
    let a = [...arr];
    let n = a.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        animations.push({ type: "compare", indices: [j, j + 1] });

        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];

          animations.push({
            type: "swap",
            indices: [j, j + 1],
            array: [...a]
          });
        }
      }
      
      // Mark the last element of this pass as sorted
      animations.push({ type: "sorted", index: n - 1 - i });
    }
    
    // Mark the first element as sorted (it's the smallest after all passes)
    animations.push({ type: "sorted", index: 0 });

    return animations;
  }

  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    setSortedBars([]);
    const animations = bubbleSortAnimations(array);
    
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
      <h2 className="sort-title">BubbleSort Visualizer</h2>

      <div className="sort-controls">
        <button onClick={handleReset} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={handleSort} disabled={isSorting}>
          Start BubbleSort
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

