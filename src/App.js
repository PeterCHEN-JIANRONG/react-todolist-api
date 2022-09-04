import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./component/Home"
import About from "./component/About"
import NotFound from "./component/NotFound"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
