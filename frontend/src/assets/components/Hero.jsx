import hero_img from "../img/hero-img.svg";
import Button from "@mui/material/Button";
import { useGlobalContext } from "./context";

const Hero = () => {
  const { setLoginButtonClicked, setRegistrationToggle } = useGlobalContext();
  return (
    <div className="w-4/5 hero-container   pt-10 lg:pt-0 flex flex-col-reverse  md:flex-row justify-center gap-8 items-center h-3/4 ">
      <div className="hero flex flex-col  text-center md:text-left w-full md:w-2/5 lg:pl-8  lg:scale-105">
        <div className="hero-text text-4xl lg:text-5xl mb-4 md:mb-5 text-gray-800">
          Your Healthcare, Simplified
        </div>
        <div className="hero-stanza  text-lg lg:text-lg flex  text-center md:text-left items-center w-full md:w-4/5 mb-4 md:mb-7 text-gray-800 px-1 md:px-0">
          Experience optimal health with simplified solutions, just a click
          away!
        </div>
        <div className="hero-btn-container  flex justify-center md:justify-start gap-3 items-center">
          <Button
            variant="outlined"
            color="primary"
            className="hover:scale-105 w-28 h-12 hover:transition-all duration-200 "
            onClick={() => {
              setRegistrationToggle(true);
              setLoginButtonClicked(true);
            }}
          >
            Join Us!
          </Button>
          <Button
            variant="outlined"
            color="success"
            className="hover:scale-105 h-12 hover:transition-all duration-200 "
            onClick={() => {
              setLoginButtonClicked(true);
              setRegistrationToggle(false);
            }}
          >
            Already a member?
          </Button>
        </div>
      </div>
      <div className="img-wrapper w-80 sm:w-96 lg:w-1/2 flex">
        <img src={hero_img} alt="hero-image" className="block w-full -z-10" />
      </div>
    </div>
  );
};

export default Hero;
