import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { store } from "./redux";

function App() {
  return (
    <ReduxProvider store={store}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ReduxProvider>
  );
}

export default App;
