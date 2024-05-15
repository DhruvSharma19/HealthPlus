import Modal from "./Modal";
import { useGlobalContext } from "./context";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import DpWindow from "./dpWindow";

const Main = () => {
  const { currentUser } = useGlobalContext();
  if (!currentUser) {
    return (
      <main className="flex items-center flex-col min-h-screen pt-20">
        <Hero />
        <Services />
        <About />
        <Modal />
      </main>
    );
  }
  return (
    <main className="flex items-center flex-col min-h-screen pt-20">
      <DpWindow />
    </main>
  );
};

export default Main;
