import { useEffect, useRef, useState } from "react";
import { heapsort } from "./heapSort.js";

function HeapSort() {
  const [array, setArray] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(50);
  const speedRef = useRef(speed);

  const NUMBER_OF_BARS = 25;
  const MIN_VALUE = 20;
  const MAX_VALUE =400;
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

  function startHeapSort() {
    if (isSorting) return;

    const animations = heapsort(array);
    const arrayCopy = [...array];

    setIsSorting(true);
    setActiveBars([]);
    setSortedBars([]);

    animations.forEach((animation, step) => {
      setTimeout(() => {
        if (animation.type === "compare") {
          setActiveBars(animation.indices);
        }

        if (animation.type === "swap") {
          setArray([...animation.arr]);
          setActiveBars(animation.indices);
        }

        if (animation.type === "sorted") {
          setSortedBars((prev) => {
            if (prev.includes(animation.index)) return prev;
            return [...prev, animation.index];
          });
          setActiveBars([]);
        }

        if (step === animations.length - 1) {
          setTimeout(() => {
            setActiveBars([]);
            setIsSorting(false);
          }, speedRef.current);
        }
      }, step * speedRef.current);
    });
  }

  return (
    <div className="sort-page">
      <div className="sort-controls">
        <button onClick={generateNewArray} disabled={isSorting}>
          Generate New Array
        </button>

        <button onClick={startHeapSort} disabled={isSorting}>
          Start Heap Sort
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
        {array.map((value, idx) => {
          let barClass = "array-bar";

          if (sortedBars.includes(idx)) {
            barClass += " sorted";
          } else if (activeBars.includes(idx)) {
            barClass += " active";
          }

          return (
            <div key={idx} className="bar-wrapper">
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

export default HeapSort;