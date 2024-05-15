import { useGlobalContext } from "./context";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ModalImg from "../img/modal.svg";

const Modal = () => {
  const { registrationToggle, loginButtonClicked, responseCall } =
    useGlobalContext();
  if (loginButtonClicked) {
    return (
      <>
        {responseCall && (
          <div className="fixed responseCall top-0 flex flex-col justify-center items-center  w-screen h-screen z-50">
            <div>
              <div className="rounded-full h-20 w-24 animate-bounce  bg-teal-700 flex items-center italic text-gray-100 font-semibold justify-center"></div>
            </div>
            <div className="w-28 h-2 bg-teal-700 rounded-lg"></div>
          </div>
        )}
        <div className=" fixed top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-sm">
          <div className="flex justify-center items-center w-80 xl:w-1/2 gap-3 h-68 flex-wrap  bg-white rounded-lg shadow-lg">
            <figure className="hidden xl:block w-80 z-20">
              <img src={ModalImg} alt="Modal" className="w-full rounded-lg" />
            </figure>
            {registrationToggle ? <RegisterForm /> : <LoginForm />}
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Modal;
