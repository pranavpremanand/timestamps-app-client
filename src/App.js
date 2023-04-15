import { useState } from "react";
import "./App.css";
import Spinner from "./components/Spinner";
import Timestamp from "./components/Timestamp";
import { SpinnerContext } from "./components/SpinnerContext";
import { Toaster } from "react-hot-toast";

function App() {
  const [spinner, setSpinner] = useState(false);
  const spinnerStatus = () => {
    setSpinner((prev) => !prev);
  };
  return (
    <div className="App">
      <SpinnerContext.Provider
        value={{ spinner: spinnerStatus, setSpinner: spinnerStatus }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {spinner && <Spinner />}
        <Timestamp />
      </SpinnerContext.Provider>
    </div>
  );
}

export default App;
