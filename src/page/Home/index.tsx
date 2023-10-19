import { useState } from "react";
import React from "react";
import {
  background,
  island,
  button,
  buttonM,
  sprite,
  chicken1,
  chicken2,
} from "../../assets/home";
import Flower from "../../components/Sprite/Flower";
import { useNavigate } from "react-router-dom";
function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="flex w-screen h-screen items-center select-none">
      {/* BG Screen */}
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="w-screen h-screen animate-moving-background absolute z-0 overflow-hidden"
      ></div>

      {/* BG Object*/}
      <div className="absolute flex justify-end z-10 w-screen">
        <h1 className="absolute text-black top-10 text-xl font-outline-2 right-6">
          Source Code: https://github.com/pathfinder-toc/pathfinder-frontend
        </h1>
        <div className="absolute flex flex-col items-end mr-[29.5vh] mt-[20vh]">
          <div className="z-20 mt-[10vh] mr-[3.5vw]">
            <Flower />
          </div>
          <div className="z-20 animate-bounce w-[7vh] mr-[53vw] mt-[8vh]">
            <img src={chicken2} draggable={false} />
          </div>
          <div className="z-10 animate-bounce w-[7vh] mr-[31vw] mt-[10vh]">
            <img src={chicken1} draggable={false} />
          </div>
        </div>
        <img src={island} draggable={false} className="w-screen  pr-[10vh]" />
      </div>

      {/* Logo */}
      <div className="absolute flex flex-col z-10 top-[5vh] left-[6vh] leading-[14vh] drop-shadow-2xl">
        <div className="text-4xl text-[#6A8139] font-outline-2 ">WHEEL</div>
        <div className="text-[17.2vh] text-[#A4C263] font-outline-4 tracking-tight">
          ROBOT
        </div>
        <div className="text-[7.4vh] text-[#A4C263] font-outline-3 leading-[11.85vh] tracking-widest">
          SIMULATION
        </div>
        <div className="text-[3.33vh] text-[#6A8139] font-outline-2  leading-[2.96vh] ">
          WITH CUSTOMIZABLE PATHING
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col absolute z-50 bottom-[4vh] left-[4vh]">
        <div
          className="flex justify-center items-center hover:scale-110 ml-1 cursor-pointer"
          onClick={() => {
            navigate("playground");
          }}
        >
          <img src={buttonM} className="w-[36vh]" draggable={false} />
          <p className="absolute text-[6.67vh] text-[#90625D] pb-[2vh]">PLAY</p>
        </div>
        <div className="flex w-full">
          <div className="flex justify-center items-center hover:scale-110 cursor-pointer">
            <img src={button} className="w-[18vh]" draggable={false} />
            <p className="absolute text-[3.35vh] text-[#461E19] pb-[1.5vh]">
              EXIT
            </p>
          </div>
          <div className="flex justify-center items-center hover:scale-110 cursor-pointer">
            <img src={button} className="w-[18vh]" draggable={false} />
            <p
              className="absolute text-[3.35vh] text-[#461E19] pb-[1.5vh]"
              onClick={() => {
                navigate("tutorial");
              }}
            >
              HOW
            </p>
          </div>
        </div>
      </div>
    </div>

    // Baipoo's code
    // <div
    //   style={{ backgroundImage: `url(${background})` }}
    //   className="w-full h-[100vh] flex justify-center items-center gap-[5rem] overflow-hidden animate-moving-background relative"
    // >
    //   <div className="absolute z-10 top-[3.5rem] left-[4rem] leading-[10rem] drop-shadow-2xl select-none">
    //     <div className="text-4xl text-[#6A8139] font-outline-2 ">WHEEL</div>
    //     <div className="text-[11.6rem] text-[#A4C263] font-outline-4 tracking-tight">
    //       ROBOT
    //     </div>
    //     <div className="text-[5rem] text-[#A4C263] font-outline-4 leading-[8rem] tracking-widest">
    //       SIMULATION
    //     </div>
    //     <div className="text-4xl text-[#6A8139] font-outline-2  leading-[2rem] ">
    //       WITH CUSTOMIZABLE PATHING
    //     </div>
    //   </div>
    //   <div className="relative">
    //     <div className="absolute top-[100px] w-[900px] h-[460px] mt-[240px] ml-[540px]">
    //       <div className=" z-20 ml-[770px]">
    //         <Flower />
    //       </div>
    //       <div className="z-20 mt-[170px]  animate-bounce w-[5rem]">
    //         <img src={chicken2} />
    //       </div>
    //       <div className="z-10 ml-[450px] animate-bounce w-[5rem]">
    //         <img src={chicken1} />
    //       </div>
    //     </div>
    //     <img src={island} className=" pr-[100px] z-10" />
    //   </div>
    //   <div className="absolute z-10 top-[47rem] left-[5.5rem] select-none">
    //     <div
    //       className=" hover:scale-110 ml-1 cursor-pointer"
    //       onClick={() => {
    //         navigate("playground");
    //       }}
    //     >
    //       <img src={buttonM} className="w-[30rem] pr-[90px]" />
    //       <p className="w-[34rem] pr-[140px] pt-[1.5rem] mt-[-9rem] text-center text-7xl text-[#90625D]">
    //         PLAY
    //       </p>
    //     </div>
    //     <div className="flex ">
    //       <div className="hover:scale-110 cursor-pointer">
    //         <img src={button} className="w-[12.3rem] mt-[2.5rem]" />
    //         <p className="ml-[2.6rem] text-4xl mt-[-5.5rem] text-[#461E19]">
    //           EXIT
    //         </p>
    //       </div>
    //       <div className="hover:scale-110 cursor-pointer">
    //         <img src={button} className="w-[12.3rem] mt-[2.5rem]" />
    //         <p
    //           className="ml-[3.5rem] text-4xl mt-[-5.5rem] text-[#461E19]"
    //           onClick={() => {
    //             navigate("tutorial");
    //           }}
    //         >
    //           HOW
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Home;
