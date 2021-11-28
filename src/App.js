import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";
import Logout from "./components/Logout";
import { store } from "./redux";

function App() {
  return (
    <ReduxProvider store={store}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </ReduxProvider>
  );
}

export default App;
