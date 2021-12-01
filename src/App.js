import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";
import Logout from "./components/Logout";
import WordInput from "./components/WordInput";
import { store } from "./redux";
import HostSession from "./components/HostSession";
import JoinSession from "./components/JoinSession";

function App() {
  return (
    <ReduxProvider store={store}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/word" element={<WordInput />} />
        <Route path="/host" element={<HostSession />} />
        <Route path="/join" element={<JoinSession />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </ReduxProvider>
  );
}

export default App;
