import React, { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import NotFound from "./components/NotFound";
const HostSession = React.lazy(() => import("./components/HostSession"));
const JoinSession = React.lazy(() => import("./components/JoinSession"));
const Logout = React.lazy(() => import("./components/Logout"));
const GamePage = React.lazy(() => import("./components/GamePage"));
const Home = React.lazy(() => import("./components/Home"));
const LoginPage = React.lazy(() => import("./components/LoginPage"));
import { persistor, store } from "./redux/configureStore";

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
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
