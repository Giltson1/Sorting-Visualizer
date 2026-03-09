import { useState } from 'react'
import '../styles/App.css'

function Header() {
  return (
    <header className="header">
      <img src="../assets/log.svg" alt="Company Logo" className="logo" />
    </header>
  );
}

function App() {
  const [setSelectedSort] = useState("Quicksort");

  const sorts = [
    "Quicksort",
    "Merge Sort",
    "Heap Sort",
    "Insertion Sort",
    "Selection Sort",
    "Bubble Sort",
    "Radix Sort"
  ];

  return (
    <div>
      <Header />I

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
    </div>
  );
}

export default App;


