import "./App.css";
import {Routes, Route} from 'react-router-dom'
import Layout from "./Layout";
import Posts from "./Posts";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <main>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Posts />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
      </Route> 
    </Routes>
    </main>
  );
}

export default App;
