import React, { useState } from "react";
import "./App.css";

function Banner() {
  return <h1>Todo Example with React</h1>;
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setItems([...items, { id: Math.random(), text: itemText }]);
    setItemText("");
  };
  const removeItem = (id) => {
    // filter/remove item with id
    const newItems = items.filter((item) => item.id !== id);
    // set new items
    setItems(newItems);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemText}
          onChange={(event) => setItemText(event.target.value)}
          placeholder="Write a new todo here"
        />
        <input type="submit" value="Add" />
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text + " "}{" "}
            <span onClick={() => removeItem(item.id)}> x </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Banner />
      <ToDoFormAndList />
    </div>
  );
}

export default App;
