import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router";

import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";
import Logout from "./components/Logout";
import WordInput from "./components/WordInput";
import HostSession from "./components/HostSession";
import JoinSession from "./components/JoinSession";
import { store, persistor } from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import { PusherProvider } from "./PusherContext";

// //PUSHER LOGIC | |
// //            _| |_
// //            \   /
// //             \ /
// //              V
// Pusher.logToConsole = true; //remove for production.

// const pusher = new Pusher("32df36bb46bc6f0674ee", {
//   cluster: "us2",
// });

// const channel = pusher.subscribe(gameID);
// channel.bind("hangEvent", (data) => {
//   console.log(data);
// });
// //
// //
// //       END PUSHER LOGIC

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/word" element={<WordInput />} />
          <Route path="/host" element={<HostSession />} />
          <Route path="/join" element={<JoinSession />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
