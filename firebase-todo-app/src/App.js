import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
const firebaseConfig = {
  apiKey: "AIzaSyBD9fo2hDQe3W0bWsyp_x7XkA-VMXO7H0U",
  authDomain: "todo-52098.firebaseapp.com",
  projectId: "todo-52098",
  storageBucket: "todo-52098.appspot.com",
  messagingSenderId: "854940217150",
  appId: "1:854940217150:web:e8ddd93f025fa8da80866f",
  measurementId: "G-KGDQYVZNJH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function Banner() {
  return <h1>Todo Application w/ Firebase</h1>;
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const todosCol = collection(db, "todos");
      const todoSnapshot = await getDocs(todosCol);

      const todos = todoSnapshot.docs.map((doc) => {
        return {
          text: doc.data().text,
          id: doc.id,
        };
      });

      console.log(todos);
      setItems(todos);
      setLoading(false);
    };

    console.log("fetch data...");
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newItem = { text: itemText };
    const docRef = await addDoc(collection(db, "todos"), newItem);

    newItem.id = docRef.id;

    setItems([...items, newItem]);

    setItemText("");
  };
  const removeItem = (item) => {
    deleteDoc(doc(db, "todos", item.id));

    let filteredArray = items.filter(
      (collectionItem) => collectionItem.id !== item.id
    );
    setItems(filteredArray);
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
        {loading && <p>Loading...</p>}
        {items.map((item) => (
          <li key={item.id}>
            {item.text + " "} <span onClick={() => removeItem(item)}> x </span>
          </li>
        ))}
      </ul>
      <button onClick={() => signOut(auth) && navigate("/")}>Logout</button>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      navigate("/todos");
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Banner />
        <Routes>
          <Route
            path="/todos"
            element={
              user ? (
                <ToDoFormAndList user={user} />
              ) : (
                <p>Please login to view todos</p>
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <button onClick={() => signOut(auth)}>Logout</button>
              ) : (
                <Login auth={auth} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
