import React from "react";

import { ground, background, button } from "../../assets/endgame/index";
import { useNavigate } from "react-router-dom";
const index = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="w-full h-[100vh] flex justify-center items-center gap-[5rem] overflow-hidden animate-moving-background select-none"
    >
      <div className="absolute font-outline-4 text-center z-10 top-0 leading-[100px] md:leading-[160px] lg:leading-[170px] text-[#A4C263] text-[90px] lg:text-[170px] md:text-[150px] font-medium mt-[160px] md:mt-[170px] lg:mt-[80px]">
        TRY
        <br />
        AGAIN
      </div>
      <div className="absolute z-10 w-full mt-[150px] md:mt-[100px] lg:mt-[180px]">
        <div className="flex flex-col ">
          <div
            className="flex justify-center transform transition-transform hover:scale-110 w-fit mx-auto cursor-pointer"
            onClick={() => {
              navigate("/playground");
            }}
          >
            <p className="absolute z-10 text-[60px] lg:text-[60px] text-[#90625D] flex justify-center">
              YES
            </p>
            <img
              src={button}
              alt=""
              className="lg:w-[270px] w-[270px]"
              draggable={false}
            />
          </div>
          <a className="w-fit mx-auto">
            <div
              className="flex justify-center transform transition-transform hover:scale-110 mt-4 md:mt-7 lg:mt-4 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <p className="absolute z-10 text-[60px] lg:text-[60px] text-[#90625D] ">
                MENU
              </p>
              <img
                src={button}
                alt=""
                className="lg:w-[270px] w-[270px]"
                draggable={false}
              />
            </div>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 z-0">
        <img src={ground} alt="ground" className="w-screen" draggable={false} />
      </div>
    </div>
  );
};

export default index;
