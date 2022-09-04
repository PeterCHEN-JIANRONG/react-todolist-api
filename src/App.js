import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';
import Home from "./component/Home"
import Login from "./component/Login"
import Signup from "./component/Signup"
import NotFound from "./component/NotFound"
import { AuthContext } from "./component/Context";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
