import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/about";
import Profile from "./pages/profile";
import Header from "./assets/components/header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Root route */}
        <Route path="/sign-in" element={<Signin />} /> 
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
