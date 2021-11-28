import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import LoginPage from "./pages/LoginPage";
import Logout from "./components/Logout";
import { store } from "./redux";

function App() {
  return (
    <ReduxProvider store={store}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </ReduxProvider>
  );
}

export default App;
