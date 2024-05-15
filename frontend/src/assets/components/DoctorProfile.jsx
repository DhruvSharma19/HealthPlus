const DoctorProfile = ({ doctors }) => {
  return (
    <article className="flex justify-center w-screen gap-10 flex-wrap">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="w-72 h-96 max-w-sm bg-white rounded-lg shadow-md flex flex-col justify-center items-center mb-5 p-2"
        >
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={doctor.image_link}
            alt="Image"
          />
          <h5 className=" text-xl text-gray-900 font-semibold">
            {doctor.name}
          </h5>
          <span
            className=" font-normal
              text-gray-600"
          >
            {doctor.speciality}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6 ">
            <a
              href="tel:${doctor.mobile_no}"
              className="w-24 h-10 py-2 text-sm font-semibold text-center text-white bg-teal-500 rounded-lg hover:bg-transparent hover:border-teal-500 hover:border-2 hover:text-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-100 transition-all duration-300 "
            >
              Contact
            </a>
            <a
              href="#"
              className="w-24 h-10 py-2 text-sm font-semibold text-center hover:text-white border-2 border-teal-500 hover:bg-teal-500 rounded-lg bg-transparent  text-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-100 transition-all duration-300"
            >
              View Profile
            </a>
          </div>
          <div className="mt-1 italic text-gray-500 text-sm font-semibold">
            {doctor.experience} Years of Experience
          </div>
          <div className="px-1 mt-2 text-gray-700 pl-4 w-5/6">
            <h2 className=" text-base font-semibold font  w-full">Address:</h2>
            <p className="italic text-sm h-14 overflow-scroll">
              {doctor.work_address}
            </p>
          </div>
        </div>
      ))}
    </article>
  );
};

export default DoctorProfile;
