import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import scss from "./Splash.module.scss";

const Splash = () => {
  const navigate = useNavigate();

  const [showA, setShowA] = useState(false);
  const [showRuu, setShowRuu] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showModest, setShowModest] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowA(true), 500);
    setTimeout(() => setShowRuu(true), 1000);
    setTimeout(() => setShowLine(true), 1500);
    setTimeout(() => setShowModest(true), 2000);
    setTimeout(() => setShowTagline(true), 2500);
  }, []);

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className={scss.splash} onClick={handleClick}>
      <div className={scss.content}>
        <h1 className={scss.logo}>
          <span className={`${scss.letterA} ${showA ? scss.show : ""}`}>A</span>
          <span className={`${scss.letterRuu} ${showRuu ? scss.show : ""}`}>
            RUU
          </span>
        </h1>

        <div className={`${scss.line} ${showLine ? scss.show : ""}`}></div>

        <p className={`${scss.modest} ${showModest ? scss.show : ""}`}>
          MODEST LUXURY
        </p>
      </div>

      <p className={`${scss.tagline} ${showTagline ? scss.show : ""}`}>
        WEAR YOUR LIGHT
      </p>
    </div>
  );
};

export default Splash;
