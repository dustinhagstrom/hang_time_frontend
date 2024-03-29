import React, { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import NotFound from "./components/NotFound";
import { persistor, store } from "./redux/configureStore";
import Spinner from "./components/spinner/Spinner";
const HostSession = React.lazy(() => import("./components/HostSession"));
const JoinSession = React.lazy(() => import("./components/JoinSession"));
const Logout = React.lazy(() => import("./components/Logout"));
const GamePage = React.lazy(() => import("./pages/GamePage"));
const Home = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/host" element={<HostSession />} />
            <Route path="/join" element={<JoinSession />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
