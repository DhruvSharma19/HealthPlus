const Prediction = ({ prediction }) => {
  const handleProbability = (probability) => {
    const percentage = (probability * 100).toFixed(2);
    return `${percentage}%`;
  };

  const firstDiseaseProbability =
    prediction.length > 0 ? prediction[0].diseases_prob[0] : null;
  const showNotice =
    firstDiseaseProbability !== null && firstDiseaseProbability > 0.3;

  return (
    <>
      <div className="bg-teal-50 h-full mt-1 flex flex-col justify-evenly rounded-lg p-1 ">
        {prediction.length > 0 &&
          prediction[0].diseases.map((disease, index) => (
            <div
              key={index}
              className="rounded-md m-1 py-1 px-2 bg-sky-100 text-base md:text-lg text-indigo-950 flex justify-between"
            >
              <div>{disease}</div>
              <div>{handleProbability(prediction[0].diseases_prob[index])}</div>
            </div>
          ))}
      </div>
      <div className=" p-2 bg-violet-100 mt-1 rounded-md uppercase text-center">
        {showNotice ? "consult a doctor" : "No immediate concern"}
      </div>
    </>
  );
};

export default Prediction;
