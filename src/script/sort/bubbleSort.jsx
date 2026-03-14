import { useEffect, useRef, useState } from 'react';

export default function BubbleSort() {
  const [array, setArray] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(50);

  const speedRef = useRef(speed);

  const NUMBER_OF_BARS = 25;
  const MIN_VALUE = 20;
  const MAX_VALUE = 300;

  const MIN_SPEED = 10;
  const MAX_SPEED = 300;

  useEffect(() => {
    generateNewArray();
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

      animations.push({ type: "sorted", index: n - 1 - i });
    }

    animations.push({ type: "sorted", index: 0 });

    return animations;
  }

  const handleSort = async () => {
    if (isSorting) return;

    setIsSorting(true);
    setSortedBars([]);
    setActiveBars([]);

    const animations = bubbleSortAnimations(array);

    for (let i = 0; i < animations.length; i++) {
      const anim = animations[i];

      if (anim.type === "compare") {
        setActiveBars(anim.indices || []);
      }

      if (anim.type === "swap") {
        setArray([...anim.array]);
        setActiveBars(anim.indices || []);
      }

      if (anim.type === "sorted") {
        setSortedBars((prev) => {
          if (prev.includes(anim.index)) return prev;
          return [...prev, anim.index];
        });

        setActiveBars((prev) => prev.filter((idx) => idx !== anim.index));
      }

      await sleep(speedRef.current);
    }

    setActiveBars([]);
    setIsSorting(false);
  };

  const handleReset = () => {
    generateNewArray();
  };

  return (
    <div className="sort-page">
      <div className="sort-controls">
        <button onClick={handleReset} disabled={isSorting}>
          Generate New Array
        </button>

        <button onClick={handleSort} disabled={isSorting}>
          Start BubbleSort
        </button>

        <div className="speed-control">
          <label htmlFor="speedRange">Speed</label>
          <input
            id="speedRange"
            type="range"
            min={MIN_SPEED}
            max={MAX_SPEED}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
      
        </div>
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
              <span className="bar-label"></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}