import { useState, useCallback } from "react";
import Preloader from "./components/Preloader";
import ProgressBar from "./components/ProgressBar";
import Hero from "./components/Hero";
import Context from "./components/Context";
import Opportunity from "./components/Opportunity";
import Equation from "./components/Equation";
import TheAsk from "./components/TheAsk";
import Close from "./components/Close";
import ShareBar from "./components/ShareBar";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderDone = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onDone={handlePreloaderDone} />}
      <ProgressBar />
      <main>
        <Hero />
        <Context />
        <Opportunity />
        <Equation />
        <TheAsk />
        <Close />
        <ShareBar />
      </main>
      <Footer />
    </>
  );
}
