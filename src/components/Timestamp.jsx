import { useContext, useState } from "react";
import axios from "axios";
import { AiFillCloseSquare } from "react-icons/ai";
import { SpinnerContext } from "./SpinnerContext";
import { toast } from "react-hot-toast";

const Timestamp = () => {
  const { setSpinner } = useContext(SpinnerContext);
  const [timestamp1, setTimestamp1] = useState("");
  const [timestamp2, setTimestamp2] = useState("");
  const [err, setErr] = useState(false);
  const [difference, setDifference] = useState(null);

  // Get difference between two timestamps in seconds
  const handleSubmit = async (event) => {
    event.preventDefault();
    const timestampReg = /^\d{2}:\d{2}:\d{4} \d{2}:\d{2}:\d{2}$/;
    if (!timestampReg.test(timestamp1) || !timestampReg.test(timestamp2)) {
      setErr(true);
    } else {
      setSpinner();
      setErr(false);
      try {
        const response = await axios.post("http://localhost:5000/difference", {
          timestamp1,
          timestamp2,
        });
        setDifference(response.data);
        setSpinner();
        event.target.reset();
      } catch (error) {
        setSpinner();
        toast.error("Something went wrong");
        event.target.reset();
      }
    }
  };

  // Close modal
  const handleClose = () => {
    setTimestamp1("");
    setTimestamp2("");
    setDifference(null);
  };
  return (
    <div className="flex justify-center h-screen bg-slate-100 flex-col">
      {difference !== null && (
        <div className="absolute w-screen h-full bg-black/70 flex items-center justify-center">
          <div className="gap-4 relative flex flex-col rounded-md bg-slate-950 text-center w-10/12 sm:w-4/6 md:w-4/6 lg:w-3/6 px-5 py-20">
            <AiFillCloseSquare
              onClick={handleClose}
              size={35}
              className="text-white right-0 top-0 m-5 cursor-pointer absolute"
            />
            <p className="text-xl sm:text-3xl font-medium text-white capitalize">
              Difference in seconds
            </p>
            <p className="text-lg md:text-2xl font-medium text-white">
              {difference} Seconds
            </p>
          </div>
        </div>
      )}
      <div className="self-center bg-slate-200 rounded-md w-10/12 sm:w-4/6 md:w-3/6 lg:w-2/6 p-5">
        <p className="text-xl font-semibold mb-2 uppercase">Timestamp App</p>
        <div className="flex items-center gap-1">
          <small className="flex gap-1 items-center">
            Enter in the format{" "}
            <p className="font-semibold">DD:MM:YYYY HH:MM:SS</p>
          </small>
          <p className="text-red-600">*</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input
              required
              autoFocus
              placeholder="Timestamp 1"
              type="text"
              value={timestamp1}
              className="w-full bg-slate-300 placeholder:text-slate-500 rounded focus:outline-none p-2"
              onChange={(e) => setTimestamp1(e.target.value)}
            />
          </div>
          <div>
            <input
              required
              value={timestamp2}
              placeholder="Timestamp 2"
              type="text"
              className="w-full bg-slate-300 placeholder:text-slate-500 rounded focus:outline-none p-2"
              onChange={(e) => setTimestamp2(e.target.value)}
            />
          </div>
          {err && (
            <small className="text-red-600 font-medium">
              Entered format is incorrect
            </small>
          )}
          <button
            className="p-2 bg-gray-900 text-white rounded-sm font-medium"
            type="submit"
          >
            Calculate Difference
          </button>
        </form>
      </div>
    </div>
  );
};

export default Timestamp;
