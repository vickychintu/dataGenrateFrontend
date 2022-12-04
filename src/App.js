import logo from "./logo.svg";
import "./App.css";
import Graph from "./components/Graph";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/dashboard/dashBoard";
import Chartdisplay from "./components/dashboard/chartdisplay";

function App() {
  return (
    <Routes>
      <Route path="/chart" element={<Chartdisplay />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
