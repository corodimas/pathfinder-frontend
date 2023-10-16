import React, { useState } from "react";
import Flower from "../../components/Sprite/Flower";
import {
  HOW,
  background,
  label,
  leftArrow,
  rightArrow,
  cat,
  ground,
} from "../../assets/tutorial";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const [translateY, setTranslateY] = useState(0);

  const handleTranslateUp = () => {
    setTranslateY(translateY + 100);
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center">
        <div
          style={{ backgroundImage: `url(${background})` }}
          className="w-full h-[100vh] flex justify-center items-center gap-[5rem] overflow-hidden animate-moving-background absolute"
        ></div>
        <div className="absolute bottom-[8vw] w-[50%]">
          <img src={label} alt="label" className="w-full" />
        </div>
        <div className="absolute bottom-0 w-full">
          <img src={ground} alt="ground" className="w-full" />
        </div>
        <div className="absolute flex justify-between w-full px-5 py-5 bottom-0">
          <div>
            <img
              src={leftArrow}
              className="pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] w-[10vh]"
              draggable={false}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div>
            <img
              src={rightArrow}
              className="pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] w-[10vh]"
              draggable={false}
              onClick={() => {
                navigate("/tutorial2");
              }}
            />
          </div>
        </div>
        <div className="absolute top-10 left-8 z-0">
          <img src={HOW} alt="how" className="w-[45vw]" />
          <div className="absolute animate-bounce left-2/4 top-1/3">
            <img src={cat} alt="cat" className="w-[70%]" />
          </div>
        </div>

        {/* <div className="flex flex-col justify-center items-center font-bold z-40">
          <button
            onClick={handleTranslateUp}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Translate Up
          </button>
          <div
            className="transition-transform transform translate-y-[-10px]"
            style={{ transform: `translateY(${translateY}px)` }}
          >
            <Flower />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Index;
