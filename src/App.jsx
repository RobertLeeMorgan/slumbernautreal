import About from "./components/About";
import Header from "./components/Header";
import Links from "./components/Links";
import Records from "./components/Records";
import Videos from "./components/Videos";
import { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading((isLoading) => false);
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="purple"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }
  return (
    <>
      <Header />
      <Links />
      <Records />
      <Videos />
      <About />
    </>
  );
}

export default App;
