import Header from "./components/SiteHeader.jsx";
import Home from "./data/Home.jsx";
import PostPage from "./components/PostPage.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;