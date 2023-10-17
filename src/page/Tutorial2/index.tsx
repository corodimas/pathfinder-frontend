import React, { useState } from "react";
import {
  HOW,
  background,
  label,
  leftArrow,
  cat,
  ground,
  rock,
  house,
  ff_cat,
  reset,
  start,
  question
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
      <div className="flex place-content-center">
        <div
          style={{ backgroundImage: `url(${background})` }}
          className="w-full h-[100vh] flex gap-[5rem] overflow-hidden animate-moving-background absolute"
        ></div>
        <div className="absolute top-2 right-12 text-white text-4xl">2/2</div>
        <div className="absolute flex w-[80vh]">
          <img src={label} alt="label" className="w-full" />
        </div>
        <div className="absolute flex flex-col w-[80vh] text-white font-pixelus text-[4.5vh] leading-[4vh]">
          <div className="pt-[9.5vh] pl-[3vh]">
            #2
            นำำสิ่งกีดขวางวางไว้ตามบล็อกที่ต้องการโดยมีข้อแม้ว่าจะต้องมีเล้นทางให้หุ่นยนต์สามารถเดินไปถึงเส้นชัยได้
          </div>
          <div className="pt-[5vh] pl-[3vh]">
            #3 วางเส้นชัยในตำำแหน่งที่ต้องการ
          </div>
          <div className="pt-[7vh] pl-[3vh]">
            #4 วางหุ่นยนต์ในตำำแหน่งที่ต้องการ
          </div>
          <div className="pt-[7vh] pl-[3vh]">
            #5 กดเพื่อ reset สนาม
          </div>
          <div className="pt-[7vh] pl-[3vh]">
            #6 กดเพื่อปล่อยให้หุ่นยนต์เริ่มเดินไปยังเส้นชัย
          </div>
          <div className="pt-[8vh] pl-[3vh]">
            #7 กดเพื่อดูวิธีการเล่น
          </div>
        </div>
        <div className="flex gap-[20vh]">
          <div className="flex w-[70vh]"></div>
          <div className="flex flex-col ml-4 w-[8.5vh]">
            <img src={rock} alt="rock" className="w-[8vh] pt-[10vh] animate-wiggle" />
            <img src={house} alt="house" className="pt-[3vh] animate-wiggle" />
            <img
              src={ff_cat}
              alt="ff_cat"
              className="pt-[2vh] animate-wiggle"
            />
            <img src={reset} alt="reset" className="pt-[2vh] animate-wiggle" />
            <img src={start} alt="start" className="pt-[1.5vh] animate-wiggle" />
            <img src={question} alt="question" className="pt-[2vh] animate-wiggle" />
          </div>
        </div>

        <div className="absolute bottom-0 w-full">
          <img src={ground} alt="ground" className="w-full" />
        </div>
        <div>
          <div className="absolute top-2 left-2">
            <img src={HOW} alt="how" className="w-[73vh]" />
          </div>
          <div className="absolute top-[6vh] left-[30vh] animate-bounce w-[15vh]">
            <img src={cat} alt="cat" />
          </div>
        </div>
        <div className="absolute flex justify-between w-full px-5 py-5 bottom-0">
          <div>
            <img
              src={leftArrow}
              className="pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] w-[10vh]"
              draggable={false}
              onClick={() => {
                navigate("/tutorial");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
