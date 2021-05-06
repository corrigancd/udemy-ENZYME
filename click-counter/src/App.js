import React from "react";
import "./App.css";

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div data-test="component-app" className="App">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      <button data-test="decrement-button" onClick={() => setCount(count - 1)}>
        Decrement counter
      </button>
      <button data-test="increment-button" onClick={() => setCount(count + 1)}>
        Increment counter
      </button>
      {count < 0 && (
        <h2 data-test="warning" style={{ color: "red" }}>
          The counter cannot go below 0
        </h2>
      )}
    </div>
  );
}

export default App;
