import { useState } from 'react'
import '../styles/App.css'
import '../styles/index.css'
import logo from '../assets/log.svg'

import QuickSort from './sort/quicksort.jsx'
import MergeSort from './sort/mergeSort.jsx'
import HeapSort from './sort/heapSort.jsx'
import InsertionSort from './sort/insertionSort.jsx'
import SelectionSort from './sort/selectionSort.jsx'
import BubbleSort from './sort/bubbleSort.jsx'
function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Company Logo" className="logo" />
    </header>
  );
}

function App() {
  const [selectedSort, setSelectedSort] = useState("Quicksort");

  const sorts = [
    "Quicksort",
    "Merge Sort",
    "Heap Sort",
    "Insertion Sort",
    "Selection Sort",
    "Bubble Sort",
  ];

  function renderSortComponent() {
    switch (selectedSort) {
      case "Quicksort":
        return <QuickSort />;
      case "Merge Sort":
        return <MergeSort />;
      case "Heap Sort":
        return <HeapSort />;
      case "Insertion Sort":
        return <InsertionSort />;
      case "Selection Sort":
        return <SelectionSort />;
      case "Bubble Sort":
        return <BubbleSort />
      default:
        return <QuickSort />;
    }
  }

  return (
    <div>
      <Header />

      <nav className="sort-navbar">
        <ul>
          {sorts.map((sort) => (
            <li key={sort}>
              <button onClick={() => setSelectedSort(sort)}>
                {sort}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <h2>{selectedSort}</h2>
        {renderSortComponent()}
      </main>
    </div>
  );
}

export default App;