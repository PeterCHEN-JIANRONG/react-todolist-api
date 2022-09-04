import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./component/Home"
import Login from "./component/Login"
import Signup from "./component/Signup"
import NotFound from "./component/NotFound"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
