import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Posts from "./Posts";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreaterPost from "./components/CreatePost";

function App() {
  return (
    <main>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Posts />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreaterPost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </main>
  );
}

export default App;
