import patternImg from "../img/pattern.svg";
const About = () => {
  return (
    <div
      id="about"
      className="w-full flex justify-center mt-10
    "
    >
      <div className="about-container flex flex-col-reverse md:flex-row items-center w-3/4">
        <div className="hero flex flex-col justify-center  md:w-2/3 ">
          <div className="hero-text text-3xl text-center md:text-left mt-5 lg:text-5xl mb-4 md:mb-5">
            About Medware
          </div>
          <div className="hero-stanza  lg:text-lg flex items-center md:w-4/5 pl-5 md:pl-0 mb-7">
            Your one-stop healthcare provider. Our innovative medical dashboard
            and disease predictor offer personalized insights into your health.
            Convenient doctor consultations and a range of healthcare services
            are just a click away. Experience the difference in exceptional care
            and advanced technologies with Medware.
          </div>
        </div>
        <div className="img-wrapper w-80 mb-5 md:w-1/3 ">
          <img src={patternImg} alt="hero-image" className="block w-full" />
        </div>
      </div>
    </div>
  );
};

export default About;
