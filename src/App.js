import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import HostSession from "./components/HostSession";
import JoinSession from "./components/JoinSession";
import Logout from "./components/Logout";
import GamePage from "./pages/GamePage";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { persistor, store } from "./redux/configureStore";

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/host" element={<HostSession />} />
          <Route path="/join" element={<JoinSession />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
