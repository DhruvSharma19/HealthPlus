import { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SymptomSearch from "./searchSymptoms";
import { useGlobalContext } from "./context";
import cancelIcon from "../img/cross icon.svg";
import axios from "axios";
import Prediction from "./Prediction";
import dpImg from "../img/dp-image.svg";

const DpWindow = () => {
  let { options } = useGlobalContext();
  let index = useRef(null);
  let allSymptomsString = useRef(null);
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [copySymptoms, setCopySymptoms] = useState([]);
  const [allSymptoms, setAllSymptoms] = useState(
    Array(options.length + 1).fill("0")
  );

  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const isDuplicate = (symptom) => symptoms.includes(symptom);

  const handleAddSymptom = (event) => {
    if (selectedSymptom && !isDuplicate(selectedSymptom)) {
      index.current = options.indexOf(selectedSymptom) + 1;
      setSelectedSymptom(null);
      addSymptom(selectedSymptom);
    } else if (isDuplicate(selectedSymptom)) {
      alert("This symptom has already been added!");
    } else {
      alert("Choose a valid  symptom");
    }
  };

  const handleClick = () => {
    if (symptoms.length != 0) {
      setCopySymptoms(allSymptoms);
    }
  };

  const clearSymptoms = () => {
    setSymptoms([]);
    setAllSymptoms(Array(options.length + 1).fill("0"));
    setPrediction(false);
  };

  const addSymptom = (symptom) => {
    if (!symptom) return;

    if (!isDuplicate(symptom)) {
      setSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms((prevSymptoms) => prevSymptoms.filter((s) => s !== symptom));
    const symptomIndex = options.indexOf(symptom) + 1;
    setAllSymptoms((prevAllSymptoms) => {
      const newAllSymptoms = [...prevAllSymptoms];
      newAllSymptoms[symptomIndex] = "0";
      return newAllSymptoms;
    });

    // Check if symptoms will become empty after removing
    if (symptoms.length === 1) {
      setPrediction(false);
    }
  };

  useEffect(() => {
    const newSymptomsArray = [...allSymptoms];
    newSymptomsArray[index.current] = "1";
    setAllSymptoms(newSymptomsArray); // Log the value of index whenever it changes
  }, [index.current]);

  useEffect(() => {
    allSymptomsString.current = allSymptoms.join(""); // Convert allSymptoms array to string
    axios
      .get(`http://127.0.0.1:8000/prediction/${allSymptomsString.current}`)
      .then((response) => {
        if (symptoms.length != 0) {
          setPrediction(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [copySymptoms]); // axios useEffect

  return (
    <div className="dpWindow w-full flex items-center flex-col justify-evenly ">
      <div className="bttns-container flex w-2/3  xl:w-1/2 justify-center items-center">
        <SymptomSearch
          handleAddSymptom={handleAddSymptom}
          selectedSymptom={selectedSymptom}
          setSelectedSymptom={setSelectedSymptom}
        />
      </div>
      <div className="symptoms w-5/6 flex justify-center gap-10 flex-wrap">
        <div className="w-full md:w-4/5 lg:w-1/2 overflow-y-scroll">
          <div className="w-full h-full flex flex-col justify-between items-center p-1 pb-2">
            <h2 className="w-full text-xl lg:text-2xl xl:text-3xl p-1">
              Your Symptoms
            </h2>
            <div className="flex flex-wrap bg-green-50 w-full m-1 p-1 h-full rounded-lg content-start">
              {symptoms.length === 0 ? (
                <div className="text-gray-500 italic flex justify-center items-center text-lg w-full h-full ">
                  Add your first symptom
                </div>
              ) : (
                symptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="added-symptom p-2 m-1.5 flex rounded-md gap-2 text-center bg-green-200 text-green-950 h-11"
                  >
                    <div className="mb-1">{symptom}</div>
                    <button onClick={() => removeSymptom(symptom)}>
                      <img src={cancelIcon} alt="" className="h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="btn-container w-full flex gap-2 px-2 mt-2 justify-center">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClick}
                className="w-1/2 md:w-1/3 h-11 "
              >
                Predict
              </Button>
              <Button
                variant="outlined"
                color="error"
                className="w-1/2 md:w-1/3 h-11 "
                onClick={clearSymptoms}
              >
                Clear Symptoms
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/5 lg:w-1/3 p-2 flex flex-col">
          <h2 className="text-xl lg:text-2xl xl:text-3xl">Predicted Result</h2>
          {prediction ? (
            <Prediction prediction={prediction} />
          ) : (
            <div className="w-full h-full bg-sky-50 mt-2 rounded-lg p-2 flex justify-center items-center text-xl italic text-gray-500">
              No prediction
            </div>
          )}
        </div>
      </div>
      <section className="w-full flex justify-center sm:px-8 md:px-10 lg:px-12 xl:px-14 flex-wrap">
        <div className="hero flex flex-col justify-center sm:w-5/6 md:w-4/5 lg:w-3/5 xl:w-2/5  px-5 md:px-6 lg:pd-8">
          <div className="hero-text text-3xl lg:text-4xl mb-5">
            About our Disease Predictor
          </div>
          <div className="text-base xl:text-lg flex items-center w-full text-gray-800">
            Introducing our advanced disease predictor, a powerful tool designed
            to simplify healthcare for you. Built upon cutting-edge machine
            learning technology and trained on extensive medical data, our
            predictor provides accurate predictions and analysis for various
            diseases. With a user-friendly interface and easy-to-understand
            results, you can gain valuable insights into potential health risks
            and take proactive measures to safeguard your well-being.
          </div>
        </div>
        <div className="img-wrapper w-1/2 flex justify-center">
          <img src={dpImg} alt="hero-image" className="block w-4/5 z-10" />
        </div>
      </section>
    </div>
  );
};

export default DpWindow;
